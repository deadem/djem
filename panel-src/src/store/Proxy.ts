import axios from 'axios';
import { store } from './index';

let auth = {
  token: '',
};

class Core {
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

export class Auth extends Core {
  public login(login: string, password: string) {
    let post = this._http.post('', { login, password });
    post.then(success => this.setAuthorized(true), error => error); // bad auth does nothing

    return post;
  }
}

export class Proxy extends Core {
  constructor() {
    super();

    this._http.interceptors.response.use(response => response, error => this.retry(error));
  }

  private retry(error: any) {
    if ((error.response || {}).status === 401) {
      this.setAuthorized(false);

      let originalRequest = error.config;
      return new Promise((resolve, reject) => {
        let stopWatch = store.subscribe(() => {
          let state = store.getState();
          if (state.login.authorized) {
            stopWatch();
            originalRequest.baseURL = '';
            return this._http.request(originalRequest).then(success => resolve(success), error => reject(error));
          }
          return;
        });
      });
    }

    return Promise.reject(error);
  }

  public instance() {
    return this._http;
  }
}
