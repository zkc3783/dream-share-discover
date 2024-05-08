<template>
<div>
    <div id="container" style="width: 100%; height: 400px;"></div>
</div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "MapContainer",
  data() {
    return {
      coordinates: '',
    };
  },
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: "dee3c0417ff3d1ff2bf5b86a593305ff",
    };
    AMapLoader.load({
      key: "85d06742d61b2d07c067c61b1980a11a",
      version: "2.0",
      plugins: ["AMap.Scale", "AMap.CitySearch"]  // Added CitySearch plugin here
    }).then((AMap) => {
      AMap.plugin('AMap.CitySearch', () => {
        const citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          let center = [116.397428, 39.90923]; // Default to Beijing Tiananmen
          if (status === 'complete' && result.info === 'OK' && result.city) {
            center = result.center; // Update center to current city location
          }
          const map = new AMap.Map("container", {
            viewMode: "3D",
            zoom: 11,
            center: center,
          });
          
          map.on('click', this.handleMapClick);
        });
      });
    }).catch((e) => {
      console.error(e);
    });
  },
  methods: {
    handleMapClick(e) {
      this.coordinates = e.lnglat.getLat() + ',' + e.lnglat.getLng();
      this.$emit('location-selected', this.coordinates); // Emit an event with the longitude and latitude
    }
  }
};
</script>

<style scoped>
#container {
}
</style>
