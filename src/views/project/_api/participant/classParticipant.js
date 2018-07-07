import request from "~/utils/request";
import ajax from "~/utils/ajax";
const queryParticipant = data => {
  return request({
    url: "/project/queryParticipant.do",
    method: "post",
    data: data
  });
};

const saveParticipants = data => { 
    return ajax({
      url: "/project/updateParticipant.do",
      method: "post",
      data: data
    });
}

const getItemRelaseQuestionCode = data => { 
  return request({
    url: "/project/getItemRelaseQuestionCode.do",
    method: "post",
    data: data
  });
}

export default {
  queryParticipant,
  saveParticipants,
  getItemRelaseQuestionCode
};
