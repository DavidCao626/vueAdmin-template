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
    url: '/systemManagerApi/getCurrentOrgList.do',
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
    data: data
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
