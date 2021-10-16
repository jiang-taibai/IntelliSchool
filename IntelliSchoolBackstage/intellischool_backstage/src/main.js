import Vue from 'vue'
import App from './App'
import router from './router'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(ViewUI)
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
