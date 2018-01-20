import { Proxy, Http, State, Store } from '../store/Proxy';
import Mui from './Mui';

class TreeNode extends React.Component {
  props: {
    nodes: Array<any>
  }

  subNodes() {
    let result: Array<JSX.Element> = [];
    (this.props.nodes || []).forEach(node => {
      result.push(
        <Mui.ListItem button key={node.id}>
          <Mui.ListItemText inset primary={node.text} />
        </Mui.ListItem>
      );
      if (node.items) {
        result.push(<TreeNode key={`sub-${node.id}`} nodes={node.items} />);
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

class Tree extends Proxy {
  props: {
    tree: any;
  };

  dependencies = [ 'id' ];

  load(proxy: Http, store: Store) {
    proxy.post('tree', {}).then((response) => {
      store.dispatch({
        type: 'tree',
        state: response.data
      });
    });
  }

  render() {
    console.log(this.dependencies);
    return (
      <div className='Tree'>
        <TreeNode nodes={this.props.tree} />
      </div>
    );
  }
};

export default Tree.connect((state: State) => { return { tree: state.tree }; })(Tree);
