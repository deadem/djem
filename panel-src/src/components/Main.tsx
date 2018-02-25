import Login from './Login';
import Toolbar from './Toolbar';
import Grid from './Grid';
import Content from './Content';
import Proxy from '../store/Proxy';

interface Props {
  content: 'grid' | 'document';
}

class Main extends Proxy.Component {
  public props: Props;

  public constructor(props: Props, context: any) {
    super(props, context);

    this.props = props;
  }

  public render() {
    // const content = this.props.content;

    return (
      <div className='Main'>
        <Login />
        <Toolbar />

        <Grid />
        <Content />

      </div>
    );
  }
}

export default Main;
