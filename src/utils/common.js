const getRouterParam = function(request, paramName) {
  var query = request.query
  var push = request.params
  debugger
  if (query && query[paramName]) {
    return query[paramName]
  } else if (push && push[paramName]) {
    return push[paramName]
  } else {
    return null
  }
}
export default {
  getRouterParam
}
