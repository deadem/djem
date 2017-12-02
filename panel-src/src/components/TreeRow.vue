<template>
  <ul>
    <li v-for="item in tree">
      {{ item.text }}
      <tree-row v-if="item.leaf == false" :tree="item.items"></tree-row>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'tree-row',
  props: [
    'tree'
  ],
}
</script>

<style lang="scss" scoped>
  ul {
    padding-left: 16px;
  }
</style>
