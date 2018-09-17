stuPunishLog <template>
    <page>
        <div slot="title">学生素质管理</div>
        <div slot="panel">
            <div>
                <el-dialog title="点击选择学生" :visible.sync="switchStudentDV" top="3vh" width="70%">
                    <elx-table-layout>
                        <template slot="headerLeft">
                            <el-form :inline="true" :model="studentSearchForm" size="mini" class="demo-form-inline">
                                <el-form-item label="组织机构">
                                    <el-cascader v-model="studentSearchForm.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
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

                <el-dialog title="录入学生处分" :visible.sync="dialogVisible_new" width="600px">
                    <el-form :model="formAdd" class="demo-form-inline" label-width="100px">
                        <el-form-item label="目标学生:">
                            {{ formAdd.name }}&nbsp;{{ formAdd.stuNo?'(学号:'+formAdd.stuNo+')':'' }}&nbsp;
                            <el-button type="primary" size="mini" plain @click="switchStudentDV=true">{{ formAdd.name?'重新选择':'选择要处分的学生' }}</el-button>
                        </el-form-item>
                        <el-form-item label="处分条目:">
                            <el-select v-model="formAdd.subjectCode">
                                <el-option v-for="(km,k) in schoolKm2" :key="k" :label="km.name" :value="km.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="事件时间:">
                            <el-date-picker v-model="formAdd.happenTime" align="right" type="date" placeholder="选择事件发生日期" :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="事件原因描述:">
                            <el-input v-model="formAdd.desc" type="textarea"></el-input>
                        </el-form-item>

                        <el-form-item label="项目附件:">
                            <el-upload class="upload-demo" :action="uploadStuPunishurl" multiple :limit="1" :onSuccess="onUploadSuccess">
                                <el-button size="small" type="primary" plain>
                                    <i class="el-icon-upload"></i> 点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer">
                        <el-button type="primary" @click="onSave">确定提交</el-button>
                        <el-button @click="dialogVisible=false">关闭</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="导入学生处分数据" :visible.sync="dialogVisible" width="400px">
                    <el-form style="margin-top: -25px;">
                        <el-form-item label="选择学生处分数据：">
                            <br/>
                            <el-upload class="upload-demo" :action="uploadStuPunishurl" :limit='1' :onSuccess="onUploadSuccess2">
                                <el-button size="small" type="primary" plain>
                                    <i class="el-icon-upload"></i> 点击上传文件</el-button>
                                <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
                            </el-upload>
                        </el-form-item>

                    </el-form>
                    <div slot="footer">
                        <el-button type="primary" @click="onSubmitUpload">
                            <i class="el-icon-news"></i> 提交后台导入</el-button>
                        <el-button @click="dialogVisible_new=false">取消</el-button>
                    </div>

                </el-dialog>

                <elx-table-layout>
                    <template slot="headerRight">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="下载模版" placement="bottom" v-if="newOpen">
                                <el-button plain size="mini">
                                    <a :href="urldo" target='_blank'><i class="el-icon-sold-out"></i></a>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="新增记录" placement="bottom" v-if="newOpen">
                                <el-button plain size="mini" @click="dialogVisible_new = true">
                                    <i class="el-icon-plus"></i>
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

                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">

                            <el-form-item label="学生姓名:">
                                <el-input v-model="formInline.name" placeholder="全部"></el-input>
                            </el-form-item>

                            <el-form-item label="学生学号:">
                                <el-input v-model="formInline.stuNo" placeholder="全部"></el-input>
                            </el-form-item>
                            <el-form-item label="所属机构:">
                                <el-cascader v-model="formInline.orgCode" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>

                            </el-form-item>
                            <br/>
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="处分条目:" v-show="formInline.schoolYearId">
                                <el-select v-model="formInline.subjectCode" placeholder="全部">
                                    <el-option v-for="(km,k) in schoolKm" :key="k" :label="km.name" :value="km.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="筛选范围:">
                                <el-date-picker v-model="formInline.value" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">
                                    <i class="el-icon-search"></i> 查询</el-button>
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>

                        <el-table-column prop="stuNo" sortable label="学号">
                        </el-table-column>
                        <el-table-column prop="stuName" sortable label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="orgName" label="组织名称">
                        </el-table-column>
                        <el-table-column prop="subjectScore" label="分值">
                        </el-table-column>
                        <el-table-column prop="address" label="所属学年">
                        </el-table-column>
                        <el-table-column prop="address" label="所属学年">
                        </el-table-column>
                        <el-table-column prop="happenTime" label="发生时间" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column prop="matterDesc" label="事件描述">
                        </el-table-column>
                        <el-table-column prop="attrPath" label="相关附件">
                            <template slot-scope="scope">
                                <a :href="scope.row.attrPath" target="_blank">
                                    <i class="el-icon-download"></i> 下载</a>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="66px">
                            <template slot-scope="scope">
                                <el-button type="danger" size="mini" icon="el-icon-delete" plain @click="onDel(scope.row)"></el-button>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column type="expand" label="#" width="42">
                            <template slot-scope="props" style="background-color:#f7f8f9">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="身份证号码:">
                                        <span>{{ props.row.name }}</span>
                                    </el-form-item>
                                    <br/>
                                    <el-form-item label="高考成绩:">
                                        <span>{{ props.row.category }}</span>
                                    </el-form-item>
                                    <br/>
                                    <el-form-item label="备注资料:">
                                        <span>{{ props.row.category }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column> -->
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
import store from "../_mixin/store.js";
const uploadStuPunishUrl = process.env.BASE_API + "/public/uploadStuPunish.do";

export default {
  mixins: [elxTable, store],
  data() {
    return {
      uploadStuPunishurl: uploadStuPunishUrl,
      dialogVisible_new: false,
      importOpen: true,
      newOpen: true,
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
        subjectCode: "",
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
        label: "org_name",
        value: "org_code",
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
      this.getApi(this.getPunishTemplateUrl, {}, (r, v) => {
        v.urldo = r.url;
      });
    },
    onSubmitUpload() {
      if (!this.fileId) {
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
        this.importPunishRecord({
          fileId: this.fileId
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

    onUploadSuccess2(response, file, fileList) {
      this.fileId = response.body.resBody.fileId;
    },
    onUploadSuccess(response, file, fileList) {
      this.formAdd.fileId = response.body.resBody.fileId;
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
    onSave() {
      this.getApi(
        this.insertPunishRecord,
        {
          stuNo: this.formAdd.stuNo,
          name: this.formAdd.name,
          subjectCode: this.formAdd.subjectCode,
          happenTime: Date.parse(this.formAdd.happenTime),
          desc: this.formAdd.desc,
          fileId: this.formAdd.fileId
        },
        (r, v) => {
          v.dialogVisible_new = false;
          v.$message.success("新增记录成功");
          v.getData();
        }
      );
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
        this.getPunishItemByShoolYearId(this.formInline.schoolYearId);
      });
    },
    getPunishItemByShoolYearId(id) {
      this.queryPunishItemByShoolYearId({
        schoolYearId: id
      }).then(response => {
        this.loading = false;
        this.schoolKm = Object.assign(
          { code: 0, name: "全部" },
          response.resBody.itemBeans
        );
        this.schoolKm2 = response.resBody.itemBeans;
      });
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getStudentData();
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.currentPage = val;
      this.getStudentData();
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
      this.getApi(this.queryPunishRecordForStaff, {
        subjectCode: this.formInline.subjectCode,
        schoolYearId: this.formInline.schoolYearId,
        name: this.formInline.name,
        orgCode: this.formInline.orgCode,
        stuNo: this.formInline.stuNo,
        startTime: Date.parse(this.formInline.value[0]) || "",
        endTime: Date.parse(this.formInline.value[1]) || ""
      });
    }
  }
};
</script>
