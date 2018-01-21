import { store } from '../store';
import { Reducer } from '../reducers';
import Mui from './Mui';

export class TreeNode extends React.Component {
  public props: {
    nodes: any[];
  };

  public render() {
    return (
      <Mui.List>{this.subNodes()}</Mui.List>
    );
  }

  private selectNode(id: string | number) {
    store.dispatch({
      type: Reducer.GridChange,
      id,
    });
  }

  private subNodes() {
    let result: JSX.Element[] = [];
    (this.props.nodes || []).forEach(node => {
      result.push(
        <Mui.ListItem button={true} key={node.id} onClick={() => this.selectNode(node.id)}>
          <Mui.ListItemText inset={true} primary={node.text} />
        </Mui.ListItem>
      );
      if (node.items) {
        result.push(<TreeNode key={`sub-${node.id}`} nodes={node.items} />);
      }
    });

    return result;
  }
}