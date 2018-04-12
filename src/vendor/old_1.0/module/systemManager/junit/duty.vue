<template>
	<div>
		<div class="item" v-for="item in data" :key="item.dutyCode" style="padding:15px">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>{{item.managerNodeName}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{item.officeOrgName}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{item.typeName}}</el-breadcrumb-item>
				<el-breadcrumb-item>{{item.dutyName}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</div>
</template>
<script>
	import GUtils from '@/components/Utils.js'
	import reqPath from '@/API/System/SystemManagerApi.js'
	export default {
	  data: function() {
	    return {
	      data: []
	    }
	  },
	  props: ['store'],
	  computed: {
	    getData: function() {
	      var resultData = []

	      return resultData
	    }
	  },
	  mounted: function() {
	    var that = this
	    GUtils.requestBody(reqPath.queryUserDuty, {}, function(data) {
	      console.log(data.resBody)
	      for (var i = 0; i < data.resBody.length; i++) {
	        that.data.push(data.resBody[i])
	      }
	      console.log(that.data)
	    })
  }
	}
</script>