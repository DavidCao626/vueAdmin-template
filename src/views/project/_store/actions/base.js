import api from '../../_api/config.js'

const baseGet = ({ commit, state }, projectId) =>
  new Promise(resolve => {
    // if (state.projectInfoData.id) return;
    api.getProjectInfoDataById(projectId).then(response => {
      commit('setProjectInfoData', response[0])
      resolve(response[0])
    })
  })

export default {
  baseGet
}
