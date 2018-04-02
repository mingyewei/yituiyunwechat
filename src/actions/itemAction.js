/**
 * Created by jnn on 2017/7/27.
 */
import wepy from 'wepy'
import {UrlHost} from '../constants/index'
import {getIdToken} from '../util/weChatAuth'

export function getItemInfo(itemId) {
  return  new Promise(function(resolve,reject){
    wx.request({
      url: UrlHost+'/api/search/?func=fetchProduct&itemid=' + itemId,
      success: function (res) {
        console.log('res', res)
        resolve(res.data);
      }
    })
  })
}

export function addItemsToFavorite(cartItems) {
  console.log('cartItems', cartItems)
  return  new Promise(function(resolve,reject){
    wx.request({
      url: UrlHost+'/api/customer/?func=CollectInAllRequest',
      data: cartItems,
      method: 'POST',
      header: {
        authorization:getIdToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('收藏结果111', res)
        resolve(res)
      }
    })
  })
}

