import _lodash from 'lodash'
import moment from 'moment'
export const setConfig = (state, configs) => {
  state.config.config_list = configs
}

export const setScopeConfigInfo = (state, config) => {
  state.scopeConfigInfo = config
}

export const changeScopeDateView = (state, dateViewData) => {
  state.scopeDateViewInfo = dateViewData
}

const _computeItemsTime = (items) => {
  _lodash.mapValues(items, function(value, key, bean) {
    if (!(value.item.position === 'start')) {
      var pitem = items[value.previousKey]
      value.start = pitem.end
      if (value.item.planTimeLong != null) {
        // console.log([value.item.stepKey, value.item.planTimeLong])
        value.end = moment(value.start).add(value.item.planTimeLong, 'H')
      }
    }
  })
}

export const changeScopeWorkItemHour = (state, hourData) => {
  const items = state.scopeDateViewInfo.items
  const item = items[hourData.itemKey]
  const timeLong = (hourData.timeLong * 24)
  const oldTimeLong = item.item.planTimeLong
  var difTimeLong = timeLong - oldTimeLong
  console.log([timeLong, oldTimeLong, difTimeLong])
  state.scopeDateViewInfo.scopeAllocationedTimeLong = state.scopeDateViewInfo.scopeAllocationedTimeLong + difTimeLong
  item.item.planTimeLong = timeLong
  _computeItemsTime(items)
}

export const setScopeDispenseView = (state, viewData) => {
  state.dispenseView = viewData
}
