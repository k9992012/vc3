<template>
  <div class="content clearfix">
    <div class="left">
      <title-text :text="'取水户'"></title-text>
      <ul class="qshBox clearfix">
        <li class="qsh">
          <div class="label">取水户(按证)</div>
          <div class="value">{{qsh.WIU | nullValue}}</div>
        </li>
        <li class="jcd">
          <div class="label">监测点</div>
          <div class="value">{{qsh.CM | nullValue}}</div>
        </li>
        <li class="zxjcd">
          <div class="label">在线监测点</div>
          <div class="value">{{qsh.CONM | nullValue}}</div>
        </li>
        <li class="zxl">
          <div class="label">在线率</div>
          <div class="value">{{qsh.ONLINERATE | nullValue}}%</div>
        </li>
      </ul>
      <title-text style="margin-top:58px" :text="'与水利部数据交换'"></title-text>
      <!--<div class="date">{{year}}年{{month-1}}月</div>-->
      <div class="date">{{year}}年{{month}}月</div>
      <ul class="sjjhBox clearfix">
        <li>
          <percent-square :percent="slb.completionRate"></percent-square>
          <div class="value">{{slb.completionRate | nullValue}}%</div>
          <div class="label">完整率</div>
        </li>
        <li>
          <percent-square :percent="slb.reportingRate"></percent-square>
          <div class="value">{{slb.reportingRate | nullValue}}%</div>
          <div class="label">上报率</div>
        </li>
        <li>
          <percent-square :percent="slb.timeRate"></percent-square>
          <div class="value">{{slb.timeRate | nullValue}}%</div>
          <div class="label">及时率</div>
        </li>
      </ul>
      <title-text style="margin-top:50px" :text="'水质自动监测'"></title-text>
      <percent-hoop class="percentHoop" :percent="sz.ONLINEMONITORINGRATE|nullValue" :text="'在线率'" :height="156"
                    :width="156"></percent-hoop>
      <div class="zdjcz">
        <div class="value"><span>{{sz.ZDZS | nullValue}}</span>个</div>
        <div class="label">自动监测站</div>
      </div>
    </div>
    <!--<keep-alive>-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--</keep-alive>-->
    <div class="right">
      <title-text :text="yearSgnq+'年水功能达标率'"></title-text>
      <div class="tabs">
        <span @click="tabsActive(0)" :class="{active:tabsActiveIndex===0}">常规</span>
        <span @click="tabsActive(1)" :class="{active:tabsActiveIndex===1}">国家重要</span>
      </div>
      <div class="tabsPoint clearfix">
        <div @click="tabsPointActive(0)" :class="{active:tabsPointActiveIndex===0}">
          <span class="point"></span>
          <span class="text">双因子</span>
        </div>
        <div @click="tabsPointActive(1)" :class="{active:tabsPointActiveIndex===1}">
          <span class="point"></span>
          <span class="text">全因子</span>
        </div>
      </div>
      <percent-hoop class="percentHoop" :percent="activeData.STANDARDRATE|nullValue" :text="'达标率'" :height="180"
                    :width="180"></percent-hoop>
      <div class="sgnq">
        水功能区:<span>{{activeData.TOTAL | nullValue}}</span>个

      </div>
      <title-text style="margin-top:52px" :text="'水源地'"></title-text>
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
      <div class="syd">
        <span class="value">{{sydData.total | nullValue}}</span>个

        <div class="label">饮用水源地</div>
      </div>
    </div>
    <div class="btMenu">
      <ul>
        <li @click="active(0)" :class="{active:activeIndex===0}" class="first">取水户</li>
        <li @click="active(1)" :class="{active:activeIndex===1}">水功能区</li>
        <li @click="active(2)" :class="{active:activeIndex===2}">水源地</li>
        <li @click="active(3)" :class="{active:activeIndex===3}" class="last">行政断面</li>
      </ul>
    </div>
  </div>
