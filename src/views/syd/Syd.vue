<template>
  <div class="content clearfix">
    <div class="left">
      <title-text :text="'按地市统计'"></title-text>
      <ul class="ads">
        <li v-for="item in adsData" :key="item.CODE">
          <span class="label">{{item.NAME}}</span>
          <el-tooltip placement="top">
            <div slot="content">达标:{{item.QUALIFIED}}个<br/>不达标:{{item.NOQUALIFIED}}个</div>
            <div>
              <span class="db" :style="{width:adsVal*item.QUALIFIED+'px'}"></span>
              <span class="bdb" :style="{width:adsVal*item.NOQUALIFIED+'px'}"></span>
            </div>
          </el-tooltip>
        </li>
      </ul>
      <div class="adsLegend">
        <span class="legend"></span>
        <span class="label">达标</span>
        <span class="legend"></span>
        <span class="label">不达标</span>
      </div>
    </div>
    <syd-center></syd-center>
    <div class="right">
      <title-text style="margin-top:30px" :text="'按合格数量类别统计'"></title-text>
      <div class="jcpjgs">
        <div class="label">监测评价个数</div>
        <div class="value">{{ahgsllbData.TOTAL | nullValue}}</div>
      </div>
      <div class="hggs">
        <div class="label">合格个数</div>
        <div class="value">{{ahgsllbData.QUALIFIED | nullValue}}</div>
      </div>
      <div class="szbl">
        <span class="label">所占比例</span>
        <div class="percentBox">
          <div class="back"></div>
          <div class="front" :style="{width:frontWidth}">
            <div v-if="frontWidth!=='0px'" class="light"></div>
          </div>
          <div class="value">{{ahgsllbData.PROPORTION}}%</div>
        </div>
      </div>
      <title-text style="margin-top:116px" :text="'按水质类别统计'"></title-text>
      <pie-chart :data="sydData" class="pieChart"></pie-chart>
      <div class="legend">
        <ul>
          <li>
            <span style="background-color:#0000fe" class="colorCircle"></span>
            <span class="text">I类</span>
          </li>
          <li>
            <span style="background-color:#0bfb00" class="colorCircle"></span>
            <span class="text">Ⅱ类</span>
          </li>
          <li>
            <span style="background-color:#ffff00" class="colorCircle"></span>
            <span class="text">Ⅲ类</span>
          </li>
          <li>
            <span style="background-color:#fe0000" class="colorCircle"></span>
            <span class="text">Ⅳ类</span>
          </li>
          <li>
            <span style="background-color:#ff00fe" class="colorCircle"></span>
            <span class="text">Ⅴ类</span>
          </li>
          <li>
            <span style="background-color:#777777" class="colorCircle"></span>
            <span class="text">劣Ⅴ类</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import TitleText from '../../components/TitleText'
import SydCenter from '../../components/SydCenter'
import PieChart from '../../components/PieChart'

