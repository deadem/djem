import { Proxy, Http, State, Store } from '../store/Proxy';
import { Reducer } from '../reducers';
import { TreeNode } from './TreeNode';

class Tree extends Proxy {
  public props: {
    tree?: any;
  };

  protected dependencies = [ 'id' ];

  public render() {
    return (
      <div className='Tree'>
        <TreeNode nodes={this.props.tree} />
      </div>
    );
  }

  protected load(proxy: Http, store: Store) {
    proxy.post('tree', {}).then((response) => {
      store.dispatch({
        type: Reducer.Tree,
        state: response.data,
      });
    });
  }
}

export default Tree.connect((state: State) => ({ tree: state.tree }));
