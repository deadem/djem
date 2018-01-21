import Login from './Login';
import Toolbar from './Toolbar';
import Tree from './Tree';
import Grid from './Grid';

class Main extends React.Component {
  public render() {
    return (
      <div className='Main'>
        <Login />
        <Toolbar />
        <div className='Main__container'>
          <Tree />
          <Grid />
        </div>
      </div>
    );
  }
}

export default Main;
