import api from '../../_api/config.js'

const configGet = ({ commit, state }, projectId) =>
  new Promise(resolve => {
    // commit("setProjectInfoData",{1\\});
    console.log('doit')
  })

const configInit = ({ commit, state }) => {
  var configList = [4, 5, 6]
  setTimeout(() => {
    commit('setConfig', configList)
    //commit("setServiceTypeList", configList)
  }, 5000)
}

/**
 * 更新配置计划信息
 * @param {*} param0
 * @param {*} data
 */
const updateScopePlanTimeLong = ({ commit, state }, data) => {
  api.updateScopePlanTimeLong(data).then(result => {
    commit('setScopeConfigInfo', result.resBody)
  }).catch(ex => {
    console.log(ex)
  })
}

const updateScopePlanTimeLongAndNext = ({ commit, state }, data) => new Promise((resolve, reject) => {
  api.updateScopePlanTimeLongAndNext(data).then(result => {
    resolve(result)
  }).catch(ex => {
    reject(ex)
  })
})

/**
 * 获取域的配置计划信息
 * @param {*} param0
 * @param {*} data
 */
const queryScopeConfigInfo = ({ commit, state }, data) => {
  api.queryScopeConfigDataView(data).then(result => {
    commit('setScopeConfigInfo', result.resBody)
  }).catch(ex => {
    console.log(ex)
  })
}

export default {
  configGet,
  configInit,
  queryScopeConfigInfo,
  updateScopePlanTimeLong,
  updateScopePlanTimeLongAndNext
}
