export const getQuestionInfo = (state) => { 
    return {
        "questionBean": state.zc_question.questionBean,
        "pageBean": state.zc_question.pageBean
    };
}