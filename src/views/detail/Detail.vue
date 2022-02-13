<template>
  <div id="detail">
    <detail-nav-bar ref="navBar" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-shop-info/>
      <detail-pararms ref="pararms"/>
      <detail-comments ref="comments"/>
      <detail-recommend ref="recommend"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailPararms from "./childComps/DetailPararms";
import DetailComments from "./childComps/DetailComments";
import DetailRecommend from "./childComps/DetailRecommend";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailPararms,
    DetailComments,
    DetailRecommend,
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
      shop: {},
      paramTop: 0,
      commentTop: 0,
      recommentTop: 0
    }
  },
  created() {
    this.iid = this.$route.params.id;
  },
  mounted() {
    this.paramTop = this.$refs.pararms.$el.offsetTop;
    this.commentTop = this.$refs.comments.$el.offsetTop;
    this.recommentTop = this.$refs.recommend.$el.offsetTop;
  },
  methods: {
    contentScroll(position) {
      const Y = -position.y - 210;

      if (Y < this.paramTop) {
        this.$refs.navBar.currentIndex = 0;
      } else if (Y >= this.paramTop && Y < this.commentTop) {
        this.$refs.navBar.currentIndex = 1;
      } else if (Y >= this.commentTop && Y < this.recommentTop) {
        this.$refs.navBar.currentIndex = 2;
      } else {
        this.$refs.navBar.currentIndex = 3;
      }
    },
    titleClick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0, 300);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -(this.paramTop + 210), 300);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -(this.commentTop + 210), 300);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -(this.recommentTop + 210), 300);
          break;
      }
    }
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
