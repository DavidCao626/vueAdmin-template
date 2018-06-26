import request from '~/utils/request'
import ajax from '~/utils/ajax'
const queryScopeIntegeratedDateView = data => {
  return request({
    url: '/project/queryScopeIntergratedView.do',
    method: 'post',
    data: data
  })
}

const updateWorkItemDayLong = data => {
  return request({
    url: '/project/updateWorkItemDayLong.do',
    method: 'post',
    data: data
  })
}

export default {
  queryScopeIntegeratedDateView,
  updateWorkItemDayLong
}
