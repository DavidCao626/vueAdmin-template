<template>
	<el-table :data="store.data" v-loading="store.conf.loading" @selection-change="selectionChange" @sort-change="sortChange" :show-header="store.conf.showHeader" :size="store.conf.size" :height="store.conf.height" :border="store.conf.isBorder" :style="{width:store.conf.width}" @filter-change="filterChange">
		<el-table-column type="selection" width="55">
		</el-table-column>
		<slot></slot>
		<el-table-column label="@操作" width="70" v-if="store.conf.isRowOperation">
			<template slot-scope="scope">
				<el-dropdown trigger="click"  @command="callBackOperator">
					<el-button size="mini">
						<i class="el-icon-arrow-down"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="item in store.conf.operations" :key="item.name"  :command="{'operation':item.operator,index:scope.$index,row:scope.row}" >{{item.title}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</template>
		</el-table-column>
		<el-table-column type="expand" v-if="store.conf.isExpand" width="50">
			<template slot-scope="props">
				<el-form label-position="left" inline class="demo-table-expand">
					<el-form-item :label="item.label" v-for="item in store.conf.expands" :key="item.label">
						<span>{{ props.row[item.attr] }}</span>
					</el-form-item>
				</el-form>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
	export default {
	  name: 'graceTable',
	  props: ['componentStore'],
	  data: function() {
	    var store = {}
	    if (this.componentStore) {
	      store = this.componentStore
	    }
	    return store
	},
	  methods: {
	    selectionChange: function(selection, row) {
	      this.store.conf.selects = selection
	    },
	    sortChange: function(column, prop, order) {
	      console.log('order')
    },
	    filterChange: function(filters) {
	      console.log(filter)
	    },
	    callBackOperator: function(command) {
	      command.operation.call(this, command.index, command.row)
	    }
	  },
	  computed: {

	  },
	  beforeUpdate: function() {
	    this.store.conf.loading = true
	},
	  updated: function() {
	    this.store.conf.loading = false
	},
	  mounted: function() {}
	}
</script>
<style>
	#bodyBox .el-table--small th,
	#bodyBox .el-table--small td {
		padding: 1px 0;
	}
</style>