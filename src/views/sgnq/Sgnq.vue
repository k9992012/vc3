<template>
  <div class="content clearfix">
    <div class="left">
      <title-text :text="szpjjgYear+'年'+'水质评价结果'"></title-text>
      <sgnq-left></sgnq-left>
    </div>
    <div class="right">
      <title-text style="margin-top:30px" :text="year+'年'+month+'月水质评价结果排名'"></title-text>
      <div class="tabs">
        <span @click="tabsActive(0)" :class="{active:tabsActiveIndex===0}">常规监测</span>
        <span @click="tabsActive(1)" :class="{active:tabsActiveIndex===1}">国考</span>
        <span @click="tabsActive(2)" :class="{active:tabsActiveIndex===2}">省考</span>
        <span @click="tabsActive(3)" :class="{active:tabsActiveIndex===3}">197国家重要</span>
      </div>
      <div @click.stop="selectShow=!selectShow" class="selectBox"
           :style="{borderColor:selectShow===true?'#fff':'transparent'}">
        <el-scrollbar style="height:100%">
          <ul v-show="selectShow">
            <li v-for="(item,index) in selectList" :key="index" @click="select(item)">{{item}}</li>
          </ul>
        </el-scrollbar>
        <span>
          {{selectVal}}
          <img :class="{reverse:selectShow}" src="../../assets/images/tDown.png" height="10" width="10"/>
        </span>
      </div>
      <div class="tabsPoint clearfix">
        <div @click="tabsPointActive(0)" :class="{active:tabsPointActiveIndex===0}">
          <span class="point"></span>
          <span class="text">双因子评价</span>
        </div>
        <div @click="tabsPointActive(1)" :class="{active:tabsPointActiveIndex===1}">
          <span class="point"></span>
          <span class="text" >全因子评价</span>
        </div>
        <span v-show="modalShow" class="modal"></span>
      </div>
      <div class="dbl">
        <title-text style="margin-top:24px" :text="'达标率'"></title-text>
        <div class="percent" v-for="item in dblList" :key="item.cityCode">
          <span class="city">{{item.DNAME}}</span>
          <span class="back"></span>
          <span class="front" :style="{width:1.08*(item.SYZRTS||item.QYZRTS)+'px'}"></span>
          <span class="value">{{item.SYZRTS||item.QYZRTS}}%</span>
        </div>
      </div>
      <div class="aszlb">
        <title-text style="margin-top:24px" :text="'按水质类别'"></title-text>
        <pie-chart :data="sgnqData" class="pieChart"></pie-chart>
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
      <div class="sgnq">
        <title-text style="margin-top:28px" :text="'按水功能区类型统计'"></title-text>
        <table>
          <tr>
            <td width="117" class="label">保护区</td>
            <td width="100" class="value">{{sgnqlxtj['保护区']|nullValue}}%</td>
            <td width="117" class="label">保留区</td>
            <td width="100" class="value">{{sgnqlxtj['保留区']|nullValue}}%</td>
          </tr>
          <tr>
            <td class="label">缓冲区</td>
            <td class="value">{{sgnqlxtj['缓冲区']|nullValue}}%</td>
            <td class="label">过渡区</td>
            <td class="value">{{sgnqlxtj['过渡区']|nullValue}}%</td>
          </tr>
          <tr>
            <td class="label">饮用水源区</td>
            <td class="value">{{sgnqlxtj['饮用水源区']|nullValue}}%</td>
            <td class="label">工业用水区</td>
            <td class="value">{{sgnqlxtj['工业用水区']|nullValue}}%</td>
          </tr>
          <tr>
            <td class="label">农业用水区</td>
            <td class="value">{{sgnqlxtj['农业用水区']|nullValue}}%</td>
            <td class="label">渔业用水区</td>
            <td class="value">{{sgnqlxtj['渔业用水区']|nullValue}}%</td>
          </tr>
          <tr>
            <td colspan="3" class="label">景观娱乐用水区</td>
            <td class="value">{{sgnqlxtj['景观娱乐用水区']|nullValue}}%</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import TitleText from '../../components/TitleText'
