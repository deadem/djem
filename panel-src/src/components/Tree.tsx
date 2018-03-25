import { Proxy, Action } from '../store';
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

  protected load(proxy: Proxy.Http) {
    proxy.post('tree', {}).then((response) => {
      let refs: any = {};
      const walk = (nodes: any[]) => {
        for (let node of nodes) {
          refs[node.id] = node;

          if (node.items) {
            walk(node.items);
          }
        }
      };
      walk(response.data);
      Action.tree({ refs, data: response.data });
    });
  }
}

export default Proxy.connect(Tree)((state: Proxy.State) => ({ tree: state.tree.data }));
