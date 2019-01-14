<template>
  <div class="content clearfix">
    <h1>
      <img class="light lightLeft" src="../../assets/images/light.png" height="26" width="66"/>
      <img class="light lightRight" src="../../assets/images/light.png" height="26" width="66"/>
      <img class="grid" src="../../assets/images/square_left.png"/>
      <span>{{sydInfo.wfzNm | nullValue}}</span>
      <img class="grid" src="../../assets/images/square_right.png"/>
    </h1>
    <div class="left">
      <title-text style="margin-top:45px" :text="'基本信息'"></title-text>
      <div class="baseInfo">
        <div class="bItem">
          <span class="label">代码:</span>
          <span class="label">{{sydInfo.swsCd | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">管理单位:</span>
          <span class="label">{{sydInfo.whsManNm | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">供水对象:</span>
          <span class="label">{{sydInfo.wsObj | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">设计年供水量:</span>
          <span class="label">{{sydInfo.desWw | nullValue}}万m³</span>
        </div>
        <div class="bItem">
          <span class="label">水质目标:</span>
          <span class="label">{{sydInfo.wqGoalNm | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">双因子/全因子评价结果:</span>
          <span class="label">{{sydInfo.syzWqgNm | nullValue}}</span>
          <span class="wdb">{{sydInfo.syzRts | yzFil}}</span>/
          <span class="label">{{sydInfo.qyzWqgNm | nullValue}}</span>
          <span class="wdb">{{sydInfo.qyzRts | yzFil}}</span>
          <span class="label">({{sydInfo.asot | nullValue}})</span>
        </div>
        <!--<div class="bItem">-->
        <!--<span class="label">全因子评价结果:</span>-->
        <!--<span class="label">{{sydInfo.qyzWqgNm|nullValue}} ({{sydInfo.asot|nullValue}}) </span>-->
        <!--<span class="wdb">{{sydInfo.qyzRts|yzFil}}</span>-->
        <!--</div>-->
        <div class="bItem">
          <span class="label">监测断面:</span>
          <span class="label">{{sydInfo.stNm | nullValue}}</span>
        </div>
      </div>
      <title-text style="margin-top:34px" :text="'评价结果'"></title-text>
      <pjjg-chart :data="pjjgData" style="margin-top:34px;text-align: left"></pjjg-chart>
      <!--<ul class="tickLabel">-->
      <!--<li>劣Ⅴ类</li>-->
      <!--<li>Ⅴ类</li>-->
      <!--<li>Ⅳ类</li>-->
      <!--<li>Ⅲ类</li>-->
      <!--<li>Ⅱ类</li>-->
      <!--<li>I类</li>-->
      <!--</ul>-->
    </div>
    <div class="right">
      <div class="dmtxx">
        <title-text :text="'多媒体信息'"></title-text>
        <slide2 :data="dmt" v-if="slideShow"></slide2>
      </div>
      <div class="ssjcsj">
        <title-text :text="'实时监测数据'"></title-text>
        <ul class="siteBar">
          <li v-for="(item,index) in ssjc" :key="item.STCD" @click="active(index)" :class="{active:activeIndex===index}"
              :title="item.STNM">{{item.STNM}}
          </li>
        </ul>
        <ul class="pointBox">
          <li @click="activePoint(0)" class="point adPoint"></li>
          <li @click="activePoint(1)" class="point gmsyPoint"></li>
        </ul>
        <div class="focusBox" :class="{active:activePointIndex===0}">
          <span class="focus"></span>
          <div class="tooltip">
            <div class="tItem">
              <span class="label">氨氮(mg/L):</span>
              <span class="value">{{czActive.NH3N | nullValue}}</span>
            </div>
          </div>
        </div>
        <div class="focusBox gmsy" :class="{active:activePointIndex===1}">
          <div class="tooltip left">
            <div class="tItem">
              <span class="label">高锰酸盐指数(mg/L):</span>
              <span class="value">{{czActive.CODMN | nullValue}}</span>
            </div>
          </div>
          <span class="focus"></span>
        </div>
        <div class="cyTime">
          采样时间:{{czActive.SPT | time}}

        </div>
        <ul class="infoBox">
          <li>
            <div class="iconBox">
              <img src="../../assets/images/wd.png" class="icon" alt="wd">
            </div>
            <div class="info">
              <div class="label">温度</div>
              <div class="value">{{czActive.WT | nullValue}}<span class="unit">℃</span></div>
            </div>
          </li>
          <li>
            <div class="iconBox">
              <img src="../../assets/images/pH.png" class="icon" alt="pH">
            </div>
            <div class="info">
              <div class="label">pH</div>
              <div class="value">{{czActive.PH | nullValue}}</div>
            </div>
          </li>
          <li>
            <div class="iconBox">
              <img src="../../assets/images/rjy.png" class="icon" alt="rjy">
            </div>
            <div class="info">
              <div class="label">溶解氧</div>
              <div class="value">{{czActive.DOX | nullValue}}<span class="unit">mg/L</span></div>
            </div>
          </li>
          <li>
            <div class="iconBox">
              <img src="../../assets/images/ddl.png" class="icon" alt="ddl">
            </div>
            <div class="info">
              <div class="label">导电率</div>
              <div class="value">{{czActive.COND | nullValue}}<span class="unit">s/cm</span></div>
            </div>
          </li>
        </ul>
        <ul class="infoBoxRight">
          <li>
            <div class="iconBox">
              <img src="../../assets/images/zd.png" class="icon" alt="zd">
            </div>
            <div class="info">
              <div class="label">浊度</div>
              <div class="value">{{czActive.TURB | nullValue}}<span class="unit">m</span></div>
            </div>
          </li>
          <li>
            <div class="iconBox">
              <img src="../../assets/images/gmsyzs.png" class="icon" alt="gmsyzs">
            </div>
            <div class="info">
              <div class="label">高锰酸盐指数</div>
              <div class="value">{{czActive.CODMN | nullValue}}<span class="unit">mg/L</span></div>
            </div>
          </li>
          <li>
            <div class="iconBox">
              <img src="../../assets/images/ad.png" class="icon" alt="ad">
            </div>
            <div class="info">
              <div class="label">氨氮</div>
              <div class="value">{{czActive.NH3N | nullValue}}<span class="unit">mg/L</span></div>
            </div>
          </li>
          <li>
            <div class="iconBox">
              <img src="../../assets/images/xsyd.png" class="icon" alt="xsyd">
            </div>
            <div class="info">
              <div class="label">硝酸盐氮</div>
              <div class="value">{{czActive.NO3 | nullValue}}<span class="unit">mg/L</span></div>
            </div>
          </li>
        </ul>
        <img src="../../assets/images/sydLxhrh.png" alt="sydLxhrh">
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
import PjjgChart from '../../components/PjjgChart'
import Slide2 from '../../components/Slide2'
import BaseFun from '../../assets/js/base'
import { mapState } from 'vuex'

export default {
  name: 'syd-detail',
  components: { TitleText, PjjgChart, Slide2 },
  data () {
    return {
      baseMapSrc: BaseFun.mapPath + '#', // 三维页面基础路径
      slideShow: true, // 是否显示多媒体轮播图组件
      sydInfo: {// 基本信息
        asot: '', // 时间
        desWw: '', // 年供水量
        qyzRts: '', // 全因子评价结果   0 不达标   1 达标
        qyzWqgNm: '', // 全因子评价结果
        stNm: '', // 监测断面
        swsCd: '', // 水源地编
        syzRts: '', // 双因子评加价结果  0 不达标   1 达标
        syzWqgNm: '', // 双因子评价结果
        wfrCd: '', // 水功能区编码
        wfzNm: '', // 名称
        whsManNm: '', // 管理单位
        wqGoalNm: '', // 水质目标
        wsObj: ''// 供水对象
      },
      pjjgData: [{// 评价结果数据
        ASOT: '', // 时间
        QYZWQGNM: '', // 全因子
        SYZWQGNM: '', // 双因子
        WQGOALNM: ''// 水质目标
      }],
      dmt: [], // 多媒体图片数据
      ssjc: [], // 实时监测数据
      czActive: {// 当前测站数据
        ARS: '', //
        CD: '', //
        CHLA: '', //
        CODCR: '', //
        CODMN: '', // 高锰酸盐指数
        COND: '', // 电导率
        CR6: '', //
        CU: '', //
        DOX: '', // 溶解氧
        F: '', //
        HG: '', //
        NH3N: '', // 氨氮
        NO2: '', //
        NO3: '', // 硝酸盐氮
        PB: '', //
        PH: '', // ph
        SB: '', //
        SPT: '', // 采样时间
        STCD: '', // 测站编码
        STNM: '', // 测站名称
        TN: '', //
        TOC: '', //
        TP: '', //
        TURB: '', // 浊度
        VLPH: '', //
        WT: '', // 温度
        ZN: ''//
      },
      activeIndex: 0, // 测站索引
      activePointIndex: ''// 焦点索引
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
    },
    // 预警信息转化
    warning (val) {
      if (val === '' || val === undefined || val === null) {
        return '--'
      } else {
        switch (val) {
          case -1:
            return '超计划取水'
          case 0:
            return '取水许可证即将过期'
        }
      }
    }
  },
  computed: {
    // store中水源地id
    ...mapState(['waterSourceId'])
  },
  methods: {
    // 测站切换
    active (index) {
      this.activeIndex = index
      this.czActive = this.ssjc[index]
    },
    // 焦点切换
    activePoint (index) {
      this.activePointIndex = index
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
      let params = {
        'cmd': 'setView',
        'type': 'waterSrc',
        'name': this.waterSourceId,
        'position': side
      }
      //        window.frames['earthFrame'].src = this.baseMapSrc+JSON.stringify(params);
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
    },
    // 请求基本信息数据
    getSydInfo (id) {
      let _this = this
      //        let datas = {
      //          swsCd: id
      //        };
      this.axios.get(/api/ + 'waterSourceController/getWaterSourceInfo.do?swsCd=' + id, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.sydInfo = response.data.data[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 请求水质评价结果数据
    getPjjgData (id) {
      let _this = this
      let datas = {
        swsCd: id,
        startTime: BaseFun.formatDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000), 'yyyy-MM'),
        endTime: BaseFun.formatDate(new Date(), 'yyyy-MM')
      }
      this.axios.post(/api/ + 'waterSourceController/getCountSwsData.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.data.length > 0) {
            _this.pjjgData = response.data.data
          } else {
            _this.pjjgData = [{// 评价结果数据
              ASOT: '', // 时间
              QYZWQGNM: '', // 全因子
              SYZWQGNM: '', // 双因子
              WQGOALNM: ''// 水质目标
            }]
          }
        })
        .catch(error => {
          console.log(error.message)
          _this.pjjgData = [{// 评价结果数据
            ASOT: '', // 时间
            QYZWQGNM: '', // 全因子
            SYZWQGNM: '', // 双因子
            WQGOALNM: ''// 水质目标
          }]
        })
    },
    // 请求多媒体图片数据
    getDmtData (id) {
      let _this = this
      let datas = {
        swsCd: id
      }
      this.axios.post(/api/ + 'waterSourceController/getMediaByWsCd.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          response.data.data.forEach(item => {
            //              item.url=_/api/+'waterSourceController/downloadFile.do?filePath='+item.filePath+'&fileExt='+item.fileExt+'&fileTitle='+encodeURI(item.fileTitle);
            //              item.name=item.fileNm;
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
    // 请求实时监测数据
    getSsjcData (id) {
      let _this = this
      let datas = {
        swsCd: id
      }
      this.axios.post(/api/ + 'waterSourceController/getSwsWqData.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.ssjc = response.data.data
          _this.czActive = _this.ssjc[0]
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  watch: {
    // 实时监听水源地id
    waterSourceId (newVal) {
      this.getSydInfo(newVal)
      this.getPjjgData(newVal)
      this.getDmtData(newVal)
      this.getSsjcData(newVal)
    }
  },
  mounted () {
    this.getSydInfo(this.waterSourceId)
    this.getPjjgData(this.waterSourceId)
    this.getDmtData(this.waterSourceId)
    //      this.getDmtData(440303000001);
    this.getSsjcData(this.waterSourceId)
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

          .wdb
            display: inline-block
            height: 24px
            width: 64px
            line-height: 24px
            border-radius: 6px
            background-color: #f2a828
            text-align: center

    /*.tickLabel*/
    /*position:absolute*/
    /*height :246px*/
    /*bottom: 59px*/
    /*left: 37px*/
    /*li*/
    /*font-size :13px*/
    /*width: 40px*/
    /*text-align :right*/
    /*margin-bottom: 28px*/

    .right
      float: right
      width: 1234px
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

        > img
          width: 100%
          height: 318px
          margin-top: 30px
          border-radius: 18px
          box-shadow: 0 0 25px rgba(0, 0, 0, .35)

        .pointBox
          .point
            width: 93px
            height: 93px
            position: absolute
            /*border:1px solid #ddd*/
            cursor: pointer
            z-index: 2

          .adPoint
            top: 218px
            left: 498px

          .gmsyPoint
            top: 226px
            left: 839px

        .gmsy
        .focusBox.active
          display: block

        .focusBox
          display: none
          position: absolute
          top: 207px
          left: 499px

          .focus
            float: left
            position: relative
            top: 13px
            width: 93px
            height: 93px
            background: url('../../assets/images/focus.png') center no-repeat

          .tooltip
            box-sizing: border-box
            padding: 30px 32px
            text-align: left
            float: left
            height: 74px
            width: 219px
            margin-top: 22px
            background: url('../../assets/images/tooltipBox2.png') center no-repeat

            .tItem
              font-size: 14px

          .tooltip.left
            background: url('../../assets/images/tooltipBox2L.png') center no-repeat

        .focusBox.gmsy
          top: 217px
          left: 620px

        .cyTime
          box-sizing: border-box
          position: absolute
          top: 76px
          left: 419px
          border: 1px solid #fff
          font-size: 16px
          width: 330px
          height: 42px
          line-height: 42px
          border-bottom-left-radius: 36px
          border-bottom-right-radius: 36px
          background-color: rgba(0, 0, 0, 0.3)

        .infoBox
          position: absolute
          top: 84px
          left: -15px
          width: 182px
          height: 303px
          background: url('../../assets/images/b2.png') center no-repeat
          box-sizing: border-box
          padding: 37px 0 0 26px

          li
            height: 42px
            width: 130px
            font-size: 16px
            text-align: left
            margin-bottom: 18px

            > div
              float: left

            .iconBox
              text-align: center
              width: 32px
              height: 42px
              line-height: 42px

            .info
              margin-left: 6px

              .label
                margin-bottom: 7px

              .value
                font-size: 20px

                .unit
                  font-size: 16px

        .infoBoxRight
          position: absolute
          top: 84px
          right: -15px
          width: 182px
          height: 303px
          background: url('../../assets/images/br2.png') center no-repeat
          box-sizing: border-box
          padding: 37px 0 0 26px

          li
            height: 42px
            width: 134px
            font-size: 16px
            text-align: left
            margin-bottom: 18px

            > div
              float: left

            .iconBox
              text-align: center
              width: 32px
              height: 42px
              line-height: 42px

            .info
              margin-left: 6px

              .label
                margin-bottom: 7px

              .value
                font-size: 20px

                .unit
                  font-size: 16px

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
