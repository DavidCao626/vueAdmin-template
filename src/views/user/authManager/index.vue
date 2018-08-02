<template>
  <div>

    <elx-table-layout>

      <template slot="headerLeft">
        <!-- <span v-if="deleteOpen && isMultipleSelection">
                    <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                        <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                    </el-button>
                </span> -->
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="审核状态:">
            <el-select v-model="formInline.state" placeholder="请选择">
              <el-option v-for="item in stateList" :key="item.dict_key" :label="item.dict_desc" :value="item.dict_key">
              </el-option>
            </el-select>

          </el-form-item>
          <el-button type="primary" size="small" @click="onSubmit">查 询</el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>

        <el-table-column prop="userLoginName" label="登录名">
        </el-table-column>
        <el-table-column prop="dutyCode" label="成员职务" :formatter="dutyFormatter">
        </el-table-column>
        <el-table-column prop="userObjectCode" label="用户对象" :formatter="classifyFormatter">
        </el-table-column>
        <el-table-column prop="managerNodeName" label="管理节点">
        </el-table-column>
        <el-table-column prop="state" label="审核状态" :formatter="stateFormatter">
        </el-table-column>

        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="checkInfo(scope.row)"> 审核</el-dropdown-item>
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
import store from "../_store/index.js";
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
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      data: [],
      stateObj: {},
      stateList: [],
      formInline: {
        state: ""
      },
      dutyList: [],
      classifyList: []
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  },
  methods: {
    checkInfo(row) {
      console.log(["审核", row]);
      this.getUserAuthInfoById({ id: row.id }).then(response => {
        this.$message.success("正在跳转~");
        this.$router.push({
          path: "/user/authInfo"
        });
      });
    },
    dutyFormatter(r, c, v, ij) {
      console.log(["进入dutyFormatter",v,this.dutyList])
      var dl = this.dutyList;
      for (var i = 0; i < dl.length; i++) {
        console.log(["dutyFor",dl[i].dutyCode])
        if (dl[i].dutyCode == v) {
          return dl[i].dutyName;
        }
      }
    },
    stateFormatter(r, c, v, i) {
      return this.stateObj[v];
    },
    classifyFormatter(r, c, v, ij) {
      var cl = this.classifyList;
      for (var i = 0; i < cl.length; i++) {
        if (cl[i].userObjectSerial == v) {
          return cl[i].userObjectName;
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
      queryAuthInfoList: store.namespace + "/queryAuthInfoList",
      getUserAuthInfoById: store.namespace + "/getUserAuthInfoById",
      queryDutyListByMNCode: store.namespace + "/queryDutyListByMNCode",
      querySocializeClassify: store.namespace + "/querySocializeClassify"
    }),
    getDuty() {
      this.queryDutyListByMNCode().then(response => {
        this.dutyList = response.resBody.baseData;
      });
    },
    getClassify() {
      this.querySocializeClassify().then(response => {
        this.classifyList = response.resBody;
      });
    },
    getDict() {
      this.getDuty();
      this.getClassify();
      var requestData = {
        dicts: ["authState"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["dict", response]);
        var res = response.resBody;
        res.authState.forEach(el => {
          this.stateObj[el.dict_key] = el.dict_desc;
        });
        this.stateList = res.authState;
        this.stateList.unshift({ dict_key: "", dict_desc: "全部" });
        this.getData();
      });
    },
    getData() {
      var requestData = {
        state: this.formInline.state,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryAuthInfoList(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log("submit!");
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onMultipleSelectionDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$emit("onSelectionDel", this.multipleSelection);
      });
    },
    onExportExcel() {
      this.$emit("onExportExcel");
    },
    onUploadSuccess() {
      this.$emit("onUploadSuccess");
    },
    onNew() {
      this.$emit("onNew");
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