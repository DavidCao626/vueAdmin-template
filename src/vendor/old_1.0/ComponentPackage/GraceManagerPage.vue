<template>
	<div :style="{height:store.conf.workSpaceHeight+'px',margin:'2px'}"  v-loading="store.conf.loaddings">
		<gc-form :component-store="serviceForm">
			<el-col :span="18">
				<slot name="quickSearchItems"></slot>
				<el-button-group size="mini">
					<el-button type="info" icon="el-icon-more" @click="store.conf.dialogVisiable = true" title="更多条件" size="mini"></el-button>
					<el-button type="info" @click="queryDataStore()" icon="el-icon-search" title="查询" size="mini"></el-button>
					<el-button type="info" icon="el-icon-refresh" title="重置" size="mini"></el-button>
				</el-button-group>
			</el-col>
			<el-col :span="6" style="text-align: right;">
				<el-button-group size="mini">
					<slot name="often"></slot>
					<el-dropdown trigger="click" @command="callBackOperator">
						<el-button size="mini" type="info">
							<i class="el-icon-share"></i>
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item v-for="item in store.conf.operations" :key="item.name" :command="{'operation':item.operator}">{{item.title}}</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-button-group>
			</el-col>
		</gc-form>
		<el-dialog title="查询" :visible.sync="store.conf.dialogVisiable" :width="store.conf.workSpaceWidth" top="15vh">
			<div style="overflow-y:scroll;height:50vh;padding:0 15px">
				<slot name="allSearchItems"></slot>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button size="small" @click="doAllSearch()">查询</el-button>
				<el-button size="small" @click="hidenDialog()">返回</el-button>
			</div>
		</el-dialog>
		<gc-table :component-store="serviceTable">
			<slot name="dataCloumns"></slot>
		</gc-table>
		<gc-page :component-store="servicePage"></gc-page>
	</div>
</template>
<script>
	export default {
		name: 'graceManagerComponent',
		props: ['componentStore'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			return store;
		},
		methods: {
			hidenDialog: function() {
				this.store.conf.dialogVisiable = false;
			},
			doAllSearch:function(){
				this.queryDataStore();
				this.store.conf.dialogVisiable = false;
			},
			callBackOperator: function(command) {
				console.log(this);
				command.operation.call(this,this.serviceTable,this.serviceForm);
			},
			queryDataStore: function() {
				this.store.conf.loadData.call(this,this.serviceForm,this.serviceTable);
			}
		},
		computed: {},
		beforeUpdate: function() {},
		updated: function() {},
		mounted: function() {},
		watch: {
			"store.conf.workSpaceHeight": function(val) {
				this.serviceTable.store.conf.height = (val - 80);
			},
			
			"serviceForm.bindMutual.data.page_current_page":function(val){
				this.queryDataStore();
			},
			"serviceForm.bindMutual.data.page_size":function(val){
				console.log(val);
				this.queryDataStore();
			}
		}
	}
</script>
<style>

</style>