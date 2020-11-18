/*
 * @Author: your name
 * @Date: 2020-11-10 17:00:24
 * @LastEditTime: 2020-11-18 17:48:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\pages\goods_list\index.js
 */

import { request } from '../../request/index';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: '',    // 参数
    cid: '',      // 分类ID
    pagenum: 1,   // 页码
    pagesize: 10  // 页容量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options);
    this.QueryParams.cid = options.cid;
    this.handleGoodsList();
  },

  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i===index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },

  // 获取商品列表
  async handleGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    });
    this.setData({
      goodsList: res.goods
    });
    console.log('-res', res);
  }

})