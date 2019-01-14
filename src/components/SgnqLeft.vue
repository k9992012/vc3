<template>
  <div class="center sgnqLeft">
    <template v-if="dataComplete">
      <rectangle style="top:334px;left:62px" :tooltip="true" :name="'湛江市'" :value="filterData('湛江市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:278px;left:186px" :tooltip="true" :name="'茂名市'" :value="filterData('茂名市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:258px;left:285px" :tooltip="true" :name="'阳江市'" :value="filterData('阳江市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:203px;left:318px" :tooltip="true" :name="'云浮市'" :value="filterData('云浮市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:143px;left:350px" :tooltip="true" :name="'肇庆市'" :value="filterData('肇庆市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:86px;left:418px" :tooltip="true" :name="'清远市'" :value="filterData('清远市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:233px;left:385px" :tooltip="true" :name="'江门市'" :value="filterData('江门市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:184px;left:448px" :tooltip="true" :name="'佛山市'" :value="filterData('佛山市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:32px;left:588px" :tooltip="true" :name="'韶关市'" :value="filterData('韶关市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:253px;left:474px" :tooltip="true" :name="'珠海市'" :value="filterData('珠海市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:220px;left:502px" :tooltip="true" :name="'中山市'" :value="filterData('中山市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:143px;left:532px" :tooltip="true" :name="'广州市'" :value="filterData('广州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:184px;left:561px" :tooltip="true" :name="'东莞市'" :value="filterData('东莞市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:207px;left:614px" :tooltip="true" :name="'深圳市'" :value="filterData('深圳市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:166px;left:656px" :tooltip="true" :name="'惠州市'" :value="filterData('惠州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:96px;left:699px" :tooltip="true" :name="'河源市'" :value="filterData('河源市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:170px;left:769px" :tooltip="true" :name="'汕尾市'" :value="filterData('汕尾市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:147px;left:833px" :tooltip="true" :name="'揭阳市'" :value="filterData('揭阳市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:84px;left:801px" :tooltip="true" :name="'梅州市'" :value="filterData('梅州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:155px;left:871px" :tooltip="true" :name="'汕头市'" :value="filterData('汕头市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:106px;left:917px" :tooltip="true" :name="'潮州市'" :value="filterData('潮州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
    </template>
    <div class="rectangleLengend">
      <rectangle style="top: -147px;left: 20px;" :tooltip="false" :value="`20`" :max="126" :color="color"
                 class="rectangle"></rectangle>
      <!--<span>取水户数量</span>-->
      <span>水质(达标率)</span>
    </div>
  </div>
</template>
<script>
import Rectangle from './Rectangle'

export default {
  name: 'sgnq-left',
  components: { Rectangle },
  props: ['type', 'date', 'yz'],
  data () {
    return {
      color: ['#dad7f7', '#bbacfd', '#856eea'], // 长方体三个面的颜色(上、前、右)
      aqhData: [], // 按行政区划统计的水质数据
      dataComplete: false// 数据是否加载完毕
    }
  },
  filters: {},
  computed: {
    // 计算数据的最大值
    aqhMax () {
      let valueArr = []
      this.aqhData.forEach(item => {
        valueArr.push(item.DAY_W)
      })
      return Math.max(...valueArr)
    }
  },
  methods: {
    // 根据区划名称取的响应的水量值
    filterData (city) {
      let val = ''
      this.aqhData.forEach(item => {
        if (item.WA_AD === city) {
          val = item.DAY_W
        }
      })
      return val
    },
    // 请求按行政区划统计的取水户数据
    getMapInfo () {
      let _this = this
      this.axios.post(/api/ + 'wiuOnlinMonit/getQshStatByDivision.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.aqhData = response.data.data
          _this.dataComplete = true
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {
    type () {
      this.getMapInfo()
    },
    date () {
      this.getMapInfo()
    },
    yz () {
      this.getMapInfo()
    }
  },
  created () {

  },
  mounted () {
    this.getMapInfo()
  }
}
</script>
<style lang="stylus" scoped>
  .center
    position: relative
    width: 996px
    height: 820px
    background: url('../assets/images/map3.png') 0 158px no-repeat

    .rectangle
      position: absolute

    .rectangleLengend
      width: 198px
      height: 63px
      position: absolute
      left: 20px
      top: 50px
      border: 1px solid #607bae
      border-radius: 6px
      overflow: hidden
      line-height: 63px

      span
        color: #fff
        font-size: 18px
        margin-left: 22px
</style>
