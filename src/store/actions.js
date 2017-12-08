import api from '../api/index'
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_SELLER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT} from './type'

const CODE_OK = 0

export default {
  getGoods({commit}){
    api.reqGoods().then(response =>{
      let result = response.data
      if(result.code === CODE_OK){
        const goods = result.data
        commit(RECEIVE_GOODS,{goods})
      }
    })
  },

  getRatings({commit}){
    api.reqRatings().then(response =>{
      let result = response.data
      if(result.code === CODE_OK){
        const ratings = result.data
        commit(RECEIVE_RATINGS,{ratings})
      }
    })
  },

  getSeller({commit}){
    api.reqSeller().then(response =>{
      let result = response.data
      if(result.code === CODE_OK){
        const seller = result.data
        commit(RECEIVE_SELLER,{seller})
      }
    })
  },

  updateFoodCount({commit},{food,isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }
}
