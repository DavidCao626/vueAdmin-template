<template>
	<el-select v-model="model" @change="changeValue" :size="store.conf.size" :filterable="store.conf.filterable" :placeholder="store.conf.placeholder">
		<el-option v-for="item in store.data" :key="item.val" :label="item.name" :value="item.val">
				<span v-if="item.icon"  style="padding-right:15px"><i :class="item.icon" ></i></span>{{item.name}}
		</el-option>
	</el-select>
</template>
<script>
	export default {
		name: 'graceSelect',
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
			console.log(store);
			return store;
		},
		methods: {
			changeValue:function(val){
					if(this.store.conf.changeHandler){
						this.store.conf.changeHandler.call(this,val);
					}
			}
		},
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