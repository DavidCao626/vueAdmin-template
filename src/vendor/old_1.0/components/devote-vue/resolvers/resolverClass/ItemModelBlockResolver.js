import _lodash from "lodash"
import resolverDecorator from "../ResolverDecorator.js"

var resolver = {
	_resolver_name: "ItemModelBlockResolver",
	_fields: {
		items: [],
		_refs: {}
	},
	_v_bind: function(ref) {
		this._bind_source=ref;
		_lodash.forEach(this._fields.items, function(val) {
			var resolver = val.store.getResolver();
			resolver.bindOutsideRef(ref, val["key"]);
		});
	},
	bindDataSource:function(ref){
		 Object.defineProperty(this,"dataSource",{
		  		enumerable: true,
				configurable:true,
				get: function() {
					return ref;
				},
				set: function(val) {
					ref=val;
				}
		  });
		  this.dataSource=ref;
	},
	bindDataStore:function(ref){
		  this.dataStore=ref;
	},
	bindItemRules:function(rules){
		  this.itemRules=rules;
	},
	_bindItemKey: function() {
		var that = this;
		_lodash.forEach(this._fields.items, function(val) {
			var ItemResolver = val.store.getResolver();
			that._fields._refs[val.key] = ItemResolver;
		});
	},
	validateItem: function(validateResult) {
		var that=this;
		var validateResolvers = this.getItemResolversByStackName("FormRuleResolver");
		var validateState = true;
		_lodash.forEach(validateResolvers, function(val) {
			if(!val.validate(validateResult,that)) {
				validateState = false;
				return validateState;
			}
		});
		return validateState;
	},
	getItemResolvers: function() {
		var resolvers = [];
		_lodash.forEach(this._fields.items, function(val) {
			var resolver = val.store.getResolver();
			resolvers.push(resolver);
		});
		return resolvers;
	},
	mountedDataStore: function(dataSource) {
		var that=this;
		if(!dataSource){
			var resolvers=this.getItemResolversByStackName("DataStoreResolver");
			_lodash.forEach(resolvers,function(val){
				val.mounteItemStore(null,that);
			});
			return resolvers;
		}
		var resolvers = [];
		_lodash.forEach(this._fields.items, function(val) {
			var resolver = val.store.getResolver();
			var s = -1;
			if((s = _lodash.indexOf(resolver._resolver_stacks, "DataStoreResolver")) != -1) {
				resolver.mounteItemStore(dataSource[val.key],that);
			}
		});
		return resolvers;
	},
	getItemResolversByStackName: function(resolver_name) {
		var resolvers = [];
		_lodash.forEach(this._fields.items, function(val) {
			var resolver = val.store.getResolver();
			var s = -1;
			if((s = _lodash.indexOf(resolver._resolver_stacks, resolver_name)) != -1) {
				resolvers.push(resolver);
			}
		});
		return resolvers;
	},
	getItemResolverByKey: function(key) {
		return this._fields._refs[key];
	},
	addItem: function(item) {
		this._fields.items.push(item);
	},
	changeItems:function(items){
		 this._fields.items=items;
	},
	addItems:function(items){
		var that=this;
		_lodash.forEach(items,function(val){
			that.addItem(val);
		});
	},
	clearItems:function(){
		this._fields.items=[];
	}
};
resolver = resolverDecorator.decorateResolver(resolver)
export default resolver;