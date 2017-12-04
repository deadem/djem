<template>
  <div class="main">
    <tree-component></tree-component>
    <grid-component></grid-component>
  </div>
</template>

<script lang="ts">
import TreeComponent from './Tree.vue';
import GridComponent from './Grid.vue';

export default {
  data: () => ({
    drawer: true,
  }),
  props: [
    'source',
  ],
  components: {
    TreeComponent,
    GridComponent,
  }
}
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
    display: flex;
  }
</style>
