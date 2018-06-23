import api from '../../_api/dispense.js'

const getScopeDeispenseView = ({ commit, state }, data) => {
  api
    .getScopeDeispenseView(data)
    .then(result => {
      commit('setScopeDispenseView', result.resBody)
    })
    .catch(ex => {
      console.log(ex)
    })
}

const disChildScope = ({ commit, state }, data) => new Promise((resolve, reject) => {
  api
    .disChildScope(data)
    .then(result => {
      resolve(result)
    })
    .catch(ex => {
      console.log(ex)
    })
})

export default {
  getScopeDeispenseView,
  disChildScope
}
