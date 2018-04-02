import wepy from 'wepy'
import {UrlHost} from '../constants/index'

export function getUserMobileByOpenId(openId) {
  return new Promise(function(resolve, reject) {
    let webApi = UrlHost + '/openid/WEIXIN/' + openId
    wepy.request({
      url: webApi,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      resolve(data)
      console.log('getUserMobileByOpenId data:', data)
    })
  })
}

export function getSmsCodeBySmsType(mobile, smsType) {
  return new Promise(function(resolve, reject) {
    let webApi = UrlHost + '/sms-codes/' + smsType + '/' + mobile
    wepy.request({
      url: webApi,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      resolve(data)
      console.log('getSmsCodeBySmsType data:', data)
    })
  })
}

export function loginByMobile(mobile, smsCode) {
  return new Promise(function(resolve, reject) {
    let webApi = UrlHost + '/login-sms'
    var loginReq = {}
    loginReq.mobile = mobile
    loginReq.smsCode = smsCode
    loginReq.platform = 'WEIXIN'
    wepy.request({
      url: webApi,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: loginReq
    }).then((data) => {
      console.log('login data', data)
      if (data.data.success === false) {
        resolve(data)
      } else {
        let tokenInfo = data.data.data
        wx.request({
          url: UrlHost + '/me',
          method: 'GET',
          header: {
            authorization: tokenInfo.access_token
          },
          success: function (res) {
            let userInfo = res.data.data
            if (userInfo) {
              userInfo.tokenInfo = tokenInfo
              wx.setStorageSync('keyUserInfo',userInfo)
              console.log('微信用户信息存储成功', res)
            }
            resolve(userInfo)
            console.log('register data:', data)
          },
          fail: function (res) {
            console.log('fetch me is failed!')
          }
        })
      }
    })
  })
}

export function registerUser(wxUserInfo, userType, mobile, smsCode, password) {
  console.log('mobile', mobile)
  return new Promise(function(resolve, reject) {
    let webApi = UrlHost + '/register-weixin'

    let newUserRequest = wxUserInfo
    console.log('wxUserInfo', wxUserInfo)
    console.log('newUserRequest', newUserRequest)
    newUserRequest.mobile = mobile
    newUserRequest.smsCode = smsCode
    newUserRequest.password = password
    newUserRequest.socialType = 'WEIXIN'
    newUserRequest.userType = userType
    newUserRequest.sex = wxUserInfo.gender
    newUserRequest.headimgurl = wxUserInfo.avatarUrl
    console.log('dengluqingqiu', newUserRequest)
    wepy.request({
      url: webApi,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: newUserRequest
    }).then((data) => {
      let tokenInfo = data.data.data
      console.log('register data', data)
      if (data.data.success === false) {
        resolve(data)
      } else {
        wx.request({
          url: UrlHost + '/me',
          method: 'GET',
          header: {
            authorization: tokenInfo.access_token
          },
          success: function (res) {
            let userInfo = res.data.data
            if (userInfo) {
              userInfo.tokenInfo = tokenInfo
              wx.setStorageSync('keyUserInfo',userInfo)
              console.log('微信用户信息存储成功', res)
            }
            resolve(userInfo)
            console.log('register data:', data)
          },
          fail: function (res) {
            console.log('fetch me is failed!')
          }
        })
      }
    })
  })
}
