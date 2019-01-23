<template>
  <div class="content clearfix">
    <div class="left">
      <title-text :text="'按用途'"></title-text>
      <pie-chart-two class="pieChart" :type="'yt'" :data="ytData"
                     :color="['#2bc6ff','#7b65ff','#315ce7','#37d3a9','#229dc5']"></pie-chart-two>
      <div class="legend">
        <ul>
          <li>
            <span style="background-color:#2bc6ff" class="colorCircle"></span>
            <span class="text">工业:</span>
            <span class="value">{{ytData.ProcessWater | nullValue}}%</span>
          </li>
          <li>
            <span style="background-color:#7b65ff" class="colorCircle"></span>
            <span class="text">农业:</span>
            <span class="value">{{ytData.AgriculturalWater | nullValue}}%</span>
          </li>
          <li>
            <span style="background-color:#315ce7" class="colorCircle"></span>
            <span class="text">生活:</span>
            <span class="value">{{ytData.WaterLife | nullValue}}%</span>
          </li>
          <li>
            <span style="background-color:#37d3a9" class="colorCircle"></span>
            <span class="text">发电:</span>
            <span class="value">{{ytData.GenerationWate | nullValue}}%</span>
          </li>
          <li>
            <span style="background-color:#229dc5" class="colorCircle"></span>
            <span class="text">其他:</span>
            <span class="value">{{ytData.OtherWater | nullValue}}%</span>
          </li>
        </ul>
      </div>
      <title-text style="margin-top:38px" :text="'按水源统计'"></title-text>
      <pie-chart-two class="pieChart" :type="'sy'" :data="syData" :color="['#5f7cf8','#62beff']"></pie-chart-two>
      <div class="legend" style="top:388px">
        <ul>
          <li>
            <span style="background-color:#5f7cf8" class="colorCircle"></span>
            <span class="text">地表:</span>
            <span class="value">{{syData.surfaceWater | nullValue}}%</span>
          </li>
          <li>
            <span style="background-color:#62beff" class="colorCircle"></span>
            <span class="text">地下:</span>
            <span class="value">{{syData.groundWater | nullValue}}%</span>
          </li>
        </ul>
      </div>
      <title-text style="margin-top:38px" :text="'按年份(亿m³)'"></title-text>
      <div class="anf">
        <ul>
          <li v-for="(item,index) in anf" :key="item.DT">
            <span class="year">{{item.DT}}</span>
            <span v-if="index===0" class="percent"
                  :style="{width:anfVal*item.WW+'px',backgroundColor:'#e5a28b'}"></span>
            <span v-if="index!==0" class="percent" :style="{width:anfVal*item.WW+'px'}"></span>
            <span class="value">{{item.WW | wanToYiTwo | nullValue}}</span>
          </li>
        </ul>
      </div>
    </div>
    <index-center></index-center>
    <div class="right">
      <title-text style="margin-top:30px" :text="'按月份(亿m³)'"></title-text>
      <div class="ruler">
        <span style="left:-5px">0</span>
        <span style="left:118px">{{rulerMax / 2 | dividedWanZero}}</span>
        <span style="right:-11px">{{rulerMax | dividedWanZero}}</span>
      </div>
      <ul class="monthBox">
        <li v-for="(item,index) in ayf" :key="index" class="clearfix">
          <span class="month">{{12 - index}}月</span>
          <el-tooltip v-if="item.WW===0" placement="top">
            <div slot="content">{{year - 2}}年:{{item.ppWW | wanToYiFour}}<br/>{{year - 1}}年:{{item.pWW | wanToYiFour}}
            </div>
            <div>
              <div class="prevPrevYear" :style="{width:ayfVal*item.ppWW+'px'}"></div>
              <div class="prevYear" :style="{width:ayfVal*item.pWW+'px'}"></div>
            </div>
          </el-tooltip>
          <el-tooltip v-else placement="top">
            <div slot="content">{{year - 1}}年:{{item.pWW | wanToYiFour}}<br/>{{year}}年:{{item.WW | wanToYiFour}}</div>
            <div>
              <div class="prevYear" :style="{width:ayfVal*item.pWW+'px'}"></div>
              <div class="year" :style="{width:ayfVal*item.WW+'px'}"></div>
            </div>
          </el-tooltip>
        </li>
      </ul>
      <div class="legendBox">
        <template v-if="ppYearShow">
          <span class="legend" style="background-color: #5f7cf8"></span>
          <span class="value">{{year - 2}}年</span>
        </template>
        <span class="legend"></span>
        <span class="value">{{year - 1}}年</span>
        <span class="legend" style="background-color: #4ccbbb"></span>
        <span class="value">{{year}}年</span>
      </div>
    </div>
  </div>
</template>
<script>
import TitleText from '../../components/TitleText'
import PieChartTwo from '../../components/PieChartTwo'
import IndexCenter from '../../components/IndexCenter'

