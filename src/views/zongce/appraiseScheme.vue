<template>
  <div>
    <page class="page">
      <div slot="title">
        计划模版
      </div>

      <div slot="panel">
        <el-form :model="appraiseProject" label-width="80">
          <el-form-item label="测评名称">
            <span>{{appraiseProject.name}}</span>
          </el-form-item>
          <el-form-item label="所属年度">
            <span>{{appraiseProject.yearType}}</span>
          </el-form-item>
          <el-form-item label="开始时间">
            <span v-html="dateFormatter(appraiseProject.startDate)"></span>
          </el-form-item>
          <el-form-item label="结束时间">
            <span v-html="dateFormatter(appraiseProject.endDate)"></span>
          </el-form-item>

          <el-form-item label="方案">
            <el-select v-model="appraiseProject.schemeId" placeholder="方案" @change="schemeIdChange">
              <el-option v-for="item in schemeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button type="" @click="updateBT">修改</el-button>
            <el-button type="" @click="insertBT">新增</el-button>
          </el-form-item>

        </el-form>
        <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
          <el-col :span="7">
            <el-button type="primary" @click="onSave">保存</el-button>
          </el-col>
        </el-row>
      </div>

    </page>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
export default {
  data() {
    return {
      itemId: null,
      schemeId: null,
      appraiseProject: {
        categoryId: null,
        id: null,
        name: "",
        yearType: "",
        startDate: null,
        endDate: null,
        schemeId: null,
        schemeName: ""
      },
      schemeList: []
    };
  },
  components: {},
  methods: {
    insertBT() {
      this.$router.push({
        path: "/zongce/addCategory",
        query: {
          id: this.appraiseProject.categoryId,
          serviceType: 1
        }
      });
    },
    updateBT() {
      this.schemeId = this.appraiseProject.schemeId;
      if (!this.schemeId) {
        this.$message.error("请选择一个类别再进行操作");
        return;
      }
      this.$router.push({
        path: "/zongce/addCategory",
        query: {
          id: this.appraiseProject.categoryId,
          serviceType: 1,
          schemeId: this.schemeId
        }
      });
    },
    schemeIdChange(val) {
      this.schemeId = val;
      for (var i = 0; i < this.schemeList.length; i++) {
        if (this.schemeList[i].id == val) {
          this.appraiseProject.schemeName = this.schemeList[i].name;
        }
      }
    },
    ...mapActions({
      getAppraiseInfoByScopeIdAndItemId:
        store.namespace + "/getAppraiseInfoByScopeIdAndItemId",
      addProspectus: store.namespace + "/addProspectus",
      querySchemesByOrgCodeAndCategoryId:
        store.namespace + "/querySchemesByOrgCodeAndCategoryId",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),
    dateFormatter(dateSource) {
      return moment(dateSource, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
    },
    onSave() {
      var requestData = {
        projectId: this.appraiseProject.id,
        schemeId: this.appraiseProject.schemeId,
        schemeName: this.appraiseProject.schemeName
      };
      this.addProspectus(requestData).then(response => {
        this.completeUserPendingByItemId({ itemId: this.itemId }).then(
          response => {
            this.$message.success("保存成功");
            this.$router.go(-1);
            console.log(["this", this]);
            this.$router.push({
              path: "/project/control",
              query: {
                scopeId: response.resBody.scopeId
              }
            });
          }
        );
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.scopeId && to.query.itemId) {
        vm
          .getAppraiseInfoByScopeIdAndItemId({
            scopeId: to.query.scopeId,
            itemId: to.query.itemId
          })
          .then(response => {
            var res = response.resBody;
            vm.itemId = to.query.itemId;
            vm.appraiseProject = res.appraiseProject;
            vm
              .querySchemesByOrgCodeAndCategoryId({
                categoryId: vm.appraiseProject.categoryId
              })
              .then(response => {
                vm.schemeList = response.resBody;
              });
          });
      } else {
        vm.$message.error("参数错误");
        vm.$router.push(-1);
      }
    });
  }
};
</script>

<style scoped>
</style>
