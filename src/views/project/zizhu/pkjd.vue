 <template>
  <page>
    <div slot="title">贫困建档结果查询</div>
    <div slot="panel">
      <div>
        <elx-table-layout>

          <template slot="headerLeft">
            <el-form label-position="right" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">
              <el-form-item label="所属机构:">
                <el-cascader v-model="formInline.orgCode" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>

              </el-form-item>
              <el-form-item label="所属学年:">
                <el-select v-model="formInline.schoolYearId" placeholder="全部" @change="schoolYearIdChange">
                  <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属项目:">
                <el-select v-model="formInline.projectId" placeholder="全部">
                  <el-option v-for="(item,i) in projectList" :key="i" :label="item.name" :value="item.id">
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
                <el-button @click="refresh">
                  <i class="el-icon-refresh"></i> 重置</el-button>
              </el-form-item>

            </el-form>
          </template>

          <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{ prop: 'stuNo',prop: 'stuName',prop: 'orgName'}">
            <el-table-column prop="projectName" label="项目名称">
            </el-table-column>
            <el-table-column prop="schoolYearName" label="所属学年">
            </el-table-column>
            <el-table-column prop="stuNo" label="学号">
            </el-table-column>
            <el-table-column prop="studentName" label="学生姓名">
            </el-table-column>
            <el-table-column prop="stuOrgName" label="组织名称">
            </el-table-column>
            <el-table-column prop="schoolRecommend" :formatter="schoolRecommendFormatter" label="归档结果">
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
import results from "../_mixin/results.js";
export default {
  mixins: [elxTable, results],
  data() {
    return {
      projectList: [{ id: 0, name: "全部" }],
      schoolYearDict: [],
      formInline: {
        projectId: 0,
        stuNo: "",
        name: "",
        schoolYearId: 0,
        orgCode: []
      },
      orgList: [],
      childServiceTypeList: [],
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.schoolYearIdChange(0);
      if (to.query.projectId) {
        vm.formInline.projectId = to.query.projectId;
        vm.getData();
      }
      vm.getSchoolYearDict();
      vm.getOrgList();
      vm.getChildServiceTypeList();
    });
  },
  methods: {
    schoolYearIdChange(v) {
      this.formInline.projectId = 0;
      this.queryPovertyProject({
        state: "CO",
        currentPage: "1",
        pageSize: "99999",
        yearType: v
      }).then(response => {
        this.projectList = response.resBody.baseData;
        this.projectList.unshift({ id: 0, name: "全部" });
      });
    },
    schoolRecommendFormatter(r, c, v, i) {
      var arr = this.childServiceTypeList;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].classifyCode == v) {
          return arr[j].classifyName;
        }
      }
    },
    refresh() {
      this.formInline = {
        stuNo: "",
        name: "",
        schoolYearId: 0,
        orgCode: [],
        projectId: 0
      };
      this.getData();
    },

    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY年MM月DD日");
    },

    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        this.orgList = response.resBody;
        this.formInline.orgCode.push(this.orgList[0]["orgCode"]);
        //this.getData(this.orgList[0]["orgCode"]); //获取完组织以后 自动加载table daata区域数据
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
        this.schoolYearDict.unshift({ id: 0, name: "全部" });
      });
    },
    getChildServiceTypeList() {
      this.queryAllClassifyChild({}).then(response => {
        this.childServiceTypeList = response.resBody;
      });
    },

    getData() {
      this.data = [];
      var requestData = {
        projectId: this.formInline.projectId,
        stuNo: this.formInline.stuNo,
        schoolYearId: this.formInline.schoolYearId,
        stuName: this.formInline.name
      };
      if (this.formInline.orgCode.length > 0) {
        requestData.orgCode = this.formInline.orgCode[
          this.formInline.orgCode.length - 1
        ];
      }

      this.getApi(this.queryPovertyResult, requestData, (r, vm) => {
        vm.data = r.baseData;
      });
    }
  }
};
</script>

