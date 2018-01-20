import axios, { AxiosInstance } from 'axios';
import { State, Store, store } from './index';
import { connect } from 'react-redux';
import { Core } from './core';

export type Http = AxiosInstance;

let httpProxy = new (class HttpProxy extends Core {
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
});

function wrapper<In, Out>(fn: (params: In) => Out) {
  return (params: In): Out => {
    return fn(params);
  }
}

export type Store = Store;
export type State = State;

export class Proxy extends React.Component {
  static connect = wrapper(connect);
  dependencies: Array<string> = [];

  protected load(proxy: Http, store: Store) {
  }

  private loadComponentData() {
    this.load(httpProxy.instance(), store);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  componentWillReceiveProps() {
    console.log(this.dependencies);
    // this.loadComponentData();
  }
}
