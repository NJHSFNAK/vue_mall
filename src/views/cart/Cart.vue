<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  // 导航组件
  import NavBar from 'components/common/navbar/NavBar.vue';
  import CartList from './childComps/CartList.vue';
  import Scroll from 'components/common/scroll/Scroll.vue';
  import CartBottomBar from './childComps/CartBottomBar.vue';


  // store中的getters函数改成计算属性
  import {mapGetters} from 'vuex';

  export default {
    name: 'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar,
      Scroll,
    },
    computed: {
      ...mapGetters(['cartLength'])
    },
    activated() {
      this.$refs.scroll.refresh();
    },
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  /* 导航 */
  .nav-bar{
    background-color: var(--color-tint);
    color: blanchedalmond;
    font-weight: 700;
  }
  .content{
    height: calc(100vh - 44px - 40px);
    overflow: hidden;
  }
</style>