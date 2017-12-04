<template>
  <div class="djem-input">
    <input :type="type" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script lang="ts">
export default Vue.extend({
  name: 'djem-input',
  props: [ 'type' ]
})
</script>
