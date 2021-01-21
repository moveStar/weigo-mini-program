/*
 * @Author: your name
 * @Date: 2020-11-18 10:47:02
 * @LastEditTime: 2020-11-19 10:02:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\request\index.js
 */
let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1';
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: BASE_URL+params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes--;
                if(ajaxTimes == 0) {
                    wx.hideLoading();
                }
            }
        });

    });
    
}