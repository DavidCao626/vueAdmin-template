import _lodash from 'lodash'
import resolverDecorator from '../ResolverDecorator.js'

var resolver = {
  _resolver_name: 'EmptyResolver'
}
resolver = resolverDecorator.decorateResolver(resolver)
export default resolver
