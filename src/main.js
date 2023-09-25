import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  BootstrapVue,
  IconsPlugin,
  ModalPlugin,
  ToastPlugin,
} from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.use(BootstrapVue);
Vue.use(ModalPlugin);
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
