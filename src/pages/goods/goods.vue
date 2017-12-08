<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item " v-for="(good, index) in goods"
              :key="index" :class="{current:index===currentIndex}" @click="clickMenu(index)">
            <span class="text border-1px">
              <span class="icon" :class="supportsClasses[good.type]" v-if="good.type>=0"></span>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in good.foods">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
  import shopcart from '../../components/shopcart/shopcart.vue'
  import BScroll from 'better-scroll'
  export default {
    components:{
      cartcontrol,
      shopcart
    },
    data () {
      return {
        supportsClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        scrollY:0,
        taps:[]
      }
    },
    mounted(){
      this.$store.dispatch('getGoods',()=>{
        this.$nextTick(()=>{
          this._initScroll()
          this.taps = this._initTops()
        })
      })
    },
    computed: {
      ...mapState(['goods']),
      currentIndex(){
        let {scrollY,taps} = this
        let index = taps.findIndex((tap,index) =>{
          return scrollY >= tap && scrollY < taps[index+1]
        })
        return index
      }
    },
    methods:{
      _initScroll(){
        new BScroll(this.$refs.menuWrapper,{
          click:true
        })
        this.foodsScroll =  new BScroll(this.$refs.foodsWrapper,{
          probeType:2,
          click:true
        })

        this.foodsScroll.on('scroll',(event)=>{
          this.scrollY = Math.abs(event.y)
        })
        this.foodsScroll.on('scrollEnd',(event)=>{
          this.scrollY = Math.abs(event.y)
        })
      },
      _initTops(){
        const taps=[]
        let tap = 0
        taps.push(tap)

        let lis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        for (let i = 0; i < lis.length; i++) {
          let li = lis[i]
          tap +=li.clientHeight
          taps.push(tap)
        }
        return taps
      },
      clickMenu(index){
        this.scrollY = this.taps[index]
        this.foodsScroll.scrollTo(0,-this.taps[index],500)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/bg_image.styl"
  @import "../../common/stylus/minin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg_image('decrease_3')
          &.discount
            bg_image('discount_3')
          &.guarantee
            bg_image('guarantee_3')
          &.invoice
            bg_image('invoice_3')
          &.special
            bg_image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
