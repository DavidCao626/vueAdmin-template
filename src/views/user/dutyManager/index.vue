<template>
  <div>

    <elx-table-layout>
      <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="新建职务" placement="bottom">
            <el-button plain size="mini" @click="addDuty">
              新建
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>
      <template slot="headerLeft">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="职务名称:">
            <el-input v-model="formInline.dutyName" placeholder="输入职务名称进行搜索"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="search">查 询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>

        <el-table-column prop="dutyCode" label="职务代码">
        </el-table-column>
        <el-table-column prop="dutyName" label="职务名称">
        </el-table-column>
        <el-table-column prop="targetUserType" label="用户对象" :formatter="userTypeFormatter">
        </el-table-column>
        <el-table-column prop="isMember" label="成员职务" :formatter="isMemberFormatter">
        </el-table-column>
        <el-table-column prop="authOrgName" label="认证机构">
        </el-table-column>
        <el-table-column prop="available" label="是否可用" :formatter="availableFormatter">
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

    <el-dialog title="编辑" :visible.sync="editDV" width="60%">
      <el-form size="small" :model="editData" label-width="80px">
        <el-form-item label="职务代码">
          <el-input v-model="editData.dutyCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="职务名称">
          <el-input v-model="editData.dutyName"></el-input>
        </el-form-item>
        <el-form-item label="用户对象">
          <el-select v-model="editData.userObject" placeholder="请选择">
            <el-option v-for="item in classifyList" :key="item.userObjectSerial" :label="item.userObjectName" :value="item.userObjectSerial">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="对应角色">
          <el-checkbox-group v-model="editData.resultRole">
            <template v-for="group in groupData">
              <div :key="group.type.value" style="margin-top:2px">
                <el-checkbox-button :disabled="true" :name="'group.type.name'" :label="'-1'" size="mini" border v-if="true">{{group.type.title}}</el-checkbox-button>
                <template v-for="item in group.privileges">
                  <el-checkbox-button :disabled="item.disabled" :name="item.name" :label="item.value" :key="item.value" size="mini" border v-if="true">{{item.title}}</el-checkbox-button>
                </template>
              </div>
            </template>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="成员职务">
          <el-radio-group v-model="editData.isMember">
            <el-radio-button v-for="item in isMemberList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="认证机构" v-if="editData.isMember == 'Y'">
          <el-cascader v-model="editData.authOrgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-radio-group v-model="editData.available">
            <el-radio-button v-for="item in avaList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editDV = false">取 消</el-button>
        <el-button size="small" type="primary" @click="updateTrue">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="addDV" width="60%">
      <el-form size="small" :model="addData" label-width="80px">

        <el-form-item label="职务名称">
          <el-input v-model="addData.dutyName"></el-input>
        </el-form-item>
        <el-form-item label="用户对象">
          <el-select v-model="addData.userObject" placeholder="请选择">
            <el-option v-for="item in classifyList" :key="item.userObjectSerial" :label="item.userObjectName" :value="item.userObjectSerial">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="对应角色">
          <el-checkbox-group v-model="addData.resultRole">
            <template v-for="group in groupData">
              <div :key="group.type.value" style="margin-top:2px">
                <el-checkbox-button :disabled="true" :name="'group.type.name'" :label="'-1'" size="mini" border v-if="true">{{group.type.title}}</el-checkbox-button>
                <template v-for="item in group.privileges">
                  <el-checkbox-button :disabled="item.disabled" :name="item.name" :label="item.value" :key="item.value" size="mini" border v-if="true">{{item.title}}</el-checkbox-button>
                </template>
              </div>
            </template>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="成员职务">
          <el-radio-group v-model="addData.isMember">
            <el-radio-button v-for="item in isMemberList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="认证机构" v-if="addData.isMember == 'Y'">
          <el-cascader v-model="addData.authOrgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-radio-group v-model="addData.available">
            <el-radio-button v-for="item in avaList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDV = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addTrue">确 定</el-button>
      </span>
    </el-dialog>

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
      editData: {
        id: 0,
        dutyCode: "",
        dutyName: "",
        userObject: "",
        isMember: "",
        authOrgCode: [],
        available: "",
        resultRole: []
      },
      addData: {
        dutyName: "",
        userObject: "",
        isMember: "N",
        authOrgCode: [],
        available: "Y",
        resultRole: []
      },

      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      isMemberList: [],
      avaList: [],
      editDV: false,
      addDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      data: [],
      formInline: {
        dutyName: ""
      },
      orgList: [],
      availableObj: {},
      isMemberObj: {},
      classifyList: [],
      groupData: [],
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
    addTrue() {
      var requestData = this.addData;
      this.insertDuty(requestData).then(resposne => {
        this.$message.success("保存成功");
        this.addDV = false;
        this.addData = {
          dutyName: "",
          userObject: "",
          isMember: "N",
          authOrgCode: [],
          available: "Y",
          resultRole: []
        };
        this.getData();
      });
    },
    search() {
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    addDuty() {
      this.addDV = true;
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
      queryDutyListByMNCode: store.namespace + "/queryDutyListByMNCode",
      querySocializeClassify: store.namespace + "/querySocializeClassify",
      getDutyByDutyId: store.namespace + "/getDutyByDutyId",
      getGrantRole: store.namespace + "/getGrantRole",
      updateDuty: store.namespace + "/updateDuty",
      insertDuty: store.namespace + "/insertDuty",
      getCurrentMNCodeOrgListAndOwner:
        store.namespace + "/getCurrentMNCodeOrgListAndOwner" //获取管理节点下的组织包括管理节点
    }),
    getMNOrgList() {
      this.getCurrentMNCodeOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    getClassify() {
      this.querySocializeClassify().then(response => {
        console.log(["classify", response]);
        this.classifyList = response.resBody;
        this.getData();
      });
    },
    getDroupData() {
      this.getGrantRole().then(response => {
        this.groupData = response.resBody;
      });
    },
    edit(row) {
      this.editDV = true;
      console.log(["row", row]);
      this.getDutyByDutyId({ id: row.id }).then(response => {
        var res = response.resBody;
        var s = []; //数组的长度:(orgCode.length() - 2) / 2
        if (res.authOrgCode) {
          var orgCode = res.authOrgCode;
          for (var i = 0; i < (orgCode.length - 2) / 2; i++) {
            s[i] = orgCode.substring(0, 2 + (i + 1) * 2);
          }
        }

        this.editData = {
          id: row.id,
          dutyCode: res.dutyCode,
          dutyName: res.dutyName,
          userObject: res.targetUserType,
          isMember: res.isMember,
          authOrgCode: s,
          resultRole: res.resultRole,
          available: res.available
        };
      });
    },
    updateTrue() {
      var requestData = {
        id: this.editData.id,
        dutyName: this.editData.dutyName,
        userObject: this.editData.userObject,
        isMember: this.editData.isMember,
        authOrgCode: this.editData.authOrgCode,
        available: this.editData.available,
        resultRole: this.editData.resultRole
      };
      this.updateDuty(requestData).then(response => {
        this.$message.success("保存成功");
        this.editDV = false;
        this.getData();
      });
    },
    userTypeFormatter(r, c, cell, i) {
      for (var j = 0; j < this.classifyList.length; j++) {
        if (this.classifyList[j].userObjectSerial == cell) {
          return this.classifyList[j].userObjectName;
        }
      }
    },
    isMemberFormatter(row, column, cellValue, index) {
      return this.isMemberObj[cellValue];
    },
    availableFormatter(row, column, cellValue, index) {
      return this.availableObj[cellValue];
    },
    getDict() {
      var requestData = {
        dicts: ["isMember", "available"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["dict", response]);
        var res = response.resBody;
        res.isMember.forEach(el => {
          this.isMemberObj[el.dict_key] = el.dict_desc;
        });
        this.isMemberList = res.isMember;
        this.avaList = res.available;
        res.available.forEach(el => {
          this.availableObj[el.dict_key] = el.dict_desc;
        });
        this.getClassify();
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        dutyName: this.formInline.dutyName
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
      vm.getMNOrgList();
      vm.getDict();
      vm.getDroupData();
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