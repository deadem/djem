import * as DJEM from './index';

interface Resolver { [key: string]: ((item: any) => object) | boolean }

export const styleResolver = (item: any, styleProps: Resolver): {} => {
  let styles: any = {};

  for (const prop of Object.keys(item)) {
    let resolver = styleProps[prop];

    if (resolver) {
      if (resolver === true) {
        styles[prop] = item[prop];
      } else {
        styles = { ...styles, ...resolver(item[prop]) };
      }
    }
  }

  return styles;
};

export interface Props {
  data: any;
  item: any;
  update(value: any): void;
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

  public update = () => (value: any) => {
    this.props.update({ ...value });
  }

  protected items(items: any[]): JSX.Element[] {
    const xtypes: { [key: string]: React.ComponentClass<Props> } = {
      'djem.button': DJEM.Button,
      'djem.checkbox': DJEM.Checkbox,
      'djem.html': DJEM.Widget,
      'djem.image': DJEM.Widget,
      'djem.images': DJEM.Widget,
      'djem.staticHtml': DJEM.StaticHtml,
      'djem.tag': DJEM.Widget,
      'djem.text': DJEM.Text,

      'button': DJEM.Button,
      'label': DJEM.Widget,
      'layout': DJEM.Layout,
    };

    return (items || []).map(item => {
      let xtype = xtypes[item.xtype];

      if (!xtype) {
        xtype = xtypes.layout;
      }

      return React.createElement(xtype, { ...this.props, key: item.name, item, update: this.update() });
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
    return styleResolver(item, {
      flex: i => ({ flex: +i }),
      height: i => ({ height: i, minHeight: i }),
      width: true,
    });
  }
}
