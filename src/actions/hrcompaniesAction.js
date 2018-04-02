import {UrlHost} from '../constants/index'
import {getToken, getCompanyId, updateCompanyInUserInfo} from '../util/userInfo'
// import {getIdToken} from '../util/weChatAuth'

// 根据ID查找查找人力资源公司信息
export function fetchHrcompanyInfo() {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hrcompanies/' + getCompanyId(),
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('fetchHrcompanyInfo', res)
        resolve(res)
      }
    })
  })
}

// 分页查询人力资源公司
export function searchHrcompanies(queryObj) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hrcompanies/search',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('searchHrcompanies成功res', res)
        resolve(res)
      }
    })
  })
}
// 人力公司查询单个任务
export function getHrtask(id) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hr-tasks/' + id,
      method: 'get',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 分页查询人力资源公司任务
export function searchHrTasks(queryObj) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hr-tasks/search',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log('hr-tasks', res)
        resolve(res)
      }
    })
  })
}

// 添加人力资源公司
export function addHrcompanies(hrInfo, act) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hrcompanies',
      data: hrInfo,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.success) {
          if (act === 'reg' && act !== undefined) {
            updateCompanyInUserInfo(res.data.data)
          }
        }
        resolve(res)
      }
    })
  })
}

// 修改人力资源公司信息
export function changeHrInfo(hrInfo, act) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hrcompanies',
      data: hrInfo,
      method: 'PUT',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.success) {
          if (act === 'reg' && act !== undefined) {
            updateCompanyInUserInfo(res.data.data)
          }
        }
        resolve(res)
      }
    })
  })
}

// 获取已添加该人力公司的所有酒店
export function fetchHotels(hrCompaniesId) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hrcompanies/' + hrCompaniesId + '/hotels',
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('fetchHotels', res)
        resolve(res)
      }
    })
  })
}
//获取人力公司下所有员工
export function fetchWorks(queryObj) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hr-workers/search',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res)
      }
    })
  })
}
//人力公司派发任务
export function HrDistributeTask(queryObj) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hr-tasks/distribute',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        resolve(res)
      }
    })
  })
}

// 人力资源公司添加合作酒店
export function hrcompanyAddHotels(idSet) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: UrlHost + '/hrcompanies/' + idSet.hrCompanyId + '/add/' + idSet.hotelId,
      data: idSet,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('hrcompanyAddHotels成功res', res)
        resolve(res)
      }
    })
  })
}
