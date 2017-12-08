import axios from 'axios'

export default {
  reqGoods(){
    return axios.get('/api2/goods')
  },
  reqRatings(){
    return axios.get('/api2/ratings')
  },
  reqSeller(){
    return axios.get('/api2/seller')
  }
}

/*
import axios from 'axios'
export function reqGoods() {
  return axios.get('/api2/goods')  // 返回一个promise对象
}

export function reqRatings() {
  return axios.get('/api2/ratings')
}


export function reqSeller() {
  return axios.get('/api2/seller')
}
*/
