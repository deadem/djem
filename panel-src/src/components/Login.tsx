import { connect } from 'react-redux';
import { State } from '../store';
import { Auth } from '../store/Proxy';

import Mui from './Mui';

let authState = {
  name: '',
  password: '',
};

class Login extends React.Component {
  props: {
    open: boolean;
  }

  state: { password?: HTMLElement } = {
  };

  catchReturn = (evt: any) => {
    if (evt.charCode == 13) {
      return this.handleLogin();
    }
  }

  handleLogin = () => {
    let auth = new Auth().login(authState.name, authState.password).then(() => {
      authState.password = '';
      (this.state.password as any).value = '';
    }, error => {});
  };

  onChange = (evt: any) => {
    let element = evt.currentTarget as HTMLInputElement;
    (authState as any)[element.id] = element.value;
  };

  passwordField = (field: HTMLElement) => {
    this.state.password = field;
  }

  render() {
    return (
      <div>
        <Mui.Dialog
          open={this.props.open}
          onClose={() => {}}
          aria-labelledby="form-dialog-title"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <Mui.DialogTitle id="form-dialog-title">Login</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.DialogContentText>
              Please enter your credentials
            </Mui.DialogContentText>
            <Mui.TextField
              autoFocus
              margin="dense"
              id="name"
              label="Login"
              type="text"
              fullWidth
              onChange={this.onChange}
              onKeyPress={this.catchReturn}
            />
            <Mui.TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.onChange}
              onKeyPress={this.catchReturn}
              inputRef={this.passwordField}
            />
          </Mui.DialogContent>
          <Mui.DialogActions>
            <Mui.Button onClick={this.handleLogin} color="primary">
              Login
            </Mui.Button>
          </Mui.DialogActions>
        </Mui.Dialog>
      </div>
    );
  }
}

export default connect((state: State) => ({ open: !state.login.authorized }), () => ({}))(Login);
