<template>
  <div class="grid" :tree="tree">
    <table>
      <tr>
        <th v-for="column in columns">{{ column.text }}</th>
      </tr>
      <tr v-for="item in items">
        <td v-for="column in columns">
          {{ item[column.dataIndex] }}
        </td>
      </tr>
    </table>
    {{ tree }}
  </div>
</template>

<script lang="ts">
import { DataStore } from '../store/Store';

export default Vue.component('tree', {
  mixins: [ DataStore('grid') ],
  props: [
    'tree'
  ],
  components: {
  },
  computed: {
    columns(): Array<{}> {
      let items = this.$store.getters.items;
      return ((items || {}).metaData || {}).columns || [];
    },
    items(): Array<{}> {
      let items = this.$store.getters.items;
      return (items || {}).items;
    }
  },
  watch: {
    tree(id) {
      this.$store.dispatch('load', { tree: id });
    }
  }
});

</script>

<style scoped>
  .grid {
    flex-grow: 1;
  }

</style>
