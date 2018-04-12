<template>
	<el-container>
		<el-header id="nc_container_header" :height="headerHeight" v-show="store.conf.isHeader" >
				<slot name="header"></slot>
		</el-header>
		<el-main :style="{height:store.conf.workHeight}">
			<slot></slot>
		</el-main>
		<el-footer id="nc_container_footer" :height="footerHeight" v-show="store.conf.isFooter">
			<slot name="footer"></slot>
		</el-footer>
	</el-container>
</template>
<script>
	export default {
		name: 'graceContainer',
		props: ['componentStore'],
		data: function() {
			var store = {};
			if(this.componentStore) {
				store = this.componentStore;
			}
			return store;
		},
		methods: {
			changeHeight: function() {
				var realHeight = this.store.conf.prefHeight;
				if(!realHeight) {
					realHeight = 0;
				}
				if(typeof this.$el !== "undefined") {
					var headerHeight = this.__selector(this.$el, "#nc_container_header").clientHeight;
					if(!this.store.conf.isHeader){
						headerHeight=0;
					}
					var fotterHeight = this.__selector(this.$el, "#nc_container_footer").clientHeight;
					if(!this.store.conf.isFooter){
						fotterHeight=0;
					}
					realHeight = realHeight - headerHeight - fotterHeight;
					console.log([headerHeight,fotterHeight,realHeight]);
					this.__putDeepObjectValue("store:conf:resultHeight", realHeight);
				}
				if(realHeight > 0) {
					this.store.conf.workHeight=realHeight+"px"
				} else {
					this.store.conf.workHeight="auto";
				}
			}
		},
		computed: {
			/**
			 * 头部高度
			 */
			headerHeight: function() {
				var val = this.__getDeepObjectValue("store.conf.headerHeight");
				if(typeof val !== "undefined" && val != "auto") {
					return val + "px";
				} else {
					return "auto";
				}
			},
			/**
			 * 底部高度
			 */
			footerHeight: function() {
				var val = this.__getDeepObjectValue("store.conf.footerHeight");
				if(typeof val !== "undefined" && val != "auto") {
					return val + "px";
				} else {
					return "auto";
				}
			}
		},
		updated: function() {
			//this.changeHeight();
		},
		mounted:function(){
			//this.changeHeight();
		},
		watch:{
			"store.conf.prefHeight":function(val){
				//console.log("prefHeightChanged"+val);
				this.changeHeight();
			}
		}
	}
</script>
<style>
	#bodyBox .el-main {
		padding: 0 2px;
	}
	
	#bodyBox .el-header {
		padding: 0 2px;
	}
	
	#bodyBox .el-footer {
		padding: 0 2px;
	}
	#bodyBox .el-button{
		margin-left:1px;
	}
	#bodyBox,
	body {
		margin: auto;
	}
</style>