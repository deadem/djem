import { Proxy } from '../store/Proxy';
import { Reducer } from '../reducers';
import Mui from './Mui';

interface Props {
  id?: string;
  grid?: any;
}

class Grid extends Proxy.Component {
  public props: Props;
  public dependencies = [ 'id' ];

  public constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

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

  protected load(proxy: Proxy.Http, store: Proxy.Store) {
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

    data.forEach((column: { text: string }, index: number) => {
      result.push(
        <Mui.TableCell key={index}>{column.text}</Mui.TableCell>
      );
    });

    return result;
  }

  private selectRow(id: string) {
    console.log(id);
  }

  private gridRows() {
    let data = this.gridColumns();
    let items = ((this.props.grid || {}).items || []);

    const row = (item: any, index: number) => {
      return data.map((column: { dataIndex: string }) => (
        <Mui.TableCell key={index} onClick={() => this.selectRow(item)}>{item[column.dataIndex]}</Mui.TableCell>
      ));
    };

    return items.map((item: any, index: number) => {
      return (
        <Mui.TableRow key={index}>
          {row(item, index)}
        </Mui.TableRow>
      );
    });
  }
}

export default Proxy.connect(Grid)((state: Proxy.State) => ({ id: state.grid.id, grid: state.grid.data }));
