import Vue from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './common/stylus/index.styl'
import './mock/mockServer'

new Vue({
  el:'#app',
  render: ce => ce(App),
  router,
  store
})
