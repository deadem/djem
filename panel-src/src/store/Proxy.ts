import axios from 'axios';

let Store = new Vuex.Store({
  state: {
    authorized: true,
    login: undefined,
    password: undefined,
    token: '',
  },
  getters: {
    isAuthorized: state => state.authorized,
    login: state => state.login,
    password: state => state.password,
    token: state => state.token,
  },
  mutations: {
    authorize: (state, value) => {
      state.authorized = value;
    },
    login: (state, data) => {
      state.login = data.login;
      state.password = data.password;
    },
    token: (state, token) => {
      state.token = token;
    }
  }
});

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
    Store.commit('token', response.headers['x-csrf-token']);
  }

  private getToken() {
    return Store.getters.token;
  }

  protected setAuthorized(state: boolean) {
    Store.commit('authorize', state);
  }

}

export class Auth extends Core {
  public static getLogin() {
    return Store.getters.login;
  }

  public static getPassword() {
    return Store.getters.password;
  }

  public static isAuthorized() {
    return Store.getters.isAuthorized;
  }

  public login(login: string, password: string) {
    Store.commit('login', { login, password });

    this._http.post('', { login, password }).then(success => {
      this.setAuthorized(true);
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
    if ((error.response || {}).status === 401) {
      this.setAuthorized(false);

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
