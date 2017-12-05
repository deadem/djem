<template>
  <v-list-group v-if="item.items" v-model="item.model" no-action>
    <v-list-tile slot="item" @click="update(item)">
      <v-list-tile-action>
        <v-icon>{{ item.model ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ item.text }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <tree-row v-for="(item, i) in item.items" :item="item" :key="item.id" @changerow="changerow"></tree-row>
  </v-list-group>

  <v-list-tile v-else @click="changerow(item.id)">
    <v-list-tile-action>
      <v-icon>{{ 'code' || item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ item.text }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
export default Vue.extend({
  name: 'tree-row',
  props: [ 'item' ],
  methods: {
    update(item: any): void {
      Vue.set(item, 'model', !item.model);
    },
    changerow(id: string) {
      this.$emit('changerow', id);
    }
  }
})
</script>
