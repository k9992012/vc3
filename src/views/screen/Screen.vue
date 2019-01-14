<template>
  <div class="mainBox">
    <div class="topScreen">
      <img class="moon" src="../../assets/images/moon.png">
      <ul class="menu">
        <li @click="active(1)" :class="{active:activeIndex===1}" class="btn item leftOutSide">首页</li>
        <li @click="active(2)" :class="{active:activeIndex===2}" class="btn item leftInSide">取水户</li>
        <li class="m-btn">广东省水资源监控值班系统</li>
        <li @click="active(3)" :class="{active:activeIndex===3}" class="btn item rightInSide">水功能区</li>
        <li @click="active(4)" :class="{active:activeIndex===4}" class="btn item rightOutSide">水源地</li>
      </ul>
      <!--<keep-alive exclude="qsh-detail">-->
      <router-view></router-view>
      <!--</keep-alive>-->
    </div>
    <iframe id="earthFrame" style="border:0" class="frame" width="1920px" height="774px" src=""></iframe>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import BaseFun from '../../assets/js/base'
export default {
  name: 'screen',
  components: {},
  data () {
    return {
      baseMapSrc: BaseFun.mapPath + '#', // 三维页面基础路径
      activeIndex: 1// 菜单索引
    }
  },
  computed: {
    // store中菜单索引
    ...mapState(['menuIndex'])
  },
  methods: {
    // store中改变菜单索引,地图索引
    ...mapMutations(['menuIndexChange', 'mapIndexChange']),
    // 首页按钮
    active (index) {
      this.activeIndex = index
      switch (index) {
        case 1:
          this.mapIndexChange(0)
          this.slectMenu('index-center', 'Overview')
          break
        case 2:
          this.slectMenu('qsh', 'waterUser')
          break
        case 3:
          this.slectMenu('sgnq', 'waterArea')
          break
        case 4:
          this.slectMenu('syd', 'waterSrc')
          break
      }
    },
    slectMenu (routerName, type) {
      // 跳转至对应路由
      this.$router.push({ name: routerName })
      let params = {
        'cmd': 'setView',
        'type': type,
        'name': 'Overview',
        'position': '',
        'random': Math.random()
      }
      if (params.type === 'Overview') {
        params.name = ''
      }
      // 改变三维页面url的hash值
      document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params)
      //        window.frames['earthFrame'].src = this.baseMapSrc+JSON.stringify(params);
    }
  },
  watch: {
    menuIndex (newVal) {
      switch (newVal) {
        case 2:
          this.activeIndex = 2
          break
        case 4:
          this.activeIndex = 4
          break
      }
      this.menuIndexChange('')
    }
  },
  mounted () {
    // 首次加载三维页面时设置的hash值
    // let params = {
    //   'cmd': 'setView',
    //   'type': 'Overview',
    //   'name': '',
    //   'position': '',
    //   'random': Math.random()
    // };
    // document.getElementById('earthFrame').src = this.baseMapSrc + JSON.stringify(params);
    this.slectMenu('index-center', 'Overview')
    //      transform:scaleY(0.5815)
    //      position:absolute
    //      top:-226px
  }
}
</script>
<style lang="stylus" scoped>
  .mainBox
    transform: scaleY(0.5815)
    position: absolute
    top: -226px
    width: 1920px
    height: 1080px
    text-align: center
    background: url('../../assets/images/bg.png') center no-repeat

    .topScreen
      height: 1080px

      .menu
        position: relative
        display: inline-block
        width: 100%
        height: 103px
        box-sizing: border-box
        margin-top: 5px
        color: #fff

        .m-btn
          position: absolute
          font-size: 38px
          width: 664px
          left: 632px
          height: 103px
          line-height: 103px
          background: url('../../assets/images/middle.png') center no-repeat
          cursor: default

        .item
          position: absolute
          top: 3px
          font-size: 32px
          width: 260px
          height: 103px
          line-height: 105px
          cursor: pointer

        .leftInSide
          left: 440px
          background: url('../../assets/images/leftInSide.png') center no-repeat

        .leftInSide.active
          background: url('../../assets/images/leftInSideActive.png') center no-repeat

        .leftOutSide
          left: 245px
          background: url('../../assets/images/leftOutSide.png') center no-repeat

        .leftOutSide.active
          background: url('../../assets/images/leftOutSideActive.png') center no-repeat

        .rightInSide
          right: 433px
          background: url('../../assets/images/rightInSide.png') center no-repeat

        .rightInSide.active
          background: url('../../assets/images/rightInSideActive.png') center no-repeat

        .rightOutSide
          right: 236px
          background: url('../../assets/images/rightOutSide.png') center no-repeat

        .rightOutSide.active
          background: url('../../assets/images/rightOutSideActive.png') center no-repeat

  .moon {
    position: absolute
    top: -587px
    left: 525px
    animation: flashing 100s infinite linear
  }

  @keyframes flashing {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
