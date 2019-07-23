import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';//axios
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; //vue-loading-overlay
import 'vue-loading-overlay/dist/vue-loading.css';
import currencyFilter from "./filters/currency"//filters
import pagination from "./components/Dashboard/Pagination";//Pagination
import 'bootstrap';//bootstrap
import './bus';//event bus
import VeeValidate, { Validator } from 'vee-validate';//VeeValidate
import zh_TW from "vee-validate/dist/locale/zh_TW";
Vue.config.productionTip = false;

//VueAxios
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

//VeeValidate
Vue.use(VeeValidate)
Validator.localize('zh_TW', zh_TW);

const dictionary = {
  zh_TW: {
    messages: {
      required: field => `請輸入 ${field}`,
      email: 'Email 格式不正確',
      date_format:'到期日格式必須是-月份/年分，如:07/19'
    },
  },
};

Validator.localize(dictionary);

//golbal component
Vue.component('loading', Loading)
Vue.component('pagination', pagination)

//filter money
Vue.filter('currencyFilter', currencyFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success === true) {
        next();
      } else {
        next('/login')
      }
    });
  } else {
    next();
  }

})