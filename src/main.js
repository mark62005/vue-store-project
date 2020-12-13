import Vue from 'vue';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// bootstrap
import 'bootstrap';

// vee-validate
import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

// loading overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';

// event bus
import './bus';

// filters
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// components
Vue.component('Loading', Loading);

// filters
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  async created() {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`;
    this.axios.get(api)
      .then(() => console.log('GET DATA SUCCESS'))
      .catch(() => console.log('ERROR!!!!'));
  },
  render: (h) => h(App),
}).$mount('#app');

// router meta authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(api)
      .then(() => {
        // console.log(res.data);
        next();
      })
      .catch((res) => {
        this.$bus.$emit('message:push', res.data.message, 'danger');
        next({ path: '/login' });
      });
  } else next();
});
