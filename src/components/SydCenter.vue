<template>
  <div class="center">
    <div class="box">
      <flashing @click.native="toQshDetail" class="flashing"></flashing>
      <div v-show="item.WQGOALNM!==null" class="point" v-for="item in mapData" :key="item.SWSCD"
           :style="{zIndex:(item.SWSCD==='440607000001'?3:2),backgroundColor:color(item.WQGOALNM),left:leftVal(item.LGTD),bottom:bottomVal(item.LTTD)}"></div>
    </div>
    <!--<div :style="{backgroundColor:color(syd[0])}" style="top:590px;left:80px"  name="'湛江市'" class="lightPoint zjs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[1])}" style="top:476px;left:182px" name="'茂名市'" class="lightPoint mms"></div>-->
    <!--<div :style="{backgroundColor:color(syd[2])}" style="top:481px;left:277px" name="'阳江市'" class="lightPoint yjs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[3])}" style="top:373px;left:277px" name="'云浮市'" class="lightPoint yfs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[4])}" style="top:271px;left:339px" name="'肇庆市'" class="lightPoint zqs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[5])}" style="top:168px;left:406px" name="'清远市'" class="lightPoint qys"></div>-->
    <!--<div :style="{backgroundColor:color(syd[6])}" style="top:443px;left:403px" name="'江门市'" class="lightPoint jms"></div>-->
    <!--<div :style="{backgroundColor:color(syd[7])}" style="top:354px;left:429px" name="'佛山市'" class="lightPoint fss"></div>-->
    <!--<div :style="{backgroundColor:color(syd[8])}" style="top:93px;left:513px" name="'韶关市'" class="lightPoint sgs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[9])}" style="top:461px;left:476px" name="'珠海市'" class="lightPoint zhs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[10])}" style="top:397px;left:478px" name="'中山市'" class="lightPoint zss"></div>-->
    <!--<div :style="{backgroundColor:color(syd[11])}" style="top:292px;left:496px" name="'广州市'" class="lightPoint gzs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[12])}" style="top:346px;left:555px" name="'东莞市'" class="lightPoint dgs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[13])}" style="top:407px;left:582px" name="'深圳市'" class="lightPoint szs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[14])}" style="top:315px;left:615px" name="'惠州市'" class="lightPoint hzs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[15])}" style="top:217px;left:677px" name="'河源市'" class="lightPoint hys"></div>-->
    <!--<div :style="{backgroundColor:color(syd[16])}" style="top:327px;left:759px" name="'汕尾市'" class="lightPoint sws"></div>-->
    <!--<div :style="{backgroundColor:color(syd[17])}" style="top:288px;left:823px" name="'揭阳市'" class="lightPoint jys"></div>-->
    <!--<div :style="{backgroundColor:color(syd[18])}" style="top:156px;left:819px" name="'梅州市'" class="lightPoint mzs"></div>-->
    <!--<div :style="{backgroundColor:color(syd[19])}" style="top:306px;left:891px" name="'汕头市'" class="lightPoint sts"></div>-->
    <!--<div :style="{backgroundColor:color(syd[20])}" style="top:219px;left:912px" name="'潮州市'" class="lightPoint czs"></div>-->
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
          <span style="background-color:#fff474" class="colorCircle"></span>
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
</template>
<script>
import Flashing from './Flashing'
import { mapMutations } from 'vuex'

