import {UrlHost} from '../constants/index'
import {getToken, getUserInfo, getUserId} from '../util/userInfo'

// 小时工打卡
export function punch(taskWorkerId, punchType) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserInfo().id

    var curTime = new Date()

    var punchInfo = {}
    punchInfo.taskWorkerId = taskWorkerId
    punchInfo.workerId = workerId
    punchInfo.punchType = punchType
    punchInfo.punchTime = curTime

    wx.request({
      url: UrlHost + '/worker/punch',
      data: punchInfo,
      method: 'POST',
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

// 获取小时工任务
export function fetchWorkerTaskById(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/worker-tasks/' + id,
      method: 'GET',
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

// 小时工接受任务
export function confirmedTask(workerId, workerTaskId) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/worker-tasks/' + workerId + '/accept/' + workerTaskId,
      method: 'PUT',
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

// 小时工拒绝任务
export function refusedTask(reqObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/worker-tasks/reject',
      method: 'PUT',
      data: reqObj,
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

// 查找员工的所有消息
export function fetchWorkerMsgList(queryObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/messages/search',
      method: 'POST',
      data: queryObj,
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

// 设置消息已读
export function updateWorkerMsgStatus(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/messages/' + id + '/status',
      method: 'PUT',
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

// 修改性别
export function changeGender(queryObj) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/gender',
      method: 'PUT',
      data: queryObj,
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('changeGender', res)
        resolve(res)
      }
    })
  })
}

// 修改姓名
export function changeName(queryObj) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/name',
      method: 'PUT',
      data: queryObj,
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('changeName', res)
        resolve(res)
      }
    })
  })
}

// 修改身份证号码
export function changeIdcardnumber(idnum) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/idcardnumber',
      method: 'PUT',
      data: idnum,
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('changeName', res)
        resolve(res)
      }
    })
  })
}

// 修改小时工健康证照片
export function uploadHealthcard(fileInfo) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/healthcard',
      data: fileInfo,
      method: 'PUT',
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

// 修改小时工身份证反面照片
export function uploadIdcardback(fileInfo) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/idcardback',
      data: fileInfo,
      method: 'PUT',
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

// 修改小时工身份证正面照片
export function uploadIdcardfront(fileInfo) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/idcardfront',
      data: fileInfo,
      method: 'PUT',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('uploadIdcardfront成功res', res)
        resolve(res)
      }
    })
  })
}

// 分页查询 获取员工下所有人力公司
export function searchWorkerHrs(queryObj) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/workers-hrs/search',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('searchWorkerHrs成功res', res)
        resolve(res)
      }
    })
  })
}

// 人力公司同意小时工绑定申请
export function workersBindHrcompanies(idSet) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/workers/' + idSet.workerId + '/bind/' + idSet.hrCompanyId,
      data: idSet,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('workersAddHrcompanies成功res', res)
        resolve(res)
      }
    })
  })
}

// 小时工绑定人力公司
export function workersBindHrcompaniesList(id) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserId()
    wx.request({
      url: UrlHost + '/workers/bind',
      data: {
        workerId: workerId,
        companys: id
      },
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('workersAddHrcompanies成功res', res)
        resolve(res)
      }
    })
  })
}

// 小时工解绑人力公司
export function unBinding(hrId) {
  var workerId = getUserId()
  return new Promise(function (resolve, reject) {
    let webApi = UrlHost + '/workers/' + workerId + '/unbind/' + hrId
    wx.request({
      url: webApi,
      method: 'PUT',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      resolve(data)
      console.log('getSmsCodeBySmsType data:', data)
    })
  })
}

// 小时工打卡
export function getCurrentTask() {
  return new Promise(function (resolve, reject) {
    var workerId = getUserInfo().id
    wx.request({
      url: UrlHost + '/worker-tasks/' + workerId + '/current',
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

// 分页获取小时工下的所有任务/付款信息
export function searchTaskworkers(queryObj) {
  return new Promise(function (resolve, reject) {
    var workerId = getUserInfo().id
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/taskworkers',
      data: queryObj,
      method: 'POST',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('searchTaskworkers成功res', res)
        resolve(res)
      }
    })
  })
}

// 该接口返回用户账号信息，但各种不同身份的特有信息需要补充调用其他接口
export function getMe() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/me',
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('getMe成功res', res)
        resolve(res)
      }
    })
  })
}

// 新建意见反馈
export function makeSuggestion(data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: UrlHost + '/suggestion',
      method: 'POST',
      data: data,
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('makeSuggestion', res)
        resolve(res)
      }
    })
  })
}

// 获得小时工款项信息
export function getBalance() {
  return new Promise(function (resolve, reject) {
    var workerId = getUserInfo().id
    wx.request({
      url: UrlHost + '/workers/' + workerId + '/balance',
      method: 'GET',
      header: {
        authorization: getToken(),
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('getBalance成功res', res)
        resolve(res)
      }
    })
  })
}
