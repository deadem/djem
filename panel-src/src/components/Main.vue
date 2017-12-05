<template>
  <div class="main">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">DJEM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
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
