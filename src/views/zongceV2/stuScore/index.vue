 <template>
    <page>
        <div slot="title">学生成绩查询</div>
        <div slot="panel">
            <div>
                <el-dialog title="导入班级成绩" :visible.sync="dialogVisible" width="400px">
                    <el-form :model="importForm" style="margin-top: -25px;">
                        <el-form-item label="1、选择要导入到的学年：">
                            <el-select v-model="importForm.schoolYearId" placeholder="全部">
                                <el-option v-for="item in schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="2、">
                            <br/>
                            <el-upload class="upload-demo" :action="action" :limit='1' :onSuccess="onUploadSuccess">
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
                            <el-tooltip class="item" effect="dark" content="下载模版" placement="bottom" >
                                <el-button plain size="mini">
                                    <a :href="urldo" target='_blank'>
                                        <i class="el-icon-sold-out"></i>
                                    </a>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="导入数据" placement="bottom" v-if="importOpen">
                                <el-button plain size="mini" @click="dialogVisible = true">
                                    <i class="el-icon-download"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="导出数据" placement="bottom" v-if="exportOpen">
                                <el-button plain size="mini" @click="onExportExcel">
                                    <i class="el-icon-upload2"></i>
                                </el-button>
                            </el-tooltip>
                        </el-button-group>
                    </template>

                    <template slot="headerLeft">
                        <span v-if="deleteOpen && isMultipleSelection">
                            <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                                <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                            </el-button>
                        </span>

                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">
                            <el-form-item label="筛选机构:">
                                <el-cascader v-model="formInline.orgCode" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>

                            </el-form-item>
                            <el-form-item label="学生学号:">
                                <el-input v-model="formInline.stuNo" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item label="学生姓名:">
                                <el-input v-model="formInline.stuName" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item label="学科:">
                                <el-input v-model="formInline.subject" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="item in schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="排序规则:">
                                <el-select v-model="formInline.orderRule" placeholder="选择成绩排序规则">
                                    <el-option label="成绩从高到低" value="desc">
                                    </el-option>
                                    <el-option label="成绩从低到高" value="asc">
                                    </el-option>
                                    <el-option label="最新" value="">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table v-loading="loading" :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop:'score',prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>

                        <el-table-column prop="stu_no" sortable label="学号">
                        </el-table-column>
                        <el-table-column prop="stu_name" sortable label="学生姓名">
                        </el-table-column>

                        <el-table-column prop="org_name" label="所属机构">
                        </el-table-column>
                        <el-table-column prop="subject" label="学科名称">
                        </el-table-column>
                        <el-table-column prop="score" sortable label="分值">
                        </el-table-column>
                        <el-table-column prop="school_year_name" label="所属学年">
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
      formInline: {
        orgCode: [], //组织机构
        user: "",
        schoolYearId: "",
        stuNo: "",
        stuName: "",
        subject: "",
        orderRule: ""
      },
      importForm: {
        schoolYearId: "",
        urlPath: ""
      },

      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      orgList: [],
      schoolYearDict: [],
      urldo: "",
      action: api.uploadStuScore
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getOrgList();
       vm.geturldo();
      vm.getSchoolYearDict();
    });
  },
  methods: {
    geturldo() {
      this.getApi(this.getScoreTemplateUrl, {}, (r, v) => {
        v.urldo = r.url;
      });
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        this.orgList = response.resBody;
        this.formInline.orgCode.push(this.orgList[0]["org_code"]);
        this.getData(this.orgList[0]["org_code"]);
      });
    },
    onSubmit() {
      this.getData();
    },
    onSubmitUpload() {
      if (!this.importForm.schoolYearId || !this.importForm.urlPath) {
        return this.$message.error("学年和文件字段必须都有值");
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
        this.importStuScoreForClass({
          fileId: this.importForm.urlPath,
          schoolYearId: this.importForm.schoolYearId
        }).then(response => {
          this.dialogVisible = false;
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

    getData(orgCode) {
      //debugger;
      this.loading = true;
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        orgCode:
          orgCode ||
          this.formInline.orgCode[this.formInline.orgCode.length - 1],
        stuNo: this.formInline.stuNo,
        stuName: this.formInline.stuName,
        schoolYearId: this.formInline.schoolYearId,
        subject: this.formInline.subject,
        orderRule: this.formInline.orderRule.toString()
      };
      this.queryStuScoreForStaff(requestData).then(response => {
        this.loading = false;
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
      });
    }
  }
};
</script>

