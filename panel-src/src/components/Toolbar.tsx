import Mui from './Mui';

class Toolbar extends React.Component {
  public state = {
    value: 0
  };

  // <Mui.Toolbar>
  //   <Mui.Typography color='inherit' noWrap={true}>DJEM</Mui.Typography>
  // </Mui.Toolbar>

  public render() {
    return (
      <Mui.AppBar position='static'>
         <Mui.Tabs value={this.state.value} onChange={(_evt, value) => this.setState({ value })}>
          <Mui.Tab label='DJEM' />
          <Mui.Tab label='Item Two'/>
          <Mui.Tab label='Item Three' />
        </Mui.Tabs>
      </Mui.AppBar>
    );
  }
}

export default Toolbar;
