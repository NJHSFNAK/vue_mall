<template>
  <swiper class="swiper-item" >
    <swiper-item v-for="(item,index) in topImages">
      <img v-lazy="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: 'DetailSwipper',
    props:{
      topImages:{
        type: Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .swiper-item{
    height: 300px;
    overflow: hidden;
  }
</style>