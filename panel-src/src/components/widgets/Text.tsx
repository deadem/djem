import { Layout } from './Layout';

export class Text extends Layout {
  public props: any;

  constructor(props: any, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let item = this.props.item;

    return (
      <div className={[ ...this.className(item), 'djem-widget', 'djem-text' ].join(' ')} style={this.styles(item)}>
        Name: Text: {item.name}
        {item.fieldLabel && (<div>Label: {item.fieldLabel}</div>)}
        {this.items(item.items)}
      </div>
    );
  }
}
