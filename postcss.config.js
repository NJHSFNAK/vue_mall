module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,   //保留5位小数
      viewportUnit:'vw',
      selectorBlackList:['ignore','.tab-bar','.tab-bar-item'], //指定不需要转换的类(class)
      minPixelValue: 1,   //最小的转换单位
      mediaQuery: false,
    }
  }
}
