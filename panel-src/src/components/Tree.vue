<template>
  <tree-row :tree="tree"></tree-row>
</template>

<script lang="ts">
import { ListStore } from '../store/Store';
import TreeRow from './TreeRow.vue';

export default Vue.component('tree', {
  computed: {
    tree(): any {
      return this.$store.getters.items;
    }
  },
  mixins: [ ListStore('tree') ],
  components: {
    TreeRow
  }
});
</script>
