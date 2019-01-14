<template>
  <div class="box" :style="{width:width+'px',height:height+'px'}">
    <div ref="main" style="width:100%;height:100%"></div>
    <div class="circle">
      <div class="value">{{percent}}%</div>
      <div class="label">{{text}}</div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'percent-hoop',
  components: {},
  props: ['percent', 'text', 'width', 'height'],
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 初始化百分比环
    initChart () {
      let myChart = echarts.init(this.$refs.main)
      myChart.clear()
      let option = {
        animation: false,
        series: [{
          type: 'pie'
        }, {
          type: 'pie',
          radius: ['100%', '80%'],
          label: {
            normal: {
              show: false
            }
          },
          data: [{
            value: 1 - this.percent * 0.01,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            }
          }, {
            value: this.percent * 0.01,
            itemStyle: {
              normal: {
                color: '#1a81c7'
              }
            }
          }]
        }]
      }
      myChart.setOption(option)
    }
  },
  watch: {
    percent () {
      this.initChart()
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
<style lang="stylus" scoped>
  .box
    position: relative

    .circle
      top: 10%
      left: 10%
      height: 75%
      width: 75%
      position: absolute
      color: #fff
      border: 5px solid #2fc2ff
      border-radius: 50%

      .value
        margin-top: 20%
        font-family: Quartz
        font-size: 40px

      .label
        margin-top: 5%
        font-size: 18px
</style>
