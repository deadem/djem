import { Action, Proxy, State } from '../store';
import * as DJEM from './widgets';
import * as Mui from '../mui';

interface Props {
  id: State['tab'];
  tab?: State['tab'];
  content?: State['content'];
}

class Content extends Proxy.Component {
  public props: Props;
  public state: { data: any } = { data: {} };
  // public dependencies = [ 'id' ];

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let content = this.getContent();
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
      <div className={[ 'Content', this.props.id == this.props.tab ? 'Content-visible' : '' ].join(' ')} ref={el => el && inject(el)}>
        <div className='Content-save-button'><button onClick={this.save()}>Save</button></div>
        <DJEM.Layout key={this.props.id} data={content.data.data || {}} item={content.data.view} update={this.update()} />
      </div>
    );
  }

  protected load() {
    let content = this.getContent();
    if (!content) {
      return;
    }

    let params = content.params;

    this.proxy().post('content/get', { _doctype: params.doctype, id: params.id }).then(response => {
      Action.content(this.props.id, response.data);
    });
  }

  private update = () => (value: any) => {
    let data = { ...this.state.data, ...value };
    this.setState({ data });
    console.log(data);
  }

  private save = () => () => {
    let content = this.getContent();

    if (!content) {
      return;
    }

    let params = content.params;
    let data = { ...content.data.data, ...this.state.data };

    this.proxy().post('content/set', { ...data, _doctype: params.doctype, id: params.id }).then(response => {
      Action.content(this.props.id, response.data);
    });
  }

  private getContent() {
    if (!this.props.content) {
      return;
    }
    return this.props.content[this.props.id];
  }
}

export default Proxy.connect(Content)(state => ({ tab: state.tab, content: state.content }));
