import Mui from './Mui';

class Toolbar extends React.Component {
  public render() {
    return (
      <Mui.AppBar position='static'>
        <Mui.Toolbar>
          <Mui.Typography color='inherit' noWrap={true}>DJEM</Mui.Typography>
        </Mui.Toolbar>
      </Mui.AppBar>
    );
  }
}

export default Toolbar;
