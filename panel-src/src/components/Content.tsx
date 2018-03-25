import { Proxy } from '../store';

interface Props {
  tab?: string | number;
  content?: {
    params: any;
    data: any;
  }
}

class Content extends Proxy.Component {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    return (
      <div className='Content'>
        {JSON.stringify(this.props.content)}
      </div>
    );
  }
}

export default Proxy.connect(Content)(state => ({ tab: state.tab, content: state.content[state.tab || ''] }));
