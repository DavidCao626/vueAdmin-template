<template>
  <div>
    <page>
      <div slot="title">班级管理</div>
    </page>
    <elx-table-layout>
      <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="新建" placement="bottom">
            <el-button @click="addClassBT" plain size="mini">
              新建
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>

      <template slot="headerLeft">
        <el-form :inline="true" :model="formInline" label-width="80px" size="mini" class="demo-form-inline">
          <el-form-item label="班级名称">
            <el-input v-model="formInline.orgName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="班级代码">
            <el-input v-model="formInline.socialCode" placeholder=""></el-input>
          </el-form-item>
          <br />
          <el-form-item label="系">
            <el-select v-model="formInline.departmentCode" placeholder="" @change="getMajorListAll">
              <el-option v-for="item in departmentListALL" :key="item.id" :label="item.departmentName" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-select v-model="formInline.majorCode" placeholder="">
              <el-option v-for="item in majorListALL" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="学历">
            <el-select v-model="formInline.educationLevelCode" placeholder="" @change="getMemberTypeALL">
              <el-option v-for="item in educationLevelListALL" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成员类型">
            <el-select v-model="formInline.memberType" placeholder="">
              <el-option v-for="item in memberTypeALL" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="socialCode" label="班级代码">
        </el-table-column>
        <el-table-column prop="orgName" label="班级名称">
        </el-table-column>
        <el-table-column prop="schoolYearName" label="创建学年">
        </el-table-column>
        <el-table-column prop="departmentName" label="系名称">
        </el-table-column>
        <el-table-column prop="majorName" label="专业名称">
        </el-table-column>
        <el-table-column prop="educationLevelName" label="学历名称">
        </el-table-column>
        <el-table-column prop="memberTypeName" label="成员类型">
        </el-table-column>
        <el-table-column prop="academic" label="学制" :formatter="academicFormatter">
        </el-table-column>
        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updateBT(scope.row)">更新</el-dropdown-item>
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

    <el-dialog title="新建班级" :visible.sync="addClassDV" width="30%">
      <el-form :model="formAdd" size="small" label-width="100px">
        <el-card shadow="hover">
          <el-form-item label="组织名称:">
            <el-input v-model="formAdd.orgName"></el-input>
          </el-form-item>
          <el-form-item label="组织简称:">
            <el-input v-model="formAdd.orgTitle"></el-input>
          </el-form-item>
          <el-form-item label="社会代码:">
            <el-input v-model="formAdd.socialCode"></el-input>
          </el-form-item>
        </el-card>

        <el-card shadow="hover">
          <el-form-item label="创建学年:">
            <el-select v-model="formAdd.expandData.schoolYearId">
              <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系">
            <el-select v-model="formAdd.expandData.departmentCode" placeholder="" @change="getMajorList">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.departmentName" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-select v-model="formAdd.expandData.majorCode" placeholder="">
              <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="formAdd.expandData.educationLevelCode" placeholder="" @change="getMemberType">
              <el-option v-for="item in educationLevelList" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成员类型">
            <el-select v-model="formAdd.expandData.memberType" placeholder="">
              <el-option v-for="item in memberType" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassDV = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改班级信息" :visible.sync="updateClassDV" width="30%">
      <el-form :model="form" size="small" label-width="100px">
        <el-card shadow="hover">
          <el-form-item label="组织名称:">
            <el-input v-model="form.orgName"></el-input>
          </el-form-item>
          <el-form-item label="组织简称:">
            <el-input v-model="form.orgTitle"></el-input>
          </el-form-item>
          <el-form-item label="社会代码:">
            <el-input v-model="form.socialCode"></el-input>
          </el-form-item>
        </el-card>

        <el-card shadow="hover">
          <el-form-item label="创建学年:">
            <el-select v-model="form.expandData.schoolYearId">
              <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系">
            <el-select v-model="form.expandData.departmentCode" placeholder="" @change="getMajorList">
              <el-option v-for="item in departmentList" :key="item.id" :label="item.departmentName" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-select v-model="form.expandData.majorCode" placeholder="">
              <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="form.expandData.educationLevelCode" placeholder="" @change="getMemberType">
              <el-option v-for="item in educationLevelList" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成员类型">
            <el-select v-model="form.expandData.memberType" placeholder="">
              <el-option v-for="item in memberType" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否可用:">
            <el-switch v-model="form.available" active-color="#13ce66" inactive-color="#ccc" active-value="Y" inactive-value="N">
            </el-switch>
          </el-form-item>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateClassDV = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
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
import menus from "../_mixin/menus.js";

