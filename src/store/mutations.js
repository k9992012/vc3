export default {
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
  // waterAreaDateChange(state, waterAreaDate) {
  //   state.waterAreaDate = waterAreaDate;
  // },
  // 改变菜单索引
  menuIndexChange (state, menuIndex) {
    state.menuIndex = menuIndex
  },
  // 改变地图索引
  mapIndexChange (state, mapIndex) {
    state.mapIndex = mapIndex
  },
  // 改变水质评价结果年份
  szpjjgYearChange (state, szpjjgYear) {
    state.szpjjgYear = szpjjgYear
  }
}
