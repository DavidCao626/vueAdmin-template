import _lodash from 'lodash'
import resolverDecorator from '../ResolverDecorator.js'

var resolver = {
  _resolver_name: 'ItemResolver',
  mountedItem: function() {
    // console.log(this);
    if (_lodash.indexOf(this._resolver_stacks, 'ModelResolver') != -1 || _lodash.indexOf(this._resolver_stacks, 'ModelArrayResolver') != -1) {
      //			/console.log(this);
      this._bind()
    }
    if (_lodash.indexOf(this._resolver_stacks, 'DataStoreResolver') != -1) {
      this._load()
    }
  },
  setKey: function(keyName) {
    this.itemKey = keyName
  },
  singleBindData: function(ref) {
    if (!this.itemKey) {
      return
    }
    var that = this
    var val = ref[this.itemKey]
    Object.defineProperty(ref, this.itemKey, {
      enumerable: true,
      configurable: true,
      get: function() {
        return that._fields._value
      },
      set: function(val) {
        that._fields._value = val
      }
    })
    ref[this.itemKey] = val
  }
}
resolver = resolverDecorator.decorateResolver(resolver)
export default resolver
