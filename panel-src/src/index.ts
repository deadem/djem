Vue.use(Vuetify);
Vue.use(Vuex);

let loader: HTMLElement = document.getElementById('container-loader') as HTMLElement;
loader.remove();

import MainComponent from './components/Main.vue';
import LoginComponent from './components/Login.vue';

new Vue({
  el: '#app',
  components: {
    MainComponent,
    LoginComponent,
  }
});

import { Proxy } from './store/Proxy';

setTimeout(() => {
  new Proxy().instance().post('tree').then((data) => {
    console.log(data);
  });
}, 100);
