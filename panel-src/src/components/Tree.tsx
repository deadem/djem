import { Proxy, Http } from '../store/Proxy';
import { connect } from 'react-redux';
import { State, Store } from '../store';
import Mui from './Mui';

class TreeNode extends React.Component {
  props: {
    nodes: Array<any>
  }

  subNodes() {
    let result: Array<JSX.Element> = [];
    (this.props.nodes || []).forEach(node => {
      result.push(
        <Mui.ListItem button>
          <Mui.ListItemText inset primary={node.text} />
        </Mui.ListItem>
      );
      if (node.items) {
        result.push(<TreeNode nodes={node.items} />);
      }
    });

    return result;
  }

  render() {
    return (
      <Mui.List>{this.subNodes()}</Mui.List>
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
