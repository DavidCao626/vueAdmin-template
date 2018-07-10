import api from "../../../_api/participant/classParticipant.js";
/**
 * 更新配置计划信息
 * @param {*} param0
 * @param {*} data
 */
const queryItemParticipant = ({ commit, state }, data) =>
  new Promise((resolve, reject) => {
    api
      .queryParticipant(data)
      .then(result => {
        resolve(result);
      })
      .catch(ex => {
        reject(ex);
      });
  });

const saveParticipants = ({ commit, state, vm }, data) => new Promise((resolve, reject) => {
  debugger
  api.saveParticipants(data)
    .then(result => {
      debugger;
      api
        .completeUserPendingByItemId({ "itemId": data.itemId })
        .then(result => {
          resolve(result);  
        })
        .catch(ex => {
          reject(ex);
        });
    })
    .catch(ex => {
      reject(ex);
    });
});
const completeUserPendingByItemId = ({ commit, state }, data) => 
  new Promise((resolve, reject) => {
    api
      .completeUserPendingByItemId(data)
      .then(result => {
        resolve(result);
      })
      .catch(ex => {
        reject(ex);
      });
  });

const getItemRelaseQuestionCode = ({ commit, state }, data) =>
  new Promise((resolve, reject) => {
    api
      .getItemRelaseQuestionCode(data)
      .then(result => {
        debugger
        console.log(result);
        resolve(result);
      })
      .catch(ex => {
        reject(ex);
      });
  });

 export default { queryItemParticipant, saveParticipants, getItemRelaseQuestionCode,completeUserPendingByItemId };
