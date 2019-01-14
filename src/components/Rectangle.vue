<template>
  <div class="rectangle">
    <svg width="30px" height="204px">
      <polygon @mouseover="over" @mouseout="out" class="front"
               :points="`11,${val-20}, 30,${val-9}, 20,${val-1}, 0,${val-13}`" :style="{fill:color[0]}"></polygon>
      <polygon @mouseover="over" @mouseout="out" class="right"
               :points="`0,${val-13}, 20,${val-1}, 20,204, 0,192`" :style="{fill:color[1]}"></polygon>
      <polygon @mouseover="over" @mouseout="out" class="top"
               :points="`20,${val-1}, 30,${val-9}, 30,196, 20,204`" :style="{fill:color[2]}"></polygon>
    </svg>
    <div v-show="tooltip&&tooltipShow" class="tooltip" :style="{top:val-90+'px'}">
      <span class="label">行政区划:</span>
      <span class="value">{{name}}</span>
      <span v-if='!isSz' class="label">监测水量:</span>
      <span v-else class="label">达标率:</span>
      <span v-if='!isSz' class="value">{{this.value | wanToYiTwo}}亿m³</span>
      <span v-else class="value">{{this.value}}%</span>
      <img src="../assets/images/arrow1.png" alt="arrow1">
    </div>
  </div>
</template>
<script>
export default {
  name: 'rectangle',
  components: {},
  props: ['value', 'max', 'name', 'tooltip', 'color', 'isSz'],
  data () {
    return {
      // 按比例计算出长方体的高度
      val: 204 - 183 / this.max * this.value,
      tooltipShow: false
    }
  },
  filters: {},
  computed: {},
  methods: {
    // 显示tooltip
    over () {
      this.tooltipShow = true
    },
    // 隐藏tooltip
    out () {
      this.tooltipShow = false
    }
  },
  watch: {},
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
  .rectangle
    position: relative

    .tooltip
      position: absolute
      z-index: 2
      left: -61px
      width: 152px
      height: 56px
      border-radius: 4px
      color: #fff
      background-color: #3b7ae0
      padding: 10px
      box-sizing: border-box
      box-shadow: 0 0 10px rgba(255, 255, 255, .5)

      span
        color: #fff
        font-size: 14px
        float: left
        margin-bottom: 8px

      .label
        font-weight: bold
        width: 66px

      .value
        width: 66px

      img
        position: absolute
        bottom: -10px
        left: 65px
</style>
