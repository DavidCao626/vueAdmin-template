
export const projectInfoData = (state) => {
  console.log(['info', state])
  return state.baseproject.FormData
}

export const projectInfoData1 = state => {}

export const getConfig = state => {
  console.log(['getconfig'])
  return state.config.config_list
}
