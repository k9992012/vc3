<template>
  <div class="center sgnqLeft">
    <template v-if="dataComplete">
      <rectangle style="top:448px;left:133px" :tooltip="true" :name="'湛江市'" :value="filterData('湛江市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:366px;left:230px" :tooltip="true" :name="'茂名市'" :value="filterData('茂名市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:348px;left:332px" :tooltip="true" :name="'阳江市'" :value="filterData('阳江市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:240px;left:368px" :tooltip="true" :name="'云浮市'" :value="filterData('云浮市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:135px;left:403px" :tooltip="true" :name="'肇庆市'" :value="filterData('肇庆市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:27px;left:459px" :tooltip="true" :name="'清远市'" :value="filterData('清远市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:305px;left:438px" :tooltip="true" :name="'江门市'" :value="filterData('江门市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:222px;left:489px" :tooltip="true" :name="'佛山市'" :value="filterData('佛山市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:-38px;left:610px" :tooltip="true" :name="'韶关市'" :value="filterData('韶关市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:333px;left:521px" :tooltip="true" :name="'珠海市'" :value="filterData('珠海市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:286px;left:552px" :tooltip="true" :name="'中山市'" :value="filterData('中山市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:172px;left:583px" :tooltip="true" :name="'广州市'" :value="filterData('广州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:221px;left:614px" :tooltip="true" :name="'东莞市'" :value="filterData('东莞市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:260px;left:645px" :tooltip="true" :name="'深圳市'" :value="filterData('深圳市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:187px;left:683px" :tooltip="true" :name="'惠州市'" :value="filterData('惠州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:77px;left:740px" :tooltip="true" :name="'河源市'" :value="filterData('河源市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:196px;left:817px" :tooltip="true" :name="'汕尾市'" :value="filterData('汕尾市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:166px;left:875px" :tooltip="true" :name="'揭阳市'" :value="filterData('揭阳市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:43px;left:906px" :tooltip="true" :name="'梅州市'" :value="filterData('梅州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:165px;left:940px" :tooltip="true" :name="'汕头市'" :value="filterData('汕头市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
      <rectangle style="top:96px;left:972px" :tooltip="true" :name="'潮州市'" :value="filterData('潮州市')" :max="aqhMax"
                 :color="color" :isSz="true" class="rectangle"></rectangle>
    </template>
    <div class="rectangleLengend">
      <rectangle style="top: -147px;left: 20px;" :tooltip="false" :value="`20`" :max="126" :color="color"
                 class="rectangle"></rectangle>
      <!--<span>取水户数量</span>-->
      <span>水质(达标率)</span>
    </div>
    <div class="tabsPoint clearfix">
      <div @click="tabsPointActive(0)" :class="{active:tabsPointActiveIndex===0}">
        <span class="point"></span>
        <span class="text">双因子评价</span>
      </div>
      <div @click="tabsPointActive(1)" :class="{active:tabsPointActiveIndex===1}">
        <span class="point"></span>
        <span class="text">全因子评价</span>
      </div>
    </div>
  </div>
</template>
<script>
import Rectangle from './Rectangle'
import { mapMutations } from 'vuex'

export default {
  name: 'sgnq-left',
  components: { Rectangle },
  props: [],
  data () {
    return {
      color: ['#48eea2', '#18b26b ', '#65ffb8'], // 长方体三个面的颜色(上、前、右)
      aqhData: [], // 按行政区划统计的水质数据
      dataComplete: false, // 数据是否加载完毕
      tabsPointActiveIndex: 0, // 因子索引
      tp: '1'// 因子类型
    }
  },
  filters: {},
  computed: {
    // 计算数据的最大值
    aqhMax () {
      let valueArr = []
      this.aqhData.forEach(item => {
        valueArr.push(item.SYZ || item.QYZ)
      })
      return Math.max(...valueArr)
    }
  },
  methods: {
    // store中改变水质评价结果年份
    ...mapMutations(['szpjjgYearChange']),
    // 根据区划名称取的响应的水量值
    filterData (city) {
      let val = ''
      this.aqhData.forEach(item => {
        if (item.NAME === city) {
          val = item.SYZ || item.QYZ
        }
      })
      return val
    },
    // 请求按行政区划统计的取水户数据
    getMapInfo () {
      let _this = this
      let datas = {
        tp: this.tp
      }
      this.axios.post(this.baseConfig.api + 'waterFunctionZoneController/getWfzMapData.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.dataComplete = false
          _this.aqhData = response.data.data
          _this.$nextTick(() => {
            _this.dataComplete = true
            _this.szpjjgYearChange(_this.aqhData[0].YY)
          })
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 双因子/限制纳污切换
    tabsPointActive (index) {
      this.tabsPointActiveIndex = index
      switch (index) {
        case 0:
          this.tp = '1'// 双因子
          break
        case 1:
          this.tp = '2'// 全因子
          break
      }
      this.getMapInfo()
    }
  },
  watch: {
    // groId() {
    //   this.getMapInfo();
    // },
    // date() {
    //   this.getMapInfo();
    // },
    // tp() {
    //   this.getMapInfo();
    // }
  },
  created () {

  },
  mounted () {
    this.getMapInfo()
    let _this = this
    this.baseConfig.timer = setInterval(() => {
      _this.getMapInfo()
    }, this.baseConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.baseConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .center
    position: relative
    width: 1122px
    height: 820px
    background: url('../assets/images/map5.png') center 25px no-repeat

    .rectangle
      position: absolute

    .rectangleLengend
      width: 198px
      height: 63px
      position: absolute
      left: 64px
      top: 82px
      border: 1px solid #607bae
      border-radius: 6px
      overflow: hidden
      line-height: 63px

      span
        color: #fff
        font-size: 22px
        margin-left: 40px

    .tabsPoint
      padding-left: 124px
      box-sizing: border-box
      margin-top: 74px
      position: absolute
      bottom: 175px
      left: 345px

      div
        float: left
        margin-right: 50px
        cursor: pointer

        span
          float: left

        .point
          width: 18px
          height: 18px
          border-radius: 50%
          border: 1px solid #4da3ff
          box-sizing: border-box
          margin-right: 10px

        .text
          font-size: 22px
          color: #fff
          height: 18px
          line-height: 18px

      .active
        .point
          background-color: #4da3ff

</style>
