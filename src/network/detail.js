import {request} from 'network/request';

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: { iid }
  }).catch(err => err);
}

// 获取推荐信息
export function getRecommend(){
  return request({
    url:'/recommend'
  }).catch(err => err);
}

// ES6的类,详情数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
    this.discountBgColor = itemInfo.discountBgColor;
  }
}

// 获取商家图片好评数据
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.fans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodCount = shopInfo.cGoods;
  }
}

// 获取商品尺码等数据
export class GoodsParams {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

