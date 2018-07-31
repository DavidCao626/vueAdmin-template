<template>
    <div>

        <elx-table-layout>
            <template slot="headerRight">
                <el-button-group>
                    <el-tooltip class="item" effect="dark" content="创建学生" placement="bottom">
                        <el-button plain size="mini" @click="addStu">
                            新建
                        </el-button>
                    </el-tooltip>
                </el-button-group>
            </template>

            <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="38">
                </el-table-column>

                <el-table-column prop="dutyCode" label="职务代码">
                </el-table-column>
                <el-table-column prop="dutyName" label="职务名称">
                </el-table-column>
                <el-table-column prop="targetUserType" label="用户对象">
                </el-table-column>
                <el-table-column prop="isMember" label="成员职务">
                </el-table-column>

                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="edit(scope.row)">编辑</el-dropdown-item>

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
      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      data: [],
      formInline: {
        staffCode: "",
        name: ""
      },
      orgList: [],
      sexObj: {},
      nationObj: {},
      idTypeObj: {},
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
      console.log(["创建学生"]);
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryDutyListByMNCode: store.namespace + "/queryDutyListByMNCode"
    }),
    resignation(row) {
      console.log(["row", row]);
      this.$router.push({
        path: "/user/resignation",
        query: {
          sysNo: row.staff_code,
          type: "staff"
        }
      });
    },
    edit(row) {
      console.log(["row", row]);
    },
    getDict() {
      var requestData = {
        dicts: ["nation", "sex_type", "identity_type"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["dict", response]);
        var res = response.resBody;
        res.nation.forEach(el => {
          this.nationObj[el.dict_key] = el.dict_desc;
        });
        res.sex_type.forEach(el => {
          this.sexObj[el.dict_key] = el.dict_desc;
        });
        res.identity_type.forEach(el => {
          this.idTypeObj[el.dict_key] = el.dict_desc;
        });
        this.queryOrgByOrgCode().then(response => {
          this.orgList = response.resBody;
          this.getData();
        });
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryDutyListByMNCode(requestData).then(response => {
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