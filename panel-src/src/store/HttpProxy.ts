import { Core } from './core';
import { store } from './index';

export class HttpProxy extends Core {
  constructor() {
    super();

    this._http.interceptors.response.use(response => response, error => this.retry(error));
  }

  public instance() {
    return this._http;
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
            return this._http.request(originalRequest).then(resolve, reject);
          }
          return;
        });
      });
    }

    return Promise.reject(error);
  }
}
