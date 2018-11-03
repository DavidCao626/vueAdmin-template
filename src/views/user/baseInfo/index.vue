<template>
  <page>
    <div slot="title">系统对象管理</div>
    <div slot="panel">
      <el-dialog title="导入数据" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
        <el-upload class="upload-demo" drag :action="action" :limit='1' @onSuccess="onUploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
        </el-upload>
      </el-dialog>

      <elx-table-layout>
        <template slot="headerRight">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="创建新的基础用户" placement="bottom">
              <el-button plain size="mini" @click="addStu">
                新建
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>

        <template slot="headerLeft">
          <!-- <span v-if="deleteOpen && isMultipleSelection">
                    <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                        <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                    </el-button>
                </span> -->
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="编号:">
              <el-input v-model="formInline.sysNo" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </template>

        <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="38">
          </el-table-column>

          <el-table-column prop="memberCode" label="编号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="officeOrgName" label="所属组织">
          </el-table-column>

          <el-table-column label="操作" width="88" header-align="left" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="resignation(scope.row)">
                任职
              </el-button>

            </template>
          </el-table-column>
        </el-table>

        <template slot="footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
          </el-pagination>
        </template>

      </elx-table-layout>
    </div>

  </page>
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
        sysNo: "",
        name: ""
      },
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
      // this.$message.success("正在跳转 ");
      this.$router.push({
        path: "/user/createBaseForm"
      });
    },
    ...mapActions({
      queryCurrentOrgBaseList: store.namespace + "/queryCurrentOrgBaseList",
      getDictByDictNames: store.namespace + "/getDictByDictNames"
    }),
    resignation(row) {
      console.log(["row", row]);
      this.$router.push({
        path: "/user/resignation",
        query: {
          sysNo: row.memberCode,
          type: "base"
        }
      });
    },
    edit(row) {
      console.log(["row", row]);
    },
    nationFormatter(row, column, cellValue, index) {
      return this.nationObj[cellValue];
    },
    sexTypeFormatter(row, column, cellValue, index) {
      return this.sexObj[cellValue];
    },
    idTypeFormatter(val) {
      return this.idTypeObj[val];
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
        this.getData();
      });
    },
    getData() {
      var requestData = {
        sysNo: this.formInline.sysNo,
        name: this.formInline.name,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryCurrentOrgBaseList(requestData).then(response => {
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