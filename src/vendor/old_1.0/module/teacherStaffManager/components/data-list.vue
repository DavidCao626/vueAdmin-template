<template>
	<el-table :data="tableData[0]" style="width: 100%">
		<el-table-column label="最后修改日期" width="180">
			<template slot-scope="scope">
				<i class="el-icon-time"></i>
				<span style="margin-left: 8px">{{ scope.row.time}}</span>
			</template>
		</el-table-column>
		<el-table-column label="姓名" width="180">
			<template slot-scope="scope">
				<el-popover trigger="hover" placement="top">
					<p>姓名: {{ scope.row.staff_name }}</p>
					<p>邮箱: {{ scope.row.email}}</p>
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.staff_name}}</el-tag>
					</div>
				</el-popover>
			</template>
		</el-table-column>
		<el-table-column label="职称" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.staff_Job }}</span>
			</template>
		</el-table-column>
		<el-table-column label="人事编号" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.personnel_code }}</span>
			</template>
		</el-table-column>
		<el-table-column label="任职状态" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.name }}</span>
			</template>
		</el-table-column>
		<el-table-column label="党政职务" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.pgposts }}</span>
			</template>
		</el-table-column>
		<el-table-column label="电话" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.phone }}</span>
			</template>
		</el-table-column>
		<el-table-column label="任职开始日期" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.begintime }}</span>
			</template>
		</el-table-column>
		<el-table-column label="任职结束日期" width="180">
			<template slot-scope="scope">
				<span style="margin-left: 8px">{{ scope.row.endtime }}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import Vue from 'vue'
	import GUtils from '@/components/Utils.js'
	import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
	import GraceComponent from '@/ComponentPackage/GraceComponents.js'
	import staffRequetPath from '@/API/Teacher/teacherStaff_manager.js'
	import axios from 'axios'
	Vue.use(GraceComponent)
var dat = ['user_state']
	var dictConf = {
	  'method': 'post',
	  'url': staffRequetPath.getstaffDict,
	  data: {
	    'dicts': dat
	  }
	}

	var staffConf = {
	  'method': 'post',
	  'url': staffRequetPath.getAllStaff
	}

	export default {
	  data() {
	    return {
	      responseData: [],
	      tableData: []
	    }
	  },
	  methods: {
	    handleEdit(index, row) {
	      console.log(this.responseData)
	    },
	    handleDelete(index, row) {
	      console.log(index, row)
	    }
	  },
	  mounted: function() {
	    const t = this
	    axios(staffConf).then(function(response) {
	      console.log(['response', response])
	      t.tableData.push(response.data.body.resBody.rData)
	      console.log(['response....', t.tableData[0]])
	    }).catch(function(error) {
	      t.$message({
	        showClose: true,
	        message: error.message,
	        type: 'error'
	      })
	    })

    axios(dictConf).then(function(response) {
	      console.log(['responseddddddd', response])
	      t.responseData.push(response.data.body.resBody.user_state)
	      console.log(['responseData', t.responseData[0]])
	    }).catch(function(error) {
	      t.$message({
	        showClose: true,
	        message: error.message,
	        type: 'error'
	      })
	    })
  }
	}
</script>