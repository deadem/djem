import { Layout, Props } from './Layout';

export class Widget extends Layout {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let item = this.props.item;

    return (
      <div className={[ ...this.className(item), 'djem-widget', 'djem-widget-border' ].join(' ')} style={this.styles(item)}>
        Name: {item.name}
        {item.fieldLabel && (<div>Label: {item.fieldLabel}</div>)}
        {this.items(item.items)}
      </div>
    );
  }
}
