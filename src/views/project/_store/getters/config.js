import _lodash from 'lodash'
import moment from "moment"

export const projectInfoData = (state) => {
  console.log(['info', state])
  return state.baseproject.FormData
}

export const projectInfoData1 = state => {}

export const getConfig = state => {
  console.log(['getconfig'])
  return state.config.config_list
}
/**
export const getScopeConfigInfoScope = state => {
  return state.scopeConfigInfo.scope
}

export const getScopeConfigInfoWorkItems = state => {
  return state.scopeConfigInfo.items
}

export const getScopeConfigInfo = state => {
  return state.scopeConfigInfo
}
*/
export const getScopeConfigInfoScope = state => {
  var scope = state.scopeDateViewInfo.scope;
  scope.planStartTime = moment(scope.planStartTime)
    .minute(0)
    .format("YYYY-MM-DD HH:mm");
  scope.planEndTime = moment(scope.planEndTime)
    .minute(0)
    .format("YYYY-MM-DD HH:mm");
  return scope;
}

export const getScopeConfigInfoWorkItems = state => {
  console.log("begin do momentView");
  var items = state.scopeDateViewInfo.items
  var result = []
  _lodash.mapValues(items, function (value, key, bean) {
    var momentDuration=moment.duration(value.item.planTimeLong, "hours")
    value.viewPlanDay = momentDuration.days();
    value.viewPlanHour = momentDuration.hours();
    result.push(value)
  })
   console.log("end do momentView");
  return result
}

export const getScopeConfigInfo = state => {
  return state.scopeDateViewInfo
}

const _getHourDay = (timeLong) => {
  return _lodash.round(_lodash.divide(timeLong, 24),1);
}

const _durationHour = (timeLong) => {
  var duration = moment.duration(timeLong, "hours");
  return duration.days() + "天" + duration.hours()+"小时";
}


export const getScopeConfigCountDay = state => { 
  var view = state.scopeDateViewInfo
  return { scopePlanTimeLong: _durationHour(view.scopePlanTimeLong), scopeUsableTimeLong: _durationHour(view.scopeUsableTimeLong), scopeAllocationedTimeLong: _durationHour(view.scopeAllocationedTimeLong) };
}