export default {
  name: 'syd-center',
  components: { Flashing },
  props: [],
  data () {
    return {
      baseMapSrc: this.moduleConfig.mapPath + '#', // 三维图的基础路径
      // 广东省经纬度范围
      lttdMin: 20.2239426998,
      lttdMax: 25.5166667000,
      lgtdMin: 109.6690732241,
      lgtdMax: 117.1691894531,
      mapData: []// 水源地地图数据
      //        syd:[
      //          {name:'湛江市',state:'1'},
      //          {name:'茂名市',state:'2'},
      //          {name:'阳江市',state:'3'},
      //          {name:'云浮市',state:'4'},
      //          {name:'肇庆市',state:'5'},
      //          {name:'清远市',state:'6'},
      //          {name:'江门市',state:'1'},
      //          {name:'佛山市',state:'2'},
      //          {name:'韶关市',state:'3'},
      //          {name:'珠海市',state:'4'},
      //          {name:'中山市',state:'5'},
      //          {name:'广州市',state:'6'},
      //          {name:'东莞市',state:'1'},
      //          {name:'深圳市',state:'2'},
      //          {name:'惠州市',state:'3'},
      //          {name:'河源市',state:'4'},
      //          {name:'汕尾市',state:'5'},
      //          {name:'揭阳市',state:'6'},
      //          {name:'梅州市',state:'1'},
      //          {name:'汕头市',state:'2'},
      //          {name:'潮州市',state:'3'}
      //        ]
    }
  },
  filters: {},
  computed: {},
  methods: {
    // store中改变水源地id，菜单索引
    ...mapMutations(['waterSourceChange', 'menuIndexChange']),
    color (val) {
      // 按水质分类设置不同颜色
      switch (val) {
        case 'Ⅰ':
          return '#10ffa8'
        case 'Ⅱ':
          return '#5c49ff'
        case 'Ⅲ':
          return '#2099ff'
        case 'Ⅳ':
          return '#ffec13'
        case 'Ⅴ':
          return '#c35aff'
        case '劣Ⅴ':
          return '#ff4c22'
      }
    },
    // 计算水源地的显示定位(left值)
    leftVal (val) {
      return 954 / (this.lgtdMax - this.lgtdMin) * (val - this.lgtdMin) - 15 + 'px'
    },
    // 计算水源地的显示定位(bottom值)
    bottomVal (val) {
      return 730 / (this.lttdMax - this.lttdMin) * (val - this.lttdMin) - 15 + 'px'
    },
    // 请求水源地地图数据
    getMapData () {
      let _this = this
      this.axios.post(this.moduleConfig.api + 'waterSourceController/getSwsMapData.do', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.mapData = response.data.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    // 首页跳转至取水户详情
    toQshDetail () {
      this.menuIndexChange(4)
      this.waterSourceChange('440607000001')
      this.$router.push({ name: 'syd-detail' })
      this.changeMap({
        'cmd': 'setView',
        'type': 'waterSrc',
        'name': '440607000001',
        'position': 'out'
      })
    },
    // 改变三维页面url的hash值
    changeMap (params) {
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
    }
  },
  watch: {},
  mounted () {
    this.getMapData()
  }
}
</script>
<style lang="stylus" scoped>
  .center
    position: relative
    margin-top: 35px
    width: 1033px
    height: 915px
    background: url('../assets/images/map2.png') center 0 no-repeat

    .flashing
      position: absolute
      z-index: 4
      top: 274px
      left: 341px
      cursor: pointer

    > .box
      position: absolute
      width: 954px
      height: 730px
      top: 39px
      left: 38px

      .point
        position: absolute
        width: 30px
        height: 30px
        border-radius: 50%
        opacity: .9
        box-shadow: 0 0 40px rgba(255, 255, 255, 1)

    .lightPoint
      position: absolute
      height: 64px
      width: 64px
      border-radius: 50%
      opacity: .9
      box-shadow: 0 0 80px rgba(255, 255, 255, 1)

    .legend
      color: #fff
      font-size: 24px
      position: absolute
      width: 300px
      bottom: 200px
      right: 76px

      ul
        li
          display: inline-block
          width: 138px
          height: 28px
          text-align: left
          margin-bottom: 25px

          span
            float: left

          .text
            line-height: 30px
            margin-left: 12px

        .colorCircle
          display: inline-block
          width: 28px
          height: 28px
          border-radius: 50%
</style>
