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
        plugins: ["AMap.Scale"]
      }).then((AMap) => {
        const map = new AMap.Map("container", {
          viewMode: "3D",
          zoom: 11,
          center: [116.397428, 39.90923],
        });
        
        // 为地图注册click事件获取鼠标点击出的经纬度坐标
        map.on('click', this.handleMapClick);
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
  