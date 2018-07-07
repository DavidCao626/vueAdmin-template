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

const saveParticipants = ({ commit, state }, data) => { 
     api.saveParticipants(data)
       .then(result => {
         console.log(result);
       })
       .catch(ex => {
         console.log(ex);
       });
}

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

 export default { queryItemParticipant, saveParticipants, getItemRelaseQuestionCode };
