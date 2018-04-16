import {UrlHost} from '../constants/index'
import {getCompanyId, getToken, updateCompanyInUserInfo} from '../util/userInfo'
// import {getIdToken} from '../util/weChatAuth'

// 根据ID查找查找酒店
export function fetchHotelInfo(hotelId) {
  return new Promise(function (resolve, reject) {
    if (typeof hotelId === 'undefined') {
      hotelId = getCompanyId()
    }
    wx.request({
      url: UrlHost + '/hotels/' + hotelId,
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('fetchHotelInfo成功res', res)
        resolve(res)
      }
    })
  })
}

// 查找酒店下的人力资源公司
export function fetchHrcompanies(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/hotels/' + id + '/hrcompanies',
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('fetchHrcompanies成功res', res)
        resolve(res)
      }
    })
  })
}

// 酒店绑定添加合作的人力资源公司
export function hotelAddHrcompanies(idList) {
  return new Promise(function (resolve, reject) {
    var hotelId = getCompanyId()
    wx.request({
      url: UrlHost + '/hotels/' + hotelId + '/add',
      data: idList,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      success: function (res) {
        // console.log('addHrcompanies成功res', res)
        resolve(res)
      }
    })
  })
}

// 分页查询酒店信息
export function searchHotels(queryObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/hotels/search',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      success: function (res) {
        // console.log('searchHotels成功res', res)
        resolve(res)
      }
    })
  })
}

// 添加酒店
export function addHotels(hotelInfo, act) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/hotels',
      data: hotelInfo,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('addHotels成功res', res)
        if (res.data.success) {
          if (act === 'reg' && act !== undefined) {
            updateCompanyInUserInfo(res.data.data)
          }
        }
        resolve(res.data)
      }
    })
  })
}

// 修改酒店
export function changeHotel(hotelInfo, act) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/hotels',
      data: hotelInfo,
      method: 'PUT',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('addHotels成功res', res)
        if (res.data.success) {
          if (act === 'reg' && act !== undefined) {
            updateCompanyInUserInfo(res.data.data)
          }
        }
        resolve(res.data)
      }
    })
  })
}

// 根据名称获取字典
export function fetchTaskType() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/admin/dicts/findbyname/TaskType',
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('fetchTaskType成功res', res)
        resolve(res)
      }
    })
  })
}

//发布酒店任务
export function releaseTasks(recruitInfo) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/tasks',
      data: recruitInfo,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      success: function (res) {
        // console.log('releaseTasks成功res', res)
        resolve(res.data)
      }
    })
  })
}


// 分页查询酒店信息
export function searchHotelTasks(queryObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/tasks/search',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      success: function (res) {
        // console.log('searchHotelTasks成功res', res)
        resolve(res)
      }
    })
  })
}

//查询单个任务
export function fetchsingleTask(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/tasks/' + id,
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('fetchsingleTask成功res', res)
        resolve(res)
      }
    })
  })
}
