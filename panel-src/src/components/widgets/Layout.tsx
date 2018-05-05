import * as DJEM from './index';

export interface Props {
  data: any;
  item: any;
}

export class Layout extends React.Component {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let item = this.props.item;

    // {JSON.stringify(item)}
    return (
      <div className={[ ...this.className(item), 'djem-layout' ].join(' ')} style={this.styles(item)}>
        {this.items(item.items)}
      </div>
    );
  }

  protected items(items: any[]): JSX.Element[] {
    const xtypes: { [key: string]: (item: any) => JSX.Element } = {
      'djem.text': item => (<DJEM.Text key={item.name} data={this.props.data} item={item} />),
      'djem.tag': item => (<DJEM.Widget key={item.name} data={this.props.data} item={item} />),
      'djem.html': item => (<DJEM.Widget key={item.name} data={this.props.data} item={item} />),
      'djem.image': item => (<DJEM.Widget key={item.name} data={this.props.data} item={item} />),
      'djem.images': item => (<DJEM.Widget key={item.name} data={this.props.data} item={item} />),
      'button': item => (<DJEM.Widget key={item.name} data={this.props.data} item={item} />),
      'label': item => (<DJEM.Widget key={item.name} data={this.props.data} item={item} />),
    };

    return (items || []).map(item => {
      if (xtypes[item.xtype]) {
        return xtypes[item.xtype](item);
      }

      return (
        <DJEM.Layout data={this.props.data} key={item.name} item={item} />
      );
    });
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

    const styleResolver: { [key: string]: ((item: any) => string | number) | boolean } = {
      flex: i => +i.flex,
      height: true,
      width: true,
    };

    for (const prop of Object.keys(item)) {
      let resolver = styleResolver[prop];

      if (resolver) {
        styles[prop] = resolver === true ? item[prop] : resolver(item);
      }
    }

    // styles.border = '1px dotted red';

    return styles;
  }
}
