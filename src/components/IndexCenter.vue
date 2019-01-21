<template>
  <div class="center indexCenter">
    <div class="redPoint"></div>
    <flashing @click.native="toQshDetail" class="flashing"></flashing>
    <div class="jcsl">
      <div class="title">
        <div class="year">{{year}}年监测水量</div>
        <div class="time">{{time}}</div>
      </div>
      <div class="content">
        <span class="value">{{qsl.DAYW | wanToYiFour | nullValue}}</span>
        <span class="unit">亿m³</span>
      </div>
    </div>
  </div>
</template>
<script>
import Flashing from './Flashing'
import BaseFun from '../assets/js/base'
import { mapMutations } from 'vuex'

export default {
  name: 'index-center',
  components: { Flashing },
  props: [],
  data () {
    return {
      baseMapSrc: this.moduleConfig.mapPath + '#', // 三维图的基础路径
      qsl: {
        DAYW: ''// 监测水量
      },
      time: BaseFun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      year: new Date().getFullYear()
    }
  },
  filters: {},
  computed: {
    // 当前时间
    //      time(){
    //        return BaseFun.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
    //      },
    // 当前年份
    //      year(){
    //        return new Date().getFullYear();
    //      }
  },
  methods: {
    // store中改变取水户id,菜单索引
    ...mapMutations(['waterUserChange', 'menuIndexChange']),
    // 首页跳转至取水户详情
    toQshDetail () {
      this.menuIndexChange(2)
      this.waterUserChange('891209472001')
      this.$router.push({ name: 'qsh-detail' })
      this.changeMap({
        'cmd': 'setView',
        'type': 'waterUser',
        'name': '891209472001',
        'position': 'out'
      })
    },
    // 改变三维页面url的hash值
    changeMap (params) {
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
    },
    // 请求监测水量数据
    getQslInfo () {
      let _this = this
      let datas = {
        V_WPC_CD: '891209472001'
      }
      this.axios.post(this.moduleConfig.api + 'SsjkController/getSsjkGkxx.do', JSON.stringify(datas), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          _this.qsl = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    },
    refreshTime () {
      setInterval(() => {
        this.time = BaseFun.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        this.year = new Date().getFullYear()
      }, 1000)
    }
  },
  watch: {},
  mounted () {
    this.getQslInfo()
    this.refreshTime()
    let _this = this
    this.moduleConfig.timer = setInterval(() => {
      _this.getQslInfo()
    }, this.moduleConfig.refreshTime)
  },
  destroyed () {
    clearInterval(this.moduleConfig.timer)
  }
}
</script>
<style lang="stylus" scoped>
  .center
    position: relative
    margin-top: 35px
    width: 1079px
    height: 915px
    background: url('../assets/images/map.png') center 0 no-repeat

    .redPoint
      position: absolute
      top: 341px
      left: 669px
      width: 11px
      height: 15px
      background: url('../assets/images/red.png') center no-repeat

    .flashing
      position: absolute
      top: 292px
      left: 617px
      cursor: pointer

    .jcsl
      width: 486px
      height: 138px
      position: absolute
      bottom: 220px
      right: -32px

      .title
        height: 56px
        color: #fff
        font-size: 22px
        border-left: 6px solid #77a7ff
        padding-left: 15px

        > div
          text-align: left

        .year
          margin-bottom: 14px

      .content
        text-align: left
        color: #fff
        font-size: 35px

        .value
          font-family: Quartz
          font-size: 80px
          color: #fffc26
</style>
