<template>
  <v-app>

    <v-navigation-drawer fixed clipped app>
     <tree-component @changerow="treechange"></tree-component>
    </v-navigation-drawer>

    <v-tabs dark fixed>
      <v-toolbar
        color="blue darken-3"
        dark
        app
        clipped-left
        fixed
        dense
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


        <v-tabs-bar slot="extension">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tabs-item
          v-for="i in 3"
          :key="i"
          :href="'#tab-' + i"
        >
          Item {{ i }}
        </v-tabs-item>
        </v-tabs-bar>
      </v-toolbar>

          <v-tabs-items>
            <v-tabs-content id="tab-1">
      <v-content>
        <v-layout justify-start align-start>
              <grid-component :tree="tree"></grid-component>
        </v-layout>
      </v-content>
            </v-tabs-content>
          </v-tabs-items>

    </v-tabs>
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
