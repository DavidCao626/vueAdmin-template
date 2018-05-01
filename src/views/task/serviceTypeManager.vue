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

					<el-tabs v-model="currentTabs" type="border-card">
						<el-tab-pane name="update" label="更新业务类别">

							<el-form :model="updateForm.data" :rules="updateForm.rules" ref="updateForm1" label-width="80px">
								<el-form-item label="业务类别编号" prop="">
									<el-input size="mini" disabled v-model="updateForm.data.serviceTypeCode"></el-input>
								</el-form-item>
								<el-form-item label="业务类别名称" prop="">
									<el-input size="mini" v-model="updateForm.data.serviceTypeName"></el-input>
								</el-form-item>
							</el-form>
							<el-button type="success" @click="updateButton('updateForm1')">更新</el-button>

						</el-tab-pane>
						<el-tab-pane name="add" :disabled="allowAdd" label="增加子业务类别">

							<el-form :model="addForm.data" :rules="addForm.rules" ref="addForm1" label-width="80px">
								<el-form-item label="父业务类别" prop="">
									<el-input size="mini" disabled v-model="addForm.data.serviceParentTypeName"></el-input>
								</el-form-item>

								<el-form-item label="业务类别名称" prop="">
									<el-input size="mini" v-model="addForm.data.serviceTypeName"></el-input>
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

	var rdata = []
	var data = [{
		classify_code: "0",
		classify_name: "业务类别",
		is_leaf: 'false',
		children: rdata
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
		serviceParentTypeName: "",
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
				allowAdd: false,
				currentTabs: "update"
			}
		},
		methods: {
			updateButton(fromName) {
				var that = this
				if(this.updateForm.data.is_leaf == "true") {
					//叶子节点调更新子节点的ajax
					updateServiceChildType({
							'serviceTypeName': this.updateForm.data.serviceTypeName,
							'serviceTypeCode': this.updateForm.data.serviceTypeCode
						}).then(data => {
							//这里重新获取节点数据
							that.loadTreeData();
						})
						.catch(error => {

						});
				} else {
					//这里调用更新父节点的ajax
					updateServiceType({
						'serviceTypeName': this.updateForm.data.serviceTypeName,
						'serviceTypeCode': this.updateForm.data.serviceTypeCode
					}).then(data => {
						//这里重新获取节点数据
						that.loadTreeData();
					}).catch(error => {

					})
				}
			},
			addButton(formName) {
				var that = this
				if(this.addForm.data.serviceParentTypeCode == "0") {
					//这里增加父业务类型
					insertServiceType({
						'serviceTypeName': this.addForm.data.serviceTypeName
					}).then(data => {
						//这里重新获取节点数据
						that.loadTreeData();
					}).catch(error => {})
				} else {
					//这里增加子业务类型
					insertServiceChildType({
						'serviceParentTypeCode': this.addForm.data.serviceParentTypeCode,
						'serviceTypeName': this.addForm.data.serviceTypeName
					}).then(data => {
						//这里重新获取节点数据
						that.loadTreeData();
					}).catch(error => {})
				}
			},
			handleNodeClick(data) {
				console.log(["点击的数据", data])
				this.currentTabs = "update"
				if(data.is_leaf == "true") {
					this.allowAdd = true;
				} else {
					this.allowAdd = false;
					this.addForm.data.serviceParentTypeCode = data.classify_code;
					this.addForm.data.serviceParentTypeName = data.classify_name;
				}
				this.updateForm.data.serviceTypeCode = data.classify_code;
				this.updateForm.data.serviceTypeName = data.classify_name;
				this.updateForm.data.is_leaf = data.is_leaf;
			},
			loadTreeData() {
				queryServiceTypeList().then(data => {
					console.log(["treeData", data])
					this.treeData[0].children = data.resBody;
				}).catch(
					error => {

					})
			}
		},
		mounted: function() {
			this.loadTreeData();
		}

	}
</script>

<style>

</style>