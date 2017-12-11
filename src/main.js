import Vue from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueScroller from 'vue-scroller'
import {Button } from 'mint-ui'

import './common/stylus/index.styl'
import './mock/mockServer'
import './fiflter/index'

Vue.use(VueScroller)
Vue.component(Button.name,Button)

new Vue({
  el:'#app',
  render: ce => ce(App),
  router,
  store
})
