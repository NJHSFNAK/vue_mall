<template>
  <div>
    <swiper class="home-swiper">
      <swiper-item v-for="(item,index) in cbanners" :key="item.acm">
        <a :href="item.url">
          <img v-lazy="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper';

    export default {
      name: "HomeSwiper",
      props: {
        cbanners:{
          type:Array,
          default() {
            return []
          }
        }
      },
      data() {
        return {
          isLoad: false
        }
      },
      components:{
        Swiper,
        SwiperItem
      },
      methods: {
        imageLoad(){
          if(!this.isLoad){
            this.$emit('swiperImageLoad');
            this.isLoad = true
          }
        }
      },
    }
</script>

<style scoped>
  .home-swiper{
    height: 180px;
  }

</style>
