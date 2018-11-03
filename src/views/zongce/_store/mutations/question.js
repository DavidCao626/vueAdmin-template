export const setQuestionBean = (state, questionBean) => {
    console.log(questionBean);
      state.zc_question.questionBean = questionBean;
}

export const setQuestionPage = (state, pageBean) => { 
  state.zc_question.pageBean = pageBean;
}

export const changePageSize = (state, pagesize) => { 
  state.zc_question.pageBean.pageSize = pagesize;
}

export const changeCurrentPage = (state, currentPage) => { 
  state.zc_question.pageBean.currentPage = currentPage;
}