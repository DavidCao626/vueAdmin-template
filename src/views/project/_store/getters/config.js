
export const projectInfoData = (state) => {
  console.log(['info', state])
  return state.base_projectFormData
}

export const projectInfoData1 = state => {}

export const getConfig = state => {
  console.log(['getconfig'])
  return state.config.config_list
}

export const getScopeConfigInfoScope = state => {
  return state.scopeConfigInfo.scope
}

export const getScopeConfigInfoWorkItems = state => {
  return state.scopeConfigInfo.items
}

export const getScopeConfigInfo = state => {
  return state.scopeConfigInfo
}
