<template>
<page>
  <div  slot="title">
    登录用户管理
    </div>
     <div slot="panel">

    <elx-table-layout>

      <template slot="headerLeft">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="登录名:">
            <el-input v-model="formInline.loginName" placeholder="登录名"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model="formInline.mobilePhone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="formInline.userState" placeholder="状态">
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

        <el-table-column prop="loginName" label="登录名">
        </el-table-column>
        <el-table-column prop="mobilePhone" label="手机号">
        </el-table-column>
        <el-table-column prop="qq" label="QQ号码">
        </el-table-column>
        <el-table-column prop="userState" label="用户状态" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后修改时间">
        </el-table-column>
        <el-table-column label="操作" width="220" header-align="left" align="center">
          <template slot-scope="scope">
              <el-button size="mini" @click="resetpwd(scope.row)">
                重置密码
              </el-button>
                <el-button size="mini" @click="edit(scope.row)">
                禁用账户
              </el-button>
           
          </template>
        </el-table-column>
      </el-table>

      <template slot="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
        </el-pagination>
      </template>

    </elx-table-layout>

    <el-dialog title="编辑" :visible.sync="editDV" width="30%">
      <el-radio-group size="small" v-model="editData.state">
        <el-radio-button v-for="item in stateListE" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDV = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editTrue">确 定</el-button>
      </span>
    </el-dialog>

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
      editData: {
        id: 0,
        state: ""
      },
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      data: [],
      editDV: false,
      stateObj: {},
      stateList: [],
      stateListE: [], //没有全部
      formInline: {
        loginName: "",
        userState: "",
        mobilePhone: ""
      }
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
    stateFormatter(r, c, v, index) {
      return this.stateObj[v];
    },
    resetpwd(row) {
      console.log(["重置密码", row]);
      this.resetUserPwd({ id: row.id }).then(response => {
        this.$message.success("重置成功");
      });
    },
    edit(row) {
      console.log(["状态变更", row]);
      this.editDV = true;
      this.editData.state = row.userState;
      this.editData.id = row.id;
    },
    editTrue() {
      this.editDV = false;
      var requestData = {
        id: this.editData.id,
        state: this.editData.state
      };
      this.updateUserState(requestData).then(response => {
        this.$message.success("修改成功");
        this.getData();
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
      queryUserList: store.namespace + "/queryUserList",
      resetUserPwd: store.namespace + "/resetUserPwd",
      updateUserState: store.namespace + "/updateUserState"
    }),
    getDict() {
      var requestData = {
        dicts: ["user_state"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["dict", response]);
        var res = response.resBody;
        res.user_state.forEach(el => {
          this.stateObj[el.dict_key] = el.dict_desc;
        });
        this.stateList = res.user_state;
        this.stateListE = res.user_state.slice();
        this.stateList.unshift({ dict_key: "", dict_desc: "全部" });
        this.getData();
      });
    },
    getData() {
      var requestData = {
        loginName: this.formInline.loginName,
        userState: this.formInline.userState,
        mobilePhone: this.formInline.mobilePhone,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryUserList(requestData).then(response => {
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