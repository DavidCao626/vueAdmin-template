import _lodash from 'lodash'
import resolverDecorator from '../ResolverDecorator.js'

var resolver = {
  _resolver_name: 'DataStoreResolver',
  _fields: {},
  _do_execute: function() {},
  _loadItem: function(groupResolver) {
    if (this._store) {
      this._store.call(this, this.loadCallBack, groupResolver)
    }
  },
  setSingleStore: function(store) {
	    this._store = store
  },
  callStore: function(store) {
    this._store = store
    this._store.call(this, this.loadCallBack)
  },
  _load: function() {
    if (this.itemResolver && this.itemKey) {
      var that = this
      var stores = this.itemResolver.dataStore
      if (stores && stores[this.itemKey]) {
        this._store = stores[this.itemKey]
      }
    }
    if (!this._store) {
      this._store = function() {
        console.log('store is nothing do')
      }
    }
    this._loadItem(this.itemResolver)
  }
}
resolver = resolverDecorator.decorateResolver(resolver)
export default resolver
