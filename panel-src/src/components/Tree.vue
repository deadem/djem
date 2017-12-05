<template>
  <v-list dense>
    <tree-row v-for="(item, i) in items" :item="item" :key="item.id" @changerow="changerow"></tree-row>
  </v-list>
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
