 <template>
    <page>
        <div slot="title">我的成绩查询</div>
        <div slot="panel">
            <div>

                <elx-table-layout>

                    <template slot="headerLeft">
                        <span v-if="deleteOpen && isMultipleSelection">
                            <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                                <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                            </el-button>
                        </span>

                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="item in schoolYearDict" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="学科名称:">
                                <el-input v-model="formInline.subject" placeholder="全部"></el-input>
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
                        <el-table-column prop="type" :formatter="typeFormatter" sortable label="类型">
                        </el-table-column>
                        <el-table-column prop="pass" :formatter="passFormatter" sortable label="及格">
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
import store from "../_mixin/store.js";
import elxTable from "../_mixin/elxTable.js";

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
        label: "orgName",
        value: "orgCode",
        children: "children"
      },

      orgList: [],
 subjectDict:[],
      schoolYearDict: []
    };
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
        vm.getScoreSubjectTypeDict();
      vm.getSchoolYearDict();
      vm.getData();
    });
  },
  methods: {
    passFormatter(r, c, v, index) {
      return v == "Y" ? "及格" : "不及格";
    },
    typeFormatter(r, c, v, index) {
      var arr = this.subjectDict;
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i].value == v)) {
          return arr[i].label;
        }
      }
      return v;
    },
     getScoreSubjectTypeDict(){
        this.getSubjectTypeDict({}).then(response=>{
            this.subjectDict = response.resBody;
        })
    },
    onSubmit() {
      this.getData();
    },
    getData() {
      this.getApi(this.queryStuScoreForStu, {
        schoolYearId: this.formInline.schoolYearId,
        subject: this.formInline.subject
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
        this.schoolYearDict.unshift({ id: 0, name: "全部" });
      });
    }
  }
};
</script>
