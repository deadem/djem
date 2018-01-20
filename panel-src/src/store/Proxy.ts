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

export type Store = Store;
export type State = State;

export class Proxy extends React.Component {
  // redux connect wrapper
  static connect = (function <In, Out>(fn: (params: In) => Out) {
    return function<T>(this: T, params: In) {
      return (fn(params) as any)(this) as T;
    }
  })(connect);

  dependencies: Array<string> = [];

  protected load(proxy: Http, store: Store) {
  }

  private loadComponentData() {
    this.load(httpProxy.instance(), store);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  componentWillReceiveProps(nextProps: any) {
    let props: any = this.props;
    for (let i = 0; i < this.dependencies.length; ++i) {
      const key = this.dependencies[i];
      if (nextProps[key] !== props[key]) {
        this.loadComponentData();
        return;
      }
    }
  }
}
