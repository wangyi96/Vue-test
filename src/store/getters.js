export default {
  cartFoods(state){
    const foods = []

    state.goods.forEach((good,index) =>{
        good.foods.forEach((food,index) =>{
          if(food.count>0){
            foods.push(food)
          }
        })
    })

    return foods
  },

  totalCount(state,getters){
    return getters.cartFoods.reduce((total,food) => {
      return total + food.count
    },0)
  },

  totalPrice(state,getters){
    return getters.cartFoods.reduce((total,food) => {
      return total + food.count * food.price
    },0)
  }
}
