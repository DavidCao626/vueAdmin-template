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

const queryChildOrg = () => { 
  return request({
    url: '/project/queryChildOrg.do',
    method: 'post'
  })

}

export default {
  getScopeDeispenseView,
  disChildScope,
  queryChildOrg
}
