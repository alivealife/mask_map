<template>
  <div>
    <section class="p-4 bg-select">
      <select class="custom-select custom-select mb-3" v-model="currentCounty">
        <option v-for="item in selectBarCounty" :key="item" :value="item">{{ item }}</option>
      </select>

      <select class="custom-select custom-select" v-model="currentTown">
        <option v-for="item in selectBarTown" :key="item" :value="item">{{ item }}</option>
      </select>
      <h3 class="context-size mt-3">
        有取得口罩數量的藥局有
        <span class="qty-set">{{ showData.length }}</span> 家
      </h3>
    </section>

    <section
      class="p-3 border pointer"
      v-for="item in showData"
      :key="item.properties.id"
      @click="getStoreLocation(item)"
    >
      <div class="container">
        <p class="name-size">{{ item.properties.name }}</p>
        <p class="info-color">
          <i :style="{backgroundImage: 'url(' + bg_address + ')' }" class="icon_set"></i>
          {{item.properties.address}}
        </p>
        <p class="info-color">
          <i :style="{backgroundImage: 'url(' + bg_phone + ')' }" class="icon_set"></i>
          {{item.properties.phone}}
        </p>
        <div class="qty-box text-center justify-content-center btn-size">
          <div
            class="box-width rounded-left text-set border-right border-white"
            :class="{ 'mask-yes' : item.properties.mask_adult >0}"
            v-if="item.properties.mask_adult >0"
          >成人：{{item.properties.mask_adult}}</div>
          <div class="box-width rounded-left text-set border-right border-white" v-else>
            成人： 已售完</div>
          <div
            class="box-width rounded-right text-set"
            :class="{ 'mask-yes' : item.properties.mask_child >0}"
            v-if="item.properties.mask_child >0"
          >兒童：{{item.properties.mask_child}}</div>
          <div class="box-width rounded-right text-set" v-else>兒童：已售完</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BG_A from '../assets/images/pin.svg';
import BG_P from '../assets/images/phone.svg';

export default {
  name: 'MaskMap',
  data() {
    return {
      bg_address: BG_A,
      bg_phone: BG_P,
    };
  },
  methods: {
    // 取得藥局清單
    getStoreList() {
      this.$store.dispatch('getStore');
    },
    getStoreLocation(item) {
      this.$store.dispatch('getStoreLocation', item);
    },
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
    selectBarCounty() {
      return this.$store.state.selectBarCounty;
    },
    selectBarTown() {
      return this.$store.state.selectBarTown;
    },
    currentCounty: {
      get() {
        return this.$store.state.currentCounty;
      },
      set(value) {
        this.$store.commit('UPDATECOUNTY', value);
      },
    },
    currentTown: {
      get() {
        return this.$store.state.currentTown;
      },
      set(value) {
        this.$store.commit('UPDATETOWN', value);
      },
    },
    showData() {
      this.$store.dispatch('filterCounty');
      return this.$store.state.showData;
    },
  },
  mounted() {
    this.getStoreList();
  },
};
</script>
