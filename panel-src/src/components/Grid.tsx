import { connect } from 'react-redux';
import { Proxy, Http, State, Store } from '../store/Proxy';
import { Reducer } from '../reducers';
import Mui from './Mui';

class Grid extends Proxy {
  public props: {
    id: string | undefined;
    grid: any;
  } = { id: undefined, grid: undefined };

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
            {this.gridRows()}
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

  private gridColumns() {
    return (((this.props.grid || {}).metaData || {}).columns || []);
  }

  private gridHeader() {
    let data = this.gridColumns();
    let result: JSX.Element[] = [];

    data.forEach((column: { text: string }) => {
      result.push(
        <Mui.TableCell>{column.text}</Mui.TableCell>
      );
    });

    return result;
  }

  private gridRows() {
    let data = this.gridColumns();
    let items = ((this.props.grid || {}).items || []);

    const row = (item: any) => {
      return data.map((column: { dataIndex: string }) => (
        <Mui.TableCell>{item[column.dataIndex]}</Mui.TableCell>
      ));
    };

    return items.map((item: any) => {
      return (
        <Mui.TableRow key={item.id}>
          {row(item)}
        </Mui.TableRow>
      );
    });
  }
}

export default connect((state: State) => ({ id: state.grid.id, grid: state.grid.data }))(Grid);
