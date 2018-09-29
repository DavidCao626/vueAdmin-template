stuPunishLog <template>
    <page>
        <div slot="title">学生资助结果查询4</div>
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
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{ prop: 'stuNo',prop: 'stuName',prop: 'orgName'}">

                        <el-table-column prop="stuNo" sortable label="学号">
                        </el-table-column>
                        <el-table-column prop="stuName" sortable label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="orgName" label="组织名称">
                        </el-table-column>

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
import results from "../_mixin/results.js";
export default {
  mixins: [elxTable, results],
  data() {
    return {
      schoolYearDict: [],
      formInline: {
        stuNo: "",
        name: "",
        schoolYearId: "",
        orgCode: []
      },
      orgList: [],

      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSchoolYearDict();
      vm.getOrgList();
    });
  },
  methods: {
    refresh() {
      this.formInline = {
        stuNo: "",
        name: "",
        schoolYearId: "",
        orgCode: []
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
        this.getData(this.orgList[0]["orgCode"]); //获取完组织以后 自动加载table daata区域数据
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
        this.schoolYearDict.unshift({ id: 0, name: "全部" });
      });
    },

    getData() {
      this.data = [];
      var requestData = {
        stuNo: this.formInline.stuNo,
        schoolYearId: this.formInline.schoolYearId,
        name: this.formInline.name
      };
      if (this.formInline.orgCode.length > 0) {
        requestData.orgCode = this.formInline.orgCode[
          this.formInline.orgCode.length - 1
        ];
      }

        debugger
      // this.getApi(this.queryEvalList, requestData); 发起ajax加载表格区域数据
    }
  }
};
</script>

