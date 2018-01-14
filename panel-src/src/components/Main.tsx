import Login from './Login';
import Toolbar from './Toolbar';
import Tree from './Tree';

class Main extends React.Component {
  render() {
    return (
      <div className='Main'>
        <Login />
        <Toolbar />
        <div className='Main__container'>
          <Tree />
        </div>
      </div>
    );
  }
}

export default Main;
