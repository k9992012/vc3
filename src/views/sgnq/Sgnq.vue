<template>
  <div class="content clearfix">
    <div class="left">
      <title-text :text="year+'年'+month+'月水质评价结果'"></title-text>
      <sgnq-left :type="type" :date="selectValFormat" :yz="yz"></sgnq-left>
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
          <span class="text">限制纳污评价</span>
        </div>
      </div>
      <div class="dbl">
        <title-text style="margin-top:24px" :text="'达标率'"></title-text>
        <div class="percent" v-for="item in dblList" :key="item.cityCode">
          <span class="city">{{item.cityName}}</span>
          <span class="back"></span>
          <span class="front" :style="{width:1.08*100*item.dbl+'px'}"></span>
          <span class="value">{{item.dbl | percent}}%</span>
        </div>
      </div>
      <div class="aszlb">
        <title-text style="margin-top:24px" :text="'按水质类别'"></title-text>
        <pie-chart :data="sydData" class="pieChart"></pie-chart>
        <div class="legend">
          <ul>
            <li>
              <span style="background-color:#10ffa8" class="colorCircle"></span>
              <span class="text">I类</span>
            </li>
            <li>
              <span style="background-color:#5c49ff" class="colorCircle"></span>
              <span class="text">Ⅱ类</span>
            </li>
            <li>
              <span style="background-color:#2099ff" class="colorCircle"></span>
              <span class="text">Ⅲ类</span>
            </li>
            <li>
              <span style="background-color:#ffec13" class="colorCircle"></span>
              <span class="text">Ⅳ类</span>
            </li>
            <li>
              <span style="background-color:#c35aff" class="colorCircle"></span>
              <span class="text">Ⅴ类</span>
            </li>
            <li>
              <span style="background-color:#ff4c22" class="colorCircle"></span>
              <span class="text">劣Ⅴ类</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="sgnq">
        <title-text style="margin-top:28px" :text="'按水功能区类型统计'"></title-text>
        <table>
          <tr>
            <td width="115" class="label">保护区</td>
            <td width="78" class="value">{{sgnqlxtj.bhq | percent}}%</td>
            <td width="115" class="label">保留区</td>
            <td width="78" class="value">{{sgnqlxtj.blq | percent}}%</td>
          </tr>
          <tr>
            <td class="label">缓冲区</td>
            <td class="value">{{sgnqlxtj.hcq | percent}}%</td>
            <td class="label">过渡区</td>
            <td class="value">{{sgnqlxtj.gdq | percent}}%</td>
          </tr>
          <tr>
            <td class="label">引用水源区</td>
            <td class="value">{{sgnqlxtj.yysyq | percent}}%</td>
            <td class="label">工业用水区</td>
            <td class="value">{{sgnqlxtj.gyysq | percent}}%</td>
          </tr>
          <tr>
            <td class="label">农业用水区</td>
            <td class="value">{{sgnqlxtj.nyysq | percent}}%</td>
            <td class="label">渔业用水区</td>
            <td class="value">{{sgnqlxtj.yyysq | percent}}%</td>
          </tr>
          <tr>
            <td colspan="3" class="label">景观娱乐用水区</td>
            <td class="value">{{sgnqlxtj.jgylysq | percent}}%</td>
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
import { mapMutations } from 'vuex'

