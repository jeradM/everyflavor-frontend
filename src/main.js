import Vue from "vue";
import App from "./App.vue";
import Fragment from "vue-fragment";
import router from "./router";
import store from "./store";
import "./assets/styles/tailwind.css";
import "./assets/styles/application.css";
import "./assets/styles/animations.css";

Vue.config.productionTip = false;

Vue.use(Fragment.Plugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
