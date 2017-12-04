<template>
  <tree-row :tree="items"></tree-row>
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
