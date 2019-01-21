<template>
  <div class="center">
    <div class="jcsl">
      <div class="title">
        <div class="year">本年累计监测取水量</div>
      </div>
      <div class="content">
        <span class="value">{{qsl.DAYW | wanToYiFour | nullValue}}</span>
        <span class="unit">亿m³</span>
      </div>
      <div class="jkh">
        <span class="label">监控户在线率:</span>
        <span class="value">{{qsl.MONITORINGRATE | toFixTwo | nullValue}}%</span>
      </div>
    </div>
    <template v-if="dataComplete">
      <rectangle style="top:448px;left:133px" :tooltip="true" :name="'湛江市'" :value="filterData('湛江市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:366px;left:230px" :tooltip="true" :name="'茂名市'" :value="filterData('茂名市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:348px;left:332px" :tooltip="true" :name="'阳江市'" :value="filterData('阳江市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:240px;left:368px" :tooltip="true" :name="'云浮市'" :value="filterData('云浮市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:135px;left:403px" :tooltip="true" :name="'肇庆市'" :value="filterData('肇庆市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:27px;left:459px" :tooltip="true" :name="'清远市'" :value="filterData('清远市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:305px;left:438px" :tooltip="true" :name="'江门市'" :value="filterData('江门市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:222px;left:489px" :tooltip="true" :name="'佛山市'" :value="filterData('佛山市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:-38px;left:610px" :tooltip="true" :name="'韶关市'" :value="filterData('韶关市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:333px;left:521px" :tooltip="true" :name="'珠海市'" :value="filterData('珠海市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:286px;left:552px" :tooltip="true" :name="'中山市'" :value="filterData('中山市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:172px;left:583px" :tooltip="true" :name="'广州市'" :value="filterData('广州市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:221px;left:614px" :tooltip="true" :name="'东莞市'" :value="filterData('东莞市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:260px;left:645px" :tooltip="true" :name="'深圳市'" :value="filterData('深圳市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:187px;left:683px" :tooltip="true" :name="'惠州市'" :value="filterData('惠州市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:77px;left:740px" :tooltip="true" :name="'河源市'" :value="filterData('河源市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:196px;left:817px" :tooltip="true" :name="'汕尾市'" :value="filterData('汕尾市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:166px;left:875px" :tooltip="true" :name="'揭阳市'" :value="filterData('揭阳市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:43px;left:906px" :tooltip="true" :name="'梅州市'" :value="filterData('梅州市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:165px;left:940px" :tooltip="true" :name="'汕头市'" :value="filterData('汕头市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
      <rectangle style="top:96px;left:972px" :tooltip="true" :name="'潮州市'" :value="filterData('潮州市')" :max="aqhMax"
                 :color="color" :isSz="false" class="rectangle"></rectangle>
    </template>
    <div class="rectangleLengend">
      <rectangle style="top: -147px;left: 20px;" :tooltip="false" :value="`20`" :max="126" :color="color"
                 class="rectangle"></rectangle>
      <!--<span>取水户数量</span>-->
      <span>监测水量</span>
    </div>
  </div>
</template>
<script>
import Rectangle from './Rectangle'

export default {
  name: 'qsh-center',
  components: { Rectangle },
  props: [],
  data () {
    return {
      color: ['#dad7f7', '#bbacfd', '#856eea'], // 长方体三个面的颜色(上、前、右)
      aqhData: [], // 按行政区划统计的取水户数据
      dataComplete: false, // 数据是否加载完毕
      qsl: {
        DAYW: '', // 监测水量
        MONITORINGRATE: ''// 在线率
      }
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
      this.axios.post(this.moduleConfig.api + 'wiuOnlinMonit/getQshStatByDivision.do', {
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
    },
    // 请求取水量数据
    getQslInfo () {
      let _this = this
      let datas = {
        V_WPC_CD: '891209472001'
      }
      this.axios.post(this.moduleConfig.api + 'SsjkController/getSsjkGkxx.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.qsl = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {},
  created () {

  },
  mounted () {
    this.getMapInfo()
    this.getQslInfo()
    let _this = this
    this.moduleConfig.timer = setInterval(() => {
      _this.getMapInfo()
      _this.getQslInfo()
    }, this.moduleConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.moduleConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .center
    position: relative
    margin-top: 35px
    width: 1122px
    height: 915px
    background: url('../assets/images/map5.png') center 25px no-repeat

    .jcsl
      width: 420px
      height: 138px
      position: absolute
      bottom: 210px
      right: 23px

      .title
        height: 22px
        color: #fff
        font-size: 22px
        padding-left: 15px

        > div
          text-align: left

        .year
          margin-bottom: 14px

      .content
        color: #fff
        font-size: 35px
        text-align: left

        .value
          font-family: Quartz
          font-size: 80px
          color: #fffc26

      .jkh
        color: #fff
        text-align: left
        margin: 9px 0 0 17px

        .label
          font-size: 22px

        .value
          font-size: 32px
          font-family: Quartz

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
</style>
