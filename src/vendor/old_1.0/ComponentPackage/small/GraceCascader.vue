<template>
	<el-cascader :placeholder="store.conf.placeholder" :options="store.data" :filterable="store.conf.filterable" :change-on-select="store.conf.isSelectChange" :disabled="store.conf.disabled" :expand-trigger="store.conf.expandTrigger" :show-all-levels="store.conf.displayAll" v-model="model" :props="store.conf.props" :size="store.conf.size" @active-item-change="activeHandler" @change="change">
	</el-cascader>
</template>
<script>
	export default {
		name: 'graceCascader',
		props: ['componentStore', 'modelRef', 'modelKey'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			if(this.modelRef) {
				store.conf.modelRef = this.modelRef;
			}
			if(this.modelKey) {
				store.conf.modelKey = this.modelKey;
			}
			return store;
		},
		methods: {
			change: function(e) {
				//this.$emit("change", e);
				//var store = this.componentStore.store;
				if(this.store.conf.change) {
					this.store.conf.change.call(this, e);
				}
			},
			activeHandler: function(val) {
				if(this.store.conf.displayAll) {
					this.store.conf.modelRef[this.store.conf.modelKey] = val;

				}
				if(this.store.conf.lazy) {
					if(this.store.conf.loadChild) {
						this.store.conf.loadChild.call(this, val, this.store);
					}
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
		mounted: function() {
			if(this.store.conf.lazy) { //如果是懒加载，那么在组件生产后，需要把默认的数据加载回来！
				console.log(["mounted", this.model]);
				this.store.conf.defaultStack.call(this, this.model, this.store);
			}
		},
		watch: {

		}
	}
</script>