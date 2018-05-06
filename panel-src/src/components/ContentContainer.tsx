import { Proxy, State } from '../store';
import Content from './Content';

interface Props {
  visible: boolean;
  tabs: State['tabs'];
}

class ContentContainer extends Proxy.Component {
  public props: Props;

  public constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    return (
      <div className={[ 'ContentContainer', this.props.visible && 'ContentContainer-visible' ].join(' ')}>
        {this.props.tabs.filter(tab => tab.id != 'grid').map(tab => (<Content id={tab.id} />))}
      </div>
    );
  }
}

export default Proxy.connect(ContentContainer)(state => ({ visible: state.tab != 'grid', tabs: state.tabs }));
