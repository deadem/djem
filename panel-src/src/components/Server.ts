import axios from 'axios';

type AuthChangeStateCallback = (state: boolean) => void;

export namespace Server {
  const http = axios.create({
    baseURL: 'api',
  });
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
