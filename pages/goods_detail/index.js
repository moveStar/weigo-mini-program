/*
 * @Author: zhangweijuan
 * @Date: 2020-11-10 17:00:24
 * @LastEditTime: 2021-01-21 17:22:11
 * @LastEditors: Please set LastEditors
 * @Description: 商品详情
 * @FilePath: \wei-go\pages\goods_detail\index.js
 */
import { request } from '../../request/index';
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail: {}
  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.handleGoodsDetail(goods_id);
  },

  // 商品详情
  async handleGoodsDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {goods_id}
    })
    this.GoodsInfo = res;
    this.setData({
      // goods_detail: res
      goods_detail: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // ipone 部分手机 不识别 webp图片格式
        // 最好是找到后台修改
        // 临时自己修改 确保后台存在 1.webp  => 1.jpg
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: res.pics
      }
    });
    
  },

  // 预览轮播图
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },

  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if(index === -1) {
      // 不存在，首次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 已存在，更新商品数量 执行num++
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    });
  }
}) 