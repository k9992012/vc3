<template>
  <div class="xxBox">
    <span class="prev" @click="prev"></span>
    <div class="slideBox">
      <ul ref="imgList" :style="{width:ulWidth,left:0}" v-viewer>
        <li v-for="(item,index) in data" :key="index">
          <img :src="item.url" :alt="item.name">
        </li>
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂1.jpg" alt="北兴水厂1.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂2.jpg" alt="北兴水厂2.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂3.jpg" alt="北兴水厂3.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂3-1.jpg" alt="北兴水厂3-1.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂4.jpg" alt="北兴水厂4.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂5.jpg" alt="北兴水厂5.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂6.jpg" alt="北兴水厂6.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂7.jpg" alt="北兴水厂7.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂8.jpg" alt="北兴水厂8.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂9.jpg" alt="北兴水厂9.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂10.jpg" alt="北兴水厂10.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterUserId==='891209472001'">-->
        <!--<img src="../../assets/images/waterUser_bx/北兴水厂11.jpg" alt="北兴水厂11.jpg"/>-->
        <!--</li>-->
      </ul>
    </div>
    <span class="next" @click="next"></span>
  </div>
</template>
<script>
// import {mapState} from 'vuex';

export default {
  name: 'slide',
  components: {},
  props: ['data'],
  data () {
    return {}
  },
  computed: {
    // 计算ul元素宽度
    ulWidth () {
      return this.data.length * 238 + 'px'
      // return 2856 + 'px';
    }
    // store中取水户id
    // ...mapState(['waterUserId'])
  },
  methods: {
    // 向左滑动
    prev () {
      let leftNow = parseInt(this.$refs.imgList.style.left)
      if (leftNow < 0) {
        this.$refs.imgList.style.left = leftNow + 238 + 'px'
      }
    },
    // 向右滑动
    next () {
      let boxWidth = parseInt(this.$refs.imgList.style.width)
      let leftNow = parseInt(this.$refs.imgList.style.left)
      if ((boxWidth - 714 + leftNow) / 238 > 0) {
        this.$refs.imgList.style.left = leftNow - 238 + 'px'
      }
    }
  },
  watch: {},
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
  .xxBox
    margin-top: 24px

    .slideBox
      display: inline-block
      width: 706px
      height: 175px
      overflow: hidden
      position: relative
      box-shadow: 0 0 25px rgba(0, 0, 0, .35)

      ul
        width: 0
        position: absolute
        left: 0
        top: 0
        transition: all .5s
        -moz-transition: all .5s
        -webkit-transition: all .5s
        -o-transition: all .5s

        li
          float: left
          width: 228px
          height: 175px
          margin-right: 10px
          border-radius: 6px
          overflow: hidden

          img
            width: 100%
            height: 100%

    > span
      display: inline-block
      width: 18px
      height: 175px
      cursor: pointer

    .prev
      margin-right: 10px
      background: url('../assets/images/prev.png') center no-repeat

    .next
      margin-left: 10px
      transform: rotate(180deg)
      background: url('../assets/images/prev.png') center no-repeat
</style>
