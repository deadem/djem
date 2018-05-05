import { Layout, Props } from './Layout';
import * as Mui from '../../mui';

export class Text extends Layout {
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
      <div className={[ ...this.className(item), 'djem-widget', 'djem-text' ].join(' ')} style={this.styles(item)}>
        <Mui.TextField
          id={item.name}
          label={item.fieldLabel}
          fullWidth={true}
          // className={classes.textField}
          value={this.state.value}
          onChange={this.onChange()}
          // onChange={this.handleChange('name')}
          // margin='normal'
        />
      </div>
    );
  }

  private onChange = () => (event: any) => {
    this.setState({
      value: event.target.value,
    });
  }
}
