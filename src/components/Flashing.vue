<template>
  <div class="box">
    <div class='circle circle--1' :class="{circleFixIe:isIe}"></div>
    <div class='circle circle--2' :class="{circleFixIe:isIe}"></div>
    <div class='circle circle--3' :class="{circleFixIe:isIe}"></div>
  </div>
</template>
<script>
export default {
  name: 'flashing',
  components: {},
  props: ['width', 'height'],
  data () {
    return {
      isIe: false
    }
  },
  computed: {},
  methods: {
    // 解决ie浏览器动画错位bug
    fixIeAnimation (live) {
      let _this = this
      this.$nextTick(() => {
        setTimeout(() => {
          _this.isIe = live
        }, 0)
      })
    }
  },
  watch: {},
  mounted () {
    this.fixIeAnimation(true)
  },
  destroyed () {
    this.fixIeAnimation(false)
  }
}
</script>
<style lang="stylus" scoped>
  .box
    width: 113px
    height: 113px
    position: relative
    transition: opacity 1s
    -ms-transition: opacity 1s

  .circleFixIe
    animation: flashing 2s infinite linear
    -ms-animation: flashing 2s infinite linear

  .circle
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    -ms-transform: translate(-50%, -50%)
    border-radius: 50%
    border: 1px solid #fcee94
    box-shadow: 0 0 40px #fcee94 inset

  .circle--1
    opacity: 1
    animation-delay: 0.12s
    -ms-animation-delay: 0.12s

  .circle--2
    opacity: 1
    animation-delay: 0.24s
    -ms-animation-delay: 0.24s

  .circle--3
    opacity: .5
    animation-delay: 0.36s
    -ms-animation-delay: 0.36s

  .circle--1
    width: 50%
    height: 50%

  .circle--2
    width: 75%
    height: 75%

  .circle--3
    width: 100%
    height: 100%

  @keyframes flashing
    0%
      transform: translate(-50%, -50%) scale(0.25)
    25%
      transform: translate(-50%, -50%) scale(0.5)
    50%
      transform: translate(-50%, -50%) scale(0.75)
    75%
      transform: translate(-50%, -50%) scale(1)

  @-ms-keyframes flashing
    0%
      -ms-transform: translate(-50%, -50%) scale(0.25)
    25%
      -ms-transform: translate(-50%, -50%) scale(0.5)
    50%
      -ms-transform: translate(-50%, -50%) scale(0.75)
    75%
      -ms-transform: translate(-50%, -50%) scale(1)
</style>
