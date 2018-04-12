<template>
	<el-tabs :type="store.conf.type" v-model="store.conf.activeTab"  :style="{height:store.conf.height+'px'}" @tab-remove="removeTab">
		<template v-for="tab in store.data">
			<el-tab-pane :name="tab.name" :key="tab.name" :closable="tab.closable" :style="{height:store.conf.panelHeight+'px'}">
				<span slot="label" v-if="tab.breads">
				<el-tooltip placement="top-start" effect="light">
  					<div slot="content">
  						<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item v-for="bread in tab.breads" :key="bread">{{bread}}</el-breadcrumb-item>
						</el-breadcrumb>
  					</div>
  					<el-button  type="text">{{tab.title}}</el-button>
				</el-tooltip>
				</span>
				<span slot="label" v-else>
					{{tab.title}}
				</span>
				<template v-if="tab.link">
					<iframe v-bind:src="tab.link" style="width: 100vw;height:100%;border:none"></iframe>
				</template>
				<template v-else>
				</template>
			</el-tab-pane>
		</template>
	</el-tabs>
</template>
<script>
	export default {
	  name: 'graceTabs',
	  props: ['componentStore'],
	  data: function() {
	    var store = {}
	    if (this.componentStore) {
	      store = this.componentStore
	    }
	    return store
	},
	  methods: {
	    removeTab(targetName) {
	      const tabs = this.store.data
	      let activeName = this.store.conf.activeTab
	      if (activeName == 0) {
	        return
      }
	      if (activeName === targetName) {
	        tabs.forEach((tab, index) => {
	          if (tab.name === targetName) {
	            const nextTab = tabs[index + 1] || tabs[index - 1]
	            if (nextTab) {
	              activeName = nextTab.name
	            }
	          }
	        })
	      }
	      this.store.conf.activeTab = activeName
	      this.store.data = this.store.data.filter(tab => tab.name !== targetName)
	    }
	  },
	  computed: {},
	  beforeUpdate: function() {},
	  updated: function() {},
	  mounted: function() {
	  },
	  watch: {
	    'store.conf.height': function(val) {
	      this.store.conf.panelHeight = val - 40
    }
	  }
	}
</script>
<style>
	#bodyBox .el-tabs--border-card > .el-tabs__content{
		padding:1px;
	}
	#bodyBox .el-tabs--border-card{
		border:0px;
		border-top:1px solid #dcdfe6;
		webkit-box-shadow:none;
		box-shadow:none;
	}
	
	
</style>