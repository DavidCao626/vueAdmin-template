import api from "../../_api/question.js";

const getQuestionBean = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getQuestionBean(params).then(response => {
      commit('setQuestionBean',response.resBody);
    });
});

const submitQuestionBean = ({ commit, state }, params) =>
    new Promise(resolve => {
    var question = state.zc_question.questionBean; 
    var contextParam = params;
    var data = { question: question, contextParam: contextParam };
    api.submitQuestion(data).then(response => {
      resolve(response);
    });
  });

  const submitSingleQuestionBean = ({ commit, state }, params) => new Promise(
      resolve => {
        var question = state.zc_question.questionBean;
        var contextParam = params;
        var data = { question: question, contextParam: contextParam };
        api.submitSingleQuestion(data).then(response => {
          resolve(response);
        });
      }
    );
  
export default {
  getQuestionBean,
  submitQuestionBean,
  submitSingleQuestionBean
};