import { Layout, Props } from './Layout';

export class UnknownWidget extends Layout {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let item = this.props.item;

    return (
      <div className={[ ...this.className(item), 'djem-widget', 'djem-widget-border' ].join(' ')} style={this.styles(item)}>
        UnknownWidget ({item.xtype})
        {this.items(item.items)}
      </div>
    );
  }

  public styles(item: {}) {
    return { ...super.styles(item), border: '1px dotted red' };
  }
}
