import GUtils from "@/components/Utils.js"
var componentResolver={
	template:'<div><inner :model="store"></inner></div>',
	components:{
		inner
	},
	data: function() {
		/*
				if(this.contextStore){
					GUtils.supply(this.contextStore,componentResolver);
					componentResolver=this.contextStore;
				}
				return {
					store: componentResolver
				}
		*/
		return {
			store:{}
		}
	},
	props:["contextStore"]
};

