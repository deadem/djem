<template>
  <v-data-table :tree="tree" :headers="columns" :items="items" hide-actions class="elevation-1">

    <template slot="items" slot-scope="props" v-for="column in columns">
      <td>{{ props.item[column.dataIndex] }}</td>
    </template>

  </v-data-table>
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
