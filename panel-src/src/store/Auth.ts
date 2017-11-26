let store = new Vuex.Store({
  state: {
    initialized: false,
    authorized: false
  },
  getters: {
    isAuthorized: state => {
      return state.authorized;
    },
    isInitialized: state => {
      return state.initialized;
    }
  }
});

export default store;
