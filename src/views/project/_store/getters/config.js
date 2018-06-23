import _lodash from 'lodash'

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
  return state.scopeDateViewInfo.scope
}

export const getScopeConfigInfoWorkItems = state => {
  var items = state.scopeDateViewInfo.items
  var result = []
  _lodash.mapValues(items, function(value, key, bean) {
    result.push(value)
  })
  return result
}

export const getScopeConfigInfo = state => {
  return state.scopeDateViewInfo
}

const _getHourDay = (timeLong) => {
  return _lodash.round(_lodash.divide(timeLong, 24),1);
}

export const getScopeConfigCountDay = state => { 
  var view = state.scopeDateViewInfo
  return { scopePlanTimeLong: _getHourDay(view.scopePlanTimeLong), scopeUsableTimeLong: _getHourDay(view.scopeUsableTimeLong), scopeAllocationedTimeLong: _getHourDay(view.scopeAllocationedTimeLong) };
}
