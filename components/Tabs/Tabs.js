/*
 * @Author: your name
 * @Date: 2020-11-18 17:00:41
 * @LastEditTime: 2020-11-18 17:10:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\components\Tabs\Tabs.js
 */
// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hadnleItemTap(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange", {index});
    }
  }
})
