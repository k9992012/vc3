import Vue from 'vue'
import Router from 'vue-router'
// import Screen from './views/screen/Screen.vue'
// import Zhzs from './views/zhzs/Zhzs.vue'
// import Qsh from './views/qsh/Qsh.vue'
// import QshDetail from './views/qshdetail/QshDetail.vue'
// import Sgnq from './views/sgnq/Sgnq.vue'
// import SgnqDetail from './views/sgnqdetail/SgnqDetail.vue'
// import Syd from './views/syd/Syd.vue'
// import SydDetail from './views/syddetail/SydDetail.vue'
// import IndexCenter from './components/IndexCenter.vue'
// import QshCenter from './components/QshCenter.vue'
// import SgnqLeft from './components/SgnqLeft.vue'
// import SydCenter from './components/SydCenter.vue'
const Screen = () => import('./views/screen/Screen.vue')
const Zhzs = () => import('./views/zhzs/Zhzs.vue')
const Qsh = () => import('./views/qsh/Qsh.vue')
const QshDetail = () => import('./views/qshdetail/QshDetail.vue')
const Sgnq = () => import('./views/sgnq/Sgnq.vue')
const SgnqDetail = () => import('./views/sgnqdetail/SgnqDetail.vue')
const Syd = () => import('./views/syd/Syd.vue')
const SydDetail = () => import('./views/syddetail/SydDetail.vue')
const IndexCenter = () => import('./components/IndexCenter.vue')
const QshCenter = () => import('./components/QshCenter.vue')
const SgnqLeft = () => import('./components/SgnqLeft.vue')
const SydCenter = () => import('./components/SydCenter.vue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Screen,
      children: [
        {
          path: '/',
          component: Zhzs,
          children: [
            {
              path: '/indexcenter',
              name: 'index-center',
              component: IndexCenter
            },
            {
              path: '/',
              name: 'qsh-center',
              component: QshCenter
            },
            {
              path: '/sgnqleft',
              name: 'sgnq-left',
              component: SgnqLeft
            },
            {
              path: '/sydcenter',
              name: 'syd-center',
              component: SydCenter
            }
          ]
        },
        {
          path: '/qsh',
          name: 'qsh',
          component: Qsh
        },
        {
          path: '/qshdetail',
          name: 'qsh-detail',
          component: QshDetail
        },
        {
          path: '/syd',
          name: 'syd',
          component: Syd
        },
        {
          path: '/syddetail',
          name: 'syd-detail',
          component: SydDetail
        },
        {
          path: '/sgnq',
          name: 'sgnq',
          component: Sgnq
        },
        {
          path: '/sgnqdetail',
          name: 'sgnq-detail',
          component: SgnqDetail
        }
      ]
    }
  ]
})
