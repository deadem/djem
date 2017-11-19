import Vue from 'vue';
import Vuetify from 'vuetify'

Vue.use(Vuetify);

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
loader.remove();

import MainComponent from './components/Main.vue';

new Vue({
  el: '#app',
  components: {
    MainComponent,
  }
});
