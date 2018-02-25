import { AxiosInstance } from 'axios';
import { State, Store, store } from './index';
import { HttpProxy } from './HttpProxy';

export type Http = AxiosInstance;
export type Store = Store;
export type State = State;

let httpProxy = new HttpProxy();

export class Proxy extends React.Component {
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
