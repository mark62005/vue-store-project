import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  router,
  created() {
    const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`;
    this.axios.get(api)
      .then(() => console.log('GET DATA SUCCESS'))
      .catch(() => console.log('ERROR!!!!'));
  },
  render: (h) => h(App),
}).$mount('#app');