export default {
  name: 'syd',
  components: { TitleText, SydCenter, PieChart },
  data () {
    return {
      //        sydData: {'total': 0,'Ⅴ': 0, 'Ⅲ': 0, 'Ⅳ': 0, 'Ⅰ': 0, 'Ⅱ': 0, '劣Ⅴ': 0},
      sydData: { 'total': '', 'Ⅴ': '', 'Ⅲ': '', 'Ⅳ': '', 'Ⅰ': '', 'Ⅱ': '', '劣Ⅴ': '' }, // 水质分类数据
      adsData: [
        //          {NAME:'广州市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'深圳市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'珠海市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'汕头市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'佛山市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'韶关市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'湛江市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'肇庆市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'江门市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'茂名市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'惠州市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'梅州市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'汕尾市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'河源市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'阳江市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'清远市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'东莞市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'中山市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'潮州市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'揭阳市',QUALIFIED:'',NOQUALIFIED:''},
        //          {NAME:'云浮市',QUALIFIED:'',NOQUALIFIED:''}
      ], // 按地市统计数据
      ahgsllbData: {
        QUALIFIED: '', // 合格个数
        PROPORTION: '', // 合格比例
        TOTAL: ''// 监测评价个数
      }
    }
  },
  filters: {},
  computed: {
    // 计算按地市数据长方形的宽度
    adsVal () {
      let valueArr = []
      this.adsData.forEach(item => {
        valueArr.push(item.QUALIFIED + item.NOQUALIFIED)
      })
      return 278 / Math.max(...valueArr)
    },
    // 计算合格数量类别数据比例条的宽度
    frontWidth () {
      return this.ahgsllbData.PROPORTION / 100 * 188 + 'px'
    }
  },
  methods: {
    // 请求水源地统计数据
    getSydInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'waterSourceController/getWrWsList.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.sydData = response.data.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求按地市数据
    getAdsData () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'waterSourceController/getQualified.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.adsData = response.data.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求按合格数量类别统计数据
    getAhgsllbData () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'waterSourceController/getNumData.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.ahgsllbData = response.data.data[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {},
  mounted () {
    this.getAdsData()
    this.getAhgsllbData()
    this.getSydInfo()
    let _this = this
    this.baseConfig.timer = setInterval(() => {
      _this.getAdsData()
      _this.getAhgsllbData()
      _this.getSydInfo()
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
      margin-top: 54px
      width: 427px
      height: 894px
      position: relative

      .ads
        color: #fff
        font-size: 22px
        text-align: left
        margin-top: 40px

        li
          margin-top: 12px

          div
            margin-left: 24px
            display: inline-block
            font-size: 0

            span
              display: inline-block
              height: 10px

            .db
              background-color: #92e2ff

            .bdb
              background-color: #9792ff

      .adsLegend
        position: absolute
        color: #fff
        font-size: 22px
        bottom: 43px
        right: 102px

        > span
          display: inline-block

        .legend
          width: 28px
          height: 10px
          margin: 0 10px 0 14px

          &:nth-child(1)
            background-color: #92e2ff

          &:nth-child(3)
            background-color: #9792ff

    .right
      float: right
      width: 426px
      color: #fff
      font-size: 18px
      position: relative
      margin: 28px 0 0 -55px
      text-align: left

      > div
        display: inline-block

        .label
          margin-left: 52px
          font-size: 22px

        .value
          font-family: Quartz
          font-size: 38px
          margin-top: 15px
          margin-left: 52px

      .jcpjgs
        width: 190px
        height: 68px
        margin: 40px 0 0 16px
        background: url('../../assets/images/jcpjgs.png') 0 center no-repeat

      .hggs
        width: 168px
        height: 68px
        margin: 40px 0 0 46px
        background: url('../../assets/images/hggs.png') 0 center no-repeat

      .szbl
        margin-top: 50px

        .label
          float: left
          font-size: 22px
          text-align: left
          margin-left: 9px
          height: 28px
          line-height: 28px

        .percentBox
          float: left
          height: 28px
          position: relative

          .back
            position: absolute
            width: 188px
            height: 6px
            border-radius: 3px
            background-color: #1d62e0
            top: 7px
            left: 15px

          .front
            position: absolute
            width: 0
            height: 6px
            border-radius: 3px
            background-color: #fff
            top: 7px
            left: 15px

            .light
              position: absolute
              right: -10px
              top: -9px
              width: 72px
              height: 23px
              background: url('../../assets/images/light.png') 0 center no-repeat

          .value
            position: absolute
            left: 167px
            top: -23px
            font-family: Quartz
            font-size: 38px

      .pieChart
        top: -60px
        left: 55px

      .legend
        color: #fff
        font-size: 22px
        position: absolute
        width: 187px
        bottom: 35px
        right: 145px

        ul
          li
            display: inline-block
            width: 90px
            height: 18px
            line-height: 18px
            text-align: left
            margin-bottom: 13px

          .colorCircle
            display: inline-block
            width: 13px
            height: 13px
            border-radius: 50%
</style>
