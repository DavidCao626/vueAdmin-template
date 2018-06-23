import request from '~/utils/request'
import ajax from '~/utils/ajax'
const getScopeDeispenseView = data => {
  return ajax({
    url: '/project/getScopeDeispenseView.do',
    method: 'post',
    data: data
  })
}

const disChildScope = data => {
  return ajax({
    url: '/project/disChildScope.do',
    method: 'post',
    data: data
  })
}

export default {
  getScopeDeispenseView,
  disChildScope
}
