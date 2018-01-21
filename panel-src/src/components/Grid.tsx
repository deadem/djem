import { Proxy, State } from '../store/Proxy';
// import { Proxy, Http, State, Store } from '../store/Proxy';
// import Mui from './Mui';

class Grid extends Proxy {
  public props: {
    id?: string;
  };

  public render() {
    return (
      <div className='Grid'>
        {this.props.id}
      </div>
    );
  }
}

export default Grid.connect((state: State) => ({ id: state.grid.id, grid: state.grid.data }));
