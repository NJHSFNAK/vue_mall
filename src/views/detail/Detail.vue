<template>
  <div id='product-detail'>
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="scroll-height" ref="scroll" 
      :probe-type='2' @scroll= "contetScroll">
      <detail-swiper :topImages="topImages" ref="baseRef" class="detail-set-scroll"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" class="detail-set-scroll" ref="paramRef" />
      <detail-comment-info :commentInfo="commentInfo" class="detail-set-scroll" ref="commentRef"/>
      <goods-list :goods="recommends" ref="recommendRef"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue';
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
  import DetailShopInfo from './childComps/DetailShopInfo.vue';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue';
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue';
  import BackTop from 'components/content/backTop/BackTop.vue';
  // BScroll滚动
  import Scroll from 'components/common/scroll/Scroll.vue';

  // 推荐数据
  import GoodsList from 'components/content/goods/GoodsList.vue';

  // 网络请求
  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail';

  // 防抖函数
  import {debounce} from 'common/utils.js';

  // 消息弹窗
  import Toast from 'components/common/toast/Toast.vue';

  export default {
    name: 'Detail',
    data () {
      return {
        iid: null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        isShowBackTop: false,
        
        // 推荐数据
        recommends:[],

        themeTopYs:[],
        getThemeTopY:null,
        currrentIndex:0,

        message:'',
        show: false
      }
    },
    components:{
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      BackTop,
      Toast,

      // 推荐数据
      GoodsList,
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;
      // 2.根据iid请求详情页的数据
      getDetail(this.iid).then((res)=>{
        // console.log(res);
        const data = res.result;
        // 1.获取顶部轮播图的图片
        this.topImages = data.itemInfo.topImages;
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // 5.获取参数信息 
        this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule);
        // 6.商品评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
        // 7.对获取参数、评论、推荐的offsetTop进行防抖操作
        this.getThemeTopY = debounce(()=>{
          this.themeTopYs = [];
          this.themeTopYs.push(this.$refs.baseRef.$el.offsetTop);
          this.themeTopYs.push(this.$refs.paramRef.$el.offsetTop);
          this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop);
          // console.log(this.themeTopYs);
        },100);
      }),

      // 请求推荐数据
      getRecommend().then((res)=>{
        this.recommends = res.data.list;
      })
    },
    mounted() {
      let newRefresh = debounce(this.$refs.scroll.refresh,100)

      this.$bus.$on('detailItemImageLoad',()=>{
        newRefresh();
      })

    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh();

        this.getThemeTopY();
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTO(0,-this.themeTopYs[index]+298,100);
      },
      // 滚动获取nav的值
      contetScroll(position){
        // 1.获取Y值
        const positionY = -position.y;
        // console.log(positionY);
        // positionY和主题的Y值想对比
        let length = this.themeTopYs.length;
        for(let i=0; i < length; i++){
          if(this.currrentIndex !==i &&((i < length -1) && positionY >= this
            .themeTopYs[i] && positionY < this.themeTopYs[i+1])|| (i === length -1 && positionY >=this.themeTopYs[i])){
              this.currrentIndex = i;
              // console.log(this.currrentIndex);
              this.$refs.detailNavBar.currentIndex = this.currrentIndex;
          }
        }
        // 控制isShowBackTop的true or false
        this.isShowBackTop =-(position.y)> 300;
      },
      backClick(){
        this.$refs.scroll.scrollTO(0,0);
      },
      // 添加购物车
      addToCart(){
        // console.log('addToCart');
        // 1.获取购物车需要展示信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        product.count = 0;
        product.checked = this.goods.checked;

        // console.log(product);
        // 2.商品添加到购物车(使用VUEx)
        // this.$store.state.cartList.push(product);
        this.$store.dispatch('addCart',product).then((res)=>{
          // console.log(res);
          this.show = true;
          this.message = res;
          setTimeout (()=>{
            this.show = false;
            this.message = "";
          },3000)
          // this.$mytoast.show(res,2000);
        })

        // 3.添加到购物车成功

      }
    }
  }
</script>

<style scoped>
  /* BScroll固定高度和区域 */
  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
  }

  /* vue的淡入淡出动画 */
  .scroll-enter-active,
  .scroll-leave-active {
    transition: all 0.3s;
  }

  .scroll-enter,
  .scroll-leave-to {
    opacity: 0;
  }

  .scroll-enter-to,
  .scroll-leave {
    opacity: 1;
  }
</style>