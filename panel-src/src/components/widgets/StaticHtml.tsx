import { Layout, Props } from './Layout';

export class StaticHtml extends Layout {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let props = this.props;
    let item = props.item;

    return (
      <div
        id={item.name}
        className={[ ...this.className(item), 'djem-widget', 'djem-static-html' ].join(' ')}
        style={this.styles(item)}
        dangerouslySetInnerHTML={{ __html: item.html }}
      />
    );
  }
}
