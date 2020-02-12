import Vue from 'vue';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 讀取套件
import Loading from 'vue-loading-overlay';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue';

// bootstrap
import 'bootstrap';

import store from './store';


Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
delete Icon.Default.prototype._getIconUrl; // eslint-disable-line
Icon.Default.mergeOptions({
  iconRetinaUrl: require('./assets/images/mark.svg'), // eslint-disable-line
  iconUrl: require('./assets/images/mark.svg'), // eslint-disable-line
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // eslint-disable-line
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
