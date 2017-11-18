<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">Authorization</div>

          <div class="modal-body">
            Login
            <input v-model="login" type="text" />

            Password
            <input v-model="password" type="password" />
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class LoginDecorator extends Vue {
}

</script>