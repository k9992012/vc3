<template>
  <div class="box">
    <div class="percent" :style="{height: 76*percent/100+'px'}"></div>
  </div>
</template>
<script>
export default {
  name: 'percent-square',
  components: {},
  props: ['percent'],
  data () {
    return {}
  },
  computed: {},
  methods: {},
  watch: {},
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
  .box
    height: 76px
    width: 38px
    position: relative
    background-color: #1a81c7
    border-radius: 6px
    display: inline-block

    .percent
      width: 38px
      position: absolute
      bottom: 0
      background-color: #2fc2ff
      border-radius: 6px
</style>
