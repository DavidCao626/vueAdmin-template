import request from '~/utils/request'
import ajax from '~/utils/ajax'
export function test(data) {
  return request({
    url: '/whktest/test.do',
    method: 'post',
    data:
      data

  })
}
