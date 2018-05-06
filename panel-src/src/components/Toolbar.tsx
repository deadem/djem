import { Proxy, Action, State } from '../store';
import * as Mui from '../mui';

interface Props {
  tab?: State['tab'];
  tabs?: State['tabs'];
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
         <Mui.Tabs value={this.props.tab} onChange={(_evt, value) => this.selectTab(value)} scrollable={true} scrollButtons='auto'>
         {this.tabs()}
        </Mui.Tabs>
      </Mui.AppBar>
    );
  }

  private selectTab(id: string) {
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
