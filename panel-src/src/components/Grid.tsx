import { Proxy, Http, State, Store } from '../store/Proxy';
import { Reducer } from '../reducers';
import Mui from './Mui';

class Grid extends Proxy {
  public props: {
    id?: string;
    grid?: any;
  };

  public dependencies = [ 'id' ];

  public render() {
    return (
      <div className='Grid'>
        <Mui.Table>
          <Mui.TableHead>
            <Mui.TableRow>
              {this.gridHeader()}
            </Mui.TableRow>
          </Mui.TableHead>
          <Mui.TableBody>
          </Mui.TableBody>
        </Mui.Table>
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

  private gridHeader() {
    let data = (((this.props.grid || {}).metaData || {}).columns || []);
    let result: JSX.Element[] = [];

    data.forEach((column: { text: string }) => {
      result.push(
        <Mui.TableCell>{column.text}</Mui.TableCell>
      );
    });

    return result;
  }
}

export default Grid.connect((state: State) => ({ id: state.grid.id, grid: state.grid.data }));
