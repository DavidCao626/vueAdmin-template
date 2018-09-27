<template>
  <div>
    <page>
      <div slot="title">资助项目管理</div>
    </page>
    <elx-table-layout>
      <!-- <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="录入数据" placement="bottom">
            <el-button @click="dialogVisible = true" plain size="mini">
              导入
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template> -->
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="formInline.projectName" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="formInline.state" placeholder="项目状态">
              <el-option v-for="(item,index) in projectStateList" :key="index" :value="item.dict_key" :label="item.dict_desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务类别">
            <el-select v-model="formInline.serviceType" placeholder="项目类别">
              <el-option v-for="(item,index) in serviceTypeList" :key="index" :value="item.classifyCode" :label="item.classifyName"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="projectName" label="项目名称">
        </el-table-column>
        <el-table-column prop="projectServiceType" label="项目类别" :formatter="serviceTypeFormatter">
        </el-table-column>
        <el-table-column prop="projectState" label="项目状态" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="planStartTime" label="计划开始时间">
        </el-table-column>
        <el-table-column prop="planCompleteTime" label="计划结束时间">
        </el-table-column>
        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="getData(scope.row)">操作1</el-dropdown-item>
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
    <page>
      <div slot="panel" style="text-align: right">

        <el-button size="mini" type="primary">完成</el-button>
      </div>
    </page>
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
        projectName: "",
        state: "0",
        serviceType: "0"
      },
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      serviceTypeList: [],
      projectStateList: [],
      orgList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    serviceTypeFormatter(r, c, v, i) {
      for (var j = 0; j < this.serviceTypeList.length; j++) {
        if (this.serviceTypeList[j].classifyCode == v) {
          return this.serviceTypeList[j].classifyName;
        }
      }
    },
    stateFormatter(r, c, v, i) {
      for (var j = 0; j < this.projectStateList.length; j++) {
        if (this.projectStateList[j].dict_key == v) {
          return this.projectStateList[j].dict_desc;
        }
      }
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
      queryProjectList: store.namespace + "/queryProjectList",
      queryProjectServiceType: store.namespace + "/queryProjectServiceType"
    }),
    getServiceTypeList() {
      this.queryProjectServiceType({}).then(response => {
        this.serviceTypeList = response.resBody;
        this.serviceTypeList.unshift({classifyCode:"0",classifyName:"全部"})
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
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
        dicts: ["project_state"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.projectStateList = response.resBody.project_state;
        this.projectStateList.unshift({ dict_desc: "全部", dict_key: "0" });
        this.getServiceTypeList();
        this.getData();
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