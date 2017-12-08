<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="support_icon" :class="supportsClasses[seller.supports[1].type]"></span>
          <span class="support_text">{{seller.supports[1].description}}</span>
        </div>
        <div class="supports-counts" v-if="seller.supports" @click="isShow = !isShow">
          <span>{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="isShow = !isShow">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="bulletin-arrow icon-keyboard_arrow_right"></span>
    </div>
    <div class="bg">
      <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="">
    </div>
    <transition name="fade">
      <div class="mask" v-show="isShow">
        <div class="mask-wrapper">
          <div class="mask-content">
            <h1>{{seller.name}}</h1>
            <div class="mask-star-wapper">
              <stars :score="seller.score" :size="48"/>
            </div>
            <div class="mask-info">
              <span class="line"></span>
              <span class="text">优惠信息</span>
              <span class="line"></span>
            </div>
            <div class="mask-list">
              <ul>
                <li v-for="(support,index) in seller.supports" :key="index" >
                  <span class="icon" :class="supportsClasses[index]"></span>
                  <span class="text">{{support.description}}</span>
                </li>
              </ul>
            </div>
            <div class="mask-info">
              <span class="line"></span>
              <span class="text">商家公告</span>
              <span class="line"></span>
            </div>
            <div class="mask-text">
              {{seller.bulletin}}
            </div>
          </div>
        </div>
        <div class="mask-footer">
          <span class="icon-close " @click="isShow = !isShow"></span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import stars from '../../components/stars/stars.vue'
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
        isShow:false,
        supportsClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    components: {
      stars
    },
    computed:{
      ...mapState(['seller'])
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/bg_image.styl"
  .header
    position relative
    overflow hidden
    background rgba(7,17,27,.5)
    .content-wrapper
      position relative
      font-size 0
      margin 24px 12px 18px 24px
      .avatar
        display inline-block
        vertical-align top
        img
          width 64px
          height 64px
          border-radius 2px
      .content
        margin-left 16px
        display inline-block
        .title
          margin 2px 0 8px 0
          .brand
            margin-right 6px
            vertical-align top
            display inline-block
            width 30px
            height 18px
            bg_image(brand)
            background-repeat no-repeat
            background-size 100% 100%
          .name
            font-size 16px
            color rgb(255,255,255)
            font-weight bolder
            line-height 18px

        .description
          font-size 12px
          line-height 12px
          font-weight 200
          color rgb(255,255,255)
        .supports
          margin 10px 0 2px 0
          .support_icon
            margin-right 4px
            vertical-align top
            display inline-block
            width 12px
            height 12px
            background-repeat no-repeat
            background-size 100% 100%
            &.decrease
              bg_image(decrease_1)
            &.discount
              bg_image(discount_1)
            &.special
              bg_image(special_1)
            &.invoice
              bg_image(invoice_1)
            &.guarantee
              bg_image(guarantee_1)
          .support_text
            font-size 10px
            line-height 12px
            color rgb(255,255,255)
            font-weight 200
        .supports-counts
          font-size 10px
          position absolute
          right  0
          bottom -5px
          width 48px
          height 24px
          line-height 24px
          text-align center
          background pink
          border-radius 8px
          color rgb(255,255,255)
          font-weight 200
          background rgba(0,0,0,0.2)
          span
            line-height 12px


    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 26px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      color rgb(255,255,255)
      background rgba(7,17,27,0.2)
      .bulletin-text
        font-size 10px
        font-weight 200
      .bulletin-icon
        margin-right 4px
        margin-top 9px
        float left
        width 22px
        height 12px
        background-repeat no-repeat
        background-size 100% 100%
        bg_image(bulletin)
      .bulletin-arrow
        position absolute
        right 12px
        bottom 4px

    .bg
      position absolute
      top 0
      bottom 0
      left:0
      right 0
      filter blur(10px)
      z-index -2
      img
        width 100%
        height 100%
    .mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 99
      overflow auto
      background rgba(7,17,27,.8)
      .mask-wrapper
        min-height 100%
        .mask-content
          overflow hidden
          padding-bottom 64px
          h1
            font-size 16px
            font-weight 700
            line-height 16px
            color: white
            text-align center
            margin-top 64px
          .mask-star-wapper
            margin 16px 0 28px 0
            text-align center
          .mask-info
            display flex
            width 80%
            text-align center
            margin 0 auto
            align-items center
            margin-bottom 24px
            .text
              margin 0 12px
              color rgb(255,255,255)
            .line
              flex 1
              background rgba(255,255,255,.2)
              height 1px
          .mask-list
            width 80%
            margin 0 auto
            margin-bottom 28px
            li
              margin-bottom 12px
              &:last-child
                margin-bottom 0px
              .text
                font-size 12px
                font-weight 200
                color white
                line-height 12px
              .icon
                vertical-align middle
                display inline-block
                margin-left 12px
                width: 16px
                height 16px
                /*background pink*/
                background-size 100% 100%
                background-repeat no-repeat
                &.decrease
                  bg_image(decrease_2)
                &.discount
                  bg_image(discount_2)
                &.guarantee
                  bg_image(guarantee_2)
                &.invoice
                  bg_image(invoice_2)
                &.special
                  bg_image(special_2)
          .mask-text
            width 80%
            margin 0 auto
            font-size 12px
            font-weight 200
            line-height 24px
            color white
            box-sizing border-box
            padding 0 12px
      .mask-footer
        text-align center
        margin-top -64px
        span
          font-size 32px
          color rgba(255,255,255,.5)

</style>
