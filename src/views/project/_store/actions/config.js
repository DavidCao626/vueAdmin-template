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
  }, 5000)
}

export default {
  configGet,
  configInit
}
