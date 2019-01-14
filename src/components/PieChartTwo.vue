<template>
  <div ref="main" style="width:164px;height:164px"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'pie-chart-two',
  components: {},
  props: ['data', 'color', 'type'],
  data () {
    return {
      ytData: {// 按用途统计的数据
        'GenerationWate': '', // 发电
        'ProcessWater': '', // 工业
        'WaterLife': '', // 生活
        'OtherWater': '', // 其他
        'AgriculturalWater': ''// 农业
      },
      syData: {// 按水源统计的数据
        'surfaceWater': '', // 地表水
        'groundWater': ''// 地下水
      }
    }
  },
  computed: {},
  methods: {
    initChart () {
      let chartData = []
      // 判断父组件传递的type参数，初始化饼图数据
      if (this.type === 'yt') {
        this.ytData = this.data
        chartData.push({
          name: '工业',
          value: this.ytData.ProcessWater
        })
        chartData.push({
          name: '农业',
          value: this.ytData.AgriculturalWater
        })
        chartData.push({
          name: '生活',
          value: this.ytData.WaterLife
        })
        chartData.push({
          name: '发电',
          value: this.ytData.GenerationWate
        })
        chartData.push({
          name: '其他',
          value: this.ytData.OtherWater
        })
      } else if (this.type === 'sy') {
        this.syData = this.data
        chartData.push({
          name: '地表',
          value: this.syData.surfaceWater
        })
        chartData.push({
          name: '地下',
          value: this.syData.groundWater
        })
      }
      let myChart = echarts.init(this.$refs.main)
      myChart.clear()
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{d}%',
          textStyle: {
            color: '#fff',
            fontSize: 20
          },
          backgroundColor: 'rgba(0,0,0,.8)',
          borderColor: '#447fc4',
          borderWidth: 1
        },
        series: [
          {
            type: 'pie',
            radius: ['47.56%', '87.8%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: chartData
          }
        ],
        color: this.color
      }
      myChart.setOption(option)
    }
  },
  watch: {
    data () {
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
