export function getToken() {
  var token = ''
  var userInfo = wx.getStorageSync('keyUserInfo')
  if (userInfo && userInfo.tokenInfo){
    token = userInfo.tokenInfo.access_token
  }
  return token
}

export function getCompanyId() {
  var companyId = ''
  var userInfo = wx.getStorageSync('keyUserInfo')
  if (userInfo && userInfo.company) {
    companyId = userInfo.company.id
  }
  return companyId
}

export function getUserId() {
  var userId = ''
  var userInfo = wx.getStorageSync('keyUserInfo')
  if (userInfo) {
    userId = userInfo.id
  }
  return userId
}

export function getUserType() {
  var userType = ''
  var userInfo = wx.getStorageSync('keyUserInfo')
  if (userInfo ){
    userType = userInfo.userType
  }
  return userType
}

export function getUserAvatarUrl() {
  var avatarUrl=''
  var wxUserIfo = wx.getStorageSync('keyWxUserInfo')
  if (wxUserIfo){
    avatarUrl = wxUserIfo.avatarUrl
  }
  return avatarUrl
}

export function getWxUserInfo() {
  var wxUserInfo = wx.getStorageSync('keyWxUserInfo')
  return wxUserInfo
}

export function getUserInfo() {
  var userInfo = wx.getStorageSync('keyUserInfo')
  return userInfo
}

export function updateCompanyInUserInfo(companyInfo) {
  var userInfo = wx.getStorageSync('keyUserInfo')
  userInfo.company = companyInfo
  wx.setStorage({
    key: 'keyUserInfo',
    data: userInfo,
    success: function (res) {
      console.log('微信用户信息存储成功', res)
    }
  })
}

