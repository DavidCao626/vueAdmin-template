<template>
	 <el-radio-group v-model="model" :size="store.conf.size" :disabled="store.conf.disabled" >
	 	<template  v-for="item in store.data">
	 		<el-radio-button :disabled="item.disabled" :name="item.val" :label="item.val" :key="item.val" :border="store.conf.isBorder" v-if="store.conf.isButton">{{item.name}}</el-radio-button>
	 		<el-radio :disabled="item.disabled" :name="item.val" :label="item.val" :key="item.val" :border="store.conf.isBorder" v-else>{{item.name}}</el-radio>
	 	</template>
  </el-radio-group>
</template>
<script>
	export default {
		name: 'graceRadioGroup',
		props: ['componentStore','modelRef','modelKey'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			if(this.modelRef){
				 store.conf.modelRef=this.modelRef;
			}
			if(this.modelKey){
				store.conf.modelKey=this.modelKey;
			}
			return store;
		},
		methods: {},
		computed: {
			model: {
				get: function() {
					return this.store.conf.modelRef[this.store.conf.modelKey];
				},
				set: function(newVal) {
					this.store.conf.modelRef[this.store.conf.modelKey] = newVal;
				}
			}
		},
		mounted:function(){
			
		},
		watch: {}
	}
</script>