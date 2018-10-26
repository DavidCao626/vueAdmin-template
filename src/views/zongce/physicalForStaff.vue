<template>
    <div>
        <page>
            <div slot="title">体能测试成绩管理</div>
        </page>
        <elx-table-layout>
            <template slot="headerRight">
                <el-button-group>
                    <el-tooltip class="item" effect="dark" content="发布岗位" placement="bottom">
                        <el-button @click="insertPhysicalBT" plain size="mini">
                            录入成绩
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="导入岗位" placement="bottom">
                        <el-button @click="importPhysicalBT" plain size="mini">
                            导入成绩
                        </el-button>
                    </el-tooltip>
                </el-button-group>
            </template>
            <template slot="headerLeft">

                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="组织机构">
                        <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="formInline.stuNo" placeholder="学号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="formInline.stuName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="学年">
                        <elx-select v-model="formInline.schoolYearId" placeholder="请选择">
                            <el-option v-for="item in schoolYearList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </elx-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="data" style="width: 100%" border size="mini">
                <el-table-column prop="stuNo" label="学号">
                </el-table-column>
                <el-table-column prop="stuName" label="姓名">
                </el-table-column>
                <el-table-column prop="orgName" label="组织">
                </el-table-column>
                <el-table-column prop="schoolYearName" label="学年">
                </el-table-column>
                <el-table-column prop="score" label="分数">
                </el-table-column>
                <el-table-column prop="grade" label="等级" :formatter="gradeFormatter">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="updatePhysicalBT(scope.row)">修改</el-dropdown-item>
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

        <el-dialog title="导入成绩" :visible.sync="importDV">
            <el-form :model="formData" label-width="80px">
                <el-form-item label="学年">
                    <elx-select v-model="formData.schoolYearId" placeholder="请选择">
                        <el-option v-for="item in schoolYearList2" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </elx-select>
                </el-form-item>
                <el-form-item label="文件上传">
                    <br />
                    <el-upload class="upload-demo" ref="upload" :action="importPhysicalUrl" :limit='1' :onSuccess="onUploadSuccess2">
                        <el-button size="small" type="primary" plain>
                            <i class="el-icon-upload"></i> 点击上传文件</el-button>
                        <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <a :href="templateUrl" style="color:blue" target='_blank'>
                    模板下载
                </a>
                <el-button @click="importDV = false">取 消</el-button>
                <el-button type="primary" @click="importSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改成绩信息" :visible.sync="updateDV">
            <el-form :model="updateFormData" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="updateFormData.stuNo" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="updateFormData.stuName" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="学年">
                    <el-input v-model="updateFormData.schoolYearName" placeholder="" disabled></el-input>
                </el-form-item>
                <el-form-item label="成绩">
                    <el-input-number v-model="updateFormData.score" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="updateFormData.grade" placeholder="">
                        <el-option v-for="item in physicalGradeList" :key="item.dict_key" :value="item.dict_key" :label="item.dict_desc"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input v-model="updateFormData.remark" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateDV = false">取 消</el-button>
                <el-button type="primary" @click="updateSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="录入成绩信息" :visible.sync="insertDV">
            <el-form :model="insertFormData" size="small" label-width="80px">
                <el-form-item label="目标学生:">
                    {{ insertFormData.stuName }}&nbsp;{{ insertFormData.stuNo?'(学号:'+insertFormData.stuNo+')':'' }}&nbsp;
                    <el-button type="primary" size="mini" plain @click="switchStudentDV=true">{{ insertFormData.stuName?'重新选择':'选择要评价的学生' }}</el-button>
                </el-form-item>
                <el-form-item label="学年">
                    <elx-select v-model="insertFormData.schoolYearId" placeholder="请选择">
                        <el-option v-for="item in schoolYearList2" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </elx-select>
                </el-form-item>
                <el-form-item label="成绩">
                    <el-input-number v-model="insertFormData.score" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="insertFormData.grade" placeholder="">
                        <el-option v-for="item in physicalGradeList" :key="item.dict_key" :value="item.dict_key" :label="item.dict_desc"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="insertFormData.remark" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="insertDV = false">取 消</el-button>
                <el-button type="primary" @click="insertSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="点击选择学生" :visible.sync="switchStudentDV" top="3vh" width="70%">
            <elx-table-layout>
                <template slot="headerLeft">
                    <el-form :inline="true" :model="studentSearchForm" size="mini" class="demo-form-inline">
                        <el-form-item label="组织机构">
                            <el-cascader v-model="studentSearchForm.orgCode" placeholder="输入进行搜索" expand-trigger="click" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
                        </el-form-item>
                        <el-form-item label="学号">
                            <el-input v-model="studentSearchForm.sysNo" placeholder="学号"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="studentSearchForm.name" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchButton">
                                <i class="el-icon-search"></i> 查询</el-button>
                        </el-form-item>
                    </el-form>
                </template>
                <div style="overflow-y:scroll;height:60vh;padding:0 15px">
                    <el-table :data="studentData" v-loading="loading" @row-click="studentClick" style="width: 100%" border size="mini">
                        <el-table-column prop="userObjectNo" label="学号">
                        </el-table-column>
                        <el-table-column prop="userObjectName" label="姓名">
                        </el-table-column>
                        <el-table-column prop="orgName" label="组织">
                        </el-table-column>
                    </el-table>
                </div>
                <template slot="footer">
                    <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pageInfo2.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo2.totalRecord">
                    </el-pagination>
                </template>
            </elx-table-layout>
            <div slot="footer" class="dialog-footer">
                <el-button @click="switchStudentDV = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";

