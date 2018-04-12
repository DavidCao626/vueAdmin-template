import _lodash from 'lodash'
import resolverDecorator from './ResolverDecorator.js'

var storeDecorator = function(store, resolver) {
  var storeResolver = resolverDecorator.decorateStoreResolver(store)
  if (resolver) {
    storeResolver = storeResolver._assign_resolver(resolver)
  }
  return storeResolver
}

var factory = {
  buildComponent: function(vueInstance, store, resolver) {
	    var resolverStore = storeDecorator(store, resolver)
    var component = {
      _nstore: null,
      template: '<div><inner :fields="fields"></inner></div>',
      components: {
        'inner': vueInstance
      },
      data: function() {
        if (this.contextStore && this.attachStore) {
				    var nstore = _lodash.cloneDeep(resolverStore)
				    this.contextStore.getResolver = function() {
				       return nstore
				    }
				    var newContextStore = storeDecorator(this.contextStore)
				    nstore._assign_resolver(newContextStore)
				    nstore._take_over = newContextStore
				    nstore._linked_component = this
				    nstore.dataSource = this.attachStore.dataSource
				    nstore.dataStore = this.attachStore.dataStore
				    nstore._fields._getResolver = function() {
				    	return nstore
				    }
				    nstore._run_execute()
				    return {
				       fields: nstore._fields
				    }
        } else {
				   resolverStore._linked_component = this
				   resolverStore._fields._getResolver = function() {
				    	return resolverStore
				    }
				    resolverStore._run_execute()
				    return {
						 fields: resolverStore._fields
					 }
        }
      },
      props: ['contextStore', 'attachStore'],
      getResolver: function() {
        return resolverStore
      }
    }
    return component
  },
  buildResovler: function() {
    return resolverDecorator.decorateStoreResolver({})
  }
}
export default factory
