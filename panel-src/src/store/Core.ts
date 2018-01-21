import axios from 'axios';
import { Reducer } from '../reducers';
import { store } from './index';

let auth = {
  token: '',
};

export class Core {
  protected _http = axios.create({
    baseURL: 'api',
  });

  constructor() {
    this._http.interceptors.response.use(
      success => {
        this.updateToken(success);
        return success;
      },
      error => {
        this.updateToken(error.response);
        return Promise.reject(error);
      }
    );

    this._http.interceptors.request.use(config => {
      config.headers['X-CSRF-TOKEN'] = this.getToken();
      return config;
    });
  }

  protected setAuthorized(state: boolean) {
    store.dispatch({
      type: Reducer.Authorize,
      state,
    });
  }

  private updateToken(response: any) {
    auth.token = response.headers['x-csrf-token'];
  }

  private getToken() {
    return auth.token;
  }
}
