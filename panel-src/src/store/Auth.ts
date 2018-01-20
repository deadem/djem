import { store } from './index';
import { Core } from './core';

export class Auth extends Core {
  public login(login: string, password: string) {
    let post = this._http.post('', { login, password });
    post.then(success => this.setAuthorized(true), error => error); // bad auth does nothing

    return post;
  }
}
