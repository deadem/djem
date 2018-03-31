import { Action, Proxy } from '../store';

interface Props {
  id: string;
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
    let content = this.props.content;
    if (!content) {
      return (<div>No content</div>);
    }

    return (
      <div className='Content'>
        {JSON.stringify(content.data)}
      </div>
    );
  }

  protected load(proxy: Proxy.Http) {
    if (!this.props.content || !this.props.content.params) {
      return;
    }

    let params = this.props.content.params;

    proxy.post('content/get', { raw: true, _doctype: params.doctype, id: params.id }).then(response => {
      Action.content(this.props.id, response.data);
    });
  }
}

export default Proxy.connect(Content)(state => ({ id: state.tab, content: state.content[state.tab || ''] }));
