<template>
  <div ref="main" style="width:590px;height:314px"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'sltj-chart',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 图表初始化
    initChart () {
      // 数据转换
      let xData = []// 横轴数据
      let sjqslData = []// 实际取水量
      let jhqsData = []// 计划取水
      let qsxknnfplData = []// 取水许可年内分配量
      let allData = []
      this.data.monthList.forEach((item) => {
        xData.push(item.dt)
        sjqslData.push(item.tw)
        allData.push(item.tw)
      })
      this.data.nextList.forEach((item) => {
        jhqsData.push(item.tw)
        allData.push(item.tw)
      })
      this.data.intDisList.forEach((item) => {
        qsxknnfplData.push(item.tw)
        allData.push(item.tw)
      })
      let myChart = echarts.init(this.$refs.main)
      myChart.clear()
      let colors = ['#5daf62', '#3d85de', '#7054e5']
      let option = {
        color: colors,
        grid: {
          right: 0,
          bottom: 90,
          left: 150,
          top: 12
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          textStyle: {
            fontSize: 22
          }
        },
        legend: {
          data: ['实际取水量', '计划取水', '取水许可年内分配量'],
          bottom: 0,
          itemGap: 30,
          textStyle: {
            color: '#fff',
            fontSize: 22
          },
          itemWidth: 26,
          itemHeight: 10
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#b6d1ff'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 22
            },
            //              data: ['2017-10', '2017-12', '2018-02', '2018-04', '2018-06', '2018-08', '2018-10']
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: Math.max(...allData),
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#b6d1ff'
              }
            },
            //              interval:100000,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value} m³',
              color: '#fff',
              fontSize: 22
            }
          }
        ],
        series: [
          {
            name: '实际取水量',
            type: 'bar',
            //              barWidth:13,
            //              data: [200000, 490000, 700000, 23200, 256000, 767000, 135600]
            data: sjqslData
          },
          {
            name: '计划取水',
            type: 'bar',
            //              barWidth:13,
            //              data: [260000, 590000, 90000, 264000, 287000, 707000, 175600]
            data: jhqsData
          },
          {
            name: '取水许可年内分配量',
            type: 'bar',
            //              barWidth:13,
            //              data: [200000, 220000, 300030, 400050, 600030, 100002, 200030]
            data: qsxknnfplData
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
