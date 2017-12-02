<template>
  <ul>
    <li class="recursive-item" v-for="item in tree">
        {{ item.text }}

        <div v-if="item.leaf">on</div>
        <div v-else>off</div>

        <ul v-if="item.leaf == false">
            <recursive-item :tree="item.items"></recursive-item>
        </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Store from '../store/Tree';

let tree = new Store();
tree.load();

export default {
  computed: {
    tree: () => tree.store.getters.items,
  }
}
</script>

