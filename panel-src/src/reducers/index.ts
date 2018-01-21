import { State } from '../store';

interface Action {
  type: string;
  state?: any;
}

const reducers = (state: State, action: Action): State => {
  switch (action.type) {
  case 'authorize':
    return { ...state, login: { ...state.login, authorized: !state.login.authorized } };
  case 'tree':
    return { ...state, tree: [ ...action.state ] };
  default:
    return state;
  }
};

export default reducers;
