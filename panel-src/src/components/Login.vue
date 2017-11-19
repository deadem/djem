<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <v-card-text>Please, enter your credentials</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" flat @click.native="dialog = false">Login</v-btn>
        <!-- <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  data: () => ({
    dialog: true
  })
}
</script>
