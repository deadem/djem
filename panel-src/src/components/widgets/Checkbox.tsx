import { Layout, Props } from './Layout';
import * as Mui from '../../mui';

export class Checkbox extends Layout {
  public props: Props;
  public state = {
    value: ''
  };

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      value: props.data[props.item.name]
    };

    this.props = props;
  }

  public render() {
    let props = this.props;
    let item = props.item;

    return (
      <div className={[ ...this.className(item), 'djem-widget', 'djem-checkbox' ].join(' ')} style={this.styles(item)}>
       <Mui.FormControlLabel control={<Mui.Checkbox value='on' id={item.name} checked={this.state.value} onChange={this.onChange()} />} label={item.boxLabel} />
      </div>
    );
  }

  private onChange = () => (event: any) => {
    let value = !!event.target.checked;
    this.setState({ value });
    this.props.update({ [this.props.item.name]: value });
  }
}
