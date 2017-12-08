<template>
  <div>
    <ele-header></ele-header>
    <div class="tab border-1px" >
      <div class="tab-item">
        <router-link to="/goods">商家</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">評論</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">買家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  export default {
    mounted(){
      this.$store.dispatch('getSeller')
    },
    components: {
      'ele-header':header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/minin.styl"
  .tab
    display flex
    height 40px
    line-height 40px
    border-1px(rgba(7,17,27,.1))
    .tab-item
      flex 1
      text-align center
      &>a
        display block
        font-size 14px
        color rgb(77,85,93)
      .active
        color rgb(240,20,20)
</style>
