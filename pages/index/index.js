/*
 * @Author: your name
 * @Date: 2020-11-11 09:12:34
 * @LastEditTime: 2020-11-18 16:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\pages\index\index.js
 */
// pages/pay/index.js
import { request } from '../../request/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],   // 轮播图数组
    cateList: [],     // 导航菜单
    floorList: [],    // 楼层数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1、发送异步请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     if(res.data.meta.status == 200) {
    //       this.setData({
    //         swiperList: res.data.message
    //       });
    //     }
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

    /** 获取导航菜单 */
  },
  
  /** 获取轮播图数组 */
  getSwiperList() {
    request({url: '/home/swiperdata'})
      .then((result) => {
        this.setData({
          swiperList: result
        });
      });
  },
  /** 获取导航菜单 */
  getCateList() {
    request({url: '/home/catitems'})
      .then((result) => {
        this.setData({
          cateList: result
        });
      });
  },

  /** 获取楼层数据 */
  getFloorList() {
    request({url: '/home/floordata'})
      .then((result) => {
        this.setData({
          floorList: result
        });
      })
  }

})