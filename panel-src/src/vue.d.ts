import VueObj from "vue";
import VuexObj from "vuex";
import VuetifyObj from "vuetify";

declare global {
  var Vue: typeof VueObj;
  var Vuex: typeof VuexObj;
  var Vuetify: typeof VuetifyObj;
}
