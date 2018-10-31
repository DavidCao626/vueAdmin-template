 <template>
    <page>
        <div slot="title">我的测评申请记录</div>
        <div slot="panel">
            <div>
                <el-dialog title="新建测评" :visible.sync="dialogVisible_new" width="600px">
                    <applyExpandRecord @ok='dialogVisible_new=false'></applyExpandRecord>
                </el-dialog>
                <elx-table-layout>
                    <template slot="headerRight">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="新建申请" placement="bottom">
                                <el-button plain size="mini" @click="showAdd">
                                    <i class="el-icon-plus"></i> 新建申请
                                </el-button>
                            </el-tooltip>

                        </el-button-group>
                    </template>
                    <template slot="headerLeft">
                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">

                            <el-form-item label="事件标题:">
                                <el-input v-model="formInline.title" placeholder="标题关键字"></el-input>
                            </el-form-item>
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="测评类别:" v-if="formInline.schoolYearId">
                                <Catag :schoolYearId="formInline.schoolYearId" @handleChange='onHandleChange'></Catag>
                            </el-form-item>
                            <el-form-item label="筛选范围:">
                                <el-date-picker v-model="formInline.value" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="数据来源:">
                                <el-select v-model="formInline.sourceState" placeholder="全部">
                                    <el-option v-for="(item,i) in GET_DataSourceDict" :key="i" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审核状态:">
                                <el-select v-model="formInline.checkState" placeholder="全部">
                                    <el-option v-for="(item,i) in GET_ExpandCheckStateDict" :key="i" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">
                                    <i class="el-icon-search"></i> 查询</el-button>
                                <el-button @click="refresh">
                                    <i class="el-icon-refresh"></i> 重置</el-button>
                            </el-form-item>
                        </el-form>
                    </template>
                    <el-table :data="data" v-loading="loading" style="width: 100%" border size="mini" :default-sort="{prop: 'score',prop: 'schoolYearName', prop: 'happenTime',prop: 'lastUpdateTime'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>
                        <el-table-column prop="schoolYearName" sortable label="所属学年">
                        </el-table-column>
                        <el-table-column prop="title" label="事件标题">
                        </el-table-column>
                        <el-table-column prop="stuName" label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="orgName" label="组织名称">
                        </el-table-column>
                        <el-table-column prop="score" sortable label="分数">
                        </el-table-column>
                        <el-table-column prop="expendCategoryName" label="评测分类">
                        </el-table-column>
                        <el-table-column prop="expendGradeName" label="评测项目">
                        </el-table-column>
                        <el-table-column prop="expandItemName" label="评测级别">
                        </el-table-column>
                        <el-table-column prop="happenTime" sortable label="发生时间" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column prop="dateSource" label="数据来源" :formatter="dateSource">
                        </el-table-column>
                        <el-table-column prop="checkState" label="审核状态" :formatter="ExpandCheckStateDict">
                        </el-table-column>

                        <el-table-column prop="checkUserLogin" label="审核人">
                        </el-table-column>
                        <el-table-column prop="lastUpdateTime" sortable label="变动时间">
                        </el-table-column>
                        <el-table-column label="相关附件">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.attPath">无</span>
                                <a :href="scope.row.attPath" target="_blank" v-else>
                                    <i class="el-icon-download"></i> 下载</a>
                            </template>
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
import Catag from "./_components/expandEvalCatagory.vue";
import moment from "moment";
import expandEval from "../_mixin/expandEval.js";
import elxTable from "../_mixin/elxTable.js";
import applyExpandRecord from "./_components/applyExpandRecord.vue";
export default {
  mixins: [elxTable, expandEval],
  components: {
    applyExpandRecord,
    Catag
  },
  data() {
    return {
      dialogVisible_new: false,
      loading: false,
      formInline: {
        title: "",
        stuNo: "",
        name: "",
        evalTypeCode: "",
        schoolYearId: "",
        orgCode: [],
        value: [],
        expend: {
          expendCategoryCode: "",
          expendCategoryName: "",
          expendGradeName: "",
          expandItemCode: "",
          expandItemName: ""
        },
        sourceState: "",
        checkState: ""
      },
      orgList: [],
      schoolYearDict: []
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSchoolYearDict();
      vm.getDataSourceDict().then(() => {
        vm.getExpandCheckStateDict().then(() => {
      vm.getData();
          vm.loading = true;
        });
      });
    });
  },
  methods: {
    showAdd() {
      this.dialogVisible_new = true;
    },
    onHandleChange(o) {
      if (!o) return;
      o.forEach((element, index) => {
        if (index == 0) {
          this.formInline.expend.expendCategoryCode = element.value;
          this.formInline.expend.expendCategoryName = element.label;
        }
        if (index == 1) {
          this.formInline.expend.expendGradeName = element.value;
        }
        if (index == 2) {
          this.formInline.expend.expandItemCode = element.value;
          this.formInline.expend.expandItemName = element.label;
        }
      });
    },
    refresh() {
      this.formInline = {
        title: "",
        stuNo: "",
        name: "",
        evalTypeCode: "",
        schoolYearId: "",
        orgCode: [],
        value: [],
        expend: {
          expendCategoryCode: "",
          expendCategoryName: "",
          expendGradeName: "",
          expandItemCode: "",
          expandItemName: ""
        },
        sourceState: "",
        checkState: ""
      };
      this.getData();
    },
    dateSource(row, column) {
      var date = row[column.property];
      return this.GET_DataSourceDictByValue(date).label;
    },
    ExpandCheckStateDict(row, column) {
      var date = row[column.property];
      return this.GET_ExpandCheckStateDictByValue(date).label;
    },
    onSubmit() {
      this.getData();
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY年MM月DD日");
    },
    getData() {
      this.data = [];
      this.getApi(
        this.queryExpandEvalRecordForStu,
        {
          schoolYearId: this.formInline.schoolYearId || 0,
          stuName: this.formInline.name,
          title: this.formInline.title || "",
          orgCode: this.formInline.orgCode,
          stuNo: this.formInline.stuNo,
          startTime: Date.parse(this.formInline.value[0]) || "",
          endTime: Date.parse(this.formInline.value[1]) || "",
          expendCategoryCode: this.formInline.expend.expendCategoryCode || "",
          expendCategoryName: this.formInline.expend.expendCategoryName || "",
          expendGradeName: this.formInline.expend.expendGradeName || "",
          expandItemCode: this.formInline.expend.expandItemCode || "",
          expandItemName: this.formInline.expend.expandItemName || "",
          sourceState: this.formInline.sourceState || "",
          checkState: this.formInline.checkState || ""
        },
        (r, v) => {
          {
            v.data = r.baseData;
          }
        }
      );
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
