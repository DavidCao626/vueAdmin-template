import _lodash from "lodash"
import resolverDecorator from "./ResolverDecorator.js"

var storeDecorator=function(store,resolver){
     var storeResolver=resolverDecorator.decorateStoreResolver(store);
     if(resolver){
       storeResolver=storeResolver._assign_resolver(resolver);
     }
     return storeResolver;
}

var factory = {
	buildComponent: function(vueInstance,store,resolver) {
	    var resolverStore=storeDecorator(store,resolver);
		var component = {
			_nstore:null,
			template: '<div><inner :fields="fields"></inner></div>',
			components:{
				"inner":vueInstance
			},
			data: function() {
				console.log(["resolvers:",this.itemResolver]);
				if(this.contextStore){
				    var nstore=_lodash.cloneDeep(resolverStore);
				    if(this.itemResolver){
				    	nstore.itemResolver=this.itemResolver;
				    	nstore.itemKey=this.itemKey;
				    	nstore.isItem=true;
				    }
				    this.contextStore.getResolver=function(){
				       return nstore;
				    }
				    var newContextStore=storeDecorator(this.contextStore);
				    nstore._assign_resolver(newContextStore);
				    nstore._take_over=newContextStore;
				    nstore._linked_component=this;
				    nstore._fields._getResolver=function(){
				    	return nstore;
				    }
				    nstore._run_execute();
				    return {
				       fields:nstore._fields
				    }
				}else{
				   resolverStore._linked_component=this;
				    if(this.itemResolver){
				    	nstore.itemResolver=this.itemResolver;
				    	nstore.itemKey=this.itemKey;
				    	nstore.isItem=true;
				    }
				   resolverStore._fields._getResolver=function(){
				    	return resolverStore;
				   }
				   resolverStore._run_execute();
				   return {
						fields: resolverStore._fields
					}
				}
			},
			props: ["contextStore","itemResolver","itemKey"],
			getResolver: function() {
				return resolverStore;
			}
		}
		return component;
	},
	buildResovler:function(){
		return resolverDecorator.decorateStoreResolver({});
	}
};
export default factory;