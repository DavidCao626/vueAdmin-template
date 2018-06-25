import request from '~/utils/request'
import ajax from '~/utils/ajax'
const queryScopeIntegeratedDateView = data => {
  return request({
    url: '/project/queryScopeIntergratedView.do',
    method: 'post',
    data: data
  })
}

export default {
  queryScopeIntegeratedDateView
}
