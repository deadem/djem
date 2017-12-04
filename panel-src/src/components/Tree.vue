<template>
  <div class="tree">
    <tree-row :tree="items" @changerow="changerow"></tree-row>
  </div>
</template>

<script lang="ts">
import { ListStore } from '../store/Store';
import TreeRow from './TreeRow.vue';

export default Vue.extend({
  mixins: [ ListStore('tree') ],
  components: {
    TreeRow
  },
  methods: {
    changerow(id: string) {
      this.$emit('changerow', id);
    }
  }
})
</script>

<style scoped>
  .tree {
    width: 200px;
  }
</style>
