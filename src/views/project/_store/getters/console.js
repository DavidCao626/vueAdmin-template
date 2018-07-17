import _lodash from 'lodash'
import moment from 'moment'

const _getHourDay = timeLong => {
  //return _lodash.round(_lodash.divide(timeLong, 24), 1)
  var duration = moment.duration(timeLong, 'hours');
  return duration.days() + "天" + duration.hours() + "小时";
}

export const getIntegratedView = state => {
  var dispenseView = state.scopeIntegratedView
  return dispenseView
}

export const getInteratedProjectInfo = state => {
  var dispenseView = state.scopeIntegratedView
  return dispenseView.project
}


export const getInteratedScopeInfo = state => {
  var dispenseView = state.scopeIntegratedView
  var scope = dispenseView.scope
  if (dispenseView.scopeDelayedTimeLong >0) {
    scope.delayDay = "预计超时"+_getHourDay(dispenseView.scopeDelayedTimeLong)
  } else {
    scope.delayDay = "未超时"
  }
  if (dispenseView.scopeUsedTimeLong >=0) {
    scope.useredDay = _getHourDay(dispenseView.scopeUsedTimeLong)
  } else {
    scope.useredDay = "无"
  }
  if (dispenseView.scopeUsableTimeLong >=0) {
    scope.useabledDay = _getHourDay(dispenseView.scopeUsableTimeLong)
  } else {
    scope.useabledDay = "无"
  }
  if (dispenseView.scopeStillNeededTimeLong >=0) {
    scope.neededDay = _getHourDay(dispenseView.scopeStillNeededTimeLong)
  } else {
    scope.neededDay = "无"
  }
  return scope
}

export const getInteratedItems = state => {
  var dispenseView = state.scopeIntegratedView
  var items = dispenseView.items
  var result = []
  _lodash.mapValues(items, function (value, key, bean) {
    var duration = moment.duration(value.item.planTimeLong,'hours');
    value.vday = duration.days();
    value.vhour = duration.hours();
    console.log([value.vday,value.vhour,value.item.planTimeLong]);
    result.push(value)
  })
  return result
}

