import { Proxy } from '../store/Proxy';
import { Reducer } from '../reducers';
import { TreeNode } from './TreeNode';

interface Props {
  tree?: any;
}

class Tree extends Proxy.Component {
  public props: Props;
  protected dependencies = [ 'id' ];

  public constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    return (
      <div className='Tree'>
        <TreeNode nodes={this.props.tree} />
      </div>
    );
  }

  protected load(proxy: Proxy.Http, store: Proxy.Store) {
    proxy.post('tree', {}).then((response) => {
      store.dispatch({
        type: Reducer.Tree,
        state: response.data,
      });
    });
  }
}

export default Proxy.connect(Tree)((state: Proxy.State) => ({ tree: state.tree }));
