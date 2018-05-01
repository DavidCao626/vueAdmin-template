<template>
	<div>
		<el-form size="mini" :model="formStore.data" ref='form1' :rules='formStore.rules' label-width="80px">
			<el-form-item label="节点标题" prop="nodeTitle">
				<el-input size="mini" v-model="formStore.data.nodeTitle" placeholder="请输入节点标题"></el-input>
			</el-form-item>
			<el-form-item label="节点描述" prop="nodeDesc">
				<el-input size="mini" v-model="formStore.data.nodeDesc" placeholder="请输入节点标题"></el-input>
			</el-form-item>
			<el-form-item label="计划开始时间" prop="planStartTime">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planStartTime" type="date" placeholder="计划开始时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="计划完成时间" prop="planCompleteTime">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.data.planCompleteTime" type="date" placeholder="计划完成时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label='请选择节点组织' prop="nodeOrgCode">
				<el-cascader :change-on-select='true' expand-trigger="click" :props="orgProps" :options="orgList" v-model="formStore.data.nodeOrgCode" @change="orgCodeChange">
				</el-cascader>
			</el-form-item>
			<el-form-item label='请选择责任人职务' prop="liablerDutyCode">
				<el-select v-model="formStore.data.liablerDutyCode" @change="dutyCodeChange" placeholder="请选择责任人职务">
					<el-option v-for="(item,index) in dutyList" :key="index" :label="item.duty_name" :value="item.duty_code"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='请选择责任人' prop='liablerId'>
				<el-select v-model="formStore.data.liablerId" placeholder="请选择责任人">
					<el-option v-for="(item,index) in userList" :key="index" :label="item.nick_name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-button type="success" size="mini" @click="submitForm('form1')">提交</el-button>

	</div>
</template>

<script>
import {
  addTaskNode,
  queryDutyByOrgCode,
  queryUserByDutyCodeAndOrgCode,
  queryUserOrg,
  getTaskNodeBySystemSerialNo,
  updateTaskNode
} from "~/api/task";

var systemSerialNo = "N15248863838228897"; //要修改的节点编号

var formStore = {};
formStore.data = {
  nodeTitle: "", //节点标题
  nodeDesc: "", //节点描述
  planStartTime: "", //计划开始时间
  planCompleteTime: "", //计划完成时间
  nodeOrgCode: [], //节点所在机构
  liablerDutyCode: "", //责任人职务
  liablerId: "" //责任人id
};
formStore.rules = {
  nodeTitle: [], //节点标题
  nodeDesc: [], //节点描述
  planStartTime: [], //计划开始时间
  planCompleteTime: [], //计划完成时间
  nodeOrgCode: [], //节点所在机构
  liablerDutyCode: [], //责任人职务
  liablerId: [] //责任人id
};

export default {
  data() {
    return {
      formStore,
      orgList: [],
      dutyList: [],
      userList: [],
      orgProps: {
        value: "org_code",
        label: "org_name"
      }
    };
  },
  methods: {
    submitForm(formName) {
      var data = JSON.parse(JSON.stringify(this.formStore.data));
      var that = this
      data.nodeOrgCode = this.formStore.data.nodeOrgCode[
        this.formStore.data.nodeOrgCode.length - 1
      ];
      this.$refs[formName].validate(valid => {
        if (valid) {
          new Promise((resolve, reject) => {
            updateTaskNode(data)
              .then(response => {
                 that.$message.success("成功!")
                new Promise((resolve, reject) => {
                  var data = {
                    systemSerialNo: systemSerialNo
                  };
                  getTaskNodeBySystemSerialNo(data)
                    .then(response => {
                      response.resBody.baseData.nodeOrgCode =
                        response.resBody.aOrgCode;
                      this.formStore.data = response.resBody.baseData;

                      var queryDutyByOrgCodeData = {
                        orgCode: response.resBody.aOrgCode
                      };
                      new Promise((resolve, reject) => {
                        queryDutyByOrgCode(queryDutyByOrgCodeData)
                          .then(response => {
                            resolve(response);
                            this.dutyList = response.resBody;
                          })
                          .catch(error => {
                            reject(error);
                          });
                      });
                      var queryUserByDutyCodeAndOrgCodeData = {
                        orgCode: response.resBody.aOrgCode,
                        dutyCode: response.resBody.baseData.liablerDutyCode
                      };
                      new Promise((resolve, reject) => {
                        queryUserByDutyCodeAndOrgCode(
                          queryUserByDutyCodeAndOrgCodeData
                        )
                          .then(response => {
                            resolve(response);
                            this.userList = response.resBody;
                          })
                          .catch(error => {
                            reject(error);
                          });
                      });
                    })
                    .catch(error => {});
                });
              })
              .catch(error => {});
          });
        } else {
          return false;
        }
      });
    },
    //组织变化触发的方法,加载组织下职务
    orgCodeChange: function(val) {
      this.formStore.data.liablerDutyCode = "";
      console.log(val);
      var data = {
        orgCode: val
      };
      new Promise((resolve, reject) => {
        queryDutyByOrgCode(data)
          .then(response => {
            resolve(response);
            console.log(["queryDutyByOrgCode", response]);
            this.dutyList = response.resBody;
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //职务被选中触发的方法加载责任人列表
    dutyCodeChange: function(val) {
      this.formStore.data.liablerId = "";
      var data = {
        orgCode: this.formStore.data.nodeOrgCode,
        dutyCode: val
      };
      new Promise((resolve, reject) => {
        queryUserByDutyCodeAndOrgCode(data)
          .then(response => {
            resolve(response);
            console.log(["queryUserByDutyCodeAndOrgCode", response]);
            this.userList = response.resBody;
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
    }),
      new Promise((resolve, reject) => {
        var data = {
          systemSerialNo: systemSerialNo
        };
        getTaskNodeBySystemSerialNo(data)
          .then(response => {
            response.resBody.baseData.nodeOrgCode = response.resBody.aOrgCode;
            this.formStore.data = response.resBody.baseData;

            var queryDutyByOrgCodeData = {
              orgCode: response.resBody.aOrgCode
            };
            new Promise((resolve, reject) => {
              queryDutyByOrgCode(queryDutyByOrgCodeData)
                .then(response => {
                  resolve(response);
                  this.dutyList = response.resBody;
                })
                .catch(error => {
                  reject(error);
                });
            });
            var queryUserByDutyCodeAndOrgCodeData = {
              orgCode: response.resBody.aOrgCode,
              dutyCode: response.resBody.baseData.liablerDutyCode
            };
            new Promise((resolve, reject) => {
              queryUserByDutyCodeAndOrgCode(queryUserByDutyCodeAndOrgCodeData)
                .then(response => {
                  resolve(response);
                  this.userList = response.resBody;
                })
                .catch(error => {
                  reject(error);
                });
            });
          })
          .catch(error => {});
      });
  }
};
</script>

<style>

</style>