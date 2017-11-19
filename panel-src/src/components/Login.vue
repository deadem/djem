<template>
  <v-dialog v-model="dialog" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>

      <v-card-text>
        <v-flex xs12>
          <v-text-field label="Email"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Password" type="password"></v-text-field>
        </v-flex>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" flat @click="login">Login</v-btn>
        <!-- <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    dialog: true
  }),
  methods: {
    login() {
      this.dialog = false;
    }
  }
});

</script>
