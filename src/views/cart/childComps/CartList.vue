<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" 
      :key="index" :item-info="item"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import CartListItem from './CartListItem.vue';

  export default {
    name: 'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components:{
      CartListItem
    },
  }
</script>

<style scoped>
  /* .content{
    height: calc(100vh -- 44px);
  } */
  .cart-list{
    height: 100%;
  }
</style>