import api from '../../_api/dispense.js'

const getScopeDeispenseView = ({ commit, state }, data) => {
  api.getScopeDeispenseView(data).then(result => {
    commit('setScopeConfigInfo', result.resBody)
  }).catch(ex => {
    console.log(ex)
  })
}

export default {
  getScopeDeispenseView
}
