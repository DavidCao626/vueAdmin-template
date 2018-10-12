<template>
  <div>
    <page>
      <div slot="title">校内综测项目</div>
    </page>
    <elx-table-layout>
      <template slot="headerLeft">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="formInline.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>

      <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="生成综测结果" placement="bottom">
            <el-button @click="createDataBT" plain size="mini">
              生成综测结果
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>

      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="name" label="项目名称">
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
                <el-dropdown-item @click.native="showSchedule(scope.row)">查看进度</el-dropdown-item>
                <el-dropdown-item @click.native="deleteProject(scope.row)">删除项目</el-dropdown-item>
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

    <el-dialog title="数据生成" :visible.sync="createDataDV">
      <el-form :model="createDataForm">

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDataDV = false">取 消</el-button>
        <el-button type="primary" @click="createDataSubmit ">确 定</el-button>
      </div>
    </el-dialog>

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
      createDataForm: {
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      schoolYearList2: [],
      formInline: {
        name: "",
      },
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      orgList: [],
      data: [],
      schoolYearList: [],
      projectStateList: [],
      createDataDV: false
    };
  },
  watch: {},
  methods: {
    deleteProject(row) {
    },
    createDataBT() {
      this.createDataDV = true;
    },
    createDataSubmit() {
      this.createDataDV = false;
    },
    showSchedule(row) {
      this.$router.push({
        path: "/zongce/appraisalResultRecord",
        query: {
          projectCode: row.code
        }
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
      getDictByDictNames: store.namespace + "/getDictByDictNames"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        name: this.formInline.name,
      };
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
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