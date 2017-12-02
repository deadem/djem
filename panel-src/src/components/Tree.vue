<template>
  <tree-row :tree="tree"></tree-row>
</template>

<script lang="ts">
import { Proxy } from '../store/Proxy';
import TreeRow from './TreeRow.vue';

export default Vue.component('tree', {
  created() {
    this.$store.dispatch('load');
  },
  computed: {
    tree(): any {
      return this.$store.getters.items;
    }
  },
  store: new Vuex.Store({
    state: {
      loaded: false,
      items: [
        { text: '123' },
      ],
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
  }),
  components: {
    TreeRow
  }
});
</script>
