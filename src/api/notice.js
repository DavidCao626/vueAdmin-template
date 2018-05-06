import request from '~/utils/request'
import ajax from '~/utils/ajax'

/**
 * 查询通知根据status Y/N
 * @param {*} data
 */
export function queryUserNoticeByStatus(data) {
  return request({
    url: '/notice/queryUserNoticeByStatus.do',
    method: 'post',
    data:
            data

  })
}
/**
 * 查询用户全部通知
 * @param {*} data
 */
export function queryUserNotice(data) {
  return request({
    url: '/notice/queryUserNotice.do',
    method: 'post',
    data:
            data

  })
}

/**
 * 查询通知数量根据参数
 * @param {*} data
 */
export function queryUserNoticeCountByStatus(data) {
  return request({
    url: '/notice/queryUserNoticeCountByStatus.do',
    method: 'post',
    data:
            data

  })
}

/**
 * 查询全部通知数量
 * @param {*} data
 */
export function queryUserNoticeCount(data) {
  return request({
    url: '/notice/queryUserNoticeCount.do',
    method: 'post',
    data:
            data

  })
}
changeNoticeState
export function changeNoticeState(data) {
  return request({
    url: '/notice/changeNoticeState.do',
    method: 'post',
    data:
            data

  })
}
