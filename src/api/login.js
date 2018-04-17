<<<<<<< HEAD
import request from '~/utils/request'
=======
import request from '@/utils/request'
// import jsonRequest from '@/utils/ajax'
>>>>>>> ajax12

export function login(loginName, pwd) {
  return request({
    url: '/user/ulogin.do',
    method: 'post',
    data: {
      loginName,
      pwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getNavMenu(token) {
  return request({
    url: '/systemManagerApi/getUserMenu.do',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
