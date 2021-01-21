/*
 * @Author: zhangweijuan
 * @Date: 2020-11-10 17:00:24
 * @LastEditTime: 2021-01-21 17:46:39
 * @LastEditors: Please set LastEditors
 * @Description: 购物车
 * @FilePath: \wei-go\pages\cart\index.js
 */
/**
 * 1、获取用户的收货地址
 *    1 绑定点击事件
 *    2 调用小程序内置api， 获取用户的收货地址
 */
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx.js';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({
    data: {
      address: {},
      cart: [],
      allChecked: false,
      totalPrice: 0,
      totalNum: 0
    },
    onShow() {
      // 1、获取缓存中收货地址信息
      const address = wx.getStorageSync('address');
      const cart = wx.getStorageSync('cart') || [];
      // every 数组方法 会遍历 会接收一个回调函数 那么每一个回调函数都返回true， 那么every方法的返回值为true
      // 只要有一个返回值为false，则停止循环执行，直接返回false
      // 空数组 调用every  返回值就是true
      // const allChecked = cart.length > 0 ? cart.every(v=>v.checked) : false;
      let totalPrice = 0;
      let totalNum = 0;
      let allChecked = true;
      cart.forEach(v => {
        if(v.checked) {
          totalPrice +=v.goods_price;
          totalNum+=v.num
        } else {
          allChecked = false;
        }
      });
      allChecked = cart.length!=0 ? allChecked:false;
      this.setData({address, cart, allChecked, totalPrice, totalNum});
    },
    async handleAddAddress() {
      try {
      // 1、获取权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      if(scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;

      // 将地址存入缓存中
    } catch (error) {
      console.log(error);
    }
  }
})