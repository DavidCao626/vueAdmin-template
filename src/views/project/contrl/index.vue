<template>
  <div class="project-control">
    <page>
      <div slot="title">{{ projectInfo.projectName}} [{{ projectInfo.projectServiceTypeName }}任务配置控制台]</div>
      <div slot="panel" style="padding-bottom: 0px;">

        <div class="project" style="display:flex;align-items: center;justify-content: space-between;">
          <!--  -->
          <div class="project-left" style="flex:1">
            <div class="project-name">
              <div style="float: left;margin-left: 10px;">{{ scopeInfo.orgName }}</div>
              <div style="float: left;margin: -5px 10px;">
                <el-popover placement="bottom" title="" width="auto" trigger="click">

                  <el-tree class="filter-tree" :data="data2" :props="defaultProps" @node-click="nodeClick" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree2">
                  </el-tree>
                  <el-button slot="reference" size="mini" :disabled="getViewChildEnable">查看子任务进度</el-button>
                </el-popover>
              </div>
              <div style="float: left;margin: -5px auto;">
                <el-button @click="showScopeData(interatedView.viewAction)" :disabled="getViewDataEnable" size="mini">查看环节数据</el-button>
              </div>
              <div style="float: left;margin: -5px auto;" v-if="interatedView.expandFunction">
                <template v-for="(fun,index) in interatedView.expandFunction">
                  <el-button @click="routerTo(fun.path,fun.params)" :key="index" plain> {{fun.name}}</el-button>
                  <!-- <svg-icon icon-class="seedate" width="20px" height="20px" /> -->
                </template>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="project-desc">
              <el-row>

                <el-col :span="12">
                  <p>环节开始时间：{{ scopeInfo.planStartTime}}</p>
                  <p>环节结束时间：{{scopeInfo.planEndTime}}</p>
                  <p v-if="projectInfo.files">附件列表:</p>
                  <span v-for="(attch,index) in projectInfo.files" :key="index">
                    <a target="_blank" :href="attch.userPath">{{attch.userFileName}}</a>
                  </span>
                </el-col>

              </el-row>
            </div>

          </div>
          <!-- <div class="project-reght" style="margin: 30px;display:flex;justify-content:center;">
            <div style="display: flex;">

              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;

              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;


            </div>
          </div> -->
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
      <div slot="panel" style="padding-top: 0px;">
        <el-card class="box-card" shadow="hover" size="mini">
          <div slot="header" class="clearfix">
            <span>环节配置</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text item">
            <ContrlTimeLine></ContrlTimeLine>
          </div>
        </el-card>

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
      interatedView: store.namespace + "/getIntegratedView",
      scopeInfo: store.namespace + "/getInteratedScopeInfo",
      packageInfo:store.namespace+ "/getScopeDeployPackage"
    }),
      getViewChildEnable:function(){
        if(!this.packageInfo){
          return false;
        }
        //console.log(["packageInfo",this.packageInfo]);
        var disVal=this.packageInfo.inHandlerDisplay;
        var disEnbaleVal=disVal&1;
        //console.log(["disVal",disEnbaleVal]);
        if(disEnbaleVal<1){
          return true;
        }
      },
      getViewDataEnable:function(){
        if(!this.packageInfo){
          return false;
        }
        //console.log(["packageInfo",this.packageInfo]);
         var disVal=this.packageInfo.inHandlerDisplay;
        var disEnbaleVal=disVal&2;
        //console.log(["disVal",disEnbaleVal]);
        if(disEnbaleVal<1){
          return true;
        }
      }
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
        vm.$message.error("参数失效，请重新进入控制台")
        vm.$router.go(-1);
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
  margin: 8px 20px;
  line-height: 24px;
}
.project-control .el-card__header {
  background-color: var(--color-grey-light-4) !important;
  padding: 5px 10px !important;
}
</style>
