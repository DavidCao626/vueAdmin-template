import _lodash from 'lodash'

const _getHourDay = timeLong => {
  return _lodash.round(_lodash.divide(timeLong, 24), 1)
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
  if (dispenseView.scopeDelayedTimeLong > 0) {
    scope.delayDay = _getHourDay(dispenseView.scopeDelayedTimeLong)
  } else {
    scope.delayDay = 0
  }
  if (dispenseView.scopeUsedTimeLong > 0) {
    scope.useredDay = _getHourDay(dispenseView.scopeUsedTimeLong)
  } else {
    scope.useredDay = 0
  }
  if (dispenseView.scopeUsableTimeLong > 0) {
    scope.useabledDay = _getHourDay(dispenseView.scopeUsableTimeLong)
  } else {
    scope.useabledDay = 0
  }
  if (dispenseView.scopeStillNeededTimeLong > 0) {
    scope.neededDay = _getHourDay(dispenseView.scopeStillNeededTimeLong)
  } else {
    scope.neededDay = 0
  }
  return scope
}

export const getInteratedItems = state => {
  var dispenseView = state.scopeIntegratedView
  var items = dispenseView.items
  var result = []
  _lodash.mapValues(items, function(value, key, bean) {
    result.push(value)
  })
  return result
}
