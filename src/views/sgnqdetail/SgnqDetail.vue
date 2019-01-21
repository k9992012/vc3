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
          <span class="label">所在行政区:</span>
          <span class="label">{{sydInfo.swsCd | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">水功能区代码:</span>
          <span class="label">{{sydInfo.whsManNm | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">水域类型:</span>
          <span class="label">{{sydInfo.wsObj | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">关联水源地:</span>
          <span class="label">{{sydInfo.desWw | dividedWan}}</span>
        </div>
        <div class="bItem">
          <span class="label">监测断面:</span>
          <span class="label">{{sydInfo.wqGoalNm | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">水质目标:</span>
          <span class="label">{{sydInfo.stNm | nullValue}}</span>
        </div>
        <div class="bItem">
          <span class="label">双因子/全因子评价结果:</span>
          <span class="label">{{sydInfo.syzWqgNm | nullValue}}</span>
          <span class="wdb">{{sydInfo.syzRts | yzFil}}</span>/
          <span class="label">{{sydInfo.qyzWqgNm | nullValue}}</span>
          <span class="wdb">{{sydInfo.qyzRts | yzFil}}</span>
          <span class="label">({{sydInfo.asot | nullValue}})</span>
        </div>
        <div class="bItem">
          <span class="label">超标项目与倍数:</span>
          <span class="label">{{sydInfo.stNm | nullValue}}</span>
        </div>
      </div>
      <title-text style="margin-top:34px" :text="'评价结果'"></title-text>
      <pjjg-chart :data="pjjgData" style="margin-top:34px;text-align: left"></pjjg-chart>
    </div>
    <div class="right">
      <div class="dmtxx">
        <title-text :text="'多媒体信息'"></title-text>
        <slide2 :data="dmt" v-if="slideShow"></slide2>
      </div>
      <div class="jcjg">
        <title-text style="margin-top:30px" :text="dateFormat+'监测结果'"></title-text>
        <table>
          <tr>
            <th width="260">监测指标</th>
            <th width="260">指标值</th>
          </tr>
          <tr v-for="(item,index) in jcjgLeft" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.val}}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th width="260">监测指标</th>
            <th width="260">指标值</th>
          </tr>
          <tr v-for="(item,index) in jcjgRight" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.val}}</td>
          </tr>
        </table>
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
  name: 'sgnq-detail',
  components: { TitleText, PjjgChart, Slide2 },
  data () {
    return {
      baseMapSrc: this.moduleConfig.mapPath + '#', // 三维页面基础路径
      slideShow: true, // 是否显示多媒体轮播图组件
      sydInfo: {// 基本信息数据
        asot: '',
        desWw: '',
        qyzRts: '',
        qyzWqgNm: '',
        stNm: '',
        swsCd: '',
        syzRts: '',
        syzWqgNm: '',
        wfrCd: '',
        wfzNm: '',
        whsManNm: '',
        wqGoalNm: '',
        wsObj: ''
      },
      pjjgData: [{
        ASOT: '', // 时间
        QYZWQGNM: '', // 全因子
        SYZWQGNM: '', // 双因子
        WQGOALNM: ''// 水质目标
      }], // 水质评价结果数据
      dmt: [], // 多媒体图片数据
      jcjg: [
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
      ]
      //        czActive:{//监测结果数据
      //          ARS: '',//
      //          CD: '',//
      //          CHLA: '',//
      //          CODCR: '',//
      //          CODMN: '',//高锰酸盐指数
      //          COND: '',//电导率
      //          CR6: '',//
      //          CU: '',//
      //          DOX: '',//溶解氧
      //          F: '',//
      //          HG: '',//
      //          NH3N: '',//氨氮
      //          NO2: '',//
      //          NO3: '',//硝酸盐氮
      //          PB: '',//
      //          PH: '',//ph
      //          SB: '',//
      //          SPT: '',//采样时间
      //          STCD: '',//测站编码
      //          STNM: '',//测站名称
      //          TN: '',//
      //          TOC: '',//
      //          TP: '',//
      //          TURB: '',//浊度
      //          VLPH: '',//
      //          WT: '',//温度
      //          ZN: ''//
      //        },
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
    ...mapState(['waterAreaId', 'waterAreaDate']),
    jcjgLeft () {
      return this.jcjg.slice(0, 16)
    },
    jcjgRight () {
      return this.jcjg.slice(16, 32)
    },
    dateFormat () {
      let date = new Date(this.waterAreaDate)
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
    }
  },
  methods: {
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
        'type': 'waterArea',
        'name': this.waterAreaId,
        'position': side
      }
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
    },
    // 请求基本信息数据
    getSydInfo (id) {
      let _this = this
      let datas = {
        swsCd: id
      }
      this.axios.post(this.moduleConfig.api + 'waterSourceController/getWaterSourceInfo.do', JSON.stringify(datas), {
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
      this.axios.post(this.moduleConfig.api + 'waterSourceController/getCountSwsData.do', JSON.stringify(datas), {
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
        swsCd: id
      }
      this.axios.post(this.moduleConfig.api + 'waterSourceController/getMediaByWsCd.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          response.data.data.forEach(item => {
            item.url = this.moduleConfig.api + 'waterSourceController/downloadFile.do?filePath=' + item.filePath + '&fileExt=' + item.fileExt + '&fileTitle=' + encodeURI(item.fileTitle)
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
    }
  },
  watch: {
    // 实时监听水功能区id
    waterAreaId (newVal) {
      this.getSydInfo(newVal)
      this.getPjjgData(newVal)
      this.getDmtData(newVal)
    }
  },
  mounted () {
    this.getSydInfo(this.waterAreaId)
    this.getPjjgData(this.waterAreaId)
    this.getDmtData(this.waterAreaId)
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
        table
          margin: 13px 20px 0 19px
          text-align: left
          border-collapse: inherit
          border-spacing: 3px
          float: left

          tr
            height: 20px
            line-height: 20px
            font-size: 12px

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
