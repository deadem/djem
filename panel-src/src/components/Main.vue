<template>
  <div class="main">
    <tree-component @changerow="treechange"></tree-component>
    <grid-component :tree="tree"></grid-component>
  </div>
</template>

<script lang="ts">
import TreeComponent from './Tree.vue';
import GridComponent from './Grid.vue';

export default Vue.extend({
  data: () => ({
    drawer: true,
    tree: '',
  }),
  props: [
    'source',
  ],
  methods: {
    treechange(id: string) {
      this.tree = id;
    }
  },
  components: {
    TreeComponent,
    GridComponent,
  }
})
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
    display: flex;
  }
</style>
