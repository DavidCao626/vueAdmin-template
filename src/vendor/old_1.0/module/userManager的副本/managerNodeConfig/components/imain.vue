<template>
	<div>
		<show ref="show"></show>
		<el-button @click="addBt()">增加配置</el-button>
		<el-dialog title="增加用户对象" :visible.sync="addDV" width="45vw" top="10vh">
			<div style="overflow-y:scroll;height:40vh;padding:0 15px">
				<dform ref="form1"></dform>
			</div>
			<span slot="footer" class="dialog-footer">
					<el-button size="small" @click="addUserObject()">保存</el-button>
				    <el-button size="small" @click="addDV= false">取 消</el-button>
  				</span>
		</el-dialog>

	</div>
</template>

<script>
	import dform from './dform.vue'
	import show from './show.vue'
	import GUtils from '@/components/Utils.js'
	import dataPath from '@/API/ManagerNode/manager_node.js'
	var test = 1
export default {
	  components: {
	    'dform': dform,
	    show
	  },
	  data() {
	    return {
	      test: test,
	      addDV: false
	    }
	  },
	  methods: {
	    addBt: function() {
	      this.addDV = true
	    },
	    addUserObject: function() {
	      this.addDV = false
	      var that = this
	      console.log(this.$refs['form1'].formStore.formData.data)
	      GUtils.post(dataPath.addUserManagerNodeUserObject, this.$refs['form1'].formStore.formData.data, function(data) {
	        // 增加成功
	        that.$refs.show.loadData()
	      })
    }
	  }
	}
</script>

<style>

</style>