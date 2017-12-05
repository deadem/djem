<template>
  <div class="djem-input" :class="{ 'djem-input--focused': focused, 'djem-input--filled': this.value }">
    <label class="djem-input__label">Login</label>
    <input :type="type" :value="value" @input="$emit('input', $event.target.value)" @focus="focused=true" @blur="focused=false">
    <div class="djem-input__line"></div>
  </div>
</template>

<script lang="ts">
export default Vue.extend({
  name: 'djem-input',
  props: [ 'type', 'value' ],
  data() {
    return {
      focused: false,
    };
  },
})
</script>
