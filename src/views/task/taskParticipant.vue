<template>

  <div>
    <transfer :data="data" v-model="value" :transferHeight="300" :operation="operation" :titles="['用户列表', '参与者']" filterable :valueItems="valueItem">
      <span slot="operation-slot">
        <!-- <el-button type="primary" size="small" @click="saveParticipant">保存提交</el-button> -->
      </span>
    </transfer>

  </div>
</template>

<script>
import transfer from "./components/transfer";
import {
  deleteTaskParticipant,
  getTaskParticipantB,
  saveTaskParticipant,
  queryDutyByOrgCodeX,
  queryUserByDutyCodeAndOrgCodeX,
  queryUserOrg
} from "~/api/task";

var headFormData = {
  nodeOrgCode: [],
  dutyCode: ""
};

const generateData = [];

export default {
  props: {
    systemSerialNoProp: {
      type: String,
      default: ""
    }
  },
  watch: {
     valueItem: function() {
      this.value.length = 0;
      var that = this;
      this.valueItem.forEach(item => {
        that.value.push(item.key);
      });
    },
    systemSerialNoProp(val, oldval) {
      
      this.systemSerialNo = val;
      var data = { systemSerialNo: this.systemSerialNo };
      new Promise((resolve, reject) => {
        queryUserByDutyCodeAndOrgCodeX(data)
          .then(response => {
            resolve(response);
            const listdata = [];
            for (let i = 0; i < response.resBody.length; i++) {
              listdata.push({
                key: response.resBody[i].id.toString(),
                label: response.resBody[i].nick_name,
                user_object_code: response.resBody[i].user_object_code,
                login_name: response.resBody[i].login_name,
                duty_code: response.resBody[i].duty_code
              });
            }
            that.data = listdata;
          })
          .catch(error => {
            reject(error);
          });
      });
        var that = this;
    getTaskParticipantB({
      systemSerialNo: that.systemSerialNo
    }).then(response => {
      if (response.resBody != null && response.resBody.length != 0) {
        that.valueItem = response.resBody.paritcis;
      }
    });
    }
  },
  components: {
    transfer
  },
  data() {
    return {
      operation: {
        add: function(items) {
          var that = this;
          // 提交的数据
          console.log(["this.systemSerialNoProp", this.systemSerialNoProp]);
          var submitData = {
            systemSerialNo: this.systemSerialNoProp,
            paritcis: items
          };
          saveTaskParticipant(submitData).then(response => {
            that.$message.success("保存成功");
            // 进入页面要查询一次参与者赋给valueItem
            getTaskParticipantB({
              systemSerialNo: this.systemSerialNoProp
            }).then(response => {
              if (response.resBody.length != 0) {
                that.valueItem = response.resBody.paritcis;
              }
            });
          });
          console.log(["增加了", items]);
          return true;
        },
        remove: function(items) {
          var that = this;
          // 提交的数据
          var submitData = {
            systemSerialNo: this.systemSerialNoProp,
            paritcis: items
          };
          deleteTaskParticipant(submitData).then(response => {
            that.$message.success("移除成功");
            // 进入页面要查询一次参与者赋给valueItem
            getTaskParticipantB({
              systemSerialNo: this.systemSerialNoProp
            }).then(response => {
              if (response.resBody.length != 0) {
                that.valueItem = response.resBody.paritcis;
              }
            });
          });
          console.log(["移除了", items]);
          return true;
        }
      },
      systemSerialNo: this.systemSerialNoProp,
      submitData: [],
      headFormData,
      orgList: [],
      dutyList: [],
      orgList: [],
      orgProps: {
        value: "org_code",
        label: "org_name"
      },
      data: generateData,
      valueItem: [
        // 加载编辑时拉去服务器的加载项
      ],
      value: []
    };
  },
  methods: {
    saveParticipant() {
      var that = this;
      // 提交的数据
      var submitData = {
        systemSerialNo: this.systemSerialNo,
        paritcis: this.valueItem
      };
      saveTaskParticipant(submitData)
        .then(response => {
          that.$message.success("保存成功");
          // 进入页面要查询一次参与者赋给valueItem
          getTaskParticipantB({
            systemSerialNo: this.systemSerialNo
          })
            .then(response => {
              if (response.resBody.length != 0) {
                that.valueItem = response.resBody.paritcis;
              }
            })
            .catch(error => {});
        })
        .catch(error => {});
    }
  },
  mounted: function() {
    var data = { systemSerialNo: this.systemSerialNo };
    new Promise((resolve, reject) => {
      queryUserByDutyCodeAndOrgCodeX(data)
        .then(response => {
          resolve(response);
          const listdata = [];
          for (let i = 0; i < response.resBody.length; i++) {
            listdata.push({
              key: response.resBody[i].id.toString(),
              label: response.resBody[i].nick_name,
              user_object_code: response.resBody[i].user_object_code,
              login_name: response.resBody[i].login_name,
              duty_code: response.resBody[i].duty_code
            });
          }
          that.data = listdata;
        })
        .catch(error => {
          reject(error);
        });
    });
    // 进入页面要查询一次参与者赋给valueItem
    var that = this;
    getTaskParticipantB({
      systemSerialNo: this.systemSerialNo
    }).then(response => {
      if (response.resBody != null && response.resBody.length != 0) {
        that.valueItem = response.resBody.paritcis;
      }
    });
  }
};
</script>