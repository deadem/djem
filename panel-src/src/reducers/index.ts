import { State } from '../store';

interface Action {
  type: string;
}

const reducers = (state: State, action: Action) => {
  switch (action.type) {
    case 'authorize':
      console.log(state.login);
      return { ...state, login: { ...state.login, authorized: !state.login.authorized } };
    default:
      return state;
  }
};

export default reducers;
