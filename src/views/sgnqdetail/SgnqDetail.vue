<template>
  <div class="content clearfix">
    <h1>
      <img class="light lightLeft" src="../../assets/images/light.png" height="26" width="66"/>
      <img class="light lightRight" src="../../assets/images/light.png" height="26" width="66"/>
      <img class="grid" src="../../assets/images/square_left.png"/>
      <span>{{sgnqInfo.WFZNM | nullValue}}</span>
      <img class="grid" src="../../assets/images/square_right.png"/>
    </h1>
    <div class="left">
      <title-text style="margin-top:45px" :text="'基本信息'"></title-text>
      <div class="baseInfo">
        <div class="bItem">
          <span class="label">所在行政区:</span>
          <span class="label">{{sgnqInfo.ADDVCDNM | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">水功能区代码:</span>
          <span class="label">{{sgnqInfo.WFZCD | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">水域类型:</span>
          <span class="label">{{sgnqInfo.WATPNM | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">关联水源地:</span>
          <span class="label">{{sgnqInfo.SWSNM | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">监测断面:</span>
          <span class="label">{{sgnqInfo.STNMS | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">水质目标:</span>
          <span class="label">{{sgnqInfo.WFZWQTNM | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">双因子/全因子评价结果:</span>
          <span class="label">{{sgnqInfo.SYZWQGNM | nullValue}}</span>
          <span class="wdb">{{sgnqInfo.SYZRTS | yzFil}}</span>/
          <span class="label">{{sgnqInfo.QYZWQGNM | nullValue}}</span>
          <span class="wdb">{{sgnqInfo.QYZRTS | yzFil}}</span>
          <span class="label">({{sgnqInfo.ASOT | nullValue}})</span>
        </div>
        <div class="bItem">
          <span class="label">双因子/全因子超标项目与倍数:</span>
          <span class="label">{{sgnqInfo.SYZMESPEST | nullValue}}/</span>
          <span class="label">{{sgnqInfo.SYZMESPEST | nullValue}}</span>
        </div>
      </div>
      <title-text style="margin-top:34px" :text="'评价结果'"></title-text>
      <pjjg-chart-two :data="pjjgData" style="margin-top:34px;text-align: left"></pjjg-chart-two>
    </div>
    <div class="right">
      <div class="dmtxx">
        <title-text :text="'多媒体信息'"></title-text>
        <slide2 :data="dmt" v-if="slideShow"></slide2>
      </div>
      <div class="jcjg">
        <title-text style="margin-top:30px" :text="timeFormat+'监测结果'"></title-text>
        <ul class="siteBar">
          <li v-for="(item,index) in jcjg" :key="item.STCD" @click="active(index)" :class="{active:activeIndex===index}"
              :title="item.STNM">{{item.STNM}}
          </li>
        </ul>
        <table>
          <tr>
            <th width="260">监测指标</th>
            <th width="260">指标值</th>
          </tr>
          <!--<tr v-for="(item,index) in jcjgLeft" :key="index">-->
          <!--<td>{{item.name}}</td>-->
          <!--<td>{{item.val}}</td>-->
          <!--</tr>-->
          <tr>
            <td>水温(℃)</td>
            <td>{{czActive.WT|nullValue}}</td>
          </tr>
          <tr>
            <td>PH</td>
            <td>{{czActive.PH|nullValue}}</td>
          </tr>
          <tr>
            <td>溶解氧(mg/L)</td>
            <td>{{czActive.DOX|nullValue}}</td>
          </tr>
          <tr>
            <td>电导率(s/cm)</td>
            <td>{{czActive.COND|nullValue}}</td>
          </tr>
          <tr>
            <td>浊度(m)</td>
            <td>{{czActive.TURB|nullValue}}</td>
          </tr>
          <tr>
            <td>高锰酸盐指数(mg/L)</td>
            <td>{{czActive.CODMN|nullValue}}</td>
          </tr>
          <tr>
            <td>化学需氧量(mg/L)</td>
            <td>{{czActive.CODCR|nullValue}}</td>
          </tr>
          <tr>
            <td>五日生化需氧量(mg/L)</td>
            <td>{{czActive.BOD5|nullValue}}</td>
          </tr>
          <tr>
            <td>氨氮(mg/L)</td>
            <td>{{czActive.NH3N|nullValue}}</td>
          </tr>
          <tr>
            <td>总磷(mg/L)</td>
            <td>{{czActive.TP|nullValue}}</td>
          </tr>
          <tr>
            <td>总氮(mg/L)</td>
            <td>{{czActive.TN|nullValue}}</td>
          </tr>
          <tr>
            <td>铜(mg/L)</td>
            <td>{{czActive.CU|nullValue}}</td>
          </tr>
          <tr>
            <td>锌(mg/L)</td>
            <td>{{czActive.ZN|nullValue}}</td>
          </tr>
          <tr>
            <td>氟化物(mg/L)</td>
            <td>{{czActive.F|nullValue}}</td>
          </tr>
          <tr>
            <td>硒(mg/L)</td>
            <td>{{czActive.SE|nullValue}}</td>
          </tr>
          <tr>
            <td>砷(mg/L)</td>
            <td>{{czActive.ARS|nullValue}}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th width="260">监测指标</th>
            <th width="260">指标值</th>
          </tr>
          <!--<tr v-for="(item,index) in czActiveRight" :key="index">-->
          <!--<td>{{item.name|nullValue}}</td>-->
          <!--<td>{{item.val|nullValue}}</td>-->
          <!--</tr>-->
          <tr>
            <td>汞(mg/L)</td>
            <td>{{czActive.HG|nullValue}}</td>
          </tr>
          <tr>
            <td>镉(mg/L)</td>
            <td>{{czActive.CD|nullValue}}</td>
          </tr>
          <tr>
            <td>六价铬(mg/L)</td>
            <td>{{czActive.CR6|nullValue}}</td>
          </tr>
          <tr>
            <td>铅(mg/L))</td>
            <td>{{czActive.PB|nullValue}}</td>
          </tr>
          <tr>
            <td>氰化物(mg/L)</td>
            <td>{{czActive.CN|nullValue}}</td>
          </tr>
          <tr>
            <td>挥发酚(mg/L)</td>
            <td>{{czActive.VLPH|nullValue}}</td>
          </tr>
          <tr>
            <td>石油类(mg/L)</td>
            <td>{{czActive.OIL|nullValue}}</td>
          </tr>
          <tr>
            <td>阴离子表面活性剂(mg/L)</td>
            <td>{{czActive.LAS|nullValue}}</td>
          </tr>
          <tr>
            <td>硫化物(mg/L)</td>
            <td>{{czActive.S2|nullValue}}</td>
          </tr>
          <tr>
            <td>粪大肠菌群(个/L)</td>
            <td>{{czActive.FCG|nullValue}}</td>
          </tr>
          <tr>
            <td>硫酸盐(mg/L)</td>
            <td>{{czActive.SO4|nullValue}}</td>
          </tr>
          <tr>
            <td>氯化物(mg/L)</td>
            <td>{{czActive.CL|nullValue}}</td>
          </tr>
          <tr>
            <td>硝酸盐氮(mg/L)</td>
            <td>{{czActive.NO3|nullValue}}</td>
          </tr>
          <tr>
            <td>铁(mg/L)</td>
            <td>{{czActive.FE|nullValue}}</td>
          </tr>
          <tr>
            <td>锰(mg/L)</td>
            <td>{{czActive.MN|nullValue}}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <!--<div class="cjBtn">-->
      <!--<div @click="sideChange('inside')" style="margin-right:30px">测站内场景</div>-->
      <!--<div @click="sideChange('outside')">测站外场景</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import TitleText from '../../components/TitleText'
import PjjgChartTwo from '../../components/PjjgChartTwo'
import Slide2 from '../../components/Slide2'
// import BaseFun from '../../common/js/base';
import { mapState } from 'vuex'

export default {
  name: 'sgnq-detail',
  components: { TitleText, PjjgChartTwo, Slide2 },
  data () {
    return {
      baseMapSrc: this.moduleConfig.mapPath + '#', // 三维页面基础路径
      slideShow: true, // 是否显示多媒体轮播图组件
      sgnqInfo: {// 基本信息数据
        WFZNM: '', // 水源地名称
        ADDVCDNM: '', // 所在行政区划
        WFZCD: '', // 水功能区编码
        WATPNM: '', // 水域类型
        SWSNM: '', // 关联水源地
        STNMS: '', // 监测断面
        WFZWQTNM: '', // 水质目标
        QYZWQGNM: '', // 全因子评价结果
        QYZRTS: '', // 全因子是否达标
        SYZWQGNM: '', // 双因子评价结果
        SYZRTS: '', // 双因子是否达标
        ASOT: '', // 时间
        QYZMESPEST: '', // 全因子超标项目与倍数
        SYZMESPEST: '' // 双因子超标项目与倍数

      },
      pjjgData: [{
        ASOT: '', // 时间
        WFZWQT: '', // 全因子
        SYZWQGNM: '', // 双因子
        WQGOALNM: ''// 水质目标
      }], // 水质评价结果数据
      dmt: [], // 多媒体图片数据
      jcjg: [], // 监测结果数据
      czActive: {// 选定测站监测结果数据
        STNM: '', // 测站名
        STCD: '', // 测站编码
        F: '', // 氟化物(mg/L)
        CODMN: '', // 高锰酸盐指数(mg/L)
        S2: '', // 硫化物(mg/L)
        TN: '', // 总氮(mg/L)
        VLPH: '', // 挥发酚(mg/L)
        TP: '', // 总磷(mg/L)
        TURB: '', // 浊度(m)
        ZN: '', // 锌(mg/L)
        CODCR: '', // 化学需氧量(mg/L)
        ARS: '', // 砷(mg/L)
        FCG: '', // 粪大肠菌群(个/L)
        NH3N: '', // 氨氮(mg/L)
        OIL: '', // 石油类(mg/L)
        SPT: '', // 时间
        SO4: '', // 硫酸盐(mg/L)
        HG: '', // 汞(mg/L)
        SE: '', // 硒(mg/L)
        FE: '', // 铁(mg/L)
        CU: '', // 铜(mg/L)
        BOD5: '', // 五日生化需氧量(mg/L)
        WT: '', // 水温(℃)
        CR6: '', // 六价铬(mg/L)
        MN: '', // 锰(mg/L)
        LAS: '', // 阴离子表面活性剂(mg/L)
        PH: '', // pH
        NO3: '', // 硝酸盐氮(mg/L)
        CD: '', // 镉(mg/L)
        COND: '', // 电导率(s/cm)
        DOX: '', // 溶解氧(mg/L)
        CN: '', // 氰化物(mg/L)
        PB: '', // 铅(mg/L)
        CL: ''// 氯化物(mg/L)
      },
      activeIndex: 0// 测站索引
    }
  },
  filters: {
    // 评价结果转化
    yzFil (val) {
      if (val === '' || val === undefined || val === null) {
        return '--'
      } else {
        switch (val) {
          case '0':
            return '不达标'
          case '1':
            return '达标'
        }
      }
    }
    // 预警信息转化
    //      warning(val){
    //        if(val===''||val===undefined||val===null){
    //          return '--';
    //        }else{
    //          switch (val){
    //            case -1:
    //              return '超计划取水';
    //            case 0:
    //              return '取水许可证即将过期';
    //          }
    //        }
    //      }
  },
  computed: {
    // store中水功能区id，水功能区下拉列表选择时间
    // ...mapState(['waterAreaId', 'waterAreaDate']),
    // store中水功能区id
    ...mapState(['waterAreaId']),
    // jcjgLeft() {
    //   return this.jcjg.slice(0, 16);
    // },
    // jcjgRight() {
    //   return this.jcjg.slice(16, 32);
    // },
    // dateFormat() {
    //   let date = new Date(this.waterAreaDate);
    //   return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
    // }
    // 时间转换
    timeFormat () {
      let time = this.czActive.SPT
      if (time === '' || time === undefined || time === null) {
        return '--'
      } else {
        let year = time.split('-')[0]
        let month = time.split('-')[1]
        return `${year}年${parseInt(month)}月`
      }
    }
  },
  methods: {
    // 测站切换
    active (index) {
      this.activeIndex = index
      this.czActive = this.jcjg[index]
    },
    // //内外场景切换
    // sideChange(side) {
    //   if (side === 'inside') {
    //     this.changeMap('in');
    //   } else if (side === 'outside') {
    //     this.changeMap('out');
    //   }
    // },
    // 改变三维页面url的hash值
    changeMap (side) {
      let params = {
        'cmd': 'setView',
        'type': 'waterArea',
        'name': this.waterAreaId,
        'position': side
      }
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
    },
    // 请求基本信息数据
    getSgnqInfo (id) {
      let _this = this
      let datas = {
        wfzCd: id
      }
      this.axios.post(this.moduleConfig.api + 'waterFunctionZoneController/getWfzInfo.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.sgnqInfo = response.data.data[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求水质评价结果数据
    getPjjgData (id) {
      let _this = this
      let datas = {
        wfzCd: id
        // startTime: BaseFun.formatDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM'),
        // endTime: BaseFun.formatDate(new Date(), 'yyyy-MM')
      }
      this.axios.post(this.moduleConfig.api + 'waterFunctionZoneController/getWfzData.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.pjjgData = response.data.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求多媒体图片数据
    getDmtData (id) {
      let _this = this
      let datas = {
        wfzCd: id
      }
      this.axios.post(this.moduleConfig.api + 'waterFunctionZoneController/getImgsByWfzCd.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          response.data.data.forEach(item => {
            item.url = item.filePath
            item.name = item.fileNm
          })
          _this.dmt = response.data.data
          _this.slideShow = false
          _this.$nextTick(() => {
            _this.slideShow = true
          })
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求监测指标数据
    getJcjgData (id) {
      let _this = this
      let datas = {
        wfzCd: id
      }
      this.axios.post(this.moduleConfig.api + 'waterFunctionZoneController/getWfzIndex.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.jcjg = response.data.data
          _this.czActive = _this.jcjg[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {
    // 实时监听水功能区id
    waterAreaId (newVal) {
      this.getSgnqInfo(newVal)
      this.getPjjgData(newVal)
      this.getDmtData(newVal)
      this.getJcjgData(newVal)
    }
  },
  mounted () {
    this.getSgnqInfo(this.waterAreaId)
    this.getPjjgData(this.waterAreaId)
    this.getDmtData(this.waterAreaId)
    this.getJcjgData(this.waterAreaId)
    let _this = this
    this.moduleConfig.timer = setInterval(() => {
      _this.getSgnqInfo(this.waterAreaId)
      _this.getPjjgData(this.waterAreaId)
      _this.getDmtData(this.waterAreaId)
      _this.getJcjgData(this.waterAreaId)
    }, this.moduleConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.moduleConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .right >>> .box .circle .value
    margin-top: 25%

  .content
    margin-top: 10px
    position: relative
    color: #fff

    h1
      font-size: 0
      position: absolute
      margin-top: 10px
      width: 100%
      height: 71px
      line-height: 71px
      background: url('../../assets/images/bt.png') center no-repeat

      span
        display: inline-block
        font-size: 37px
        margin: 0 20px

      .grid
        position: relative
        top: -13px

      .light
        position: absolute

      .lightLeft
        top: -12px
        left: 1128px
        transform: rotate(180deg)
        animation: move 5s infinite linear

      .lightRight
        top: 57px
        left: 720px
        animation: move2 5s infinite linear

    > div
      float: left

    .left
      box-sizing: border-box
      padding-left: 32px
      margin-top: 34px
      width: 686px
      position: relative

      .baseInfo
        text-align: left
        padding: 15px 0 0 20px

        .bItem
          margin-top: 15px

          .label
            font-size: 22px

          .value
            font-size: 18px

          .wdb
            display: inline-block
            height: 28px
            /*width: 64px*/
            padding:0 5px
            line-height: 28px
            border-radius: 6px
            background-color: #f2a828
            text-align: center
            font-size: 22px

    .right
      float: right
      width: 1234px
      height: 684px
      color: #fff
      font-size: 18px
      position: relative
      margin: 118px 0 0 0

      > div
        float: left

      .dmtxx
        width: 1172px
        height: 250px
        font-size: 0

      .jcjg
        position: relative

        .siteBar
          font-size: 0
          position: absolute
          right: 23px
          top: 40px
          height: 42px
          border: 1px solid #fff
          box-sizing: border-box
          border-radius: 20px
          padding: 6px 3px 0 6px

          li
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size: 22px
            display: inline-block
            width: 82px
            height: 28px
            line-height: 28px
            margin-right: 2px
            padding:0 5px
            background-color: #8194b7
            cursor: pointer

            &:first-child
              border-top-left-radius: 14px
              border-bottom-left-radius: 14px

            &:last-child
              border-top-right-radius: 14px
              border-bottom-right-radius: 14px

          .active
            background-color: #3971b9

        table
          margin: 13px 20px 0 19px
          text-align: left
          border-collapse: inherit
          border-spacing: 3px
          float: left

          tr
            height: 24px
            line-height: 24px
            font-size: 20px

            th
              padding-left: 20px
              box-sizing: border-box
              background-color: #3f79e2
              font-weight: normal

            td
              padding-left: 20px
              box-sizing: border-box
              background-color: rgba(255, 255, 255, .1)

    .cjBtn
      font-size: 0

      div
        display: inline-block
        width: 279px
        height: 86px
        line-height: 122px
        margin-top: 72px
        font-size: 22px
        cursor: pointer
        background: url('../../assets/images/btBtn.png') center no-repeat

  @keyframes move
    80%
      opacity: 1
    100%
      left: 666px
      opacity: 0

  @keyframes move2
    80%
      opacity: 1
    100%
      left: 1198px
      opacity: 0
</style>
