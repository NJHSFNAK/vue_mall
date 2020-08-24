import {request} from'./request';

// 请求轮播图数据
export function getHomeMultidata(){
  return request({
    url: '/home/multidata',
  });
}

// 请求流行、精选、新款数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}