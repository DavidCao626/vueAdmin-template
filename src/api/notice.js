import request from '~/utils/request'
import ajax from '~/utils/ajax'

/**
 * 查询通知根据status N
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

export function changeNoticeState(data) {
  return request({
    url: '/notice/changeNoticeState.do',
    method: 'post',
    data:
            data

  })
}
//--------------------公告/公示
/**
 * 拉取公告公示
 * @param {*} data 
 */
export function pullPublicNotice(data) {
  return request({
    url: '/publicNotice/pullPublicNotice.do',
    method: 'post',
    data:
      data
  })
}
/**
 * 增加公告/公示
 * @param {*} data 
 */
export function addNoticeService(data) {
  return request({
    url: '/publicNotice/addNoticeService.do',
    method: 'post',
    data:
      data

  })
}
/**
 * 上传附件
 * @param {*} data 
 */
export function uploadAttachment(data) {
  return request({
    url: '/publicNotice/uploadAttachment.do',
    method: 'post',
    data:
      data

  })
}
/**
 * 查询当前登录用户的公告/公示列表 A公告P公示
 * @param {*} data 
 */
export function queryPublicNotice(data) {
  return request({
    url: '/publicNotice/queryPublicNotice.do',
    method: 'post',
    data:
      data

  })
}
/**
 * 更新公告/公示 草稿
 * @param {*} data 
 */
export function updatePublicNotice(data) {
  return request({
    url: '/publicNotice/updatePublicNotice.do',
    method: 'post',
    data:
      data

  })
}



/**
 * 删除公示/公告草稿
 * @param {*} data 
 */
export function deletePublicNotice(data) {
  return request({
    url: '/publicNotice/deletePublicNotice.do',
    method: 'post',
    data:
      data

  })
}
/**
 * 获取某一公告/公示详情
 * @param {*} data 
 */
export function getPublicNoticeById(data) {
  return request({
    url: '/publicNotice/getPublicNoticeById.do',
    method: 'post',
    data:
      data

  })
}

var uploadAttachmentUrl = "act/publicNotice/uploadAttachment.do";
export { uploadAttachmentUrl}