import axios from 'axios';
import { Store as Auth } from './Auth';

export class ProxyCore {
  protected _http = axios.create({
    baseURL: 'api',
  });

  constructor() {
    this._http.interceptors.response.use(success => (this.updateToken(success), success), error => (this.updateToken(error.response), Promise.reject(error)));
  }

  private updateToken(response: any) {
    Auth.commit('token', response.headers['x-csrf-token']);
  }
}

export class ProxyAuth extends ProxyCore {
  constructor() {
    super();

    this._http.interceptors.request.use(config => {
      let token = Auth.getters.token;
      if (config.method == 'post' && token) {
        config.data = config.data || {};
        config.data._token = token;
      }
      return config;
    });
  }

  public login(login: string, password: string) {
    Auth.commit('login', { login, password });

    this._http.post('', { login, password }).then(success => {
      Auth.commit('authorize', true);
    }, error => {
      // bad auth does nothing
      return error;
    });
  }
}

export class Proxy extends ProxyCore {
  constructor() {
    super();

    this._http.interceptors.response.use(response => response, error => this.retry(error));
  }

  private retry(error: any) {
    if (error.response.status === 401) {
      Auth.commit('authorize', false);

      let originalRequest = error.config;
      return new Promise((resolve, reject) => {
        let stopWatch = Auth.watch(state => state.authorized, value => {
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
