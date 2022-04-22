import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./filters/filters";
import "./libraries/fontawesome";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./axios/axios";
import globalComponents from "@/components/Global/globalComponents.js";
import i18n from "./i18n";
globalComponents.forEach((component) => {
  Vue.component(component.name, component);
});

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import rate from "vue-rate";
import "vue-rate/dist/vue-rate.css";
Vue.use(rate);

import CKEditor from "@ckeditor/ckeditor5-vue2";
Vue.use(CKEditor);

import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
