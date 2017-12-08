import Vue from 'vue'
import VueRouter from 'vue-router'

import goods from '../pages/goods/goods.vue'
import seller from '../pages/seller/seller.vue'
import ratings from '../pages/ratings/ratings.vue'

Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass:'active',
  routes:[
    {
      path:'/goods',
      component:goods
    },
    {
      path:'/seller',
      component:seller
    },
    {
      path:'/ratings',
      component:ratings
    },
    {
      path:'/',
      redirect:'/goods'
    },
  ]
})