Vue.use(Element);
export default {
  mixins: [menus],
  data() {
    return {
      updateClassDV: false,
      addClassDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      formAdd: {
        //ADD绑定form
        orgCode: "",
        orgType: "",
        orgName: "",
        orgTitle: "",
        socialCode: "",
        expandData: {
          educationLevelCode: "",
          schoolYearId: "",
          memberType: "",
          majorCode: "",
          majorName: "",
          orgState: "",
          departmentCode: ""
        }
      },
      form: {
        //更新绑定form
        orgCode: "",
        orgType: "",
        orgName: "",
        orgTitle: "",
        available: "Y",
        socialCode: "",
        expandData: {
          educationLevelCode: "",
          schoolYearId: "",
          memberType: "",
          majorCode: "",
          majorName: "",
          orgState: "",
          departmentCode: ""
        }
      },
      schoolYearDict: [],
      formInline: {
        socialCode: "",
        orgName: "",
        memberType: "0",
        educationLevelCode: "0",
        majorCode: "0",
        departmentCode: "0"
      },
      departmentList: [],
      majorList: [],
      educationLevelList: [],
      memberType: [],
      academicList: [],
      departmentListALL: [], //ALL包含全部
      majorListALL: [],
      educationLevelListALL: [],
      memberTypeALL: [],
      data: []
    };
  },
  watch: {},
  methods: {
    updateBT(row) {
      this.getMemberType(row.educationLevelCode);
      this.getMajorList(row.departmentCode);
      this.form.orgCode = row.orgCode;
      this.form.orgType = 10;
      this.form.orgName = row.orgName;
      this.form.orgTitle = row.orgTitle;
      this.form.available = row.available;
      this.form.socialCode = row.socialCode;
      this.form.expandData.educationLevelCode = row.educationLevelCode;
      this.form.expandData.schoolYearId = row.schoolYearId;
      this.form.expandData.memberType = row.memberType;
      this.form.expandData.majorCode = row.majorCode;
      this.form.expandData.majorName = row.majorName;
      this.form.expandData.orgState = row.orgState;
      this.form.expandData.departmentCode = row.departmentCode;
      this.updateClassDV = true;
    },
    submitUpdate() {
      //确认更新调用更新接口
      this.updateOrg(this.form).then(response => {
        this.$message.success("更新成功");
        this.updateClassDV = false;
        this.getData();
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.schoolYearDict = response.resBody;
      });
    },
    addClassBT() {
      this.addClassDV = true;
    },
    submitAdd() {
      //确认增加,调用增加接口
      var requestData = {
        parentCode: "", //上级组织
        orgType: 10,
        orgName: this.formAdd.orgName,
        orgTitle: this.formAdd.orgTitle,
        socialCode: this.formAdd.socialCode,
        expandData: {
          schoolYearId: this.formAdd.expandData.schoolYearId,
          educationLevelCode: this.formAdd.expandData.educationLevelCode,
          memberType: this.formAdd.expandData.memberType,
          majorCode: this.formAdd.expandData.majorCode,
          majorName: this.formAdd.expandData.majorName,
          departmentCode: this.formAdd.expandData.departmentCode,
          orgState: this.formAdd.expandData.orgState
        }
      };
      this.insertOrg(requestData).then(response => {
        this.addClassDV = false;
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.getData();
      });
    },
    academicFormatter(r, c, v, index) {
      var arr = this.academicList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].dict_key == v) {
          return arr[i].dict_desc;
        }
      }
      return v;
    },
    getDepartmentList() {
      this.queryDepartmentList({}).then(response => {
        this.majorListALL.unshift({ code: "0", name: "全部" });
        this.departmentList = response.resBody;
        this.departmentListALL = JSON.parse(JSON.stringify(response.resBody));
        this.departmentListALL.unshift({ code: "0", departmentName: "全部" });
      });
    },
    getEducationLevelList() {
      this.queryEducationLevel({}).then(response => {
        this.memberTypeALL.unshift({ code: "0", name: "全部" });
        this.educationLevelList = response.resBody;
        this.educationLevelListALL = JSON.parse(
          JSON.stringify(response.resBody)
        );
        this.educationLevelListALL.unshift({ code: "0", name: "全部" });
      });
    },
    getMemberType(value) {

      this.formAdd.expandData.memberType = null;
      this.form.expandData.memberType = null;
      
      this.queryStuTypeByEducationLevelCode({
        educationLevelCode: value
      }).then(response => {
        this.memberType = response.resBody;
      });
    },
    getMajorList(value) {

      this.formAdd.expandData.majorCode = null;
      this.form.expandData.majorCode = null;

      this.queryMajorByDepartmentCode({
        departmentCode: value
      }).then(response => {
        this.majorList = response.resBody;
      });
    },
    getMemberTypeALL() {
      this.queryStuTypeByEducationLevelCode({
        educationLevelCode: this.formInline.educationLevelCode
      }).then(response => {
        this.formInline.memberType = "0";
        this.memberTypeALL = response.resBody;
        this.memberTypeALL.unshift({ code: "0", name: "全部" });
      });
    },
    getMajorListAll() {
      this.queryMajorByDepartmentCode({
        departmentCode: this.formInline.departmentCode
      }).then(response => {
        this.formInline.majorCode = "0";
        this.majorListALL = response.resBody;
        this.majorListALL.unshift({ code: "0", name: "全部" });
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
      queryCollegeClass: store.namespace + "/queryCollegeClass",
      queryDepartmentList: store.namespace + "/queryDepartmentList",
      queryMajorByDepartmentCode:
        store.namespace + "/queryMajorByDepartmentCode",
      queryEducationLevel: store.namespace + "/queryEducationLevel",
      queryStuTypeByEducationLevelCode:
        store.namespace + "/queryStuTypeByEducationLevelCode"
    }),
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        socialCode: this.formInline.socialCode,
        orgName: this.formInline.orgName,
        memberType: this.formInline.memberType,
        educationLevelCode: this.formInline.educationLevelCode,
        majorCode: this.formInline.majorCode,
        departmentCode: this.formInline.departmentCode
      };
      //查询数据的方法
      this.queryCollegeClass(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["educationalType"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.academicList = response.resBody.educationalType;
      });
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.getDict();
      vm.getDepartmentList();
      vm.getEducationLevelList();
      vm.getSchoolYearDict();
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