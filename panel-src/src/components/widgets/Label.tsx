import { Layout, Props, PropsStyles, styles } from './Layout';
import * as Mui from '../../mui';

class Label extends Layout {
  public props: PropsStyles;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props as PropsStyles;
  }

  public render() {
    let props = this.props;
    let item = props.item;

    const { classes } = this.props;

    return (
      <div className={[ ...this.className(item), 'djem-widget', 'djem-label' ].join(' ')} style={this.styles(item)}>
        <Mui.Typography id={item.name} className={[ 'fullHeight', classes.root ].join(' ')}>
          {item.text}
        </Mui.Typography>
      </div>
    );
  }
}

const withStyles = Mui.withStyles(styles)(Label);
export { withStyles as Label };
