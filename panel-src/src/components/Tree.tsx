import { connect } from 'react-redux';
import { Proxy } from '../store/Proxy';
import { Reducer } from '../reducers';
import { TreeNode } from './TreeNode';

class Tree extends Proxy.Component {
  public props: {
    tree: any;
  } = { tree: undefined };

  protected dependencies = [ 'id' ];

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

export default connect((state: Proxy.State) => ({ tree: state.tree }))(Tree);