</template>
<script>
import TitleText from '../../components/TitleText'
import PercentSquare from '../../components/PercentSquare'
import PercentHoop from '../../components/PercentHoop'
import PieChart from '../../components/PieChart'
import { mapState, mapMutations } from 'vuex'
//  import BaseFun from '../../common/js/base';
export default {
  name: 'zhzs',
  components: { TitleText, PercentSquare, PercentHoop, PieChart },
  data () {
    return {
      year: new Date().getFullYear(), // 当前年份
      yearSgnq: '--', // 水功能达标率年份
      month: new Date().getMonth() + 1, // 当前月份
      qsh: {// 取水户数据
        WIU: '', // 取水户数量
        CM: '', // 监测点数量
        CONM: '', // 监测点在线数量
        ONLINERATE: ''// 在线率
      },
      slb: {// 水利部数据
        completionRate: '', // 完成率
        reportingRate: '', // 上报率
        timeRate: ''// 及时率
      },
      sz: {// 水质自动测站统计数据
        ZDZS: '', // 站点总数
        ONLINEMONITORINGRATE: ''// 在线率
      },
      sgndbl: {
        SYZFW: '', // 双因子
        TOTAL: '', // 水功能区总数
        QYZFW: ''// 全因子
      }, // 常规检测水功能区统计数据（分常规和197两种）
      activeData: { TOTAL: '', STANDARDRATE: '' }, // 当前选择标准类型的数据
      syzActive: true, // 双因子是否被选中
      sydData: { 'total': '', 'Ⅴ': '', 'Ⅲ': '', 'Ⅳ': '', 'Ⅰ': '', 'Ⅱ': '', '劣Ⅴ': '' }, // 水质分类数据
      tabsActiveIndex: 0, // 类型索引
      tabsPointActiveIndex: 0, // 因子索引
      activeIndex: ''// 地图索引
    }
  },
  computed: {
    // store中地图索引
    ...mapState(['mapIndex'])
  },
  filters: {},
  methods: {
    // store中改变地图索引
    ...mapMutations(['mapIndexChange']),
    // 地图切换
    active (index) {
      this.activeIndex = index
      switch (index) {
        case 0:
          //            this.$router.push({name:'qsh-center'});
          this.$router.push({ name: 'index-center' })
          break
        case 1:
          this.$router.push({ name: 'sgnq-left' })
          break
        case 2:
          this.$router.push({ name: 'syd-center' })
          break
        case 3:

          break
      }
      this.mapIndexChange(index)
    },
    // 切换常规/197国家重要
    tabsActive (index) {
      this.tabsActiveIndex = index
      if (index === 0) {
        this.getCgInfo('DSE000000013')
      } else if (index === 1) {
        this.getCgInfo('DSE000000014')
      }
    },
    // 切换全因子/双因子
    tabsPointActive (index) {
      this.tabsPointActiveIndex = index
      if (index === 0) {
        this.syzActive = true
        this.activeData = { TOTAL: this.sgndbl.TOTAL, STANDARDRATE: this.sgndbl.SYZFW }
      } else if (index === 1) {
        this.syzActive = false
        this.activeData = { TOTAL: this.sgndbl.TOTAL, STANDARDRATE: this.sgndbl.QYZFW }
      }
    },
    // 请求取水户数据
    getQshInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'wiuOnlinMonit/getWiuOnlineSta.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.qsh = response.data.data[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求水利部数据
    getSlbInfo () {
      let _this = this
      //        let datas = {
      //          selectTime : BaseFun.formatDate(new Date(),'yyyy-MM')
      //        };
      let _year = this.year
      let _month = this.month
      if (_month < 10) {
        _month = '0' + _month
      }
      let datas = {
        selectTime: _year + '-' + _month
      }
      this.axios.post(this.baseConfig.api + 'dataExchangeController/getCountServiceMonitoringData.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.slb = response.data.data[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求水质数据
    getSzInfo () {
      let _this = this
      this.axios.post(this.baseConfig.api + 'WqStationAction/getWqStationConuts.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.sz = response.data.data[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求常规数据
    getCgInfo (groId) {
      let _this = this
      let datas = { groId }
      this.axios.post(this.baseConfig.api + 'waterFunctionZoneController/getWaterFunctionZone.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.sgndbl = response.data.data.wfz[0]
          if (this.syzActive) {
            _this.activeData = { TOTAL: _this.sgndbl.TOTAL, STANDARDRATE: _this.sgndbl.SYZFW }
          } else {
            _this.activeData = { TOTAL: _this.sgndbl.TOTAL, STANDARDRATE: _this.sgndbl.QYZFW }
          }
          _this.yearSgnq = _this.sgndbl.YY
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求水源地数据
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
    refreshTime () {
      setInterval(() => {
        this.year = new Date().getFullYear()
        this.month = new Date().getMonth() + 1
      }, 1000)
    }
  },
  watch: {
    mapIndex (newVal) {
      switch (newVal) {
        case '':
          this.activeIndex = ''
          break
      }
    }
  },
  mounted () {
    this.refreshTime()
    this.getQshInfo()
    this.getSlbInfo()
    this.getSzInfo()
    this.getCgInfo('DSE000000013')
    this.getSydInfo()
    let _this = this
    this.baseConfig.timer = setInterval(() => {
      _this.getQshInfo()
      _this.getSlbInfo()
      _this.getSzInfo()
      _this.getCgInfo('DSE000000013')
      _this.getSydInfo()
    }, this.baseConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.baseConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity: 0

  .content >>> .sgnqLeft
    height: 860px
    top: 35px
    margin-left: 0

  .content >>> .indexCenter
    width: 1120px

  .right >>> .box .circle .value
    margin-top: 25%

  .content
    margin-top: 10px
    position: relative
    height: 950px

    > div
      float: left

    .left
      box-sizing: border-box
      padding-left: 32px
      margin-top: 28px
      width: 427px

      .qshBox
        width: 406px

        li
          box-sizing: border-box
          float: left
          width: 203px
          height: 92px
          font-size: 22px
          color: #fff
          padding: 20px 0 0 72px
          text-align: left

          .value
            font-family: Quartz
            font-size: 46px
            line-height: 59px

        .qsh
          background: url('../../assets/images/qsh.png') 18px 40px no-repeat

        .jcd
          background: url('../../assets/images/jcd.png') 18px 40px no-repeat

        .zxjcd
          background: url('../../assets/images/zxjcd.png') 18px 40px no-repeat

        .zxl
          background: url('../../assets/images/zxl.png') 18px 40px no-repeat

      .date
        text-align: left
        color: #fff
        font-size: 22px
        text-indent: 24px
        line-height: 44px

      .sjjhBox
        padding: 28px 0 0 15px

        li
          width: 69px
          float: left
          margin: 0 28px

          div
            text-align: center
            color: #fff

          .value
            margin-top: 10px
            font-family: Quartz
            font-size: 30px

          .label
            margin-top: 5px
            font-size: 22px

      .percentHoop
        float: left
        margin: 32px 0 0 45px

      .zdjcz
        float: left
        height: 200px
        margin: 50px 0 0 45px
        color: #fff
        background: url('../../assets/images/zdjcz.png') center 0 no-repeat

        .value
          margin-top: 70px
          font-size: 29px

          span
            font-family: Quartz
            font-size: 40px

        .label
          font-size: 22px

    .right
      position: relative
      margin: 28px 21px 0 0
      float: right

      .tabs
        width: 240px
        height: 40px
        margin: 30px 0 0 57px
        border: 2px solid #fff
        border-radius: 20px
        font-size: 0

        span
          display: inline-block
          width: 114px
          height: 31px
          line-height: 31px
          color: #fff
          font-size: 22px
          background-color: #849ac1
          margin-top: 4px
          cursor: pointer

        :first-child
          border-top-left-radius: 15px
          border-bottom-left-radius: 15px
          margin-right: 3px

        :last-child
          border-top-right-radius: 15px
          border-bottom-right-radius: 15px

        .active
          background-color: #3b75c0

      .tabsPoint
        padding-left: 90px
        box-sizing: border-box
        margin-top: 15px

        div
          float: left
          margin-right: 30px
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

      .syd
        position: absolute
        color: #fff
        bottom: 235px
        right: 108px
        font-size: 28px

        .value
          margin-bottom: 6px
          display: inline-block

          span
            font-family: Quartz
            font-size: 40px

        .label
          font-size: 22px

      .percentHoop
        margin: 30px 0 0 100px

      .sgnq
        color: #fff
        font-size: 22px
        text-align: left
        text-indent: 114px
        margin-top: 20px

        span
          font-family: Quartz
          font-size: 40px

      .pieChart
        top: -60px
        left: 55px

      .legend
        color: #fff
        font-size: 17px
        position: absolute
        width: 180px
        bottom: 35px
        right: 74px

        ul
          li
            display: inline-block
            width: 87px
            height: 18px
            line-height: 18px
            text-align: left
            margin-bottom: 13px

          .colorCircle
            display: inline-block
            width: 13px
            height: 13px
            border-radius: 50%

          .text
            font-size: 22px

    .btMenu
      position: absolute
      bottom: 112px
      right: 560px
      width: 576px
      height: 67px
      background: url('../../assets/images/tab.png') center no-repeat

      ul
        position: relative
        top: 14px
        left: 15px

        li
          width: 134px
          height: 40px
          line-height: 40px
          background-color: #bec4d7
          color: #fff
          float: left
          margin-left: 2px
          cursor: pointer
          font-size: 24px

        .first
          border-top-left-radius: 20px
          border-bottom-left-radius: 20px

        .last
          border-top-right-radius: 20px
          border-bottom-right-radius: 20px

        .active
          background-color: #6caef7
</style>
