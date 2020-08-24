<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">、</div>
    </nav-bar>

    <tab-control 
        class="tab-control" 
        :ctitles="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>

    <!-- BScroll组件 -->
    <scroll class="content" ref="scroll" 
      :probe-type='3' :pull-up-load= 'true'
      @scroll="contentScroll" @pullingUp="loaMore">
      <!-- 轮播图 -->
      <home-swiper :cbanners = 'banners' @swiperImageLoad="swiperImageLoad"/>
      <!-- 详情页 -->
      <home-recommend :cproducts='recommends'/>
      <!-- 本周流行 -->
      <home-feature-view/>
      <!-- tabControl控件 -->
      <tab-control 
        class="tab-control" 
        :ctitles="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl2" v-show="!isTabFixed"/>
      <!-- 商品列表数据 -->
      <goods-list :goods="showGoods"/>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
    // 子组件
    import HomeSwiper from './childComps/HomeSwiper.vue';
    import HomeRecommend from './childComps/HomeRecommend.vue';
    import HomeFeatureView from './childComps/HomeFeatureView.vue';

    // 公共组件
    import NavBar from 'components/common/navbar/NavBar';
    import TabControl from 'components/content/tabControl/TabControl.vue';
    import GoodsList from 'components/content/goods/GoodsList.vue';
    import GoodsListItem from 'components/content/goods/GoodsListItem.vue';
    import Scroll from 'components/common/scroll/Scroll.vue';
    import BackTop from 'components/content/backTop/BackTop.vue';

    // 网络请求相关组件
    import {getHomeMultidata,getHomeGoods} from "network/home";
    // 防抖函数
    import {debounce} from 'common/utils';


    export default {
      name: "Home",
      components:{
        NavBar,
        HomeSwiper,
        HomeRecommend,
        HomeFeatureView,
        TabControl,
        GoodsList,
        GoodsListItem,
        Scroll,
        BackTop
      },
      data() {
        return {
          banners: [],
          recommends:[],
          // products: [],
          // 请求流行、精选、新款数据的存放位置
          goods:{
            pop:{page:0, list:[]},
            new:{page:0, list:[]},
            sell:{page:0, list:[]}
          },
          currentType:'pop',
          isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
        }
      },
      computed: {
        showGoods() {
          return this.goods[this.currentType].list
        }
      },
      created() {
        // 请求轮播图和详情页数据
        this.getHomeData();
        // 请求流行、精选、新款数据
        this.getHomeGoodsData('pop');
        this.getHomeGoodsData('new');
        this.getHomeGoodsData('sell');

      },
      methods:{
        // 事件监听代码
        tabClick(index){
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break;
            case 1:
              this.currentType = 'new'
              break;
            case 2:
              this.currentType = 'sell'
              break;
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        // 回到顶部事件
        backClick(){
          this.$refs.scroll.scrollTO(0,0);
        },
        // 显示红色箭头事件
        contentScroll(position){
          // 1.判断backTop是否显示
          this.isShowBackTop =-(position.y)> 300;
          // 2.决定tabControl是否吸顶(position :fixed)
          this.isTabFixed = -(position.y) > this.tabOffsetTop;
        },
        
        // 上拉加载更多事件
        loaMore(){
          // console.log('上拉加载更多');
          this.getHomeGoodsData(this.currentType);
        },
        // 
        swiperImageLoad(){
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },

        // 网络请求代码
        // 轮播图和详情页数据的获取
        getHomeData() {
          getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.products = res.data.recommend.list;
          })
        },
        // 流行,新款,精选数据的获取
        getHomeGoodsData(type) {
          const page = this.goods[type].page +1;
          getHomeGoods(type, page).then(res => {
            // console.log(res);
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            // 完成上拉加载更多
            this.$refs.scroll.finishPullUp();
          })
        },
      },
      mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,500);
        // 监听item图片加载完成
        this.$bus.$on('homeItemImageLoad',()=>{
          refresh();
        })
        
      },
      activated() {
        // this.$refs.scroll.refresh();
        
      },
    }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;
  }

  .home-tab-control{
    /*两个要混合使用*/
    /* position: sticky;
    top: 43px;  顶部navbar的高度
    z-index: 9; */
  }

  .home-scroller{
    /*height:300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  .content{
    height: calc(100vh - 93px );
    overflow: hidden;
    position: relative;
    top: 0px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }
  
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
</style>
