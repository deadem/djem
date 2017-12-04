<template>
  <div class="tree">
    <tree-row :tree="items" @changerow="changerow"></tree-row>
  </div>
</template>

<script lang="ts">
import { ListStore } from '../store/Store';
import TreeRow from './TreeRow.vue';

export default {
  mixins: [ ListStore('tree') ],
  components: {
    TreeRow
  },
  methods: {
    changerow: (id: string) => {
      debugger;
    }
  }
}
</script>

<style scoped>
  .tree {
    width: 200px;
  }
</style>
