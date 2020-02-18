import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    storeList: [],
    tempStore: {},
    filterData: [],
    showData: [],
    selectBarCounty: [],
    selectBarTown: [],
    currentCounty: '臺北市',
    currentTown: '松山區',
    center: [25.0482531, 121.5107414],
    zoom: 20,
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    STORELIST(state, payload) {
      state.storeList = payload;
    },
    SELECTBARCOUNTY(state, payload) {
      state.selectBarCounty = payload;
    },
    SELECTBARTOWN(state, payload) {
      state.selectBarTown = payload;
    },
    UPDATECOUNTY(state, payload) {
      state.currentCounty = payload;
    },
    UPDATETOWN(state, payload) {
      state.currentTown = payload;
    },
    FILTERDATA(state, payload) {
      state.filterData = payload;
    },
    SHOWDATA(state, payload) {
      state.showData = payload;
    },
    TEMPSTORE(state, payload) {
      state.tempStore = payload;
    },
    CENTER(state, payload) {
      state.center = payload;
    },
    ZOOM(state, payload) {
      state.zoom = payload;
    },
  },
  actions: {
    getStore(context) {
      context.commit('LOADING', true);
      const api = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
      axios.get(api).then((response) => {
        context.commit('STORELIST', response.data.features);
        context.dispatch('getList');
      });
    },
    // 取得不重複行政區資料
    getList(context) {
      context.commit('LOADING', true);
      const county = new Set(); // 陣列，但無法加入重複內容(使用 add 內容)
      context.state.storeList.forEach((item) => {
        if (item.properties.county !== '') {
          county.add(item.properties.county);
        }
      });
      context.commit('SELECTBARCOUNTY', Array.from(county));// 轉成一般陣列
    },
    filterCounty(context) {
      context.commit('FILTERDATA', context.state.storeList.filter((item) => item.properties.county === context.state.currentCounty));
      context.dispatch('setTownList');
      context.commit('SHOWDATA', context.state.storeList.filter((item) => item.properties.county === context.state.currentCounty && item.properties.town === context.state.currentTown));
    },
    setTownList(context) {
      const town = new Set();
      context.state.filterData.forEach((item) => {
        town.add(item.properties.town);
      });
      context.commit('SELECTBARTOWN', Array.from(town));
      if (!context.state.selectBarTown.includes(context.state.currentTown)) {
        context.commit('UPDATETOWN', context.state.selectBarTown[0]);
      }
      context.commit('LOADING', false);
    },
    getStoreLocation(context, payload) {
      context.commit('TEMPSTORE', payload);
      if (context.state.tempStore) {
        context.commit('CENTER', [context.state.tempStore.geometry.coordinates[1], context.state.tempStore.geometry.coordinates[0]]);
        context.commit('ZOOM', 20);
      }
    },
  },
});
