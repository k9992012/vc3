<template>
  <div class="xxBox">
    <span class="prev" @click="prev"></span>
    <div class="slideBox">
      <ul v-if="isShow" ref="imgList" :style="{width:ulWidth,left:0}">
        <!--<li v-for="(item,index) in data" :key="index">-->
        <!--<img :src="item.url" :alt="item.name">-->
        <!--</li>-->
        <li v-for="(item,index) in dataSmall" :key="index">
          <img @click="show(index)" :src="item.url" :alt="item.name">
        </li>
        <!--<li v-if="waterSourceId==='440607000001'">-->
        <!--<img src="../../assets/images/waterSrc_mk/2.jpg" alt="2.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterSourceId==='440607000001'">-->
        <!--<img src="../../assets/images/waterSrc_mk/3.jpg" alt="3.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterSourceId==='440607000001'">-->
        <!--<img src="../../assets/images/waterSrc_mk/4.jpg" alt="4.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterSourceId==='440607000001'">-->
        <!--<img src="../../assets/images/waterSrc_mk/5.jpg" alt="5.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterSourceId==='440607000001'">-->
        <!--<img src="../../assets/images/waterSrc_mk/6.jpg" alt="6.jpg"/>-->
        <!--</li>-->
        <!--<li v-if="waterSourceId==='440607000001'">-->
        <!--<img src="../../assets/images/waterSrc_mk/广州-佛山市西江水源地.jpg" alt="广州-佛山市西江水源地.jpg"/>-->
        <!--</li>-->
      </ul>
    </div>
    <span class="next" @click="next"></span>
    <div v-show="false" v-viewer class="images">
      <li v-for="(item,index) in data" :key="index">
        <img :src="item.url" :alt="item.name">
      </li>
    </div>
  </div>
</template>
<script>
// import {mapState} from 'vuex';

export default {
  name: 'slide',
  components: {},
  props: ['data'],
  data () {
    return {
      isShow: true
    }
  },
  computed: {
    // 计算ul元素宽度
    ulWidth () {
      return this.data.length * 238 + 'px'
      //        return 1428+'px';
    },
    // 缩略图对应url
    dataSmall () {
      let _this = this
      return this.data.map(function (item) {
        return {
          url: encodeURI(encodeURI(encodeURI(`${_this.baseConfig.api}wiuOnlinMonit/getThumbnailImg.do?url=${item.url}&width=288&height=175`))),
          name: item.name
        }
      })
    }
    // store中水源地id
    // ...mapState(['waterSourceId'])
  },
  methods: {
    // 显示viewer并切换到指定图片
    show (index) {
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
      viewer.view(index)
    },
    // 向左滑动
    prev () {
      let leftNow = parseInt(this.$refs.imgList.style.left)
      if (-leftNow > 64) {
        this.$refs.imgList.style.left = leftNow + 238 + 'px'
      } else if (-leftNow <= 64 && -leftNow > 0) {
        this.$refs.imgList.style.left = 0
      }
    },
    // 向右滑动
    next () {
      let boxWidth = parseInt(this.$refs.imgList.style.width)
      let leftNow = parseInt(this.$refs.imgList.style.left)
      if (boxWidth - 1116 + leftNow > 74) {
        this.$refs.imgList.style.left = leftNow - 238 + 'px'
      } else if (boxWidth - 1116 + leftNow <= 74 && boxWidth - 1116 + leftNow > 10) {
        this.$refs.imgList.style.left = leftNow - 64 + 'px'
      }
    }
  },
  watch: {
    data () {
      let _this = this
      this.isShow = false
      this.$nextTick(() => {
        _this.isShow = true
      })
    }
  },
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
  .xxBox
    margin-top: 24px

    .slideBox
      display: inline-block
      width: 1116px
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
