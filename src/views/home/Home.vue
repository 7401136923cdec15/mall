<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <my-swiper :swiperList="swiperList"></my-swiper>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {getHomeMultidata} from "network/home";

import MySwiper from "components/common/swiper/MySwiper";

export default {
  name: "Home",
  components: {
    NavBar,
    MySwiper
  },
  data() {
    return {
      banners: [],
      recommends: [],
      swiperList: [
        {image: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576'},
        {image: 'https://img1.baidu.com/it/u=1458145492,2870391772&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675'},
        {image: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500'},
        {image: 'https://img0.baidu.com/it/u=2797085065,1109102906&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'}
      ]
    }
  },
  created() {
    //1.请求多个数据
    // getHomeMultidata().then(res => {
    //   this.banners = res.data.banner.list;
    //   this.recommends = res.data.recommend.list;
    // })
    //2.
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
