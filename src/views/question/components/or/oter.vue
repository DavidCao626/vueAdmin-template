<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>问卷申请信息</span>
				<el-button type="text" style="float: right; " @click="isEditStatus=!isEditStatus"  icon="el-icon-more" ></el-button>
			</div>

			<div class="list-box" v-show="isEditStatus">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="活动名称">
							<el-input v-model="form.name" width="100px" placeholder="请输入内容" ></el-input>
					</el-form-item>
					<el-form-item label="活动区域">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="活动时间">
						<el-col :span="11">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="即时配送">
						<el-switch v-model="form.delivery"></el-switch>
					</el-form-item>
					<el-form-item label="活动性质">
						<el-checkbox-group v-model="form.type">
							<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
							<el-checkbox label="地推活动" name="type"></el-checkbox>
							<el-checkbox label="线下主题活动" name="type"></el-checkbox>
							<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="特殊资源">
						<el-radio-group v-model="form.resource">
							<el-radio label="线上品牌商赞助"></el-radio>
							<el-radio label="线下场地免费"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="活动形式">
						<el-input type="textarea" v-model="form.desc"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
	  name: 'question-or',
	  data() {
	    return {
	      isEditStatus: true,
	      form: {
	        name: '2018年第一季度大学生心理健康调研活动',
	        region: '',
	        date1: '',
	        date2: '',
	        delivery: false,
	        type: [],
	        resource: '',
	        desc: ''
	      }
	    }
	  },
	  methods: {
	    onSubmit() {
	      console.log('submit!')
	    }
	  }
	}
</script>
<style scoped>
 .el-input__inner{
	border-color: #FFFFFF;

}
.list-box  .el-input__inner:hover
{
	background-color: #eee
}
</style>