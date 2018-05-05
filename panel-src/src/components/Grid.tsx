import { Action, Proxy } from '../store';
import Tree from './Tree';
import * as Mui from '../mui';

interface Props {
  id: string;
  grid?: any;
  tree?: any;
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
        <Tree />
        <div className='Grid__container'>
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
      </div>
    );
  }

  protected load(proxy: Proxy.Http) {
    if (!this.props.id) {
      return;
    }

    proxy.post('grid', { tree: this.props.id }).then((response) => {
      Action.grid(response.data);
    });
  }

  private gridColumns() {
    return (((this.props.grid || {}).metaData || {}).columns || []);
  }

  private gridHeader(): JSX.Element[] {
    return this.gridColumns().map((column: { text: string }, index: number) => {
      return (
        <Mui.TableCell key={index}>{column.text}</Mui.TableCell>
      );
    });
  }

  private selectRow(item: any) {
    let doctype = item._doctype || this.props.tree.refs[this.props.id]._doctype;
    Action.openContent({ doctype, id: item.id });
  }

  private gridRows() {
    let data = this.gridColumns();
    let items = ((this.props.grid || {}).items || []);

    const row = (item: any, index: number) => {
      return data.map((column: { dataIndex: string }, subindex: number) => (
        <Mui.TableCell key={`${index}-${subindex}`} onClick={() => this.selectRow(item)}>{item[column.dataIndex]}</Mui.TableCell>
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

export default Proxy.connect(Grid)(state => ({ id: state.grid.id, grid: state.grid.data, tree: state.tree }));