import PieChart from '../../components/PieChart'
import SgnqLeft from '../../components/SgnqLeft'
import { mapState } from 'vuex'
// import {mapMutations} from 'vuex';
// let nowDate = new Date();
// nowDate.setMonth(nowDate.getMonth()-1);
export default {
  name: 'sgnq',
  components: { TitleText, PieChart, SgnqLeft },
  data () {
    return {
      // yearFix: new Date().getFullYear(),//当前年份（固定）
      year: new Date().getFullYear(), // 当前年份
      month: new Date().getMonth() + 1, // 当前月份
      selectShow: false, // 下拉列表显示/隐藏
      //        selectVal:'2018年12月',//下拉列表值
      //        selectList:['2018年12月','2018年11月','2018年10月','2018年9月','2018年8月','2018年7月','2018年6月'],//下拉列表数据
      sgnqData: { 'total': '', 'Ⅴ': '', 'Ⅲ': '', 'Ⅳ': '', 'Ⅰ': '', 'Ⅱ': '', '劣Ⅴ': '' }, // 水质类别数据
      dblList: [], // 达标率列表
      groId: 'DSE000000013', // 评价类型
      tp: '1', // 因子类型
      sgnqlxtj: {}, // 水功能区类型统计
      tabsActiveIndex: 0, // 评价类型索引
      tabsPointActiveIndex: 0, // 因子索引
      selectList: [], // 日期下拉框
      modalShow: false// 禁止选择遮挡层
    }
  },
  computed: {
    // store中水质评价结果年份
    ...mapState(['szpjjgYear']),
    // 选择时间转换
    selectVal: {
      get () {
        return this.year + '年' + this.month + '月'
      },
      set (newValue) {
        let str = newValue.split('年')
        this.year = str[0]
        this.month = str[1].replace('月', '')
      }
    },
    // 时间转换
    selectValFormat () {
      // let formatMonth = '';
      // if (this.month < 10) {
      //   formatMonth = '0' + this.month;
      // } else {
      //   formatMonth = this.month;
      // }
      // return this.year + '-' + formatMonth;
      return this.year + '-' + this.month
    }
    // //时间列表
    // selectList() {
    //   let dateArr = [];
    //   let date = new Date();
    //   date.setMonth(date.getMonth() + 1, 1);
    //   for (let i = 0; i < 12; i++) {
    //     date.setMonth(date.getMonth() - 1);
    //     let m = date.getMonth() + 1;
    //     dateArr.push(date.getFullYear() + '年' + m + '月');
    //   }
    //   return dateArr;
    // }
  },
  filters: {},
  methods: {
    // store中改变水功能区日期
    // ...mapMutations(['waterAreaDateChange']),
    // 水质评价切换
    tabsActive (index) {
      this.tabsActiveIndex = index
      this.modalShow = false
      switch (index) {
        case 0:
          this.groId = 'DSE000000013'// 常规监测
          break
        case 1:
          this.groId = 'DSE000000011'// 国考
          break
        case 2:
          this.groId = 'DSE000000012'// 省考
          this.tabsPointActive(0)
          this.modalShow = true
          break
        case 3:
          this.groId = 'DSE000000014'// 197国家重要
          break
      }
      this.getInfo()
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
      this.getInfo()
    },
    // 下拉列表选择
    select (val) {
      this.selectVal = val
      // this.waterAreaDateChange(this.selectValFormat);
      this.getInfo()
    },
    // 请求右侧数据
    getInfo (first) {
      let _this = this
      let datas = {
        ts: this.selectValFormat,
        groId: this.groId,
        tp: this.tp
      }
      this.axios.post(this.baseConfig.api + 'waterFunctionZoneController/getWfzAll.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (_this.tp === '1') {
            _this.dblList = response.data.data[0].Citylist.sort(_this.sortSyz)
          } else if (_this.tp === '2') {
            _this.dblList = response.data.data[0].Citylist.sort(_this.sortQyz)
          }
          _this.sgnqlxtj = response.data.data[0].WfzRatelist[0]
          _this.sgnqData = response.data.data[0].WfzTplist
          if (_this.sgnqlxtj['日期'] && first) {
            _this.year = _this.sgnqlxtj['日期'].split('-')[0]
            _this.month = _this.sgnqlxtj['日期'].split('-')[1]
            _this.selectListFun()
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 时间列表
    selectListFun () {
      let dateArr = []
      let date = new Date(this.year + '-' + this.month)
      date.setMonth(date.getMonth() + 1, 1)
      for (let i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1)
        let m = date.getMonth() + 1
        dateArr.push(date.getFullYear() + '年' + m + '月')
      }
      this.selectList = dateArr
    },
    // 按全因子达标率降序排序
    sortQyz (b, a) {
      return a.QYZRTS - b.QYZRTS
    },
    // 按双因子达标率降序排序
    sortSyz (b, a) {
      return a.SYZRTS - b.SYZRTS
    },
    // 刷新时间
    refreshTime () {
      setInterval(() => {
        this.yearFix = new Date().getFullYear()
      }, 1000)
    }
  },
  watch: {},
  created () {
    // 点击空白部分收起下拉列表
    let body = document.querySelector('body')
    body.addEventListener('click', () => {
      this.selectShow = false
    }, false)
  },
  mounted () {
    this.refreshTime()
    this.getInfo(true)
    let _this = this
    this.baseConfig.timer = setInterval(() => {
      _this.getInfo()
    }, this.baseConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.baseConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .left >>> .center
    height: 860px
    top: -60px
    left: -40px

  .right >>> .title
    width: 360px

  .right .dbl >>> .title
    width: 342px
    margin-bottom: 20px

  .right >>> .el-scrollbar__wrap
    overflow-x: hidden

  .content
    margin-top: 10px

    > div
      float: left

    .left
      box-sizing: border-box
      padding-left: 32px
      margin-top: 50px
      margin-right: -34px
      position: relative

    .right
      float: left
      width: 800px
      color: #fff
      font-size: 22px
      position: relative

      .tabs
        float: left
        height: 42px
        margin: 22px 0 0 23px
        border: 2px solid #fff
        border-radius: 20px
        font-size: 0
        box-sizing: border-box

        span
          display: inline-block
          width: 139px
          height: 28px
          line-height: 28px
          color: #fff
          font-size: 22px
          background-color: #849ac1
          margin-top: 5px
          margin-right: 3px
          cursor: pointer

        :first-child
          border-top-left-radius: 15px
          border-bottom-left-radius: 15px
          margin-left: 4px

        :last-child
          border-top-right-radius: 15px
          border-bottom-right-radius: 15px
          margin-right: 4px

        .active
          background-color: #3b75c0

      .selectBox
        width: 168px
        height: 162px
        margin: 22px 0 0 20px
        font-size: 22px
        position: absolute
        right: 28px
        text-align: left
        z-index: 2
        border: 1px solid #fff
        border-top: 0
        border-radius: 20px
        border-bottom-left-radius: 8px
        border-bottom-right-radius: 8px
        overflow: hidden

        span
          position: absolute
          top: 0
          left: 0
          display: inline-block
          width: 168px
          height: 42px
          line-height: 42px
          border: 1px solid #fff
          border-radius 20px
          box-sizing: border-box
          padding-left: 16px
          cursor: pointer
          background-color: #04307f
          z-index: 2

          img
            position: absolute
            right: 12px
            top: 13px
            transition: transform .3s
            transform: rotate(0deg)

            &.reverse
              transform: rotate(180deg)

        ul
          width: 168px
          box-sizing: border-box
          padding-top: 43px

          li
            height: 32px
            line-height: 32px
            padding-left: 16px
            cursor: pointer

            &:hover
              background-color: #4da3ff

            &.active
              background-color: #4da3ff

      .tabsPoint
        padding-left: 124px
        box-sizing: border-box
        margin-top: 74px
        position: relative

        .modal
          width: 147px
          height: 33px
          cursor: not-allowed
          position: absolute
          bottom: -7px
          left: 308px

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

      .dbl
        float: left
        height: 700px

        .percent
          width: 268px
          margin-bottom: 9px
          text-align: left
          box-sizing: border-box
          padding-left: 24px
          position: relative

          .city
            font-size: 22px
            width: 60px
            height: 18px
            line-height: 18px

          .back
            width: 108px
            height: 8px
            position: absolute
            top: 5px
            left: 98px
            background-color: #4193ce

          .front
            height: 8px
            position: absolute
            top: 5px
            left: 98px
            background-color: #7cc8ff

          .value
            position: absolute
            top: 0
            right: -22px

      .aszlb
        float: left
        position: relative

        .pieChart
          top: -79px
          left: 77px

        .legend
          color: #fff
          font-size: 22px
          position: absolute
          width: 188px
          bottom: 61px
          right: 55px

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

      .sgnq
        float: left
        margin-top: -70px

        table
          margin: 10px 0 0 23px

          td
            height: 40px
            line-height: 40px

          .label
            font-size: 22px

          .value
            font-size: 24px
            color: #11f5ff
</style>
