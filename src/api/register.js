import request from '@/utils/request'

export function uregister(loginName, pwd, tpwd) {
  return request({
    url: '/user/uregister.do',
    method: 'post',
    data: {
      loginName, pwd, tpwd
    }
  })
}

