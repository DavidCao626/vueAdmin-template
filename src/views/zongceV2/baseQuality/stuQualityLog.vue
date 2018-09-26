stuPunishLog <template>
    <page>
        <div slot="title">学生测评结果查询</div>
        <div slot="panel">
            <div>
                <elx-table-layout>

                    <template slot="headerLeft">

                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="100px" class="demo-form-inline">

                            <el-form-item label="所属机构:">
                                <el-cascader v-model="formInline.orgCode" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>

                            </el-form-item>
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="素质评价类别:">
                                <el-select v-model="formInline.evalTypeCode" placeholder="全部">
                                    <el-option v-for="(km,k) in schoolKm" :key="k" :label="km.name" :value="km.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学生姓名:">
                                <el-input v-model="formInline.name" placeholder="全部"></el-input>
                            </el-form-item>

                            <el-form-item label="学生学号:">
                                <el-input v-model="formInline.stuNo" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">
                                    <i class="el-icon-search"></i> 查询</el-button>
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'score', prop: 'stuNo',prop: 'stuName',prop: 'evalItemName',prop: 'createTime'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>

                        <el-table-column prop="stuNo" sortable label="学号">
                        </el-table-column>
                        <el-table-column prop="stuName" sortable label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="orgName" label="组织名称">
                        </el-table-column>
                        <el-table-column prop="evalTypeName"  label="素质评价分类">
                        </el-table-column>
                        <el-table-column prop="evalItemName" sortable label="条目名称">
                        </el-table-column>
                        <el-table-column prop="schoolYearName" label="所属学年">
                        </el-table-column>
                        <el-table-column prop="score" sortable label="得分">
                        </el-table-column>
                        <el-table-column prop="createTime" sortable label="创建时间" :formatter="dateFormat">
                        </el-table-column>

                    </el-table>

                    <template slot="footer">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
                        </el-pagination>
                    </template>

                </elx-table-layout>
            </div>
        </div>
    </page>

</template>

<script>
import moment from "moment";
import elxTable from "../_mixin/elxTable.js";
import baseQuality from "../_mixin/baseQuality.js";
const uploadStuPunishUrl = process.env.BASE_API + "/public/uploadStuPunish.do";

export default {
  mixins: [elxTable, baseQuality],
  data() {
    return {
      uploadStuPunishurl: uploadStuPunishUrl,
      dialogVisible_new: false,
      importOpen: false,
      newOpen: false,
      schoolYearDict: [],

      switchStudentDV: false,
      schoolKm: [],
      schoolKm2: [],
      formAdd: {
        stuNo: "",
        name: "",
        subjectCode: "",
        schoolYearId: "",
        happenTime: {},
        desc: "",
        fileId: "",
        orgCode: []
      },
      formInline: {
        stuNo: "",
        name: "",
        evalTypeCode: "",
        schoolYearId: "",
        orgCode: [],
        value: []
      },
      fileId: 0,
      orgList: [],

      studentData: [],
      studentSearchForm: {
        orgCode: [],
        sysNo: "",
        name: ""
      },
      orgProps: {
         label: "orgName",
        value: "orgCode",
        children: "children"
      },
      pageInfo2: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      urldo: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSchoolYearDict();
      vm.geturldo();
      vm.getOrgList();
    });
  },
  methods: {
    geturldo() {
      this.getApi(this.queryBaseQualtityCategory, {}, (r, v) => {
        v.schoolKm = r;
      });
    },
    searchButton() {
      this.loading = true;
      this.pageInfo.currentPage = 1;
      this.getStudentData();
    },
    onDel(row) {
      this.isOk("此操作将永久删除该条信息，是否继续？", () => {
        this.getApi(
          this.deletePunishRecord,
          {
            id: row.id
          },
          (r, v) => {
            v.$message.success("删除成功");
            v.getData();
          }
        );
      });
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY年MM月DD日");
    },
    studentClick(row, event, column) {
      this.formAdd.stuNo = row.userObjectNo;
      this.formAdd.name = row.userObjectName;
      this.switchStudentDV = false;
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        this.orgList = response.resBody;
        this.formInline.orgCode.push(this.orgList[0]["org_code"]);
        this.getData(this.orgList[0]["org_code"]);
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
        this.schoolYearDict.unshift({ id: 0, name: "全部" });
      });
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
    getData() {
      this.data = [];
      this.getApi(this.queryEvalList, {
        evalTypeCode: this.formInline.evalTypeCode,
        schoolYearId: this.formInline.schoolYearId,
        name: this.formInline.name,
        orgCode: this.formInline.orgCode,
        stuNo: this.formInline.stuNo
      });
    }
  }
};
</script>
