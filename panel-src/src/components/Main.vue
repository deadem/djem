<template>
  <v-app>
    <v-tabs dark class="main--height">
      <v-layout column class="main--height">

        <v-toolbar
          color="blue darken-3"
          dark
          app
          clipped-left

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
            <v-tabs-item :key="1" :href="'#home'">
              <v-icon>home</v-icon>
            </v-tabs-item>

            <v-tabs-item :href="'#tab-2'">
              Item 1
            </v-tabs-item>
          </v-tabs-bar>
        </v-toolbar>

        <v-tabs-items class="layout">
          <v-tabs-content id="home" class="flex">
            <v-layout fill-height="true">
              <v-navigation-drawer  clipped app>
                <tree-component @changerow="treechange"></tree-component>
              </v-navigation-drawer>

              <v-flex main__content>
                <v-layout justify-start align-start>
                 <grid-component :tree="tree"></grid-component>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-tabs-content>
        </v-tabs-items>
      </v-layout>
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

<style lang="scss">
 body {
  .main__content {
    overflow: auto;
  }
   .main--height {
    height: 100%;
  }
}
</style>
