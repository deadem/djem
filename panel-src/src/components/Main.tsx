import Login from './Login';
import Toolbar from './Toolbar';
import Grid from './Grid';
import ContentContainer from './ContentContainer';
import { Proxy } from '../store';

interface Props {
  tab?: string | number;
}

class Main extends Proxy.Component {
  public props: Props;

  public constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    return (
      <div className='Main'>
        <Login />
        <Toolbar />

        <Grid id='' visible={true} />
        <ContentContainer visible={false} tabs={[]} />
      </div>
    );
  }
}

export default Proxy.connect(Main)(state => ({ tab: state.tab }));
