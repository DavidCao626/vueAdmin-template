<template>
  <page :Breadcrumb="true">
    <div slot="title">项目控制台</div>
    <div slot="Breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的项目</el-breadcrumb-item>
        <el-breadcrumb-item>项目控制台</el-breadcrumb-item>
        <el-breadcrumb-item>内蒙古大学</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div slot="panel">

      <ProjectType :typeName="projectInfo.projectServiceTypeName"></ProjectType>
      <div class="project" style="display:flex;align-items: center;justify-content: space-between;">
        <div class="project-left" style="margin:30px;">
          <div class="project-name">
            {{projectInfo.projectName}}
          </div>
          <div class="project-desc">
            <p>
              项目开始时间：{{projectInfo.planStartTime}}
            </p>
            <p>
              项目结束时间：{{projectInfo.planCompleteTime}}
            </p>
            <p>
              项目创建机构：{{projectInfo.createdUserOrgName}}
            </p>
            <p>附件列表:</p>
            <p v-for="(attch,index) in projectInfo.files" :key="index">
              <a target="_blank" :href="attch.userPath">{{attch.userFileName}}</a>
            </p>
          </div>
          <div style="display: flex;justify-content: flex-end;">

            <div>
              <el-popover placement="bottom" title="" width="auto" trigger="click">

                <el-tree class="filter-tree" :data="data2" :props="defaultProps" @node-click="nodeClick" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree2">
                </el-tree>

                <el-button slot="reference" style="color:#444;font-weight: 400;" type="text">
                  <svg-icon icon-class="seejindu" width="20px" height="20px" />查看子任务进度</el-button>

              </el-popover>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="showScopeData(interatedView.viewAction)" style="color:#444;font-weight: 400;" type="text">
              <svg-icon icon-class="seedate" width="20px" height="20px" /> 查看环节数据</el-button>
          </div>
        </div>
        <div class="project-right" style="margin: 30px;display:flex;justify-content:center;flex:1">
          <ProjectScoped></ProjectScoped>
        </div>
  </page>

</template>

<script>
import ContrlTimeLine from "./_components/ContrlTimeLine";
import ProjectType from "./_components/ProjectType";
import ProjectScoped from "./_components/ProjectScoped";
import commons from "~/utils/common.js";
import store from "../_store/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ContrlTimeLine,
    ProjectType,
    ProjectScoped
  },
  data() {
    return {
      scopeId: 0,
      filterText: "",
      data2: [],
      defaultProps: {
        children: "children",
        label: "orgName"
      }
    };
  },
  computed: {
    ...mapGetters({
      projectInfo: store.namespace + "/getInteratedProjectInfo",
      interatedView: store.namespace + "/getIntegratedView"
    })
  },
  methods: {
    ...mapActions({
      getUserChildScope: store.namespace + "/getUserChildScope",
      queryScopeIntegeratedDateView:
        store.namespace + "/queryScopeIntegeratedDateView"
    }),
    nodeClick(data) {
      //节点被点击事件
      console.log(["节点被点击", data]);
      this.scopeId = data.id;
      this.queryScopeIntegeratedDateView({ scopeId: this.scopeId });
      this.getChildScope();
    },
    getChildScope() {
      this.data2 = [];
      this.getUserChildScope({ scopeId: this.scopeId }).then(response => {
        console.log(["getChildScope", response]);
        this.data2.push(response.resBody.baseData);
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    showScopeData(url) {
      this.$router.push({
        path: url,
        query: {
          scopeId: this.scopeId
        }
      });
    },
    showChildScope() {
      console.log(["childScope", this.scopeId]);
      this.$router.push({
        path: "/project/childScope",
        query: {
          scopeId: this.scopeId
        }
      });
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      var scopeId = commons.getRouterParam(to, "scopeId");
      if (scopeId == null) {
        console.log("没有传递scopeid,该页面不能访问");
      } else {
        vm.scopeId = scopeId;
        vm.queryScopeIntegeratedDateView({ scopeId: scopeId });
        vm.getChildScope();
      }
    });
  }
};
</script>
<style>
.project-name {
  font-size: 24px;
  color: #444;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.project-desc {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin: 30px;
  line-height: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
