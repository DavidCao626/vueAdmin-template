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
                    <!-- <el-form-item label="编号:">
                        <el-input v-model="formInline.sysNo" placeholder="编号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>

            <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="38">
                </el-table-column>

                <el-table-column prop="batch" label="批次">
                </el-table-column>
                <el-table-column prop="serviceType" :formatter="typeFormatter" label="导入类型">
                </el-table-column>
                <el-table-column prop="state" :formatter="stateFormatter" label="状态">
                </el-table-column>
                <el-table-column prop="createTime" label="操作时间">
                </el-table-column>
                <el-table-column prop="lastUpdateTime" label="最后变更时间">
                </el-table-column>

                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item @click.native="edit(scope.row)">编辑</el-dropdown-item> -->
                                <el-dropdown-item @click.native="rollBack(scope.row)">回滚</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
                <el-table-column type="expand" label="#" width="42">
                    <template slot-scope="props" style="background-color:#f7f8f9">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="失败原因:">
                                <span>{{ props.row.errorCause }}</span>
                            </el-form-item>
                            <br/>
                        </el-form>
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
      formInline: {},
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      data: [],
      typeObj: {},
      stateObj: {},
      action: "https://jsonplaceholder.typicode.com/posts/"
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
    dateFormatter(row, column, cellValue, index) {
      return moment(cellValue, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
    },
    stateFormatter(r, c, v, i) {
      return this.stateObj[v];
    },
    typeFormatter(r, c, v, i) {
      return this.typeObj[v];
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
    addStu() {
      this.$message.success("正在跳转 ");
      this.$router.push({
        path: "/user/createBaseForm"
      });
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryImportRecordList: store.namespace + "/queryImportRecordList",
      rollBackStaffInfoByBatch: store.namespace + "/rollBackStaffInfoByBatch",
      rollBackStudentInfoByBatch:
        store.namespace + "/rollBackStudentInfoByBatch"
    }),
    getDict() {
      var requestData = {
        dicts: ["import_service_type", "import_state"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["dict", response]);
        var res = response.resBody;
        res.import_service_type.forEach(el => {
          this.typeObj[el.dict_key] = el.dict_desc;
        });
        res.import_state.forEach(el => {
          this.stateObj[el.dict_key] = el.dict_desc;
        });
        this.getData();
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryImportRecordList(requestData).then(response => {
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
    rollBack(row) {
      if (row.serviceType == "S") {
        this.rollBackStudentInfoByBatch({ batch: row.batch }).then(response => {
          this.$message.success("成功");
          this.getData();
        });
      } else if (row.serviceType == "T") {
        this.rollBackStaffInfoByBatch({ batch: row.batch }).then(response => {
          this.$message.success("成功");
          this.getData();
        });
      } else {
        this.$message.error("未知的类型");
      }
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