export default class Layout extends React.Component {
  public props: any;

  constructor(props: any, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let item = this.props.item;

    return (
      <div className={[ ...this.className(item), 'djem-layout' ].join(' ')} style={this.styles(item)}>
        {JSON.stringify(item)}
      </div>
    );
  }

  protected className(item: any): string[] {
    let className = [];

    if (item.autoScroll) {
      className.push('djem-layout-autoscroll');
    }

    let layout = item.layout;
    if (layout) {
      if (layout.align) {
        className.push(`djem-layout-align-${layout.align}`);
      }

      if (layout.type) {
        className.push(`djem-layout-type-${layout.type}`);
      }
    }

    return className;
  }

  protected styles(item: any): {} {
    let styles: any = {};

    if (item.flex) {
      styles.flex = +item.flex;
    }

    return styles;
  }
}
