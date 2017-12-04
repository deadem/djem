<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">Login</div>

        <div class="modal-body">
          <input v-model="login" placeholder="login">
          <input v-model="password" type="password" placeholder="password">
        </div>

        <div class="modal-footer">
          <button class="modal-default-button" @click="doLogin">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Auth } from '../store/Proxy';

let component = Vue.extend({
  data: () => ({
    login: Auth.getLogin(),
    password: Auth.getPassword(),
  }),
  computed: {
    show() {
      return !Auth.isAuthorized()
    },
  },
  methods: {
    doLogin() {
      new Auth().login(this.login, this.password);
    }
  }
});

export default component;
</script>
