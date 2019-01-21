<template>
  <div class="content clearfix">
    <h1>
      <img class="light lightLeft" src="../../assets/images/light.png" height="26" width="66"/>
      <img class="light lightRight" src="../../assets/images/light.png" height="26" width="66"/>
      <img class="grid" src="../../assets/images/square_left.png"/>
      <span>{{stationName | nullValue}}</span>
      <img class="grid" src="../../assets/images/square_right.png"/>
    </h1>
    <div class="left">
      <title-text style="margin-top:45px" :text="'基本信息'"></title-text>
      <div class="baseInfo">
        <div class="bItem">
          <span class="label">取水许可证编号:</span>
          <span class="label">{{qshInfo.wpcSn | nullValue}}</span>
          <span v-if="qshInfo.certCond" class="xinfa">{{qshInfo.certCond | certCond}}</span>
        </div>
        <div class="bItem">
          <span class="label">年许可水量:</span>
          <span class="label">{{qshInfo.yearWw | dividedWan}}万立方米/年</span>
        </div>
        <div class="bItem">
          <span class="label">有效期:</span>
          <span class="label">自{{qshInfo.intBd | nullValue}}至{{qshInfo.intDl | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">取水地点:</span>
          <span class="label">{{qshInfo.intAddr | nullValue}}</span>
          <span class="address"></span>
        </div>
        <div class="bItem">
          <span class="label">{{year}}年实际/许可水量:</span>
          <span class="label">{{qshInfo.yearWw | dividedWan}}/{{qshInfo.ww | nullValue}}万m³</span>
        </div>
        <div class="bItem">
          <span class="label">监测数量/不在线:</span>
          <span class="label">{{qshInfo.allNum | nullValue}}个/{{qshInfo.offlineTpNum | nullValue}}个</span>
        </div>
        <div class="bItem">
          <span class="label">预警信息:</span>
          <span v-if="qshInfo.al3!==1" class="warning">{{warningText}}</span>
          <span v-if="qshInfo.al3===1">--</span>
        </div>
      </div>
      <title-text style="margin-top:34px" :text="'水量统计'"></title-text>
      <sltj-chart :data="sltj" style="margin-top:34px;text-align: left"></sltj-chart>
    </div>
    <div class="right">
      <div class="dmtxx">
        <title-text :text="'多媒体信息'"></title-text>
        <slide :data="dmt" v-show="hdbxShow&&slideShow"></slide>
        <slide2 :data="dmt" v-show="!hdbxShow&&slideShow"></slide2>
      </div>
      <div v-show="hdbxShow" class="xcjkt" v-viewer>
        <title-text :text="'现场监控图'"></title-text>
        <!--<img :src="xcjk[0].url">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂1.jpg"/>-->
        <span class="time">{{xcjk[0].time}}</span>
        <!--<img :src="xcjk[1].url">-->
        <!--<img :src="xcjk[2].url">-->
        <!--<img :src="xcjk[3].url">-->
        <img v-for="(item,index) in xcjk" :src="item.url" :key="index" :alt="item.time">
      </div>
      <div v-show="!hdbxShow" class="xcjkt2">
        <title-text :text="'现场监控图'"></title-text>
        <ul>
          <li v-for="item in xcjk" :key="item.time">
            <img :src="item.url" :alt="item.time">
            <span class="time">{{item.time}}</span>
          </li>
        </ul>
      </div>
      <div v-show="hdbxShow" class="ssjcsj">
        <title-text :text="'实时监测数据'"></title-text>
        <ul class="siteBar">
          <li v-for="(item,index) in cdsl" :key="item.MPCD" @click="active(index)"
              :class="{active:index===activeIndex}">
            测点{{index + 1}}
          </li>
        </ul>
        <div class="focusBox">
          <span class="focus"></span>
          <div class="tooltip">
            <div class="title" :title="stationName|nullValue">{{stationName | nullValue}}</div>
            <div class="tItem">
              <span class="label">时间:</span>
              <span class="value">{{cdslActive.TM | time}}</span>
            </div>
            <div class="tItem">
              <span class="label">累计水量:</span>
              <span class="value">{{cdslActive.TOTAL | nullValue}}m³</span>
            </div>
          </div>
        </div>
        <img src="../../assets/images/qshHdbxzlsc.png" alt="qshHdbxzlsc">
      </div>
    </div>
    <div class="cjBtn">
      <div @click="sideChange('inside')" style="margin-right:30px">测站内场景</div>
      <div @click="sideChange('outside')">测站外场景</div>
    </div>
  </div>
</template>
<script>
import TitleText from '../../components/TitleText'
import SltjChart from '../../components/SltjChart'
import Slide from '../../components/Slide'
import Slide2 from '../../components/Slide2'
import BaseFun from '../../assets/js/base'
import { mapState } from 'vuex'

export default {
  name: 'qsh-detail',
  components: { TitleText, SltjChart, Slide, Slide2 },
  data () {
    return {
      hdbxShow: true, // 判断当前取水户是否为花都北兴自来水厂
      slideShow: true, // 判断显示哪个多媒体图片轮播组件
      baseMapSrc: this.moduleConfig.mapPath + '#', // 三维图的基础路径
      year: new Date().getFullYear(), // 当前年份
      time: BaseFun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'), // 当前时间
      qshInfo: {
        'wpcCd': '', // 取水许可证编码
        'wpcSn': '', // 取水许可证编编号
        'wrpNm': '', // 取水权人名称
        'certCond': '', // 证件状态  1新发 8变更 9延续
        'yearWw': '', // 年许可水量
        'al3': '', // 预警信息   0 预警（许可证即将过期） -1 报警（超计划取水或许可证过期）1 正常
        'alertType': '', // 预警信息  -2 未上报（超过24小时未上报数据） 否则就是正常
        'intBd': '', // 起始时间
        'intDl': '', // 结束时间
        'intAddr': '', // 取水地点
        'ww': '', // 许可水量
        'allNum': '', // 监测点总数
        'offlineTpNum': ''// 不在线数量
      },
      warningText: '',
      sltj: {
        monthList: [], // 实际取水量
        nextList: [], // 计划用水对比
        intDisList: []// 年内分配对比
      },
      dmt: [], // 多媒体图片数据
      xcjk: [// 现场监控图片数据
        { url: '', name: '' }
      ],
      cdsl: [// 各监测点数据
        { MPNM: '', TOTAL: '' }
      ],
      cdslActive: {// 当前监测点数据
        TOTAL: '',
        MPNM: '',
        TM: ''
      },
      activeIndex: 0// 当前监测点索引
    }
  },
  filters: {
    // 证件状态转化
    certCond (val) {
      if (val === '' || val === undefined || val === null) {
        return '--'
      } else {
        switch (val) {
          case '1':
            return '新发'
          case '8':
            return '变更'
          case '9':
            return '延续'
        }
      }
    }
  },
  computed: {
    // store中取水户id
    ...mapState(['waterUserId']),
    // 取水户名称
    stationName () {
      if (this.cdsl[0].MPNM !== '' && this.cdsl[0].MPNM !== undefined && this.cdsl[0].MPNM !== null) {
        if (this.cdsl[0].MPNM.includes('-')) {
          return this.cdsl[0].MPNM.split('-')[0]
        } else if (this.cdsl[0].MPNM.includes('_')) {
          return this.cdsl[0].MPNM.split('_')[0]
        } else {
          return this.cdsl[0].MPNM
        }
      } else {
        return '--'
      }
    }
  },
  methods: {
    // 测点切换
    active (index) {
      this.activeIndex = index
      this.cdslActive = this.cdsl[index]
    },
    // 内外场景切换
    sideChange (side) {
      if (side === 'inside') {
        this.changeMap('in')
      } else if (side === 'outside') {
        this.changeMap('out')
      }
    },
    // 改变三维页面url的hash值
    changeMap (side) {
      //        window.frames['earthFrame'].src = this.baseMapSrc+JSON.stringify(params);
      let params = {
        'cmd': 'setView',
        'type': 'waterUser',
        'name': this.waterUserId,
        'position': side
      }
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
    },
    // 预警信息转化
    warning () {
      let nDate = new Date().getTime()
      let intDl = new Date(this.qshInfo.intDl).getTime()
      let yearWw = this.qshInfo.yearWw / 10000
      let ww = this.qshInfo.ww
      let al3 = this.qshInfo.al3
      if (al3 === '' || al3 === undefined || al3 === null) {
        return '--'
      } else {
        switch (al3) {
          case -1:
            if (yearWw > ww && intDl < nDate) {
              return '超计划取水且许可证过期'
            } else if (intDl < nDate) {
              return '许可证过期'
            } else {
              return '超计划取水'
            }
          case 0:
            return '取水许可证即将过期'
        }
      }
    },
    // 请求取水户详情数据
    getQshInfo (id) {
      let _this = this
      //        let datas = {
      //          vwpccd: id
      //        };
      this.axios.get(this.moduleConfig.api + 'wiuOnlinMonit/getVWpcInfoAll.do?vwpccd=' + id, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.data) {
            _this.qshInfo = response.data.data[0]
            _this.warningText = _this.warning()
          } else {
            _this.qshInfo = {
              'wpcCd': '',
              'wpcSn': '',
              'wrpNm': '',
              'certCond': '',
              'yearWw': '',
              'al3': '',
              'alertType': '',
              'intBd': '',
              'intDl': '',
              'intAddr': '',
              'ww': '',
              'allNum': '',
              'offlineTpNum': ''
            }
            _this.warningText = ''
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求水量统计数据
    getSltjData (id) {
      let _this = this
      let datas = {
        vwpccd: id,
        startTime: BaseFun.formatDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd hh:mm:ss'),
        endTime: BaseFun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }
      this.axios.post(this.moduleConfig.api + 'wiuOnlinMonit/jcdData.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.sltj = response.data.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求多媒体图片数据
    getDmtData (id) {
      let _this = this
      let datas = {
        vwpccd: id
      }
      this.axios.post(this.moduleConfig.api + 'wiuOnlinMonit/getStaticImgURL.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
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
    // 请求现场监控图片数据
    getXcjkData (id) {
      let _this = this
      let datas = {
        vwpccd: id
      }
      this.axios.post(this.moduleConfig.api + 'wiuOnlinMonit/jdcImgPath.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.data) {
            _this.xcjk = response.data.data[0]
          } else {
            _this.xcjk = [
              { url: '', name: '' }
            ]
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求累计取水量数据
    getCdslData (id) {
      let _this = this
      let datas = {
        vwpccd: id
      }
      this.axios.post(this.moduleConfig.api + 'wiuOnlinMonit/getOriginalWw.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.data.length > 0) {
            _this.cdsl = response.data.data
            _this.cdslActive = _this.cdsl[0]
          } else {
            _this.cdsl = [
              { MPNM: '', TOTAL: '' }
            ]
            _this.cdslActive = {
              TOTAL: '',
              MPNM: '',
              TM: ''
            }
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {
    // 实时监听取水户id
    waterUserId (newVal) {
      this.getQshInfo(newVal)
      this.getSltjData(newVal)
      this.getDmtData(newVal)
      this.getXcjkData(newVal)
      this.getCdslData(newVal)
      //        if(newVal==='891209472001'){
      //          this.hdbxShow=true;
      //        }else{
      //          this.hdbxShow=false;
      //        }
    }
  },
  mounted () {
    this.getQshInfo(this.waterUserId)
    this.getSltjData(this.waterUserId)
    this.getDmtData(this.waterUserId)
    //      this.getDmtData('595839023001');
    this.getXcjkData(this.waterUserId)
    this.getCdslData(this.waterUserId)
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
            font-size: 20px

          .value
            font-size: 18px

          .xinfa
            padding: 0 10px
            height: 25px
            line-height: 25px
            display: inline-block
            font-size: 16px
            border-radius: 6px
            background-color: #288ce9
            position: relative
            margin-left: 8px
            text-align: center

          .address
            display: inline-block
            margin-left: 8px
            position: relative
            top: 3px
            width: 18px
            height: 24px
            background: url('../../assets/images/address.png') center no-repeat

          .warning
            display: inline-block
            height: 24px
            line-height: 24px
            border-radius: 6px
            background-color: #f55c5c
            text-align: center
            padding: 0 10px
            margin-right: 5px

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
        min-width: 762px
        height: 250px
        font-size: 0

      .xcjkt
        width: 372px
        height: 249px
        margin-left: 40px
        text-align: left
        position: relative
        overflow: hidden

        img
          margin: 24px 0 0 30px
          width: 340px
          height: 180px
          border-radius: 6px
          box-shadow: 0 0 25px rgba(0, 0, 0, .35)

        span
          position: absolute
          bottom: 8px
          right: 95px
          font-size: 16px

      .xcjkt2
        width: 1172px
        margin-top: 32px

        ul
          li
            float: left
            width: 268px
            height: 320px
            margin-top: 30px
            margin-right: 33px
            position: relative

            img
              width: 100%
              height: 100%
              border-radius: 8px
              box-shadow: 0 0 25px rgba(0, 0, 0, .35)

            .time
              position: absolute
              bottom: 13px
              right: 51px

          li:last-child
            margin-right: 0

      .ssjcsj
        width: 1172px
        height: 402px
        margin-top: 32px
        position: relative

        .siteBar
          font-size: 0
          position: absolute
          right: 0
          top: 10px
          height: 38px
          border: 1px solid #fff
          box-sizing: border-box
          border-radius: 20px
          padding: 6px 3px 0 6px

          li
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size: 14px
            display: inline-block
            width: 82px
            height: 24px
            line-height: 24px
            margin-right: 2px
            background-color: #8194b7
            cursor: pointer

            &:first-child
              border-top-left-radius: 11px
              border-bottom-left-radius: 11px

            &:last-child
              border-top-right-radius: 11px
              border-bottom-right-radius: 11px

          .active
            background-color: #3971b9

        img
          width: 100%
          height: 318px
          margin-top: 30px
          border-radius: 18px
          box-shadow: 0 0 25px rgba(0, 0, 0, .35)

        .focusBox
          position: absolute
          top: 140px
          left: 502px

          .focus
            float: left
            position: relative
            top: 13px
            width: 93px
            height: 93px
            background: url('../../assets/images/focus.png') center no-repeat

          .tooltip
            box-sizing: border-box
            padding: 30px 35px
            text-align: left
            float: left
            height: 121px
            width: 287px
            background: url('../../assets/images/tooltipBox.png') center no-repeat

            .title
              font-size: 18px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap

            .tItem
              font-size: 15px
              margin-top: 6px

    .cjBtn
      font-size: 0

      div
        display: inline-block
        width: 279px
        height: 86px
        line-height: 122px
        margin-top: 72px
        font-size: 23px
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
