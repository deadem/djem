import { Layout, Props } from './Layout';
import * as Mui from '../../mui';

export class Button extends Layout {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    let props = this.props;
    let item = props.item;

    return (
      <div className={[ ...this.className(item), 'djem-widget', 'djem-button' ].join(' ')} style={this.styles(item)}>
        <Mui.Button id={item.name} variant='raised' fullWidth={true} className='fullHeight'>
          {item.text}
        </Mui.Button>
      </div>
    );
  }
}
