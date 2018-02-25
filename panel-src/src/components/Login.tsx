import { connect } from 'react-redux';
import { State } from '../store';
import { Auth } from '../store/Auth';

import Mui from './Mui';

let authState = {
  name: '',
  password: '',
};

class Login extends React.Component {
  public props: {
    open: boolean;
  } = { open: false };

  public state: { password?: HTMLElement } = {
  };

  public render() {
    return (
      <div>
        <Mui.Dialog
          open={this.props.open}
          onClose={this.empty}
          aria-labelledby='form-dialog-title'
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <Mui.DialogTitle id='form-dialog-title'>Login</Mui.DialogTitle>
          <Mui.DialogContent>
            <Mui.DialogContentText>
              Please enter your credentials
            </Mui.DialogContentText>
            <Mui.TextField
              autoFocus={true}
              margin='dense'
              id='name'
              label='Login'
              type='text'
              fullWidth={true}
              onChange={this.onChange}
              onKeyPress={this.catchReturn}
            />
            <Mui.TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth={true}
              onChange={this.onChange}
              onKeyPress={this.catchReturn}
              inputRef={this.passwordField}
            />
          </Mui.DialogContent>
          <Mui.DialogActions>
            <Mui.Button onClick={this.handleLogin} color='primary'>
              Login
            </Mui.Button>
          </Mui.DialogActions>
        </Mui.Dialog>
      </div>
    );
  }

  private catchReturn = (evt: any) => {
    if (evt.charCode == 13) {
      return this.handleLogin();
    }
  }

  private handleLogin = () => {
    new Auth().login(authState.name, authState.password).then(() => {
      authState.password = '';
      (this.state.password as any).value = '';
    });
  }

  private onChange = (evt: any) => {
    let element = evt.currentTarget as HTMLInputElement;
    (authState as any)[element.id] = element.value;
  }

  private passwordField = (field: HTMLElement) => {
    this.state.password = field;
  }

  private empty() {
    return;
  }
}

export default connect((state: State) => ({ open: !state.login.authorized }))(Login);
