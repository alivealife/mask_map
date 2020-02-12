<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <div class="row no-gutters">
      <div class="col-md-3 height-set">
        <MaskMap class="w-100" />
      </div>
      <div class="col-md-9 height-set">
        <MapView class="h-100 w-100"></MapView>
      </div>
    </div>
  </div>
</template>

<script>
import MaskMap from './components/MaskMap.vue';
import MapView from './components/MapView.vue';

export default {
  name: 'App',
  components: {
    MaskMap,
    MapView,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
