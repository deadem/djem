interface Action {
  type: string;
}

interface Store {
  login: any;
}

const reducers = (state: any, action: Action) => {
  switch (action.type) {
    case 'authorize':
      console.log(state.login);
      return { ...state, login: { ...state.login, authorized: !state.login.authorized } };
    default:
      return state;
  }
};

export default reducers;
