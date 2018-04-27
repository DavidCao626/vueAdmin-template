import request from '~/utils/request'

export function login(loginName, pwd) {
  return request({
    url: '/user/login.do',
    method: 'post',
    data: {
      loginName,
      pwd
    }
  })
}

export function logout() {
  return request({ url: '/user/logout.do', method: 'post' })
}

export function getNavMenu(token) {
  return request({ url: '/systemManagerApi/getUserMenu.do', method: 'get' })
}

export function getInfo(token) {
  return request({ url: '/user/getLoginUserInfo.do', method: 'post' })
}

export function getDutyList() {
  return request({ url: '/user/getUserDutyList.do', method: 'post' })
}

export function switchDuty(item) {
  const postData = {
    dutyCode: item.dutyCode,
    managerNodeCode: item.managerNodeCode,
    officeOrgCode: item.officeOrgCode,
    classifyCode: item.classifyCode,
    resigId: item.resigId
  }
  return request({
    url: '/duty/switchDuty.do',
    method: 'post',
    data: postData
  })
}

export function setDefaultDuty(dutyCode) {
  return request({
    url: '/duty/setDefaultDuty.do',
    method: 'post',
    data: dutyCode
  })
}
