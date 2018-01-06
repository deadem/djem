import { connect } from 'react-redux';
import { State } from '../store';
import { Auth } from '../store/Proxy';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

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
        <Dialog
          open={this.props.open}
          onClose={() => {}}
          aria-labelledby="form-dialog-title"
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your credentials
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Login"
              type="text"
              fullWidth
              onChange={this.onChange}
              onKeyPress={this.catchReturn}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.onChange}
              onKeyPress={this.catchReturn}
              inputRef={this.passwordField}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    open: !state.login.authorized,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
