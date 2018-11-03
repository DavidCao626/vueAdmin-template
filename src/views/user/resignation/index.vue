<template>
  <page>
    <div slot="title">已任职情况查询</div>
    <div slot="panel">

      <elx-table-layout>

        <template slot="headerRight">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="分配职务" placement="bottom">
              <el-button plain size="mini" @click="addBT">
                分配
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>

        <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="38">
          </el-table-column>

          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="orgName" label="任职组织">
          </el-table-column>
          <el-table-column prop="definitionName" label="职务名称">
          </el-table-column>
          <el-table-column prop="beginDate" :formatter="beginDateFormatter" label="任职时间">
          </el-table-column>
          <el-table-column prop="isBandh" :formatter="stateFormatter" label="状态">
          </el-table-column>
          <el-table-column label="操作" width="168" header-align="left" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button size="mini" @click="del(scope.row)">移除</el-button>

            </template>
          </el-table-column>
          <!-- <el-table-column type="expand" label="#" width="42">
                    <template slot-scope="props" style="background-color:#f7f8f9">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="证件类型:">
                                <span v-html="idTypeFormatter(props.row.identity_type)"></span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="证件号码:">
                                <span>{{ props.row.identity_no }}</span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="家庭住址:">
                                <span>{{ props.row.postal_address }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column> -->
        </el-table>

      </elx-table-layout>

      <el-dialog title="编辑" :visible.sync="editDV" width="30%">
        <el-radio-group size="small" v-model="editData.isBandh">
          <el-radio-button v-for="item in stateList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
        </el-radio-group>

        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="editDV = false">取 消</el-button>
          <el-button size="small" type="primary" @click="updateResign">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="分配" :visible.sync="addDV" width="50%">
        <el-form :model="addData" label-width="80px">
          <el-form-item label="组织">
            <el-cascader v-model="addData.org" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
          </el-form-item>
          </br>
          <el-form-item label="职务">
            <el-select v-model="addData.dutyCode" placeholder="请选择职务">
              <el-option v-for="item in dutyList" :key="item.dutyCode" :label="item.dutyName" :value="item.dutyCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="addDV = false">取 消</el-button>
          <el-button size="small" type="primary" @click="addReg">确 定</el-button>
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
      addData: {
        org: [],
        dutyCode: ""
      },
      editData: {
        id: "",
        isBandh: "" //Y||N
      },
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      orgList: [],
      addDV: false,
      editDV: false,
      type: "", //student||staff||other
      sysNo: "",
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      data: [],
      stateObj: {},
      stateList: [],
      dutyList: [],
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
    goBack() {
      this.$router.go(-1);
    },
    updateResign() {
      var requestData = {
        id: this.editData.id,
        isBandh: this.editData.isBandh
      };
      this.updateUserResignation(requestData).then(response => {
        this.$message.success("保存成功");
        this.getData();
        this.editDV = false;
      });
    },
    addBT() {
      this.addDV = true;
      this.addData.org = [];
      this.addData.dutyCode = "";
    },
    addReg() {
      var requestData = {
        sysNo: this.sysNo,
        type: this.type,
        orgCode: this.addData.org,
        dutyCode: this.addData.dutyCode
      };
      this.insertUserResignation(requestData).then(response => {
        this.$message.success("保存成功");
        this.getData();
        this.addDV = false;
      });
    },
    ...mapActions({
      queryResignationByTypeAndSysCode:
        store.namespace + "/queryResignationByTypeAndSysCode",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      deleteUserResigDutyById: store.namespace + "/deleteUserResigDutyById",
      updateUserResignation: store.namespace + "/updateUserResignation",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner", //学生任职可选组织(当前登录用户的下级组织包括自己)
      getCurrentMNCodeOrgListAndOwner:
        store.namespace + "/getCurrentMNCodeOrgListAndOwner", //获取管理节点下的组织包括管理节点
      queryResigDutyBySessionAndType:
        store.namespace + "/queryResigDutyBySessionAndType",
      insertUserResignation: store.namespace + "/insertUserResignation"
    }),
    getDuty() {
      this.queryResigDutyBySessionAndType({ type: this.type }).then(
        response => {
          console.log(["duty", response]);
          this.dutyList = response.resBody;
        }
      );
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    getMNOrgList() {
      this.getCurrentMNCodeOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    del(row) {
      console.log(["row", row]);
      this.deleteUserResigDutyById({ id: row.id }).then(response => {
        this.$message.success("移除成功!");
        this.getData();
      });
    },
    edit(row) {
      this.editDV = true;
      this.editData.isBandh = row.isBandh;
      this.editData.id = row.id;
      console.log(["row", row]);
    },
    stateFormatter(row, column, cellValue, index) {
      console.log(["dict", cellValue, this.stateObj[cellValue], this.stateObj]);
      return this.stateObj[cellValue];
    },
    beginDateFormatter(row, column, cellValue, index) {
      return moment(cellValue, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
    },
    getDict() {
      var requestData = {
        dicts: ["is_bandh"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["is_bandh", response]);
        var res = response.resBody;
        this.stateList = res.is_bandh;
        res.is_bandh.forEach(el => {
          this.stateObj[el.dict_key] = el.dict_desc;
        });
        this.getData();
      });
    },
    getData() {
      var requestData = {
        sysCode: this.sysNo,
        type: this.type
      };
      this.queryResignationByTypeAndSysCode(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.resignation;
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
      if (!to.query.sysNo || !to.query.type) {
        vm.$message.error("参数不正确!");
        vm.$router.go(-1);
      } else {
        vm.sysNo = to.query.sysNo;
        vm.type = to.query.type;
      }
      if (to.query.type == "student") {
        vm.getOrgList();
      } else {
        vm.getMNOrgList();
      }
      vm.getDict();
      vm.getDuty();
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