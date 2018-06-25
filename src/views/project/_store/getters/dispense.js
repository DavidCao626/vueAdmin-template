import _lodash from 'lodash'

const _getHourDay = (timeLong) => {
  return _lodash.round(_lodash.divide(timeLong, 24), 1)
}

export const getDispenseView = state => {
  var dispenseView = state.dispenseView
  return dispenseView
}
export const getDispenseLiablerRule = state => {
  var ruleMap = state.dispenseView.deployPack.liaRuleMap
  var ruleKey = state.dispenseView.deployPack.rule
  var rule = ruleMap[ruleKey]
  return rule
}

