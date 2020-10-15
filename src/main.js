import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./registerServiceWorker";
import "./assets/default.css";
import "./assets/default.js";
import VueMask from "v-mask";

require("./assets/sass/main.scss");

Vue.config.productionTip = false;

Vue.use(VueMask);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