const importPhysicalUrl = process.env.BASE_API + "/public/uploadPhyscalFile.do";

Vue.use(Element);
export default {
  data() {
    return {
      loading: false,
      studentSearchForm: {
        orgCode: [],
        sysNo: "",
        name: ""
      },
      studentData: [],
      switchStudentDV: false,
      updateFormData: {
        id: null,
        stuName: "",
        stuNo: "",
        grade: null,
        schoolYearName: "",
        score: 0.0,
        remark: ""
      },
      insertFormData: {
        stuName: "",
        stuNo: "",
        orgCode: "",
        schoolUearId: null,
        grade: null,
        score: 0.0,
        remark: ""
      },
      updateDV: false,
      insertDV: false,
      importPhysicalUrl: importPhysicalUrl,
      formData: {
        schoolYearId: null,
        fileId: 0
      },
      importDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      templateUrl: "",
      formInline: {
        orgCode: [],
        stuNo: "",
        stuName: "",
        schoolYearId: 0
      },
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      orgList: [],
      data: [],
      schoolYearList: [],
      pageInfo2: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      schoolYearList2: [], //不包含全部
      physicalGradeList: []
    };
  },
  watch: {},
  methods: {
    updatePhysicalBT(row) {
      //修改成绩信息按钮\
      this.updateDV = true;
      this.updateFormData.stuName = row.stuName;
      this.updateFormData.stuNo = row.stuNo;
      this.updateFormData.schoolYearName = row.schoolYearName;
      this.updateFormData.score = row.score;
      this.updateFormData.remark = row.remark;
      this.updateFormData.id = row.id;
      this.updateFormData.grade = row.grade;
    },
    updateSubmit() {
      //确认修改
      this.updateDV = false;
      this.updatePhysical({
        id: this.updateFormData.id,
        remark: this.updateFormData.remark,
        score: this.updateFormData.score,
        grade: this.updateFormData.grade
      }).then(response => {
        this.$message.success("修改成功");
        this.getData();
      });
    },
    insertPhysicalBT() {
      //录入体能测试成绩
      this.insertDV = true;
    },
    insertSubmit() {
      this.insertDV = false;
      var requestData = {
        stuNo: this.insertFormData.stuNo,
        stuName: this.insertFormData.stuName,
        orgCode: this.insertFormData.orgCode,
        schoolYearId: this.insertFormData.schoolYearId,
        score: this.insertFormData.score,
        remark: this.insertFormData.remark,
        grade: this.insertFormData.grade
      };
      this.insertPhysical(requestData).then(response => {
        this.$message.success("增加成功");
        this.getData();
      });
    },
    getSchoolYearList() {
      this.schoolYearList = [];
      this.querySchoolYear({ currentPage: 1, pageSize: 99999 }).then(
        response => {
          this.schoolYearList2 = JSON.parse(
            JSON.stringify(response.resBody.baseData)
          );

          this.schoolYearList = response.resBody.baseData;
          this.schoolYearList.unshift({ id: 0, name: "全部" });
        }
      );
    },
    onUploadSuccess2(response, file, fileList) {
      this.formData.fileId = response.body.resBody.fileId;
    },
    importSubmit() {
      this.importDV = false;
      if (!this.formData.fileId) {
        return this.$message.error("请先上传数据文件！");
      }
      this.$confirm(
        "此操作将在后台执行导入任务, 稍后您可以凭借任务单号查看导入结果",
        "提示",
        {
          confirmButtonText: "知道了",
          cancelButtonText: "取消操作",
          type: "warning"
        }
      ).then(() => {
        this.importPhysical({
          fileId: this.formData.fileId,
          schoolYearId: this.formData.schoolYearId
        }).then(response => {
          this.dialogVisible = false;
          this.$refs["upload"].clearFiles();
          this.$notify({
            title: "后台任务提醒",
            message: "任务单号:" + response.resBody.batch + ",已创建。",
            duration: 0,
            type: "info",
            dangerouslyUseHTMLString: true
          });
        });
      });
    },
    importPhysicalBT() {
      this.importDV = true;
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
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo2.pageSize = val;
      this.getStudentData();
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo2.currentPage = val;
      this.getStudentData();
    },
    studentClick(row, event, column) {
      this.insertFormData.stuNo = row.userObjectNo;
      this.insertFormData.stuName = row.userObjectName;
      this.insertFormData.orgCode = row.orgCode;
      this.switchStudentDV = false;
    },
    getStudentData() {
      var requestData = {
        currentPage: this.pageInfo2.currentPage,
        pageSize: this.pageInfo2.pageSize,
        sysNo: this.studentSearchForm.sysNo,
        name: this.studentSearchForm.name
      };
      if (this.studentSearchForm.orgCode.length > 0) {
        requestData.orgCode = this.studentSearchForm.orgCode[
          this.studentSearchForm.orgCode.length - 1
        ];
      }
      this.queryStudentBaseInfo(requestData).then(response => {
        this.studentData = response.resBody.baseData;
        this.pageInfo2 = response.resBody.pageInfo;
        this.loading = false;
      });
    },
    searchButton() {
      this.loading = true;
      this.pageInfo2.currentPage = 1;
      this.getStudentData();
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getPhysicalTemplateUrl: store.namespace + "/getPhysicalTemplateUrl",
      importPhysical: store.namespace + "/importPhysical",
      insertPhysical: store.namespace + "/insertPhysical",
      updatePhysical: store.namespace + "/updatePhysical",
      queryPhysicalForStaff: store.namespace + "/queryPhysicalForStaff",
      querySchoolYear: store.namespace + "/querySchoolYear",
      queryStudentBaseInfo: store.namespace + "/queryStudentBaseInfo"
    }),
    getUrl() {
      this.getPhysicalTemplateUrl({}).then(r => {
        this.templateUrl = r.resBody.url;
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        stuNo: this.formInline.stuNo,
        stuName: this.formInline.stuName,
        schoolYearId: this.formInline.schoolYearId
      };
      if (this.formInline.orgCode.length > 0) {
        requestData.orgCode = this.formInline.orgCode[
          this.formInline.orgCode.length - 1
        ];
      }
      //查询数据的方法
      this.queryPhysicalForStaff(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    gradeFormatter(r, c, v, index) {
      var arr = this.physicalGradeList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].dict_key == v) {
          return arr[i].dict_desc;
        }
      }
      return v;
    },
    getDict() {
      var requestData = {
        dicts: ["physical_grade"]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.physicalGradeList = res.physical_grade;
      });
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.getUrl();
      vm.getOrgList();
      vm.getSchoolYearList();
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