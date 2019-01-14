import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let year = new Date().getFullYear()
let month = new Date().getMonth() + 1
export default new Vuex.Store({
  state: {
    waterUserId: '', // 取水户id
    waterSourceId: '', // 水源地id
    waterAreaId: '', // 水功能区id
    waterAreaDate: year + '-' + (month > 9 ? month : ('0' + month)), // 水功能区下拉列表选择的时间
    menuIndex: '', // 菜单索引
    mapIndex: ''// 地图索引
  },
  mutations: {
    // 改变取水户id
    waterUserChange (state, waterUserId) {
      state.waterUserId = waterUserId
    },
    // 改变水源地id
    waterSourceChange (state, waterSourceId) {
      state.waterSourceId = waterSourceId
    },
    // 改变水功能区id
    waterAreaChange (state, waterAreaId) {
      state.waterAreaId = waterAreaId
    },
    // 改变水功能区下拉列表选择的时间
    waterAreaDateChange (state, waterAreaDate) {
      state.waterAreaDate = waterAreaDate
    },
    // 改变菜单索引
    menuIndexChange (state, menuIndex) {
      state.menuIndex = menuIndex
    },
    // 改变地图索引
    mapIndexChange (state, mapIndex) {
      state.mapIndex = mapIndex
    }
  },
  actions: {}
})
