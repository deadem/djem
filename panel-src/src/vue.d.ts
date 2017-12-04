import VueObj from "vue";
import VuexObj from "vuex";

declare global {
  var Vue: typeof VueObj;
  var Vuex: typeof VuexObj;
}
