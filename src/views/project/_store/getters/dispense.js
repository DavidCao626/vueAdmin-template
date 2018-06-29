import _lodash from 'lodash'

const _getHourDay = (timeLong) => {
  return _lodash.round(_lodash.divide(timeLong, 24), 1)
}

export const getDispenseView = state => {
  var dispenseView = state.dispenseView
  return dispenseView
}
// TODO 调整为上级的liaRuleMap
export const getDispenseLiablerRule = state => {
  var ruleMap = state.dispenseView.deployLiabilityMap
  var ruleKey = state.dispenseView.deployPack.rule
  var rule = ruleMap[ruleKey]
  return rule
}

