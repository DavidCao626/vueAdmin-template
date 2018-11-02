<template>
  <page>
    <div slot="title">职工管理</div>
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

        <template slot="headerLeft">
          <!-- <span v-if="deleteOpen && isMultipleSelection">
                    <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                        <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                    </el-button>
                </span> -->
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="职工号:">
              <el-input v-model="formInline.staffCode" placeholder="职工号"></el-input>
            </el-form-item>
            <el-form-item label="姓名:">
              <el-input v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </template>

        <template slot="headerRight">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="创建职工" placement="bottom">
              <el-button plain size="mini" @click="addStu">
                新建
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导入职工" placement="bottom">
              <el-button @click="dialogVisible = true" plain size="mini">
                导入
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出职工" placement="bottom">
              <el-button plain size="mini">
                导出
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>

        <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="38">
          </el-table-column>

          <el-table-column prop="staff_code" label="职工号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="org_code" label="所属组织" :formatter="orgFormatter">
          </el-table-column>

          <el-table-column label="操作" width="88" header-align="left" align="center">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button size="mini" @click="">
                  <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="edit(scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click.native="resignation(scope.row)">任职</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            </el-table-column>
            <el-table-column type="expand" label="#" width="42">
              <template slot-scope="props" style="background-color:#f7f8f9">
  <el-form label-position="left" inline class="demo-table-expand">
    <el-form-item label="职工号:">
      <span>{{ props.row.staff_code }}</span>
    </el-form-item>
    <br />
    <el-form-item label="姓名:">
      <span>{{ props.row.name }}</span>
    </el-form-item>
    <br />
    <el-form-item label="手机号:">
      <span>{{ props.row.phone }}</span>
    </el-form-item>
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
  </page>
</template>

  <script>
import api from "../_api/staff.js";
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
      action: api.importStaff
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
    orgFormatter(row, column, cellValue, index) {
      var orgList = this.orgList;
      for (var i = 0; i < orgList.length; i++) {
        if (cellValue == orgList[i].orgCode) {
          return orgList[i].orgName;
        }
      }
    },
    addStu() {
      this.$router.push({
        path: "/user/createStaffForm"
      });
    },
    ...mapActions({
      queryCurrentOrgStaffList: store.namespace + "/queryCurrentOrgStaffList",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryOrgByOrgCode: store.namespace + "/queryOrgByOrgCode"
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
        this.queryOrgByOrgCode().then(response => {
          this.orgList = response.resBody;
          this.getData();
        });
      });
    },
    getData() {
      var requestData = {
        staffCode: this.formInline.staffCode,
        name: this.formInline.name,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryCurrentOrgStaffList(requestData).then(response => {
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