Vue.use(Vuetify);
Vue.use(Vuex);

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
let parent = loader.parentNode;
parent && parent.removeChild(loader);

import MainComponent from './components/Main.vue';
import LoginComponent from './components/Login.vue';

new Vue({
  el: '#app',
  components: {
    MainComponent,
    LoginComponent,
  }
});
