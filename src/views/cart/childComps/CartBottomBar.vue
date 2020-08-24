<template>
  <div class="bottom-bar">
    <div class="check-content content-flex">
      <check-button class="check-button" :is-checked= "isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:￥{{totalPrice}}
    </div>
    <div class="caclulate" @click="calcClick">
      <span>去计算：</span>{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue';

  export default {
    name: 'CartButtonBar',
    components: {
      CheckButton
    },
    computed: {
      // 计算总价
      totalPrice(){
        return this.$store.state.cartList.filter(item => {
           return item.checked
        }).reduce((prevalue,item)=>{
          return prevalue + item.price * item.count;
        },0).toFixed(2);
      },
      // 全选的数量
      checkLength(){
        return this.$store.state.cartList.filter(item =>item.checked).length;
      },
      // 全选按钮的实现
      isSelectAll(){
        if(this.$store.state.cartList.length !== 0){
          return  !(this.$store.state.cartList.filter(item => !item.checked).length);
        }else{
          return false;
        }
      },
    },
    methods: {
      calcClick(){
        if(!this.isSelectAll){
          // this.$toast.show("请选择购买的商品",800)
        }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;

    bottom: 40px;
    display: flex;
  }

  .check-content{
    flex: 1;
  }

  .check-content span{
    position: absolute;
    top: 0;
    left: 30px;
    margin-top: 5px;
  }
  
  .total-price{
    width: 120px;
    font-size: 16px;
    margin-right: 3px;
    margin-top: 8px;
  }

  .caclulate{
    font-size: 20px;
    width: 100px;
    /* margin-top: 8px; */
    background-color: red;
    color: white;
  }


</style>