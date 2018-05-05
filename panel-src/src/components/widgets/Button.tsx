import { Layout, Props, styleResolver } from './Layout';
import * as Mui from '../../mui';

type PropsStyles = Props & Mui.WithStyles<'root'>;

class Button extends Layout {
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
      <div className={[ ...this.className(item), 'djem-widget', 'djem-button' ].join(' ')} style={this.styles(item)}>
        <Mui.Button id={item.name} variant='raised' fullWidth={true} className={[ 'fullHeight', classes.root ].join(' ')} color='inherit'>
          {item.text}
        </Mui.Button>
      </div>
    );
  }
}

const styles = (props: Props) => (_theme: any) => {
  return {
    root: {
      ...styleResolver(props.item, {
        bgcolor: i => ({ 'background-color': i }),
        color: true,
      }),
      '&:hover': styleResolver(props.item, {
        bgcolor: i => ({ 'background-color': i }),
      }),
    }
  };
};

const withStyles = Mui.withStyles(styles)(Button);
export { withStyles as Button };
