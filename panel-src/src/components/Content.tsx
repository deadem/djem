import { Action, Proxy } from '../store';
import * as DJEM from './widgets';
import * as Mui from '../mui';

interface Props {
  id: string;
  content?: {
    params: any;
    data: {
      data: any;
      view: any;
    };
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
    if (!content || !content.data || !content.data.view) {
      return (<div className='center'><Mui.CircularProgress size={128} thickness={2} /></div>);
    }

    console.log(JSON.stringify(content.data));

    return (
      <div className='Content'>
        <DJEM.Layout data={content.data.data} item={content.data.view} />
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
