import api from '../../_api/console.js'
import { resolve } from 'url';
const queryScopeIntegeratedDateView = ({ commit, state }, data) => {
  console.log(data);
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
    queryScopeIntegeratedDateView({ commit, state }, { scopeId: result.resBody.id });
  }).catch(ex => {
    console.log(ex);
  });
}

const handlerCompleteWorkItem = ({ commit, state }, data) => {
  api
    .handlerCompleteWorkItem(data)
    .then(result => {
      console.log(result);
      queryScopeIntegeratedDateView({ commit, state }, { scopeId: result.resBody.id });
    })
    .catch(ex => {
      console.log(ex);
    });
};

const getUserChildScope = ({ commit, state }, data) =>
  new Promise(resolve => {
    api
      .getUserChildScope(data)
      .then(result => {
        resolve(result);
      })
      .catch(ex => {
        console.log(ex);
      });
  })




export default {
  queryScopeIntegeratedDateView,
  updateItemPlanDay,
  handlerStartWorkItem,
  handlerCompleteWorkItem,
  getUserChildScope
};
