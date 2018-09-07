<template>
  <div style="margin-top: -23px;">
    <page>
      <!-- <div slot="title">项目控制台</div> -->
      <div slot="panel" >

        <div class="project" style="display:flex;align-items: center;justify-content: space-between;">
          <!--  -->
          <div class="project-left" style="flex:1">
            <div class="project-name">
              {{projectInfo.projectName}}-任务控制台
            </div>
            <div class="project-desc">
              <el-row>

                <el-col :span="8">
                  <ProjectScoped></ProjectScoped>
                </el-col>
                <el-col :span="12">
                  <div>
                    <p>项目类别：{{ projectInfo.projectServiceTypeName }}</p>
                    <p>附件列表:</p>
                    <span v-for="(attch,index) in projectInfo.files" :key="index">
                      <a target="_blank" :href="attch.userPath">{{attch.userFileName}}</a>
                    </span>

                  </div>
                </el-col>

              </el-row>
            </div>

          </div>

          <div class="project-reght" style="margin: 30px;display:flex;justify-content:center;">
            <div style="display: flex;">

              <div>
                <template v-for="(fun,index) in interatedView.expandFunction">
                  <el-button @click="routerTo(fun.path,fun.params)" :key="index" plain> {{fun.name}}</el-button>
                  <!-- <svg-icon icon-class="seedate" width="20px" height="20px" /> -->
                </template> &nbsp;&nbsp;&nbsp;&nbsp;
                <el-popover placement="bottom" title="" width="auto" trigger="click">

                  <el-tree class="filter-tree" :data="data2" :props="defaultProps" @node-click="nodeClick" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree2">
                  </el-tree>

                  <el-button slot="reference" plain>查看子任务进度</el-button>
                  <!-- <svg-icon icon-class="seejindu" width="20px" height="20px"/> -->

                </el-popover>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button @click="showScopeData(interatedView.viewAction)" type="primary">查看环节数据</el-button>
              <!-- <svg-icon icon-class="seedate" width="20px" height="20px"  />  -->

            </div>
          </div>
        </div>
      </div>
    </page>

    <page :Breadcrumb="true">

      <!-- <div slot="Breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目控制台</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
      <div slot="panel">

        <ContrlTimeLine></ContrlTimeLine>
        <br/> <br/> <br/>
      </div>

    </page>
  </div>
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
      this.showChildScope();
    },
    getChildScope() {
      this.data2 = [];

      this.getUserChildScope({ scopeId: this.scopeId }).then(response => {
        console.log(["getChildScope", response]);
        this.data2.push(response.resBody);
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
        path: "/project/control",
        query: {
          scopeId: this.scopeId,
          date: new Date().getTime()
        }
      });
    },
    routerTo: function(path, params) {
      this.$router.push({
        path: path,
        query: params
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
        console.log(["没有传递scopeid,该页面不能访问", to]);
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
  margin: 20px;
  line-height: 30px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
