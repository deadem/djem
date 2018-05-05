import { Action, Proxy } from '../store';
import * as DJEM from './widgets';
import * as Mui from '../mui';

interface Props {
  id: string;
  content?: {
    params: any;
    data: {
      code: string;
      data: any;
      view: any;
    };
  }
}

class Content extends Proxy.Component {
  public props: Props;
  public state: { data: any } = { data: {} };

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let content = this.props.content;
    if (!content || !content.data || !content.data.view) {
      return (<div className='center'><Mui.CircularProgress size={128} thickness={2} /></div>);
    }

    const inject = (node: HTMLElement) => {
      if (!content) {
        return;
      }

      new Function(content.data.code).bind(node)();
    };

    return (
      <div className='Content' ref={el => el && inject(el)}>
        <DJEM.Layout data={content.data.data || {}} item={content.data.view} update={this.update()} />
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

  private update = () => (value: any) => {
    let data = { ...this.state.data, ...value };
    this.setState({ data });
    console.log(data);
  }
}

export default Proxy.connect(Content)(state => ({ id: state.tab, content: state.content[state.tab || ''] }));
