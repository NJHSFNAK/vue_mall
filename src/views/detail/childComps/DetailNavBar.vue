<template>
  <div id='DetailNavBar'>
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="left" class="back-img" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" @click="titleClick(index)"
            class="title-item" :class="{active: index === currentIndex}">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar.vue';

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index)
      },
      backClick(){
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title-item {
    font-size: 14px;
    flex: 1;
  }

  .active {
    color: #ff5777;
  }

  .back-img {
    text-align: center;
  }

  .back-img img {
    width: 22px;
    margin-top: 11px;
  }
</style>