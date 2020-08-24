export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      // 1.查找之前数组是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      // 2.判断oldProduct是否在payload里面
      if(oldProduct){ //数量+1
        context.commit('addCounter',oldProduct);
        resolve('当前的商品数量+1');
      }else{ //添加新商品
        payload.count = 1;
        context.commit('addToCart',payload);
        resolve('添加了新的商品');
      }
    })
  }
}