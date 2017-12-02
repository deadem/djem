import { Proxy } from './Proxy';

class Store {
  public store = new Vuex.Store({
    state: {
      loaded: false,
      items: [],
    },
    getters: {
      items: (state) => state.items,
    },
    mutations: {
      load(state, data) {
        state.items = data;
        state.loaded = true;
      }
    },
    actions: {
      load(context) {
        new Proxy().instance().post('tree').then((response) => {
            context.commit('load', response.data);
        });
      }
    }
  });

  public load() {
    this.store.dispatch('load');
  }
}

export default Store;
