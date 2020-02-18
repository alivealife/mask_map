<template>
  <div>
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <v-marker-cluster>
        <l-marker
          v-for="item in storeList"
          :key="item.properties.id"
          :lat-lng="[item.geometry.coordinates[1], item.geometry.coordinates[0]]"
        >
          <l-popup>
            <p class="name-size">{{ item.properties.name }}</p>
            <p class="info-color context-size">
              <i :style="{backgroundImage: 'url(' + bg_address + ')' }" class="icon_set"></i>
              {{item.properties.address}}
            </p>
            <p class="info-color context-size">
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
          </l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import {
  LMap, LTileLayer, LMarker, LPopup,
} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import BG_A from '../assets/images/pin.svg';
import BG_P from '../assets/images/phone.svg';

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      bg_address: BG_A,
      bg_phone: BG_P,
    };
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
    center() {
      return this.$store.state.center;
    },
    zoom() {
      return this.$store.state.zoom;
    },
  },
};
</script>
