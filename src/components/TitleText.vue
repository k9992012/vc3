<template>
  <div class="title">
    {{text|nullValue}}

  </div>
</template>
<script>
export default {
  name: 'title-text',
  components: {},
  props: ['text'],
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
  .title
    width: 350px
    height: 45px
    line-height: 69px
    background: url('../assets/images/title.png') 0 0 no-repeat
    font-size: 25px
    text-align: left
    text-indent: 24px
    color: #fff
</style>
