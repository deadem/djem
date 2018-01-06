import { connect } from 'react-redux';
import { State } from '../store';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Login extends React.Component {
  props: {
    open: boolean;
  }

  handleClose = () => {
  };

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
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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
