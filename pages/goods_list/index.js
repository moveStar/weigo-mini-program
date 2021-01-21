/*
 * @Author: zhangweijuan
 * @Date: 2020-11-10 17:00:24
 * @LastEditTime: 2020-11-19 09:43:10
 * @LastEditors: Please set LastEditors
 * @Description: 商品列表
 * @FilePath: \wei-go\pages\goods_list\index.js
 */
/**
 * 1、用户上滑页面，触发触底事件方法
 *  1、找到触底事件方法
 *  2、判断是否存在下一页数据
 *    1获取总页数  （返回了总条数total）
 *      总页数=Math.ceil(总条数 / 页容量);
 *    2获取当前页码
 *    3判断当前页码是否大于等于总页数
 *    表示没有下一页数据
 *  3、假如没有下一页数据，弹出一个提示
 *  4、加入还有下一页数据，加载下一页数据 
 *      当前页码++
 *      重新发送请求
 *      返回的数据和旧数据进行拼接  而不是替换
 * 2、下拉刷新页面
 *  1 触发下拉刷新事件
 *  2 重置 数据  数组
 *  3 重置页码 设置为1
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
  totalPages: 1,  // 总页数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options);
    this.QueryParams.cid = options.cid;
    this.handleGoodsList();
  },

  // tab分栏
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

    // 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    });
    wx.stopPullDownRefresh();
  },

  // 监听用户下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新');
    this.QueryParams.pagenum = 1; 
    this.setData({
      goodsList: []
    });
    this.handleGoodsList();
  },

  // 监听用户上拉加载
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '人家也是有底线的'
      });
    } else {
      this.QueryParams.pagenum ++;
      this.handleGoodsList();
    }
  }
})