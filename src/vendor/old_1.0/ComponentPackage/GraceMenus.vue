<template>
	<el-menu :default-active="store.conf.activeIndex" @select="selectMenu" class="el-menu-demo" :mode="store.conf.mode">
		<template v-for="item in store.data">
			<template v-if="!getItemFieldBoolResults(item,'visible')">
				<!--如果没权限不现实菜单-->
			</template>
			<template v-else>
				<template v-if="!getItemFieldBoolResults(item,'childs')">
					<el-menu-item :index="getItemField(item,'idx')" :key="getItemField(item,'idx')" :data-item="item">
						<i :class="getItemField(item,'icon')" v-show="getItemFieldBoolResults(item,'icon')"></i>
						<span slot="title">{{getItemField(item,'title')}} </span>
					</el-menu-item>
				</template>
				<template v-else>
					<el-submenu :index="getItemField(item,'idx')" :key="getItemField(item,'idx')">
						<template slot="title">
							<i :class="getItemField(item,'icon')" v-show="getItemFieldBoolResults(item,'icon')"></i>
							<span slot="title">{{getItemField(item,'title')}}</span>
						</template>
						<template v-for="childItem in getItemField(item,'childs')">
							<template v-if="!getItemFieldBoolResults(childItem,'visible')">
							</template>
							<template v-else>
								<el-menu-item v-if="!getItemFieldBoolResults(childItem,'childs')" :key="getItemField(childItem,'idx')" :index="getItemField(childItem,'idx')" :data-item="childItem">
									<i :class="getItemField(childItem,'icon')" v-show="getItemFieldBoolResults(childItem,'icon')"></i>
									<span slot="title">{{getItemField(childItem,'title')}}</span>
								</el-menu-item>
								<el-submenu v-else :index="getItemField(childItem,'idx')" :key="getItemField(childItem,'idx')">
									<template slot="title">
										<i :class="getItemField(childItem,'icon')" v-show="getItemFieldBoolResults(childItem,'icon')"></i>
										<span slot="title">{{getItemField(childItem,'title')}}</span>
									</template>
									<el-menu-item v-for="childchildItem in getItemField(childItem,'childs')" v-if="getItemFieldBoolResults(childchildItem,'visible')" :key="getItemField(childchildItem,'idx')" :index="getItemField(childchildItem,'idx')" :data-item="childchildItem">
										<i :class="getItemField(childchildItem,'icon')" v-if="getItemFieldBoolResults(childchildItem,'icon')"></i>
										<span slot="title">{{getItemField(childchildItem,'title')}}</span>
									</el-menu-item>
								</el-submenu>
							</template>
						</template>
					</el-submenu>
				</template>
			</template>
		</template>
	</el-menu>
</template>
<script>
	export default {
	  name: 'graceMenus',
	  props: ['componentStore'],
	  data: function() {
	    var store = {}
	    if (this.componentStore) {
	      store = this.componentStore
	    }
	    return store
	},
	  methods: {
	    selectMenu: function(idx, indexPath, item) {
	      console.log(item)
	      console.log(idx, indexPath)
	      this.store.conf.selectCallBack.call(this, idx, indexPath, item.$attrs['data-item'])
	    },
	    // 获取组建绑定元素外部对应值
	    getItemField: function(item, Field) {
	      var bingItem = this.store.conf.bingItem
	      if (bingItem && bingItem[Field]) {
	        return item[bingItem[Field]]
	      } else {
	        return eval('item.' + Field)
	      }
	    },
	    // 获取外部绑定元素的对应值转成v-if可识别bool类型结果
	    getItemFieldBoolResults: function(item, Field) {
	      switch (this.getItemField(item, Field)) {
	        case 'false':
	          return false
	        case false:
	          return false
	        case 'true':
	          return true
	        case true:
	          return true
	        default:
	          if (this.getItemField(item, Field).length > 0) {
	            return true
	          } else {
	            return false
	          }
	      }
	    }
	  },
	  computed: {
	    isChilds: {
	      get: function() {
	        return true
	      },
	      set: function(newValue) {

	      }
	    }
	  },
	  beforeUpdate: function() {},
	  updated: function() {},
	  mounted: function() {},
	  watch: {}
	}
</script>
<style>
	#bodyBox .el-menu--horizontal .el-menu-item {
		height: 50px;
		line-height: 50px;
	}
	
	#bodyBox .el-menu--horizontal {
		border-bottom: none;
	}
	
	#bodyBox .el-menu--horizontal .el-submenu .el-submenu__title {
		height: 50px;
		line-height: 50px;
	}
	
	#bodyBox .el-menu--horizontal .el-submenu .el-menu-item {
		height: 36px;
		line-height: 36px;
	}
	
	#bodyBox .el-menu--horizontal .el-submenu>.el-menu {
		top: 50px;
	}
</style>