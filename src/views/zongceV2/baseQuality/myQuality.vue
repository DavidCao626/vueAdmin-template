 <template>
    <page :Breadcrumb="false">
        <div slot="title">我的基础素质评价查询</div>
        <div slot="panel">
            <div>

                <elx-table-layout>

                    <template slot="headerLeft">

                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">

                            <el-form-item label="所属学年:">
                                <el-select v-model="formInline.schoolYearId" placeholder="全部">
                                    <el-option v-for="(item,i) in schoolYearDict" :key="i" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="相关科目:" v-show="formInline.schoolYearId">
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
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">

                        <el-table-column prop="stuNo" sortable label="学号">
                        </el-table-column>

                        <el-table-column prop="stuName" sortable label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="subjectName" label="科目名称">
                        </el-table-column>
                        <el-table-column prop="schoolYearName" label="所属学年">
                        </el-table-column>
                        <el-table-column prop="subjectScore" label="分值">
                        </el-table-column>
                        <el-table-column prop="happenTime" label="发生时间">
                        </el-table-column>
                        <el-table-column prop="matterDesc" label="事件描述">
                        </el-table-column>
                        <el-table-column prop="orgName" label="组织名称">
                        </el-table-column>
                        <el-table-column prop="attrPath" label="相关附件">
                            <template slot-scope="scope">
                                <a :href="scope.row.attrPath" target="_blank">
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
import elxTable from "../_mixin/elxTable.js";
import store from "../_mixin/store.js";
export default {
  mixins: [elxTable, store],
  data() {
    return {
      importOpen: false,
      schoolYearDict: [],
      schoolKm: [],
      formInline: {
        subjectCode: "",
        schoolYearId: "",
        startTime: "",
        endTime: "",
        value: []
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSchoolYearDict();
      vm.getData();
    });
  },
  methods: {
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
        this.schoolKm = response.resBody.itemBeans;
        this.schoolKm.unshift({ code: 0, name: "全部" });
      });
    },
    getData() {
      this.getApi(this.queryPunishRecordForStu, {
        subjectCode: this.formInline.subjectCode,
        schoolYearId: this.formInline.schoolYearId,
        startTime: Date.parse(this.formInline.value[0]) || "",
        endTime: Date.parse(this.formInline.value[1]) || ""
      });
    }
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