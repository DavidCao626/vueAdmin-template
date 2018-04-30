<template>

	<div>
		<el-row>
			<el-col :span="5">
				<div>
					<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</div>
			</el-col>
			<el-col :span="19">
				<div>

					<el-tabs type="border-card">
						<el-tab-pane label="更新业务类别">

							<el-form :model="updateForm.data" :rules="updateForm.rules" ref="updateForm1" label-width="80px">
								<el-form-item label="业务类别编号" prop="">
										<el-input size="mini" v-model="updateForm.data.serviceTypeCode"></el-input>
								</el-form-item>
								<el-form-item label="业务类别名称" prop="">
										<el-input size="mini" v-model="updateForm.data.serviceTypeName"></el-input>
								</el-form-item>
							</el-form>
							<el-button type="success" @click="updateButton('updateForm1')">更新</el-button>
							

						</el-tab-pane>
						<el-tab-pane :disabled="allowAdd" label="增加子业务类别">

							<el-form :model="addForm.data" :rules="addForm.rules" ref="addForm1" label-width="80px">
								<el-form-item label="业务类别名称" prop="">
										<el-input size="mini" v-model="updateForm.data.serviceTypeName"></el-input>
								</el-form-item>
							</el-form>
							
							<el-button type="success" @click="addButton('addForm1')">增加</el-button>
						</el-tab-pane>
					</el-tabs>

				</div>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	import { queryServiceTypeList, insertServiceType, updateServiceType, deleteServiceType, insertServiceChildType, updateServiceChildType, deleteServiceChildType } from '~/api/data'

	var data = [{
		classify_code: "201804",
		classify_name: "贫困建档",
		is_leaf: 'false',
		children: [{
			classify_code: "201807",
			classify_name: "子业务2",
			is_leaf: 'true',
			children: []
		}, {
			classify_code: "201808",
			classify_name: "子业务3",
			is_leaf: 'true',
			children: []
		}]
	}, {
		classify_code: "201805",
		classify_name: "贫困建档2",
		is_leaf: 'false',
		children: [{
			classify_code: "201809",
			classify_name: "子业务4",
			is_leaf: 'true',
			children: []
		}, {
			classify_code: "201810",
			classify_name: "子业务5",
			is_leaf: 'true',
			children: []
		}, {
			classify_code: "201811",
			classify_name: "子业务6",
			is_leaf: 'true',
			children: []
		}]
	}]

	var updateForm = {}
	updateForm.data = {
		serviceTypeCode: "",
		serviceTypeName: "",
		is_leaf: ''
	}
	updateForm.rules = {

	}

	var addForm = {}
	addForm.data = {
		serviceTypeName: "",
		serviceTypeCode: "",
		serviceParentTypeCode: "",
		is_leaf: ''
	}
	addForm.rules = {

	}
	export default {
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'classify_name'
				},
				treeData: data,
				updateForm,
				addForm,
				allowAdd:false
			}
		},
		methods: {
			updateButton(fromName){
				
			},
			addButton(formName){
				
			},
			handleNodeClick(data) {
				
				
			}
		}

	}
</script>

<style>

</style>