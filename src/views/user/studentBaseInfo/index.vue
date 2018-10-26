<template>
  <div>
    <el-dialog title="导入数据" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <el-upload ref="upfile" class="upload-demo" drag :action="importStudentUrl" :limit='1' :onSuccess="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传xls</div>
      </el-upload>
      <el-form :model="importForm">
        <el-form-item label="入学学年">
          <el-select v-model="importForm.schoolYearId" placeholder="">
            <el-option v-for="item in schoolYearList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitimport">确 定</el-button>
      </span>

    </el-dialog>

    <elx-table-layout>
      <template slot="headerRight">
        <el-button-group>
          <!-- <el-tooltip class="item" effect="dark" content="创建学生" placement="bottom">
            <el-button plain size="mini" @click="addStu">
              新建
            </el-button>
          </el-tooltip> -->
          <el-tooltip class="item" effect="dark" content="导入学生" placement="bottom">
            <el-button plain size="mini" @click="dialogVisible = true">
              导入
            </el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="导出学生" placement="bottom">
            <el-button plain size="mini">
              导出
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>

      <template slot="headerLeft">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="学号:">
            <el-input v-model="formInline.stuNo" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="formInline.name" placeholder="姓名"></el-input>
          </el-form-item>
            <el-form-item label="组织机构">
              <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>
            </el-form-item>

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
              <el-select v-model="formInline.degreeCode" placeholder="" @change="getMemberTypeALL">
                <el-option v-for="item in educationLevelListALL" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成员类型">
              <el-select v-model="formInline.stuTypeCode" placeholder="">
                <el-option v-for="item in memberTypeALL" :key="item.id" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入学学年">
              <el-select v-model="formInline.startSchoolYearId" placeholder="">
                <el-option v-for="item in schoolYearListAll" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>
        <el-table-column prop="stu_no" label="学号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="nation" label="民族" :formatter="nationFormatter">
        </el-table-column>
        <el-table-column prop="sex_type" label="性别" :formatter="sexTypeFormatter">
        </el-table-column>
        <el-table-column prop="educational_type" label="学制" :formatter="academicFormatter">
        </el-table-column>
        <el-table-column prop="college_social_name" label="学院">
        </el-table-column>
        <el-table-column prop="stu_class_social_name" label="班级">
        </el-table-column>
        <el-table-column prop="study_degree_name" label="攻读学历">
        </el-table-column>
        <el-table-column prop="stu_type_name" label="学生类型">
        </el-table-column>
        <el-table-column prop="department_name" label="系">
        </el-table-column>
        <el-table-column prop="major_social_name" label="专业">
        </el-table-column>
        <el-table-column prop="start_school_year_name" label="入学学年">
        </el-table-column>
        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="resignation(scope.row)">任职</el-dropdown-item>
                <el-dropdown-item @click.native="edit(scope.row)">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column type="expand" label="#" width="42">
          <template slot-scope="props" style="background-color:#f7f8f9">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="证件类型:">
                <span v-html="idTypeFormatter(props.row.identity_type)"></span>
              </el-form-item>
              <br />
              <el-form-item label="证件号码:">
                <span>{{ props.row.identity_no }}</span>
              </el-form-item>
              <br />
              <el-form-item label="家庭住址:">
                <span>{{ props.row.postal_address }}</span>
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
</template>

  <script>
import api from "../_api/studentInfo.js";
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";
const importStudentUrl = process.env.BASE_API + "/public/uploadStudent.do";
import menus from "../_mixin/menus.js";

