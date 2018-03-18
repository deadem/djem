import { Action } from '../reducers';
import Mui from './Mui';

interface Props {
  nodes: any[];
}

export class TreeNode extends React.Component {
  public props: Props;

  public constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    return (
      <Mui.List>{this.subNodes()}</Mui.List>
    );
  }

  private selectNode(id: string | number) {
    Action.gridChange({ id });
  }

  private subNodes(): JSX.Element[] {
    return (this.props.nodes || []).map(node => {
      if (node.items) {
        return (<TreeNode key={`sub-${node.id}`} nodes={node.items} />);
      }

      return (
        <Mui.ListItem button={true} key={node.id} onClick={() => this.selectNode(node.id)}>
          <Mui.ListItemText inset={true} primary={node.text} />
        </Mui.ListItem>
      );
    });
  }
}
