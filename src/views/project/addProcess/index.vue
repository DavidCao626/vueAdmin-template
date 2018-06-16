<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel">

      <el-steps :active="active" simple finish-status="success">
        <el-step title="填写项目信息" icon="el-icon-edit">
        </el-step>
        <el-step title="配置计划" icon="el-icon-picture">
        </el-step>
        <el-step title="任务下发" icon="el-icon-upload">
        </el-step>

      </el-steps>
      <br/>
      <keep-alive>
        <!-- 上一步下一步 不会删除里面内容 -->
        <component ref="component" :propScopeId="scopeId" :propProjectId="projectId" :is="componentId"></component>
      </keep-alive>
      <br/>
      <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
        <el-col :span="7">
          <el-button ref="back" @click="back">上一步</el-button>
          <el-button ref="next" @click="saveProject" v-if="active==0">保存项目</el-button>
          <el-button ref="back" v-if="active==0" @click="next">保存并配置计划</el-button>
          <el-button ref="back" v-else @click="next">下一步</el-button>
        </el-col>
      </el-row>
    </div>
  </page>
</template>
<script>
import base from "./base.vue";
import config from "./../control/state/meesageState";
import start from "./start.vue";
import {
  insertProject,
  insertProjectAndRun,
  updateProject,
  updateWorkItemTime,
  deleteProject,
  queryUserProject,
  dispenseChildTask, //下发任务
  queryServiceTypeList
} from "~/api/project";
export default {
  components: {
    "one-base": base,
    "tow-config": config,
    "three-start": start
  },
  data() {
    return {
      projectId: 0,
      scopeId: 0,
      active: 0,
      componentId: "one-base"
    };
  },
  watch: {
    active() {
      switch (this.active) {
        case 0:
          this.componentId = "one-base";
          break;
        case 1:
          this.componentId = "tow-config";
          break;
        case 2:
          this.componentId = "three-start";
          break;
      }
    }
  },

  methods: {
    dispenseChildTask() {
      console.log(["下发任务", this.$refs["component"].start]);
      var start = this.$refs["component"].start;
      var requestData = {};
      requestData.scopeId = this.scopeId;
      requestData.planStartTime = start.planStartTime;
      requestData.planComplteTime = start.planComplteTime;
      requestData.orgCodes = [];

      new Promise((resolve, reject) => {
        dispenseChildTask(requestData).then(response => {
          this.$message.success(["下发任务完成", response]);
        });
      });
    },
    saveProject() {
      //保存项目
      console.log(["保存项目", this.$refs["component"].form]);
      var submitData = this.$refs["component"].form;
      new Promise((resolve, reject) => {
        insertProject(submitData).then(response => {
          this.$message.success("保存成功");
        });
      });
    },
    updateWorkItem() {
      var tempData = this.$refs["component"].ProjectStatusData;
      console.log([tempData]);
      var requestData = [];
      for (var i = 0; i < tempData.length; i++) {
        if (tempData[i].item.itemType != "手动") {
          var item = {
            id: tempData[i].item.id,
            scopeId: tempData[i].item.scopeId,
            planTimeLong: tempData[i].item.planTimeLong,
            stepKey:tempData[i].item.stepKey
          };
          requestData.push(item);
        }
      }
      new Promise((resolve, reject) => {
        updateWorkItemTime({ itemBeans: requestData }).then(response => {
          this.$message.success("保存成功");
        });
      });
    },
    saveProjectAndRun() {
      console.log(["保存并运行", this]);
      var submitData = this.$refs["component"].form;
      new Promise((resolve, reject) => {
        insertProjectAndRun(submitData).then(response => {
          this.$message.success("保存成功");
          this.projectId = response.resBody.project.id;
          this.scopeId = response.resBody.scope.id;
          console.log(["this.scopeId", this.scopeId]);
        });
      });
    },
    back() {
      switch (this.active) {
        case 0:
          this.$router.back(-1);
          break;
        case 1:
          this.active--;
          break;
        case 2:
          this.active--;
          break;
      }
    },
    next() {
      switch (this.active) {
        case 0:
          this.active++;
          this.saveProjectAndRun();
          break;
        case 1:
          this.active++;
          this.updateWorkItem();
          break;
        case 2:
          this.$confirm("你即将执行任务下发操作, 是否确定继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.dispenseChildTask();
              this.active = 0;
              this.$message({
                type: "success",
                message: "任务已经开始执行!"
              });
              this.$router.push({
                path: "/project/control",
                query: {
                  projectId: this.projectId,
                  scopeId: this.scopeId
                }
              }); // 跳转路由
            })
            .catch(() => {});
          break;
      }
    }
  }
};
</script>
<style>
</style>
