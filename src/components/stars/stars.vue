<template>
  <div :class="`star_${this.size}`">
    <span class="star" v-for="(sc,index) in starClass" :class="sc" :key="index"></span>
  </div>
</template>

<script>
  //4.5

  export default {
    props:{
      score:Number,
      size:Number
    },
    computed:{
      starClass(){
        let scs = []
        const {score} = this

        //获取满心
        for (let i = 0; i < Math.floor(score); i++) {
          scs.push('on')
        }

        //获取半心
        if((score - Math.floor(score))*10>5){
          scs.push('half')
        }

        while (scs.length < 5){
          scs.push('off')
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/bg_image.styl"
  .star
    background-size 100% 100%
    background-repeat no-repeat
    display inline-block
  .star_48
    .star
      width 20px
      height 20px
      margin-right 10px
      &:nth-child
        margin-right 0px
    .on
      bg_image(star48_on)
    .off
      bg_image(star48_off)
    .half
      bg_image(star48_half)
  .star_36
    .star
      width 15px
      height 15px
      margin-right 8px
      &:nth-child
        margin-right 0px
    .on
      bg_image(star36_on)
    .off
      bg_image(star36_off)
    .half
      bg_image(star36_half)
  .star_24
    .star
      width 10px
      height 10px
      margin-right 4px
      &:nth-child
        margin-right 0px
    .on
      bg_image(star24_on)
    .off
      bg_image(star24_off)
    .half
      bg_image(star24_half)

</style>
