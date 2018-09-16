 <template>
    <page :Breadcrumb="false">
        <div slot="title">我的排名查询</div>
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

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>
                        <el-table-column prop="rank" sortable label="排名">
                        </el-table-column>
                        <el-table-column prop="score" sortable label="总分">
                        </el-table-column>
                        <el-table-column prop="school_year_name" sortable label="学年名称">
                        </el-table-column>
                        <el-table-column prop="stu_name" label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="org_name" label="组织名称">
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
      formInline: {
        schoolYearId: ""
      },
      schoolYearDict: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.getSchoolYearDict();
    });
  },
  methods: {
    onSubmit() {
      this.getData();
    },
    getData() {
      this.getApi(this.queryScoreRankForStu, {
        schoolYearId: this.formInline.schoolYearId
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
