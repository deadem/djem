<template>
  <div class="main">
    <tree-component></tree-component>
  </div>
</template>

<script lang="ts">
import TreeComponent from './Tree.vue';

export default {
  data: () => ({
    drawer: true,
  }),
  props: [
    'source',
  ],
  components: {
    TreeComponent,
  }
}
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
  }
</style>
