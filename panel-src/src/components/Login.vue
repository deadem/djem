<template>
  <v-dialog v-model="show" persistent max-width="450" transition="false">
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
      </v-card-actions>
    </v-card>
  </v-dialog>
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
