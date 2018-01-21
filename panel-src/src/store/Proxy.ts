import { AxiosInstance } from 'axios';
import { State, Store, store } from './index';
import { connect } from 'react-redux';
import { HttpProxy } from './HttpProxy';

export type Http = AxiosInstance;
export type Store = Store;
export type State = State;

let httpProxy = new HttpProxy();

export class Proxy extends React.Component {
  // redux connect wrapper
  public static connect = (<In, Out>(fn: (params: In) => Out) => {
    return function<T>(this: T, params: In) {
      return (fn(params) as any)(this) as T;
    };
  })(connect);

  protected dependencies: string[] = [];

  public componentDidMount() {
    this.loadComponentData();
  }

  public componentWillReceiveProps(nextProps: any) {
    let props: any = this.props;
    for (let i = 0; i < this.dependencies.length; ++i) {
      const key = this.dependencies[i];
      if (nextProps[key] !== props[key]) {
        this.loadComponentData();
        return;
      }
    }
  }

  protected load(_proxy: Http, _store: Store) {
    return;
  }

  private loadComponentData() {
    this.load(httpProxy.instance(), store);
  }

}
