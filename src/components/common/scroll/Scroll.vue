<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  
  export default {
    name: 'Scroll',
    props:{
      probeType:{
        type:Number,
        default:0,
      },
      pullUpLoad:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      // 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          // console.log(position);
          this.$emit('scroll',position)
        })
      };
      // 3.监听滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('滚动到底部');
          this.$emit('pullingUp');
        })
      }

    },
    methods: {
      scrollTO(x,y,time=500){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      refresh(){
        console.log('-----');
        this.scroll && this.scroll.refresh();
      }
    },
  }
</script>

<style scoped>

</style>