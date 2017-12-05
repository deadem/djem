<template>
  <v-app>

    <v-navigation-drawer fixed clipped app>
     <tree-component @changerow="treechange"></tree-component>
    </v-navigation-drawer>

    <v-toolbar
      color="blue darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title>DJEM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        light
        solo
        prepend-icon="search"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px"
      ></v-text-field>
    </v-toolbar>
    <v-content>
      <v-layout justify-start align-start>
        <grid-component :tree="tree"></grid-component>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import TreeComponent from './Tree.vue';
import GridComponent from './Grid.vue';

export default Vue.extend({
  data: () => ({
    tree: '',
  }),
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
