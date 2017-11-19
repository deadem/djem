import VueObj from "vue";
import VuetifyObj from "vuetify";

declare global {
  var Vue: typeof VueObj;
  var Vuetify: typeof VuetifyObj;
}