export default {
  name: 'qsh',
  components: { TitleText, PieChartTwo, IndexCenter },
  data () {
    return {
      year: new Date().getFullYear(),
      anf: [
        { DT: new Date().getFullYear(), WW: '' },
        { DT: new Date().getFullYear() - 1, WW: '' },
        { DT: new Date().getFullYear() - 2, WW: '' }
      ], // 按年份统计数据
      ayf: [
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 },
        { ppWW: 0, pWW: 0, WW: 0 }
      ], // 按月份统计数据
      ytData: {
        'GenerationWate': '', // 发电
        'ProcessWater': '', // 工业
        'WaterLife': '', // 生活
        'OtherWater': '', // 其他
        'AgriculturalWater': ''// 农业
      },
      syData: {
        'surfaceWater': '', // 地表水
        'groundWater': ''// 地下水
      },
      aqhData: [], // 按行政区划统计的数据
      ppYearShow: false// 前年图例显示/隐藏
    }
  },
  computed: {
    // 按比例计算按年份统计长方形宽度
    anfVal () {
      let valueArr = []
      this.anf.forEach(item => {
        valueArr.push(item.WW)
      })
      return 200 / Math.max(...valueArr)
    },
    // 按比例计算按月份统计长方形宽度
    ayfVal () {
      let valueArr = []
      this.ayf.forEach(item => {
        valueArr.push(item.WW)
        valueArr.push(item.pWW)
        valueArr.push(item.ppWW)
      })
      return 262 / Math.max(...valueArr)
    },
    // 计算标尺最大刻度
    rulerMax () {
      let valueArr = []
      this.ayf.forEach(item => {
        valueArr.push(item.WW)
        valueArr.push(item.pWW)
        valueArr.push(item.ppWW)
      })
      return Math.max(...valueArr)
    }
  },
  filters: {},
  methods: {
    // 请求按取水用途统计查询的数据
    getYtInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'SsjkController/getWaterIntake.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.ytData = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求按取水水源统计查询的数据
    getSyInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'SsjkController/getSourceOfWaterg.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.syData = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求按年份统计取水量数据
    getAnInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'SsjkController/getAnnualWaterIntake.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          response.data.forEach(item => {
            if (item.DT === _this.year + '') {
              _this.anf[0].WW = item.WW
            }
            if (item.DT === _this.year - 1 + '') {
              _this.anf[1].WW = item.WW
            }
            if (item.DT === _this.year - 2 + '') {
              _this.anf[2].WW = item.WW
            }
          })
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 按月份统计数据转换
    ayDataTransform (item, ayData, month) {
      if (month < 10) {
        month = '0' + month
      }
      let year = this.year
      if (item.DT === year + '-' + month) {
        ayData[12 - month].WW = item.WW
      }
      if (item.DT === year - 1 + '-' + month) {
        ayData[12 - month].pWW = item.WW
      }
      if (item.DT === year - 2 + '-' + month) {
        ayData[12 - month].ppWW = item.WW
      }
      this.ppYearShow = false
      this.ayf.forEach(item => {
        if (item.WW === 0 || !item.WW) {
          this.ppYearShow = true
        }
      })
    },
    // 请求按月份统计取水量数据
    getAyInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'SsjkController/getMonthlyWaterIntake.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          let ayData = [
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 },
            { ppWW: 0, pWW: 0, WW: 0 }
          ]
          response.data.forEach(item => {
            for (let i = 12; i > 0; i--) {
              _this.ayDataTransform(item, ayData, i)
            }
          })
          _this.ayf = ayData
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    refreshTime () {
      setInterval(() => {
        this.year = new Date().getFullYear()
      }, 1000)
    }
  },
  watch: {},
  mounted () {
    this.refreshTime()
    this.getYtInfo()
    this.getSyInfo()
    this.getAnInfo()
    this.getAyInfo()
    let _this = this
    this.baseConfig.timer = setInterval(() => {
      _this.getYtInfo()
      _this.getSyInfo()
      _this.getAnInfo()
      _this.getAyInfo()
    }, this.baseConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.baseConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .right >>> .box .circle .value
    margin-top: 25%

  .content
    margin-top: 10px

    > div
      float: left

    .left
      box-sizing: border-box
      padding-left: 32px
      margin-top: 34px
      width: 448px
      position: relative

      .pieChart
        margin: 22px 0 0 30px

      .legend
        color: #fff
        font-size: 22px
        position: absolute
        width: 150px
        top: 56px
        right: 20px

        ul
          li
            display: inline-block
            width: 185px
            height: 23px
            line-height: 23px
            text-align: left
            margin-bottom: 13px

          .colorCircle
            display: inline-block
            width: 13px
            height: 13px
            border-radius: 50%

          .value
            font-family: Quartz
            font-size: 32px
            margin-left: 10px

      .anf
        color: #fff
        text-align: left
        padding-left: 22px
        margin-top: 32px

        ul
          li
            height: 20px
            line-height: 20px
            margin-bottom: 18px
            font-size: 22px

            .percent
              display: inline-block
              /*width: 200px*/
              height: 20px
              background-color: #34acde
              margin-left: 5px

            .value
              font-size: 32px
              font-family: Quartz

    .right
      float: right
      width: 393px
      color: #fff
      font-size: 22px
      position: relative
      margin: 28px 0 0 0

      .ruler
        background: url('../../assets/images/ruler.png') 0 0 no-repeat
        width: 262px
        height: 30px
        position: relative
        margin: 38px 0 0 54px

        span
          position: absolute
          bottom: 0

      .monthBox
        li
          height: 26px
          margin: 21px 0 0 2px

          .month
            float: left
            position: relative
            left: -3px
            width: 52px
            height: 26px
            line-height: 26px
            text-align: right

          > div
            float: left

            .prevYear
              /*width: 262px*/
              height: 11px
              background-color: #1a84e7
              margin-bottom: 4px

            .prevPrevYear
              /*width: 262px*/
              height: 11px
              background-color: #5f7cf8
              margin-bottom: 4px

            .year
              /*width: 262px*/
              height: 11px
              background-color: #4ccbbb

      .legendBox
        height: 20px
        line-height: 20px
        margin: 40px 0 0 0
        text-align: center

        .legend
          display: inline-block
          width: 27px
          height: 11px
          background-color: #1a84e7

        .value
          margin-right: 15px
</style>
