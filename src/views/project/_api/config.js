import request from '~/utils/request'
import ajax from '~/utils/ajax'
const queryScopeConfigDataView = (data) => {
  return request({
    url: '/project/queryScopeConfigDataView.do',
    method: 'post',
    data: data
  })
}

const queryScopeDataView = data => {
  return request({
    url: '/project/queryScopeDataView.do',
    method: 'post',
    data: data
  })
}

const updateScopePlanTimeLong = (data) => {
  return ajax({
    url: '/project/updateScopePlanTimeLong.do',
    method: 'post',
    data: data
  })
}

const updateScopePlanTimeLongAndNext = data => {
  return ajax({
    url: '/project/updateScopePlanTimeLongAndNext.do',
    method: 'post',
    data: data
  })
}

export default {
  queryScopeConfigDataView,
  updateScopePlanTimeLong,
  updateScopePlanTimeLongAndNext,
  queryScopeDataView
}
