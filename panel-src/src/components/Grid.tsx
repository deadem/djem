import { Proxy, Http, State, Store } from '../store/Proxy';
import { Reducer } from '../reducers';
// import Mui from './Mui';

class Grid extends Proxy {
  public props: {
    id?: string;
  };

  public dependencies = [ 'id' ];

  public render() {
    return (
      <div className='Grid'>
        {this.props.id}
      </div>
    );
  }

  protected load(proxy: Http, store: Store) {
    if (!this.props.id) {
      return;
    }

    proxy.post('grid', { tree: this.props.id }).then((response) => {
      store.dispatch({
        type: Reducer.Grid,
        state: response.data,
      });
    });
  }
}

export default Grid.connect((state: State) => ({ id: state.grid.id, grid: state.grid.data }));
