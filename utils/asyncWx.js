/*
 * @Author: your name
 * @Date: 2020-11-19 15:31:33
 * @LastEditTime: 2020-11-19 15:35:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wei-go\utils\asyncWx.js
 */

 /**
  * promise 形式  getSetting
  */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

 /**
  * promise 形式  chooseAddress
  */
 export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}


 /**
  * promise 形式  openSetting
  */
 export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result)=>{
                resolve(result);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}