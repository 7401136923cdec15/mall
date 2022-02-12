<template>
  <div class="detail-swiper">
    <my-swiper :swiperList="topImages" class="myswiper"></my-swiper>
  </div>
</template>

<script>
import MySwiper from "components/common/swiper/MySwiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    MySwiper
  }
}
</script>

<style scoped>
.myswiper {
  /*height: 300px;*/
  /*background-color: red;*/
}
</style>
