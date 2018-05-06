import { Proxy, Action } from '../store';
import * as Mui from '../mui';

interface Props {
  tab?: string | number;
  tabs?: Array<{ name: string; id: string | number }>;
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
         {this.tabs()}
        </Mui.Tabs>
      </Mui.AppBar>
    );
  }

  private selectTab(id: string | number) {
    Action.tabChange(id);
  }

  private tabs() {
    return (this.props.tabs || []).map((tab) => {
      return (
        <Mui.Tab label={tab.name} value={tab.id} key={tab.id} />
      );
    });
  }
}

export default Proxy.connect(Toolbar)(state => ({ tab: state.tab, tabs: state.tabs }));
