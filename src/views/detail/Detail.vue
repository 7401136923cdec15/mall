<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-shop-info/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailShopInfo from "./childComps/DetailShopInfo";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [
        {
          image: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576'
        },
        {
          image: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500'
        },
        {
          image: 'https://img0.baidu.com/it/u=2797085065,1109102906&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
          image: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576'
        },
        {
          image: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500'
        },
        {
          image: 'https://img0.baidu.com/it/u=2797085065,1109102906&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        }
      ],
      shop: {}
    }
  },
  created() {
    this.iid = this.$route.params.id;
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  /*height: 300px;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  overflow: hidden;
}
</style>
