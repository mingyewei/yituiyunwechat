/**
 * Created by ybx on 2017/7/25.
 */
import wepy from 'wepy'
import {UrlHost} from '../constants/index'
import {IdToken} from '../constants/index'
import { getUserMobileByOpenId } from '../actions/authAction'

export function login(cb) {
  console.log('logining..........')
  // 调用登录接口
  wx.login({
    success: function (e) {
      console.log('wxlogin successd........')
      var code = e.code
      let webApi = UrlHost + '/weixin/openid/' + code
      wx.request({
        url: webApi,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log('获取用户getOpenId！', res.data)
          let openid = res.data.data.openid
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              console.log('wxgetUserInfo successd........')
              let wxUserInfo = JSON.parse(res.rawData)
              wxUserInfo.openid = openid

              getUserMobileByOpenId(openid).then(res => {
                if (res.data.success) {
                  wxUserInfo.mobile = res.data.message
                }
                wx.setStorageSync('keyWxUserInfo',wxUserInfo)
                console.log('微信用户信息存储成功', res)
                cb(wxUserInfo)
              })
              console.log('微信获取到的用户信息', wxUserInfo)
            }
          })
        }
      })
    }
  })
}

export function loginWithUser(cb) {
  console.log('logining..........')
  // 调用登录接口
  wx.login({
    success: function (e) {
      console.log('wxlogin successd........')
      var code = e.code
      let webApi = UrlHost + '/auth/weixin-mp?state=WEIXIN&code=' + code
      wx.request({
        url: webApi,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (authResult) {
          if (authResult.data.success) {
            // 1、获取微信信息
            let openid = authResult.data.data.openid
            wx.getUserInfo({
              withCredentials: true,
              success: function(wxUserResult) {
                console.log('wxgetUserInfo successd........')
                let wxUserInfo = JSON.parse(wxUserResult.rawData)
                wxUserInfo.openid = openid
                wx.setStorageSync('keyWxUserInfo', wxUserInfo)

                getUserMobileByOpenId(openid).then(mobileResult => {
                  if (mobileResult.data.success) {
                    wxUserInfo.mobile = mobileResult.data.message
                    wx.setStorageSync('keyWxUserInfo', wxUserInfo)
                    console.log('微信用户信息存储成功', mobileResult)
                    // 1、调用me接口获取用户信息
                    let tokenInfo = authResult.data.data
                    wx.request({
                      url: UrlHost + '/me',
                      method: 'GET',
                      header: {
                        authorization: tokenInfo.access_token
                      },
                      success: function (meResult) {
                        let userInfo = meResult.data.data
                        if (userInfo) {
                          userInfo.tokenInfo = tokenInfo
                          wx.setStorageSync('keyUserInfo',userInfo)
                          console.log('微信用户信息存储成功', meResult)
                          cb(true, wxUserInfo, userInfo)
                        }
                      },
                      fail: function (res) {
                        console.log('fetch me is failed!')
                      }
                    })
                  } else {
                    cb(false, wxUserInfo, {})
                  }
                })
                console.log('微信获取到的用户信息', wxUserInfo)
              }
            })
          } else {
            cb(false, {}, {})
          }

          console.log('weixin-mp：', authResult)
        }
      })
    }
  })
}
export function weLogin() {
  wx.login({
    success: function(res) {
      if (res.code) {
        // 发起网络请求
        console.log('获取用户Code成功！' + res.code)
        fetchOpenId(res.code)
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}
export function fetchOpenId(code) {
  console.log('获取用户getOpenId！')

  let webApi = UrlHost + '/weixin/openid/' + code
  wepy.request({
    url: webApi,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.success) {
      resolve(res.data.openid)
    }
    console.log('fetchOpenId data:',data)
  })
}
export function getUserInfo() {
  wx.getUserInfo({
    withCredentials: true,
    success: function(res) {
      let userInfo = JSON.parse(res.rawData)
      console.log('微信获取到的用户信息', userInfo)
    }
  })
}

// 获取用户IdToken
export function getIdToken() {
  var userData = wx.getStorageSync('keyUserInfo')
  if (userData && userData.id_token !== '') {
    return userData.id_token
  } else {
    return ''
  }
}
export function getUserOpenId() {
  var userData = wx.getStorageSync('keyUserInfo')
  if (userData && userData.OpenId !== '') {
    console.log('返回数据OpenId', userData.OpenId)
    return userData.OpenId
  } else {
    return ''
  }
}
