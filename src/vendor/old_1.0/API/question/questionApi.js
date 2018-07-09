import bashPath from '../bashPath.js'
var requestPath = {
  /* -------------------------新增问卷--------------------*/
  /* 查询下级菜单*/
  add: bashPath + "/questionApi/saveQuestion.do",
  updata: bashPath + "/questionApi/updateQuestion.do",
  get: bashPath + "/questionApi/getQuestionTask.do",
  submitQuestionResult: bashPath + "/questionApi/submitQuestionResult.do",
  submitTaskQuestionResult: bashPath + "/project/submitTaskQuestion.do",
  getQuestionResult: bashPath + "/questionApi/getQuestionResult.do"
};
export default requestPath
