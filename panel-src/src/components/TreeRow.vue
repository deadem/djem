<template>
  <ul>
    <li v-for="item in tree">
      <a href="#" @click.prevent="changerow(item.id)">{{ item.text }}</a>
      <tree-row v-if="item.leaf == false" :tree="item.items" @changerow="changerow"></tree-row>
    </li>
  </ul>
</template>

<script lang="ts">
export default Vue.extend({
  name: 'tree-row',
  props: [ 'tree' ],

  methods: {
    changerow(id: string) {
      this.$emit('changerow', id);
    }
  }
})
</script>

<style lang="scss" scoped>
  ul {
    padding-left: 16px;
  }
</style>
