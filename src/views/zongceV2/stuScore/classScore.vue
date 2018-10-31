 <template>
    <page>
        <div slot="title">班级成绩排名管理</div>
        <div slot="panel">
            <div>
                <el-dialog title="导入班级成绩" :visible.sync="dialogVisible" width="400px">
                    <el-form :model="importForm" style="margin-top: -25px;">
                        <el-form-item label="1、选择要导入到的学年：">
                            <el-select v-model="importForm.schoolYearId" placeholder="全部">
                                <el-option v-for="item in importForm.schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="2、选择组织"><br/>
                            <el-cascader v-model="importForm.orgCode" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>
                        </el-form-item>
                        <el-form-item label="3、">
                            <br />
                            <el-upload class="upload-demo" ref="upload" :action="action" :limit='1' :onSuccess="onUploadSuccess">
                                <el-button size="small" type="primary" plain>
                                    <i class="el-icon-upload"></i> 点击上传成绩文件</el-button>
                                <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
                            </el-upload>
                        </el-form-item>

                    </el-form>
                    <div slot="footer">
                        <el-button type="primary" @click="onSubmitUpload">
                            <i class="el-icon-news"></i> 提交后台导入</el-button>
                        <el-button @click="dialogVisible=false">取消</el-button>
                    </div>
                </el-dialog>

                <elx-table-layout>
                    <template slot="headerRight">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="下载模版" placement="bottom">
                                <el-button plain size="mini">
                                    <a :href="urldo" target='_blank'>
                                        <i class="el-icon-sold-out"></i>
                                    </a>
                                </el-button>
                            </el-tooltip>

                            <el-tooltip class="item" effect="dark" content="导入班级成绩" placement="bottom">
                                <el-button plain size="mini" @click="dialogVisible = true">
                                    <i class="el-icon-download"></i>
                                </el-button>
                            </el-tooltip>
                        </el-button-group>

                    </template>

                    <template slot="headerLeft">
                        <span v-if="exportOpen && isMultipleSelection">
                            <el-button-group>
                                <el-button plain @click="onExportExcel" size="mini" style="margin-top: 1px;">
                                    <i class="el-icon-upload2"></i> (导出选中{{ multipleSelection.length }}条)</i>
                                </el-button>
                                <el-button plain @click="onExportExcel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                                    <i class="el-icon-upload2"></i> 导出全部</i>
                                </el-button>
                            </el-button-group>
                        </span>
                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="item in schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学生学号:">
                                <el-input v-model="formInline.stuNo" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item label="学生姓名:">
                                <el-input v-model="formInline.stuName" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                                <el-button type="primary" plain size="mini" @click="onProcessRank">生成排名</el-button>
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>
                        <el-table-column prop="rank" label="排名">
                        </el-table-column>
                        <el-table-column prop="stu_name" sortable label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="stu_no" sortable label="学号">
                        </el-table-column>
                        <el-table-column prop="score" label="平均分">
                        </el-table-column>
                        <el-table-column prop="school_year_name" label="学年名称">
                        </el-table-column>
                        <el-table-column prop="org_name" label="组织名称">
                        </el-table-column>
                        <el-table-column prop="source" :formatter="sourceFormatter" label="来源">
                        </el-table-column>
                        <el-table-column prop="must_num" label="必修课数量">
                        </el-table-column>
                        <el-table-column prop="must_pass_num" label="必修课及格数">
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
import api from "../_api/stuScore.js";
import elxTable from "../_mixin/elxTable.js";
import store from "../_mixin/store.js";
export default {
  mixins: [elxTable, store],
  data() {
    return {
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      orgList: [],
      importOpen: false,
      formInline: {
        stuNo: "",
        stuName: "",
        schoolYearId: ""
      },
        subjectDict:[],
      importForm: {
        schoolYearId: "",
        schoolYearDict: [],
        orgCode: [],
        urlPath: ""
      },
      schoolYearDict: [],
      urldo: "",
      action: api.uploadStuScoreRank
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
          vm.getScoreSubjectTypeDict();
      vm.getSchoolYearDict();
      vm.getData();
      vm.getOrgList();
      vm.geturldo();
    });
  },
  methods: {
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        this.orgList = response.resBody;
        this.importForm.orgCode.push(this.orgList[0]["org_code"]);
        this.getData(this.orgList[0]["org_code"]);
      });
    },
    sourceFormatter(r, c, v, index) {
      return v == "C" ? "生成" : "导入";
    },
    onSubmitUpload() {
      if (
        !this.importForm.schoolYearId ||
        !this.importForm.orgCode ||
        !this.importForm.urlPath
      ) {
        return this.$message.error("组织、学年和文件字段必须都有值");
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
        this.importStuScoreRank({
          fileId: this.importForm.urlPath,
          schoolYearId: this.importForm.schoolYearId,
          orgCode: this.importForm.orgCode[this.importForm.orgCode.length - 1]
        }).then(response => {
          this.dialogVisible = false;
          this.$refs["upload"].clearFiles();
          this.importForm.schoolYearId = "";
          this.importForm.orgCode = [];
          this.$notify({
            title: "后台任务提醒",
            message:
              "任务单号:" +
              response.resBody.batch +
              ",已创建。<br/><a href='http://baidu.com' target='_blank'><small>点击了解</small></a>",
            duration: 0,
            type: "info",
            dangerouslyUseHTMLString: true
          });
        });
      });
    },
    onUploadSuccess(response, file, fileList) {
      this.importForm.urlPath = response.body.resBody.fileId;
    },
    onProcessRank() {
      this.getApi(
        this.processRank,
        {
          schoolYearId: this.formInline.schoolYearId
        },
        (r, vm) => {
          vm.$message.success("生成成功");
          vm.getData();
        }
      );
    },
     getScoreSubjectTypeDict(){
        this.getSubjectTypeDict({}).then(response=>{
            this.subjectDict = response.resBody;
        })
    },
    geturldo() {
      this.getApi(this.getScoreRankTemplateUrl, {}, (r, v) => {
        v.urldo = r.url;
      });
    },
    onSubmit() {
      this.getData();
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.importForm.schoolYearDict = JSON.parse(JSON.stringify(response.resBody));
        this.schoolYearDict = response.resBody;
        this.schoolYearDict.unshift({ id: 0, name: "全部" });
      });
    },
    getData(orgCode) {
      this.getApi(this.queryScoreRankForStaff, {
        stuNo: this.formInline.stuNo,
        stuName: this.formInline.stuName,
        schoolYearId: this.formInline.schoolYearId
      });
    }
  }
};
</script>

<style scoped>
</style>