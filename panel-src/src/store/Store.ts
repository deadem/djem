import { Proxy } from '../store/Proxy';

export interface Item {
  id: string,
  text: string,
}

export let ListStore = (request: string) => Vue.extend({
  created() {
    this.$store.dispatch('load');
  },
  computed: {
    items(): Array<Item> {
      return this.$store.getters.items;
    }
  },
  store: new Vuex.Store({
    state: {
      loaded: false,
      items: [],
    },
    getters: {
      items: (state): Array<Item> => state.items,
    },
    mutations: {
      load(state, data) {
        state.items = data;
        state.loaded = true;
      }
    },
    actions: {
      load(context, data = {}) {
        new Proxy().instance().post(request, data).then((response) => {
          context.commit('load', response.data);
        });
      }
    }
  }),
});
