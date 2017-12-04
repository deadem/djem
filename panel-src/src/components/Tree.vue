<template>
  <div class="tree">
    <tree-row :tree="items"></tree-row>
  </div>
</template>

<script lang="ts">
import { ListStore } from '../store/Store';
import TreeRow from './TreeRow.vue';

export default Vue.component('tree', {
  mixins: [ ListStore('tree') ],
  components: {
    TreeRow
  }
});
</script>

<style scoped>
  .tree {
    width: 200px;
  }
</style>
