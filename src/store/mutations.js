export default {
  addCounter(state,payload){
    payload.count++;
  },
  addToCart(state,payload){
    payload.checked= true
    state.cartList.push(payload);
  },
  setLoading(state, bol) {
    state.isLoading = bol;
  },
}