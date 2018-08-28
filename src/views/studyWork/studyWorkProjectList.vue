<template>
    <div>
        <page>
            <div slot="title">勤工俭学项目</div>
        </page>
        <elx-table-layout>
            <template slot="headerLeft">

                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="名称">
                        <el-input v-model="formInline['name']" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.projectState" placeholder="岗位状态">
                            <el-option v-for="item in projectStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="yearType" label="年度">
                </el-table-column>
                <el-table-column prop="name" label="项目名称">
                </el-table-column>
                <el-table-column prop="state" label="状态" :formatter="stateFormatter">
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="showJob(scope.row)">查看岗位</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <template slot="footer">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
                </el-pagination>
            </template>
        </elx-table-layout>
    </div>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      formInline: {
        projectState: "0",
        name: ""
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      projectStateList: [],
      orgList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    showJob(row) {
      this.$router.push({
        path: "/studyWork/showJobList",
        query: { projectId: row.id }
      });
    },
    stateFormatter(vala) {
      var val = vala.state;
      console.log([val, this.projectStateList]);
      for (var i = 0; i < this.projectStateList.length; i++) {
        if (this.projectStateList[i].value == val) {
          return this.projectStateList[i].label;
        }
      }
    },
    getProjectStateList() {
      this.getProjectStateDict({}).then(response => {
        this.projectStateList = response.resBody;
        this.projectStateList.unshift({ label: "全部", value: "0" });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.currentPage = val;
      this.getData();
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getProjectStateDict: store.namespace + "/getProjectStateDict",
      queryProjectList: store.namespace + "/queryProjectList"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        name: this.formInline.name,
        projectState: this.formInline.projectState
      };
      //查询数据的方法
      this.queryProjectList(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["nation"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.getData();
        this.getProjectStateList();
      });
    },

    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDict();
    });
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline {
  display: inline !important;
}
</style>