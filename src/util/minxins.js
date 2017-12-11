export const ratingMixin = {
  data () {
    return {
      onlyContent: true,
      selectType: 2
    }
  },

  methods: {
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent
      // 刷新滚动
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

    setSelectType(selectType) {
      this.selectType = selectType
      // 刷新滚动
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  computed:{
    filterRatings(){

      const ratings = this.ratings || this.food.ratings

      if(!ratings){
        return []
      }

      let {selectType,onlyContent} = this
      return ratings.filter((rating) =>{
        return (!onlyContent || rating.text.length > 0)  && (selectType === 2 || selectType === rating.rateType )

      })
    }
  }
}


