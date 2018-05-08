import Mock from 'mockjs'
import taskAPi from './task'

Mock.setup({
  timeout: '350-600'
})
const response = function(rsp) {
  return { respStatus: 1, body: rsp }
}

Mock.mock(
  /\/task\/queryAnmeldenTypeList/,
  'post',
  response(taskAPi.queryAnmeldenTypeList)
)

export default Mock
