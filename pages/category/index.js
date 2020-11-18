/*
 * @Author: your name
 * @Date: 2020-11-10 17:00:24
 * @LastEditTime: 2020-11-18 16:48:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\pages\category\index.js
 */
import { request } from '../../request/index';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],   // 左侧分类列表数据
    rightContent: [],   // 右侧商品的数据
    currentIndex: 0,    // 被点击的当前数据Index
    scrollTop: 0,       // scroll_view滚动条内容具体顶部的距离
  },
  // 接口返回的数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取小程序本地数据
    const Cates = wx.getStorageSync("cates");
    if(!Cates) {
      // 不存在，获取
      this.getCates();
    } else {
      if(Date.now() - Cates.time > 1000*10) {
        // 重新发送请求
        this.getCates();
      } else {
        console.log('可以使用旧数据',Cates);
        this.Cates = Cates.cates;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[this.data.currentIndex].children;

        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }
  },
  // 获取分类数据
  async getCates() {
    // request({url: '/categories'})
    //   .then((result) => {
        // this.Cates = result;
        // wx.setStorageSync("cates", {time: Date.now(), cates: this.Cates});

        // let leftMenuList = this.Cates.map(v=>v.cat_name);
        // let rightContent = this.Cates[this.data.currentIndex].children;

        // this.setData({
        //   leftMenuList,
        //   rightContent
        // });
    //   });

    const res = await request({url: '/categories'});
    this.Cates = res;
    wx.setStorageSync("cates", {time: Date.now(), cates: this.Cates});

    let leftMenuList = this.Cates.map(v=>v.cat_name);
    let rightContent = this.Cates[this.data.currentIndex].children;

    this.setData({
      leftMenuList,
      rightContent
    });

  },
  // 当前分类数据
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    });
  }
})