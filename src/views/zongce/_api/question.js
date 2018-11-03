import request from "~/utils/request";
import ajax from "~/utils/ajax";

const getQuestionBean = data =>
  request({
    url: "/appQuestion/getQuestionBeanByTaskEngine.do",
    method: "post",
    data: data
  });
const submitQuestion = data =>
  ajax({
    url: "/appQuestion/submigQuestionRecord.do",
    method: "post",
    data: data
  });

const saveQuestionBean = data =>
  ajax({
    url: "/appQuestion/saveQuestionRecord.do",
    method: "post",
    data: data
  });

const submitSingleQuestion = data =>
  ajax({
    url: "/appQuestion/submigSingleQuestion.do",
    method: "post",
    data: data
  });

export default {
  getQuestionBean,
  submitQuestion,
  submitSingleQuestion,
  saveQuestionBean
};