export default {
  name: 'sgnq',
  components: { TitleText, PieChart, SgnqLeft },
  data () {
    return {
      year: new Date().getFullYear(), // 当前年份
      month: new Date().getMonth() + 1, // 当前月份
      selectShow: false, // 下拉列表显示/隐藏
      //        selectVal:'2018年12月',//下拉列表值
      //        selectList:['2018年12月','2018年11月','2018年10月','2018年9月','2018年8月','2018年7月','2018年6月'],//下拉列表数据
      sydData: { 'total': '', 'Ⅴ': '', 'Ⅲ': '', 'Ⅳ': '', 'Ⅰ': '', 'Ⅱ': '', '劣Ⅴ': '' }, // 水质类别数据
      dblList: [
        { cityName: '广州市', cityCode: '1', dbl: 0.8 },
        { cityName: '深圳市', cityCode: '2', dbl: 0.9 },
        { cityName: '东莞市', cityCode: '3', dbl: 0.7 }
      ], // 达标率列表
      type: '1', // 评价类型
      yz: '1', // 因子类型
      sgnqlxtj: {
        bhq: 0.91,
        blq: 0.92,
        hcq: 0.93,
        gdq: 0.94,
        yysyq: 0.94,
        gyysq: 0.93,
        nyysq: 0.93,
        yyysq: 0.91,
        jgylysq: 0.92
      }, // 水功能区类型统计
      tabsActiveIndex: 0, // 评价类型索引
      tabsPointActiveIndex: 0// 因子索引
    }
  },
  computed: {
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
      let formatMonth = ''
      if (this.month < 10) {
        formatMonth = '0' + this.month
      } else {
        formatMonth = this.month
      }
      return this.year + '-' + formatMonth
    },
    // 时间列表
    selectList () {
      let dateArr = []
      let date = new Date()
      date.setMonth(date.getMonth() + 1, 1)
      for (let i = 0; i < 12; i++) {
        date.setMonth(date.getMonth() - 1)
        let m = date.getMonth() + 1
        dateArr.push(date.getFullYear() + '年' + m + '月')
      }
      return dateArr
    }
  },
  filters: {},
  methods: {
    // store中改变水功能区日期
    ...mapMutations(['waterAreaDateChange']),
    // 水质评价切换
    tabsActive (index) {
      this.tabsActiveIndex = index
      switch (index) {
        case 0:
          this.type = '1'
          break
        case 1:
          this.type = '2'
          break
        case 2:
          this.type = '3'
          break
        case 3:
          this.type = '4'
          break
      }
    },
    // 双因子/限制纳污切换
    tabsPointActive (index) {
      this.tabsPointActiveIndex = index
      switch (index) {
        case 0:
          this.yz = '1'
          break
        case 1:
          this.yz = '2'
          break
      }
    },
    // 下拉列表选择
    select (val) {
      this.selectVal = val
      this.waterAreaDateChange(this.selectValFormat)
    },
    //
    getCgInfo (groId) {
      let _this = this
      let datas = { groId }
      this.axios.post(/api/ + 'waterFunctionZoneController/getWaterFunctionZone.do', JSON.stringify(datas), {
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
        })
        .catch(error => {
          console.log(error.message)
        })
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

  }
}
</script>
<style lang="stylus" scoped>
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
      margin-right: 88px
      position: relative

    .right
      float: left
      width: 800px
      color: #fff
      font-size: 18px
      position: relative

      .tabs
        float: left
        height: 38px
        margin: 22px 0 0 23px
        border: 2px solid #fff
        border-radius: 20px
        font-size: 0
        box-sizing: border-box

        span
          display: inline-block
          width: 114px
          height: 24px
          line-height: 24px
          color: #fff
          font-size: 13px
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
        width: 134px
        height: 192px
        margin: 22px 0 0 20px
        font-size: 13px
        position: absolute
        right: 146px
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
          width: 134px
          height: 38px
          line-height: 38px
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
          width: 134px
          box-sizing: border-box
          padding-top: 43px

          li
            height: 24px
            line-height: 24px
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
            font-size: 16px
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
          width: 240px
          margin-bottom: 12px
          text-align: left
          box-sizing: border-box
          padding-left: 24px
          position: relative

          .city
            font-size: 18px
            width: 60px
            height: 18px
            line-height: 18px

          .back
            width: 108px
            height: 8px
            position: absolute
            top: 5px
            left: 86px
            background-color: #4193ce

          .front
            height: 8px
            position: absolute
            top: 5px
            left: 86px
            background-color: #7cc8ff

          .value
            position: absolute
            top: 0
            right: 0

      .aszlb
        float: left
        position: relative

        .pieChart
          top: -79px
          left: 77px

        .legend
          color: #fff
          font-size: 17px
          position: absolute
          width: 150px
          bottom: 61px
          right: 55px

          ul
            li
              display: inline-block
              width: 72px
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
            font-size: 18px

          .value
            font-size: 24px
            color: #11f5ff
</style>
