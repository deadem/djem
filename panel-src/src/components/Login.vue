<template>
  <div v-if="show" class="mask">
    <div class="wrapper">
      <div class="modal-container elevation-12">

        <djem-title>Login</djem-title>

        <div class="body">
          <djem-input v-model="login"></djem-input>
          <djem-input v-model="password" type="password"></djem-input>
          <!-- <input v-model="login" placeholder="login"> -->
          <!-- <input v-model="password" type="password" placeholder="password"> -->

          <button class="modal-default-button" @click="doLogin">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Auth } from '../store/Proxy';
import DjemTitle from '../widgets/Title.vue';
import DjemInput from '../widgets/Input.vue';

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
  },
  components: {
    DjemTitle,
    DjemInput,
  }
});

export default component;
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .25);
  display: table;
  // transition: opacity .3s ease;
}

.wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  // padding: 20px 30px;
  background-color: #fff;
  // border-radius: 2px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  // transition: all .3s ease;
  // font-family: Helvetica, Arial, sans-serif;
}

.body {
  margin: 0 20px;
}

.modal-default-button {
  // float: right;
}
</style>
