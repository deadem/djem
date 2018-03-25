import { Proxy, Action } from '../store';
import Mui from './Mui';

interface Props {
  tab?: string | number;
}

class Toolbar extends Proxy.Component {
  public props: Props;

  constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
    this.selectTab('grid');
  }

  // <Mui.Toolbar>
  //   <Mui.Typography color='inherit' noWrap={true}>DJEM</Mui.Typography>
  // </Mui.Toolbar>

  public render() {
    return (
      <Mui.AppBar position='static'>
         <Mui.Tabs value={this.props.tab} onChange={(_evt, value) => this.selectTab(value)}>
          <Mui.Tab label='DJEM' value='grid' />
          <Mui.Tab label='Item Two'/>
          <Mui.Tab label='Item Three' />
        </Mui.Tabs>
      </Mui.AppBar>
    );
  }

  private selectTab(id: string | number) {
    Action.tabChange({ id });
  }
}

export default Proxy.connect(Toolbar)((state: Proxy.State) => ({ tab: state.tab }));
