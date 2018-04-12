import _lodash from "lodash"
import customizer from "./customizer/DecoratorCustomizer.js"
import linkedcustomizer from "./customizer/DefaultAssingCustomizer.js"
import undefinedcustomizer from "./customizer/UnDefinedCustomizer.js"

var arrayPushAll=function(target,source){
	for(var i=0;i<source.length;i++){
		target.push(source[i]);
	}
}
var baseResolver={
	_resolver_name:"resolver",
	_resolver_stacks:[],
     _fields:{},
     _linked_resolver:{
     		resolvers:{},
     		execute:function(resolver,_linked_resolver){
     			resolver._do_execute.call(this);
     		    var keys=Object.keys(_linked_resolver.resolvers);
     		   	var i=keys.length;
     		   	while(i--){
     		   	   var link_resolver=_linked_resolver.resolvers[keys[i]];
     		   	   link_resolver._linked_resolver.execute.call(this,link_resolver,link_resolver._linked_resolver);
     		   	}
     		}
     },
     _push_resolver_name:function(){
     	if(this._resolver_name){
     		this._resolver_stacks.push(this._resolver_name);
     	}
     },
     _run_execute:function(){
      	this._linked_resolver.execute.call(this,this,this._linked_resolver);
     },
     _do_execute:function(){
     },
     _assign_resolver:function(resolver){
     	var newResolver=_lodash.mergeWith(this,resolver,linkedcustomizer);
     	newResolver._linked_resolver.resolvers[resolver._resolver_name]=resolver;
     	arrayPushAll(newResolver._resolver_stacks,resolver._resolver_stacks);
     	return newResolver;
     },
     _assign_store:function(store){
     	var newResolver=_lodash.mergeWith(this,store,linkedcustomizer);
     	return newResolver;
     },
     _assign_resolver_undefined:function(resolver){
        var newResolver=_lodash.mergeWith(this,resolver,undefinedcustomizer);
     	newResolver._linked_resolver.resolvers[resolver._resolver_name]=resolver;
     	return newResolver;
     }
};
var resolverDecorator={
    decorateResolver:function(resolverClass){
     // console.log(customizer);
	  var resolver=_lodash.mergeWith(resolverClass,baseResolver,customizer);
	  resolverClass._push_resolver_name();
	  return resolver;
	},
	decorateStoreResolver:function(store){
		 //console.log(customizer);
		 var resolver=_lodash.mergeWith(store,baseResolver,customizer);
		 return resolver;
	},
	executeResolver:function(resolver){
	     resolver._linked_resolver.execute();
	}
}
export default resolverDecorator;

