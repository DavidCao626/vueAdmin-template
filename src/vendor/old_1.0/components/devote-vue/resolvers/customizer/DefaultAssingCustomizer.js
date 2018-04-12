import _lodash from 'lodash'
var customizer = function(objValue, srcValue, key, object, source) {
  if (key === '_linked_resolver' || key === '_do_execute' || key === '_run_execute' || key === '_resolver_name' || key === '_assign_resolver' || key === '_assign_resolver_undefined' || key === '_assign_store' || key === '_resolver_stacks' || key === '_push_resolver_name') {
    return objValue
  }
}
export default customizer
