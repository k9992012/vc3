<template>
  <div ref="main" style="width:590px;height:314px"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'pjjg-chart',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  computed: {
    chartData () {
      let chartData = {
        tm: [], // 时间
        qyz: [], // 全因子
        syz: [], // 双因子
        mb: this.data[0].WQGOALNM, // 水质目标
        mbVal: null// 目标对应数值
      }
      let _this = this
      // 目标数值转化
      this.data.forEach(item => {
        _this.formatAndPush(item.QYZWQGNM, chartData.qyz)
        _this.formatAndPush(item.SYZWQGNM, chartData.syz)
        chartData.tm.push(item.ASOT)
      })
      switch (this.data[0].WQGOALNM) {
        case 'Ⅰ':
          chartData.mbVal = 1
          break
        case 'Ⅱ':
          chartData.mbVal = 2
          break
        case 'Ⅲ':
          chartData.mbVal = 3
          break
        case 'Ⅳ':
          chartData.mbVal = 4
          break
        case 'Ⅴ':
          chartData.mbVal = 5
          break
        case '劣Ⅴ':
          chartData.mbVal = 6
          break
      }
      return chartData
    }
  },
  methods: {
    // 罗马数字转换为阿拉伯数字加入数组
    formatAndPush (val, arr) {
      switch (val) {
        case 'Ⅰ':
          arr.push(1)
          break
        case 'Ⅱ':
          arr.push(2)
          break
        case 'Ⅲ':
          arr.push(3)
          break
        case 'Ⅳ':
          arr.push(4)
          break
        case 'Ⅴ':
          arr.push(5)
          break
        case '劣Ⅴ':
          arr.push(6)
          break
      }
    },
    // 阿拉伯数字转罗马数字
    formatData (val) {
      switch (val) {
        case 1:
          return 'Ⅰ类'
        case 2:
          return 'Ⅱ类'
        case 3:
          return 'Ⅲ类'
        case 4:
          return 'Ⅳ类'
        case 5:
          return 'Ⅴ类'
        case 6:
          return '劣Ⅴ类'
      }
    },
    // 初始化图表
    initChart () {
      let myChart = echarts.init(this.$refs.main)
      myChart.clear()
      let _this = this
      let colors = ['#5daf62', '#3d85de', '#7054e5']
      let option = {
        color: colors,
        grid: {
          right: 35,
          bottom: 60,
          left: 50,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter (val) {
            let qyz = _this.formatData(val[0].value)
            let syz = _this.formatData(val[1].value)
            return val[0].axisValue + '<br>' + '全因子:' + qyz + '<br>' + '双因子:' + syz
          }
        },
        legend: {
          //            data: ['全因子', '双因子'],
          data: [
            { name: '全因子', icon: 'rect' },
            { name: '双因子', icon: 'rect' },
            { name: '水质目标', icon: 'rect' }
          ],
          bottom: 0,
          itemGap: 30,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 26,
          itemHeight: 10,
          selectedMode: false
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#b6d1ff'
              }
            },
            axisLabel: {
              color: '#fff'
            },
            data: this.chartData.tm
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 6,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#b6d1ff'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (value) {
                let label = _this.formatData(value)
                return label
              },
              //                show:false,
              color: '#fff'
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '全因子',
            type: 'line',
            areaStyle: {
              opacity: 0.2
            },
            symbol: 'none',
            smooth: true,
            data: this.chartData.qyz,
            markLine: {
              lineStyle: {
                color: '#7054e5',
                type: 'solid'
              },
              data: [
                [
                  {
                    name: this.chartData.mb + '类',
                    x: 50,
                    y: 40.67 * (6 - this.chartData.mbVal) + 10
                  },
                  {
                    x: 550,
                    y: 40.67 * (6 - this.chartData.mbVal) + 10,
                    symbol: 'triangle'
                  }
                ]
              ]
            }
          },
          {
            name: '双因子',
            type: 'line',
            areaStyle: {
              opacity: 0.2
            },
            symbol: 'none',
            smooth: true,
            data: this.chartData.syz
          },
          {
            name: '水质目标',
            type: 'line',
            areaStyle: {
              opacity: 0.2
            },
            symbol: 'none',
            smooth: true,
            data: []
          }
        ]
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

</style>
