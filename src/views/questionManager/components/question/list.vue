<template>

<div class="question-list-box">
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>问题列表</span>
			<el-button type="primary" style="float: right; "  size="mini" icon="el-icon-edit" @click="showQuestionBox">添加问卷</el-button>
		</div>
		
		<div class="list-box">
			<el-table :data="questionList" align='left' :stripe="true">
				<el-table-column label="问卷名称" width="180">
					<template slot-scope="scope">
						<span >{{ scope.row.name }}</span>
					</template>
				</el-table-column>
				
				<el-table-column label="创建日期" width="180">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{ scope.row.addDate }}</span>
					</template>
				</el-table-column>
				
				<el-table-column label="问卷状态" width="180">
					<template slot-scope="scope">
						<span >{{ scope.row.status?'上线':'已下线' }}</span>
					</template>
				</el-table-column>
				
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="handleEdit(scope.row.id, scope.row)">下线</el-button>
						<el-button type="text" size="mini" @click="handleEdit(scope.row.id, scope.row)">预览</el-button>
						<el-button type="text" size="mini" @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
						<el-button type="text" size="mini" @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>	
	</el-card>

</div>
</template>

<script>
export default {
  name: 'question-list',
  data() {
    return {
      	questionList: [{
      		id: 1,
      		name: '我的问卷',
      		addDate: '2018-03-05',
      		status: true
      	}, {
      		id: 2,
      		name: '我的问卷',
      		addDate: '2018-03-05',
      		status: true
      	}, {
      		id: 3,
      		name: '我的问卷',
      		addDate: '2018-03-05',
      		status: true
      	}

      	]
    }
  },
  methods: {

    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    showQuestionBox() {
      	this.$emit('showQuestionBox')
    }
  }

}

</script>

<style scoped>
.list-box{
	border: 1px solid #ebeef5;
}
</style>