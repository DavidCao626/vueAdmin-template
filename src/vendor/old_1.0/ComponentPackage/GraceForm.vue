<template>
	<el-form :label-position="store.conf.labelPosition" :size="store.conf.size" :rules="bindMutual.rules" :ref="store.conf.refDefined" :inline="store.conf.isInline" :label-width="store.conf.labelWidth" :model="bindMutual.data">
		<slot></slot>
	</el-form>
</template>
<script>
	export default {
		name: 'graceForm',
		props: ['componentStore'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			console.log([store,store.bindMutual]);
			return store;
		},
		methods: {

		},
		computed: {

		},
		beforeUpdate: function() {

		},
		updated: function() {

		},
		mounted: function() {

		}
	}
</script>
<style>
	#bodyBox .el-form-item--mini.el-form-item{
		margin-bottom:15px;
	}
	
</style>