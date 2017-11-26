import axios from 'axios';

export class ProxyAuth {
  protected _http = axios.create({
    baseURL: 'api',
  });

}

export class Proxy extends ProxyAuth {
  constructor() {
    super();

  this._http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = window.localStorage.getItem('refreshToken');

      // return new Promise();


      // return http.post('', { login, password }).then(({data}) => {
      //     window.localStorage.setItem('token', data.token);
      //     window.localStorage.setItem('refreshToken', data.refreshToken);

      //     http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
      //     originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
      //     return axios(originalRequest);
      //   });
    }

    return error;
  });

  }

  public instance() {
    return this._http;
  }
}
