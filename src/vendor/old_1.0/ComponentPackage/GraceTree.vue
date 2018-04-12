<template>
	<div style="minWidth:140px" >
	<el-input placeholder="树过滤条件" size="mini" v-if="store.conf.boost" v-model="store.conf.filterText">
    		<el-button slot="append" icon="el-icon-refresh" size="mini" @click="updateSelectNode()"></el-button>
  </el-input>
	<el-tree :data="store.data" ref="boost_tree" :filter-node-method="filterNode" @node-expand="nodeExpand" :node-key="store.conf.dataKey" :show-checkbox="store.conf.isCheckBox" @node-click="clickNode" :expand-on-click-node="store.conf.clickExpanded" node-key="id" :default-expanded-keys="store.conf.defaultExpands" :default-checked-keys="store.conf.defaultCheckeds" :lazy="store.conf.isLazy" :load="load" :empty-text="store.conf.emptyText" :props="store.conf.defaultProps">
	</el-tree>
	</div>
</template>
<script>
	export default {
		name: 'graceTree',
		props: ['componentStore'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			return store;
		},
		methods: {
			load: function(node, resolve) {
				if(node.level === 0) {
					var rootNode={noe_id: this.store.conf.rootId,root_no:this.store.conf.rootNo};
					rootNode[this.store.conf.defaultProps.label]=this.store.conf.rootName;
					 resolve([rootNode]);
				}else{
					return this.store.conf.load.call(this,node,resolve);
				}
			},
			clickNode:function(data,node,nodeCom){
				this.store.conf.selectedNode=node;
				 if(node.level === 0) {
				    return;
				 }else{
				 	return this.store.conf.nodeClick.call(this,data,node,nodeCom);
				 }
			},
			nodeExpand:function(data,node,nodeComponent){
				
			},
			updateSelectNode:function(){
				if(!this.store.conf.isLazy){
					return;
				}
				var node=this.store.conf.selectedNode;
				var updateResolve=function(data){
					console.log(data);
					node.data.children=data;
					node.updateChildren();
				}
				return this.store.conf.load.call(this,node,updateResolve);
			},
			filterNode:function(value,data){
				if(!value) return true;
				var label=this.store.conf.defaultProps.label;
				return data[label].indexOf(value)!==-1;
			}
		},
		computed: {},
		updated: function() {
			//this.changeHeight();
		},
		mounted: function() {
			//this.changeHeight();
		},
		watch: {
			"store.conf.filterText":function(val){
				 console.log(this);
				 this.$refs.boost_tree.filter(val);
			}
		}
	}
</script>