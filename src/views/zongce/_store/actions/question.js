import api from "../../_api/question.js";

const getQuestionBean = ({ commit, state }, params) =>
  new Promise(resolve => {
    params.currentPage = state.zc_question.pageBean.currentPage;
    params.pageSize = state.zc_question.pageBean.pageSize;
    api.getQuestionBean(params).then(response => {
      commit("setQuestionBean", response.resBody.questionBean);
      commit("setQuestionPage", response.resBody.pageBean);
    });
  });


const changePage = ({ commit, state },params) =>
  new Promise(resolve => {
    if (params.pageSize) { 
       commit("changePageSize",params.pageSize);
    }
    if (params.currentPage) { 
       commit("changeCurrentPage", params.currentPage);
    }
    resolve();
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
  submitSingleQuestionBean,
  changePage
};