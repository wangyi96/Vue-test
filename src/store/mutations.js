
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_SELLER,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_FOOD_COUNT} from './type'

import Vue from 'vue'

export default {
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },

  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },

  [RECEIVE_SELLER](state,{seller}){
    state.seller = seller
  },

  [INCREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count++
    }else {
      //food.count = 1
      Vue.set(food,'count',1)
    }
  },

  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){
      food.count--
    }
  },

  [CLEAR_FOOD_COUNT](state,{cartFoods}){
    console.log(cartFoods);
    cartFoods.forEach(food =>{
      food.count = 0
    })
  }
}
