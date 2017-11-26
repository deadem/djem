export let Store = new Vuex.Store({
  state: {
    authorized: true,
    login: undefined,
    password: undefined,
    token: '',
  },
  getters: {
    isAuthorized: state => state.authorized,
    login: state => state.login,
    password: state => state.password,
    token: state => state.token,
  },
  mutations: {
    authorize: (state, value) => {
      state.authorized = value;
    },
    login: (state, data) => {
      state.login = data.login;
      state.password = data.password;
    },
    token: (state, token) => {
      state.token = token;
    }
  }
});
