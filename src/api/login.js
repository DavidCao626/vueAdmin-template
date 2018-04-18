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

export function switchDuty(postData) {
  return request({
    url: '/duty/switchDuty.do',
    method: 'post',
    data: postData
  })
}
