import { Proxy } from '../store/Proxy';

function Store<Type>() {
  return (request: string) => Vue.extend({
    created() {
      this.$store.dispatch('load');
    },
    computed: {
      items(): Type {
        return this.$store.getters.items;
      }
    },
    store: new Vuex.Store({
      state: {
        loaded: false,
        items: undefined,
      },
      getters: {
        items: (state): Type | undefined => state.items,
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
}

export interface Item {
  id: string,
  text: string,
}
export let ListStore = Store<Array<Item>>();

export let DataStore = Store<{}>();
