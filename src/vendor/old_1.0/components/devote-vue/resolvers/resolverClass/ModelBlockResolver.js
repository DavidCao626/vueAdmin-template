import _lodash from "lodash"
import resolverDecorator from "../ResolverDecorator.js"
import itemResolver from "./ItemResolver.js"

var resolver = {
	_resolver_name: "ModelResolver",
	_fields: {
		_value: ""
	},
	_do_execute: function() {
		var that = this;
		if(this._ref && this._key) {
			var val = this._ref[this._key];
			Object.defineProperty(this._ref, this._key, {
				enumerable: true,
				configurable: true,
				get: function() {
					return that._fields._value;
				},
				set: function(val) {
					that._fields._value = val;
				}
			});
			this._ref[this._key] = val;
			if(this._take_over && this._take_over._ref) {
				Object.defineProperty(this._take_over._ref, this._take_over._key, {
					enumerable: true,
					configurable: false,
					get: function() {
						return that._fields._value;
					},
					set: function(val) {
						that._fields._value = val;
					}
				});
			}
		}
	},
	_v_bind: function(ref, key) {
		var that = this;
		var val = ref[key];
		//console.log([ref,key]);
		Object.defineProperty(ref, key, {
			enumerable: true,
			configurable: true,
			get: function() {
				return that._fields._value;
			},
			set: function(val) {
				that._fields._value = val;
			}
		});
		ref[key] = val;
	},
	_bind: function() {
		if(this.itemResolver && this.itemKey) {
			var that = this;
			var ref=this.itemResolver.dataSource;
			var val = ref[this.itemKey];
			//console.log([ref,key]);
			Object.defineProperty(ref, this.itemKey, {
				enumerable: true,
				configurable: true,
				get: function() {
					return that._fields._value;
				},
				set: function(val) {
					   that._fields._value = val;
				}
			});
			ref[this.itemKey] = val;
		}
	},
	/**
	 * 把某个对象绑定到v-model中来
	 * @param {Object} ref
	 * @param {Object} key
	 */
	bindOutsideRef: function(ref, key) {
		this._v_bind(ref, key);
	},
	changeVal: function(val) {
		this._fields._value = val;
	}
};
resolver = resolverDecorator.decorateResolver(resolver);
resolver=resolver._assign_resolver(itemResolver);
export default resolver;