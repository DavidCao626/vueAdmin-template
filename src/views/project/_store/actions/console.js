import api from '../../_api/console.js'
const queryScopeIntegeratedDateView = ({ commit, state }, data) => {
  api
    .queryScopeIntegeratedDateView(data)
    .then(result => {
      commit('setScopeIntegeratedDispenseView', result.resBody)
    })
    .catch(ex => {
      console.log(ex)
    })
}

const updateItemPlanDay = ({ commit, state }, data) => {
  api
    .updateWorkItemDayLong(data)
    .then(result => {
      commit('setScopeIntegeratedDispenseView', result.resBody)
    })
    .catch(ex => {
      console.log(ex)
    })
}

const handlerStartWorkItem = ({ commit, state }, data) => { 
  api.handlerStartWorkItem(data).then(result => {
    console.log(result);
    queryScopeIntegeratedDateView({ "scopeId": result.resBody.id});
   }).catch(ex => { 
    console.log(ex);
  });
}



export default {
  queryScopeIntegeratedDateView,
  updateItemPlanDay,
  handlerStartWorkItem
};
