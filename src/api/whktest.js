import request from '~/utils/request'

export function test(data) {
  return request({
    url: '/whktest/test.do',
    method: 'post',
    data:
      data

  })
}
