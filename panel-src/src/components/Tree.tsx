import { Proxy, Http } from '../store/Proxy';
import { connect } from 'react-redux';
import { State, Store } from '../store';

class TreeNode extends React.Component {
  props: {
    nodes: Array<any>
  }

  subNodes() {
    return (this.props.nodes || []).map(node => {
      return (
        <div>
          {node.text}
          {node.items ? <TreeNode nodes={node.items} /> : null}
        </div>
      );
    });
  }

  render(): any {
    return (
      <div>{this.subNodes()}</div>
    );
  }
}

class Tree extends React.Component {
  props: {
    tree: any;
  }

  load(proxy: Http, store: Store) {
    proxy.post('tree', {}).then((response) => {
      store.dispatch({
        type: 'tree',
        state: response.data
      });
    });
  }

  render() {
    return (
      <div className='Tree'>
        <TreeNode nodes={this.props.tree} />
      </div>
    );
  }
};

export default connect((state: State) => ({ tree: state.tree }), () => ({}))(Proxy(Tree));
