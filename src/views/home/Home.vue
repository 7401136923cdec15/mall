<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"
                 v-show="isTabFixed" ref="tabControl1"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingup="loadMore">
      <my-swiper :swiperList="swiperList" @swiperLoad="swiperLoad"></my-swiper>
      <recommend-view :recommends="recommends" @recommendLoad="recommendLoad"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import MySwiper from "components/common/swiper/MySwiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata} from "network/home";
import {getHomeGoods} from "network/home";

import Scroll from "components/common/scroll/Scroll";

import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    RecommendView,
    FeatureView,
    NavBar,
    MySwiper,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [
        {
          link: '',
          image: 'https://img0.baidu.com/it/u=4218386432,3353292771&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=750',
          title: '十点抢券'
        },
        {
          link: '',
          image: 'https://img2.baidu.com/it/u=2017984118,3137979857&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
          title: '好物特卖'
        },
        {
          link: '',
          image: 'https://img2.baidu.com/it/u=3526493359,469690168&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
          title: '内购福利'
        },
        {
          link: '',
          image: 'https://img0.baidu.com/it/u=3784738455,2043719400&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
          title: '初秋上新'
        },
      ],
      swiperList: [
        {image: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576'},
        {image: 'https://img1.baidu.com/it/u=1458145492,2870391772&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675'},
        {image: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500'},
        {image: 'https://img0.baidu.com/it/u=2797085065,1109102906&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'}
      ],
      goods: {
        'pop': {
          page: 0,
          list: [{
            img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
            title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
            price: '59.00',
            cfav: '49'
          },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            }, {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            }]
        },
        'new': {
          page: 0, list: [{
            img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
            title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
            price: '59.00',
            cfav: '49'
          },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            },
            {
              img: 'https://img0.baidu.com/it/u=1403567536,3787510938&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            }]
        },
        'cell': {
          page: 0, list: [{
            img: 'https://img0.baidu.com/it/u=2797085065,1109102906&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
            title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
            price: '59.00',
            cfav: '49'
          },
            {
              img: 'https://img0.baidu.com/it/u=2797085065,1109102906&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
              title: '2018秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭秋季新款韩版百搭',
              price: '68.00',
              cfav: '73'
            }]
        }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  mounted() {
    //1.图片加载完成事件监听

    const refresh = debounce(this.$refs.scroll.refresh, 200);

    this.$bus.$on('itemImageLoad', () => {
      refresh();
    })

    //2.获取tabcontrol的offsettop属性
    //所有的组件都有一个属性$el:用于获取元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
  created() {
    //1.请求多个数据
    // getHomeMultidata().then(res => {
    //   this.banners = res.data.banner.list;
    //   this.recommends = res.data.recommend.list;
    // })
    //2.请求商品数据
    // this.getMyHomeGoods('pop');
    // this.getMyHomeGoods('new');
    // this.getMyHomeGoods('sell');
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'cell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      // this.getMyHomeGoods(this.currentType);
    },
    swiperLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    recommendLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /**
     * 网络请求相关方法
     */
    getMyHomeGoods(type) {
      const page = this.goods[type].page + 1;
      const res = getHomeGoods(type, page);
      this.goods[type].list.push(...res);
      this.goods[type].page += 1;

      this.$refs.scroll.finishPullUp();
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在浏览器使用原生滚动时，使用*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.tab-control {
  position: sticky;
  top: 44px;

  z-index: 9;
}

/*.content {*/
/*  height: 100%;*/
/*  overflow: hidden;*/
/*}*/

.content {
  /*height: 300px;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  overflow: hidden;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
</style>
