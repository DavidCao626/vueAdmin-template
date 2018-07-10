import request from '~/utils/request'
import ajax from '~/utils/ajax'
const queryScopeIntegeratedDateView = data => {
  console.log(["inparamData",data]);
  return request({
    url: '/project/queryScopeIntergratedView.do',
    method: 'post',
    data: data
  })
}

const updateWorkItemDayLong = data => {
  return request({
    url: '/project/updateWorkItemDayLong.do',
    method: 'post',
    data: data
  })
}

const handlerStartWorkItem = data => { 
    return request({
      url: "/taskOperation/userHandlerStartItem.do",
      method: "post",
      data: data
    });
}

const handlerCompleteWorkItem = data => { 
  return request({
    url: "/taskOperation/userHandlerCompleteItem.do",
    method: "post",
    data: data
  });
}

//查新用户可查看域
//参数scopeId
const getUserChildScope = data => {
  return request({
    url: "/projectApply/getUserChildScope.do",
    method: "post",
    data: data
  });
}

export default {
  queryScopeIntegeratedDateView,
  updateWorkItemDayLong,
  handlerStartWorkItem,
  handlerCompleteWorkItem,
  getUserChildScope
};
