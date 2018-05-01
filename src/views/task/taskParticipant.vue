<template>

	<div class="components-container">
		
		<el-form :model="headFormData" label-width="80px">
			<el-row>
				<el-col :span="8">
					<el-form-item label='组织'>
						<el-cascader :change-on-select='true' expand-trigger="click" :props="orgProps" :options="orgList" v-model="headFormData.nodeOrgCode" @change="orgCodeChange">
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label='职务'>
						<el-select v-model="headFormData.dutyCode" @change="dutyCodeChange" placeholder="请选择职务">
							<el-option v-for="(item,index) in dutyList" :key="index" :label="item.duty_name" :value="item.duty_code"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label=''>
						<el-button type="success" size="small" @click="saveParticipant">保存</el-button>
					</el-form-item>
				</el-col>
				
			</el-row>
		</el-form>

		<div class="editor-container">
			<dnd-list :list1="list1" :list2="list2" list1Title="参与者" list2Title="用户列表"></dnd-list>
		</div>
	</div>
</template>

<script>
	import DndList from '~/components/DndList'
	import {
		queryDutyByOrgCodeX,
		queryUserByDutyCodeAndOrgCodeX,
		queryUserOrg
	} from "~/api/task";

	var headFormData = {
		'nodeOrgCode': [],
		'dutyCode': ''
	}

	export default {
		name: 'dndList-demo',
		components: {
			DndList
		},
		data() {
			return {
				list1: [],
				list2: [],
				headFormData,
				orgList: [],
				dutyList: [],
				orgList: [],
				orgProps: {
					value: "org_code",
					label: "org_name"
				},

			}
		},
		created() {
			this.getData()
		},
		methods: {
			saveParticipant(){
					
					console.log(['parlist',this.list1]);
					
			},
			getData() {
				this.listLoading = true
				this.list1=[]
				this.list2=[]

			},
			// 组织变化触发的方法,加载组织下职务
			orgCodeChange: function(val) {
				this.headFormData.dutyCode = "";
				console.log(val);
				var data = {
					orgCode: val
				};
				new Promise((resolve, reject) => {
					queryDutyByOrgCodeX(data)
						.then(response => {
							resolve(response);
							this.dutyList = response.resBody;
						})
						.catch(error => {
							reject(error);
						});
				});
			},
			// 职务被选中触发的方法加载责任人列表
			dutyCodeChange: function(val) {
				var data = {
					orgCode: this.headFormData.nodeOrgCode,
					dutyCode: val
				};
				new Promise((resolve, reject) => {
					queryUserByDutyCodeAndOrgCodeX(data)
						.then(response => {
							resolve(response);
							this.list2 = response.resBody;
						})
						.catch(error => {
							reject(error);
						});
				});
			}

		},
		mounted: function() {
			new Promise((resolve, reject) => {
				queryUserOrg()
					.then(response => {
						this.orgList = response.resBody;
					})
					.catch(error => {});
			});
		}
	}
</script>