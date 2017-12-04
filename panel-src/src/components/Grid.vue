<template>
  <div class="grid" :tree="tree">
    {{ tree }}
  </div>
</template>

<script lang="ts">
import { ListStore } from '../store/Store';

export default Vue.component('tree', {
  mixins: [ ListStore('grid') ],
  props: [
    'tree'
  ],
  components: {
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
