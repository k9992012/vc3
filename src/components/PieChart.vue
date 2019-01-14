<template>
  <div ref="main" style="width:260px;height:400px"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'pie-chart',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 初始化百分比饼图
    initChart () {
      let myChart = echarts.init(this.$refs.main)
      myChart.clear()
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}个&nbsp;&nbsp;{d}%',
          textStyle: {
            color: '#fff',
            fontSize: 20
          },
          backgroundColor: 'rgba(0,0,0,.8)',
          borderColor: '#447fc4',
          borderWidth: 1
        },
        //          legend: {
        //            textStyle:{
        //              color:'#fff',
        //              fontSize:18
        //            },
        //            itemWidth:13,
        //            itemHeight:13,
        //            width:160,
        //            height:160,
        //            orient: 'horizontal',
        //            align:'left',
        //            left: 50,
        //            top:320,
        //            data: [' I类', 'Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类','劣Ⅴ类']
        //          },
        series: [
          {
            type: 'pie',
            radius: ['52%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
              //                emphasis: {
              //                  show: true,
              //                  textStyle: {
              //                    fontSize: '30',
              //                    fontWeight: 'bold'
              //                  }
              //                }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.data['Ⅰ'], name: 'Ⅰ类' },
              { value: this.data['Ⅱ'], name: 'Ⅱ类' },
              { value: this.data['Ⅲ'], name: 'Ⅲ类' },
              { value: this.data['Ⅳ'], name: 'Ⅳ类' },
              { value: this.data['Ⅴ'], name: 'Ⅴ类' },
              { value: this.data['劣Ⅴ'], name: '劣Ⅴ类' }
            ]
          }
        ],
        color: ['#10ffa8', '#5c49ff', '#2099ff', '#ffec13', '#c35aff', '#ff4c22']
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
