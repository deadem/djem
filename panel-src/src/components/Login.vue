<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>

      <v-card-text>
        <v-flex xs12>
          <v-text-field label="Login" v-model="login"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        </v-flex>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" flat @click="doLogin">Login</v-btn>
        <!-- <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Store } from '../store/Auth';
import { Auth } from '../store/Proxy';

let component = Vue.extend({
  data: () => ({
    login: Store.getters.login,
    password: Store.getters.password,
  }),
  computed: {
    show() {
      return !Store.getters.isAuthorized
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
