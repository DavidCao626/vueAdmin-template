import request from '@/utils/request'

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

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
