import axios from 'axios';
import { store } from './index';

let auth = {
  token: '',
};

export class Core {
  protected _http = axios.create({
    baseURL: 'api',
  });

  constructor() {
    this._http.interceptors.response.use(success => (this.updateToken(success), success), error => (this.updateToken(error.response), Promise.reject(error)));

    this._http.interceptors.request.use(config => {
      config.headers['X-CSRF-TOKEN'] = this.getToken();
      return config;
    });
  }

  private updateToken(response: any) {
    auth.token = response.headers['x-csrf-token'];
  }

  private getToken() {
    return auth.token;
  }

  protected setAuthorized(state: boolean) {
    store.dispatch({
      type: 'authorize',
      state
    });
  }
}
