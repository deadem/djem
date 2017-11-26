import axios from 'axios';
import { Store } from './Auth';

export class Core {
  protected _http = axios.create({
    baseURL: 'api',
  });

  constructor() {
    this._http.interceptors.response.use(success => (this.updateToken(success), success), error => (this.updateToken(error.response), Promise.reject(error)));

    this._http.interceptors.request.use(config => {
      let token = this.getToken();
      if (config.method == 'post' && token) {
        config.data = config.data || {};
        config.data._token = token;
      }
      return config;
    });
  }

  private updateToken(response: any) {
    Store.commit('token', response.headers['x-csrf-token']);
  }

  private getToken() {
    return Store.getters.token;
  }
}

export class Auth extends Core {
  public login(login: string, password: string) {
    Store.commit('login', { login, password });

    this._http.post('', { login, password }).then(success => {
      Store.commit('authorize', true);
    }, error => {
      // bad auth does nothing
      return error;
    });
  }
}

export class Proxy extends Core {
  constructor() {
    super();

    this._http.interceptors.response.use(response => response, error => this.retry(error));
  }

  private retry(error: any) {
    if (error.response.status === 401) {
      Store.commit('authorize', false);

      let originalRequest = error.config;
      return new Promise((resolve, reject) => {
        let stopWatch = Store.watch(state => state.authorized, value => {
          if (value) {
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
