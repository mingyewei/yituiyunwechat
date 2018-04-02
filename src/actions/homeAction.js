import wepy from 'wepy'
import {UrlHost} from '../constants/index'

export function fetchHomeInfo(){
  return  new Promise(function(resolve,reject){
    let webApi = UrlHost + '/api/cms/?func=fetchHomeInfo'
    wepy.request({
      url: webApi,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      resolve(data)
      console.log('HomeInfo data:',data)
    })
  })
}