Vue.use(Element);
export default {
  mixins: [menus],
  data() {
    return {
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },

      orgList: [],
      schoolYearList: [],
      importForm: {
        fileId: null,
        schoolYearId: null
      },
      importStudentUrl: importStudentUrl,
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
      academicList: [],
      data: [],
      formInline: {
        stuNo: "",
        name: "",
        orgCode: [],
        departmentCode: "0",
        majorCode: "0",
        degreeCode: "0",
        stuTypeCode: "0",
        startSchoolYearId: 0
      },
      sexObj: {},
      nationObj: {},
      idTypeObj: {},
      departmentListALL: [], //ALL包含全部
      majorListALL: [],
      educationLevelListALL: [],
      memberTypeALL: [],
      schoolYearListAll: [],
      action: api.importStudent
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
    submitimport() {
      if (this.importForm.fileId == null) {
        this.$message.error("请上传文件");
        return;
      }
      if (this.importForm.schoolYearId == null) {
        this.$message.error("请选择入学学年");
        return;
      }

      this.importStudentApi(this.importForm).then(response => {
        this.$refs["upfile"].clearFiles();
        this.importForm.fileId = null;
        this.importForm.schoolYearId = null;
        this.dialogVisible = false;
        this.$notify({
          title: "后台任务提醒",
          message: "任务单号:" + response.resBody.batch + ",已创建。",
          duration: 0,
          type: "info",
          dangerouslyUseHTMLString: true
        });
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
    addStu() {
      this.$router.push({
        path: "/user/createStudentForm"
      });
    },
    getSchoolYearList() {
      this.querySchoolYearDict({}).then(response => {
        this.schoolYearList = response.resBody;
        this.schoolYearListAll = JSON.parse(JSON.stringify(response.resBody));
        this.schoolYearListAll.unshift({ id: 0, name: "全部" });
      });
    },
    ...mapActions({
      querySchoolYearDict: store.namespace + "/querySchoolYearDict",
      queryCurrentOrgStuList: store.namespace + "/queryCurrentOrgStuList",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      importStudentApi: store.namespace + "/importStudentApi",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryDepartmentList: store.namespace + "/queryDepartmentList",
      queryMajorByDepartmentCode:
        store.namespace + "/queryMajorByDepartmentCode",
      queryEducationLevel: store.namespace + "/queryEducationLevel",
      queryStuTypeByEducationLevelCode:
        store.namespace + "/queryStuTypeByEducationLevelCode"
    }),

    getDepartmentList() {
      this.queryDepartmentList({}).then(response => {
        this.majorListALL.unshift({ code: "0", name: "全部" });
        this.departmentListALL = JSON.parse(JSON.stringify(response.resBody));
        this.departmentListALL.unshift({ code: "0", departmentName: "全部" });
      });
    },
    getEducationLevelList() {
      this.queryEducationLevel({}).then(response => {
        this.memberTypeALL.unshift({ code: "0", name: "全部" });
        this.educationLevelListALL = JSON.parse(
          JSON.stringify(response.resBody)
        );
        this.educationLevelListALL.unshift({ code: "0", name: "全部" });
      });
    },
    getMemberTypeALL() {
      this.queryStuTypeByEducationLevelCode({
        educationLevelCode: this.formInline.degreeCode
      }).then(response => {
        this.formInline.stuTypeCode = "0";
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
    resignation(row) {
      console.log(["row", row]);
      this.$router.push({
        path: "/user/resignation",
        query: {
          sysNo: row.stu_no,
          type: "student"
        }
      });
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    edit(row) {
      this.$message.success("正在跳转");
      this.$router.push({
        path: "/user/info",
        query: {
          stuNo: row.stu_no
        }
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
        dicts: ["nation", "sex_type", "identity_type", "educationalType"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.academicList = response.resBody.educationalType;
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
        stuNo: this.formInline.stuNo,
        name: this.formInline.name,
        departmentCode: this.formInline.departmentCode,
        majorCode: this.formInline.majorCode,
        degreeCode: this.formInline.degreeCode,
        stuTypeCode: this.formInline.stuTypeCode,
        startSchoolYearId: this.formInline.startSchoolYearId,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      if (this.formInline.orgCode.length > 0) {
        requestData.orgCode = this.formInline.orgCode[
          this.formInline.orgCode.length - 1
        ];
      }
      this.queryCurrentOrgStuList(requestData).then(response => {
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
    onUploadSuccess(response, file, fileList) {
      console.log("上" + response);
      this.importForm.fileId = response.body.resBody.fileId;
    },
    onNew() {
      this.$emit("onNew");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDict();
      vm.getSchoolYearList();
      vm.getOrgList();
      vm.getDepartmentList();
      vm.getEducationLevelList();
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