import { connect as connectRedux } from 'react-redux';
import { State as StateType } from './index';
import { HttpProxy } from './HttpProxy';

let httpProxy = new HttpProxy();

namespace Proxy {
  export type State = StateType;

  export class Component extends React.Component {
    protected dependencies: string[] = [];

    public componentDidMount() {
      this.load();
    }

    public componentDidUpdate(prevProps: any, _prevState: any) {
      let props: any = this.props;
      for (let i = 0; i < this.dependencies.length; ++i) {
        const key = this.dependencies[i];
        if (prevProps[key] !== props[key]) {
          this.load();
          return;
        }
      }
    }

    // public componentWillReceiveProps(nextProps: any) {
    // }

    protected proxy() {
      return httpProxy.instance();
    }

    protected load() {
      return;
    }
  }

  export function connect<T>(component: T) {
    return (fn: (state: StateType) => any) => {
      return connectRedux(fn)(component as any as React.ComponentType<T>) as any as T;
    };
  }
}

export default Proxy;
