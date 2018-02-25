import { AxiosInstance } from 'axios';
import { connect as connectRedux } from 'react-redux';
import { State as StateType, Store as StoreType, store } from './index';
import { HttpProxy } from './HttpProxy';

let httpProxy = new HttpProxy();

export namespace Proxy {
  export type Http = AxiosInstance;
  export type Store = StoreType;
  export type State = StateType;

  export class Component extends React.Component {
    protected dependencies: string[] = [];

    public componentDidMount() {
      this.loadComponentData();
    }

    public componentDidUpdate(prevProps: any, _prevState: any) {
      let props: any = this.props;
      for (let i = 0; i < this.dependencies.length; ++i) {
        const key = this.dependencies[i];
        if (prevProps[key] !== props[key]) {
          this.loadComponentData();
          return;
        }
      }
    }

    // public componentWillReceiveProps(nextProps: any) {
    // }

    protected load(_proxy: Http, _store: Store) {
      return;
    }

    private loadComponentData() {
      this.load(httpProxy.instance(), store);
    }
  }

  export function connect<T>(component: T) {
    return (fn: (state: StateType) => any) => {
      return connectRedux(fn)(component as any as React.ComponentType<T>) as any as T;
    };
  }
}
