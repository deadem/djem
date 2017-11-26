import axios from 'axios';

type AuthChangeStateCallback = (state: boolean) => void;

export namespace Server {
  const http = axios.create({
    baseURL: 'api',
  });

  // http.interceptors.response.use(function (response) {
  //   return response;
  // }, function (error) {
  //   const originalRequest = error.config;

  //   if (error.response.status === 401 && !originalRequest._retry) {
  //     originalRequest._retry = true;
  //     debugger;

  //     const refreshToken = window.localStorage.getItem('refreshToken');
  //     return http.post('', { login, password }).then(({data}) => {
  //         window.localStorage.setItem('token', data.token);
  //         window.localStorage.setItem('refreshToken', data.refreshToken);

  //         http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
  //         originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
  //         return axios(originalRequest);
  //       });
  //   }

  //   return error;
  // });

  let notify: Array<AuthChangeStateCallback> = [];

  export function attach(callback: AuthChangeStateCallback) {
    notify.push(callback);
  }

  export function login(login: string, password: string) {
  }

  export function tree() {
    return http.get('tree');
  }
}
