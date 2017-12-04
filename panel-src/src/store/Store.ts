import { Proxy } from '../store/Proxy';
import Vue from 'vue';

export interface Item {
  id: string,
  text: string,
}

export let ListStore = (request: string) => ({
  created() {
    (this as any as Vue).$store.dispatch('load');
  },
  computed: {
    items(): Array<Item> {
      return (this as any as Vue).$store.getters.items;
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
      load(context) {
        new Proxy().instance().post(request).then((response) => {
          context.commit('load', response.data);
        });
      }
    }
  }),
});
