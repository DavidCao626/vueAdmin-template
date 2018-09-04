import RolesList from './resolver.js'
import GUtils from '@/components/Utils.js'
import reqPath from '@/API/System/SystemManagerApi.js'
RolesList.getResolver().callStore(function(callback) {
  GUtils.post(reqPath.queryUserGrantRole, {}, function(data) {
    callback.call(RolesList.getResolver(), data.resBody)
  })
})
export default RolesList
