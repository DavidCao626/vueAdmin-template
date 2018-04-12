<template>
	 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="bindMutual.data.page_current_page"
      :page-sizes="store.conf.pageSize"
      :page-size="this.bindMutual.data.page_size"
      :layout="store.conf.layout"
      :total="bindMutual.data.page_total">
   </el-pagination>
</template>
<script>
	export default {
		name: 'gracePage',
		props: ['componentStore'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			return store;
		},
		methods: {
			handleSizeChange: function(size) {
				console.log(size);
				this.bindMutual.data.page_size=size;
			},
			handleCurrentChange:function(currentPage){
				//console.log(this.bindMutual.data.page_current_page);
				this.bindMutual.data.page_current_page=currentPage;
			}
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
	
</style>


