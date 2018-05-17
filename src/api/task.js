import request from '~/utils/request'
import ajax from '~/utils/ajax'
export function addTaskProject(data) {
  return ajax({
    url: '/task/insertTaskProject.do',
    method: 'post',
    data: data
  })
}

export function getTaskProject(data) {
  return request({
    url: '/task/getNodeTaskProjectBySystemSerialNo.do',
    method: 'post',
    data: data
  })
}

export function queryNodeByLiblerld(data) {
  return request({
    url: '/task/queryNodeByLiblerld.do',
    method: 'post',
    data: data
  })
}

export function updateTaskProject(data) {
  return ajax({
    url: '/task/updateTaskProject.do',
    method: 'post',
    data: data
  })
}
export function queryUserOrg() {
  return request({
    url: '/systemManagerApi/getCurrentOrgListAndOwner.do',
    method: 'post',
    data: {}
  })
}

export function queryDutyByOrgCode(data) {
  return request({
    url: '/task/queryDutyByOrgCode.do',
    method: 'post',
    data: data
  })
}
export function queryDutyByOrgCodeX(data) {
  return request({
    url: '/task/queryDutyByOrgCodeX.do',
    method: 'post',
    data: data
  })
}
export function queryUserByDutyCodeAndOrgCode(data) {
  return request({
    url: '/task/queryUserByDutyCodeAndOrgCode.do',
    method: 'post',
    data: data
  })
}
export function queryUserByDutyCodeAndOrgCodeX(data) {
  return request({
    url: '/task/queryUserByDutyCodeAndOrgCodeX.do',
    method: 'post',
    data: data
  })
}
export function addTaskNode(data) {
  return ajax({
    url: '/task/insertTaskNode.do',
    method: 'post',
    data: data
  })
}

export function getTaskNodeBySystemSerialNo(data) {
  return request({
    url: '/task/getTaskNodeBySystemSerialNo.do',
    method: 'post',
    data: data
  })
}

export function updateTaskNode(data) {
  return ajax({
    url: '/task/updateTaskNode.do',
    method: 'post',
    data: data
  })
}

export function addTaskFacade(data) {
  return ajax({
    url: '/task/insertTaskFacade.do',
    method: 'post',
    data: data
  })
}

export function getNodeTaskFacadeBySystemSerialNo(data) {
  return request({
    url: '/task/getNodeTaskFacadeBySystemSerialNo.do',
    method: 'post',
    data: data
  })
}
export function updateTaskFacade(data) {
  return ajax({
    url: '/task/updateTaskFacade.do',
    method: 'post',
    data: data
  })
}

export function queryChildTaskNodeBySystemSerialNo(data) {
  return request({
    url: '/task/queryChildTaskNodeBySystemSerialNo.do',
    method: 'post',
    data: {
      systemSerialNo: data
    }
  })
}

export function querySameNodeBySystemSerialNo(data) {
  return request({
    url: '/task/querySameNodeBySystemSerialNo.do',
    method: 'post',
    data: data
  })
}

export function getDictByDictNames(data) {
  return request({
    url: '/systemConfApi/getDictByDictNames.do',
    method: 'post',
    data: data
  })
}

export function insertTaskNodeRestrict(data) {
  return ajax({
    url: '/task/insertTaskNodeRestrict.do',
    method: 'post',
    data: data
  })
}
export function queryServiceTypeList() {
  return request({
    url: '/task/queryServiceTypeList.do',
    method: 'post',
    data: {}
  })
}

export function querySceneByProjectSystemSerialNo(data) {
  return request({
    url: '/task/querySceneByProjectSystemSerialNo.do',
    method: 'post',
    data: data
  })
}

export function updateTaskNodeRestrict(data) {
  return ajax({
    url: '/task/updateTaskNodeRestrict.do',
    method: 'post',
    data: data
  })
}

export function getTaskNodeRestrictById(data) {
  return request({
    url: '/task/getTaskNodeRestrictById.do',
    method: 'post',
    data: data
  })
}

export function saveTaskParticipant(data) {
  return ajax({
    url: '/task/insertTaskParticipant.do',
    method: 'post',
    data: data
  })
}
export function getTaskParticipantB(data) {
  return request({
    url: '/task/getTaskParticipantB.do',
    method: 'post',
    data: data
  })
}

export function startNode(data) {
  return request({
    url: '/task/startNode.do ',
    method: 'post',
    data: data
  })
}
export function completedNode(data) {
  return request({
    url: '/task/completedNode.do ',
    method: 'post',
    data: data
  })
}
/**
 * 更具参数查询当前用户为责任人的节点
 * @param {筛选字段} param
 */
export function queryNodeByParam(param) {
  return request({
    url: '/task/queryNodeByParam.do',
    method: 'post',
    data: param
  })
}

export function queryNodeByLiblerldByParam(param) {
  return request({
    url: '/task/queryNodeByLiblerldByParam.do',
    method: 'post',
    data: param
  })
}

export function queryAnmeldenTypeList(param) {
  return ajax({
    url: '/task/queryAnmeldenTypeList',
    method: 'post',
    data: param
  })
}

export function queryProjectList(param) {
  return request({
    url: '/task/queryProjectList.do',
    method: 'post',
    data: param
  })
}
export function getProjectInfoByNodeNo(param) {
  return request({
    url: '/task/getProjectInfoByNodeNo.do',
    method: 'post',
    data: param
  })
}
export function queryChildService(param) {
  return request({
    url: '/task/queryChildService.do',
    method: 'post',
    data: param
  })
  
}
export function submitProjectApplySurface(param) {
  return ajax({
    url: '/taskRecord/submitProjectApplySurface.do',
    method: 'post',
    data: param
  })
} 
export function deleteTaskParticipant(param) {
  return ajax({
    url: '/task/deleteTaskParticipant.do',
    method: 'post',
    data: param
  })
}

export function queryAlltaskDefFacade(param) {
  return request({
    url: '/task/queryAlltaskDefFacade.do',
    method: 'post',
    data: param
  })
}

export function queryChildOrg() {
  return request({
    url: '/task/queryChildOrg.do',
    method: 'post'
  })
}