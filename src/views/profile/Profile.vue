<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">蓝精灵</div>
    </nav-bar>
    <scroll class="scroll-height">
      <login/>
      <money/>
      <!-- 空行 -->
      <div class="line"></div>
      <profile-list/>
    </scroll>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue';
  import Scroll from 'components/common/scroll/Scroll.vue';

  import Login from './childComps/Login.vue';
  import Money from './childComps/Money.vue';
  import ProfileList from './childComps/ProfileList.vue';

  export default {
    name: 'Profile',
    components:{
      NavBar,
      Scroll,
      Login,
      Money,
      ProfileList
    }
  };
</script>

<style scoped>
  .profile {
  width: 100%;
  height: 100%;
  touch-action: none;
  }

  .nav-bar {
    font-weight: 600;
    color: white;
    /* height: 50px; */
    background-color: #ff8198;;
  }

  .line {
    width: 100%;
    height: 10px;
    background-color: #eeeeee;
  }

  .scroll-height {
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 0;
    overflow: hidden;
  }
</style>