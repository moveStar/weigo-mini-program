/*
 * @Author: your name
 * @Date: 2020-11-18 10:47:02
 * @LastEditTime: 2020-11-18 16:21:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\request\index.js
 */
export const request = (params) => {
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
            }
        });
    });
}