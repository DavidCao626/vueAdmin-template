<template>
  <page>
    <div slot="title">综合测评管理</div>
    <div slot="panel">
      <elx-table-layout>
        <template slot="headerLeft">
          <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
            <el-form-item label="状态">
              <el-select v-model="formInline.state" placeholder="请选择">
                <el-option v-for="item in recordStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formInline.type" placeholder="请选择">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            </el-form-item>
            <el-form-item label="学年">
              <el-select v-model="formInline.schoolYearId" placeholder="请选择">
                <el-option v-for="item in schoolYearList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="锁定状态">
              <el-select v-model="formInline.isDefault" placeholder="请选择">
                <el-option v-for="item in isDefaultList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="headerRight">
          <el-button-group>
            <el-button @click="lockAppraisal" plain size="mini">
              锁定测评结果
            </el-button>
            <el-button @click="createDataBT" plain size="mini">
              生成年度综测结果
            </el-button>
            <el-button @click="createDataBT2" plain size="mini">
              生成校内综测结果
            </el-button>
          </el-button-group>
        </template>
        <el-table :data="data" style="width: 100%" border size="mini">
          <el-table-column prop="type" :formatter="typeFormatter" label="类型">
          </el-table-column>
          <el-table-column prop="schoolYearName" label="年度">
          </el-table-column>
          <el-table-column prop="orgName" label="组织名称">
          </el-table-column>
          <el-table-column prop="state" :formatter="stateFormatter" label="状态">
          </el-table-column>
          <el-table-column prop="isDefault" :formatter="defaultFormatter" label="是否锁定">
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间">
          </el-table-column>
          <el-table-column prop="complateTime" label="完成时间">
          </el-table-column>

          <el-table-column label="操作" width="128" header-align="left" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="showRank(scope.row)">
                查看排名
              </el-button>
              <!-- <el-button size="mini" @click="showError(scope.row)">
                查看错误
              </el-button> -->

            </template>
          </el-table-column>
        </el-table>
        <template slot="footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
          </el-pagination>
        </template>
      </elx-table-layout>

      <el-dialog title="年度综合测评结果生成" :visible.sync="createDataDV">
        <el-form :model="createDataForm">
          <el-form-item label="学年" label-width="80px">
            <el-select v-model="createDataForm.schoolYearId" placeholder="">
              <el-option v-for="item in schoolYearList2" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createDataDV = false">取 消</el-button>
          <el-button type="primary" @click="createDataSubmit ">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="校内综合测评结果生成" :visible.sync="createDataDV2">
        <el-form :model="createDataForm">
          <el-form-item label="" label-width="80px">
            确认生成截止到当前日期的综合测评数据?
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="createDataDV2 = false">取 消</el-button>
          <el-button type="primary" @click="createDataSubmit2 ">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </page>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      typeList: [
        { label: "全部", value: "0" },
        { label: "校内", value: "XN" },
        { label: "年度", value: "ND" }
      ],
      isDefaultList: [
        { label: "全部", value: "0" },
        { label: "是", value: "Y" },
        { label: "否", value: "N" }
      ],
      formInline: {
        state: "0",
        type: "0",
        schoolYearId: 0,
        isDefault: "0"
      },
      createDataForm: {
        schoolYearId: null
      },
      data: [],
      schoolYearList: [],
      schoolYearList2: [], //没全部
      recordStateList: [],
      createDataDV: false,
      createDataDV2: false
    };
  },
  watch: {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.currentPage = val;
      this.getData();
    },
    createDataBT() {
      this.createDataDV = true;
    },
    createDataBT2() {
      this.createDataDV2 = true;
    },
    createDataSubmit2() {
      this.createDataDV2 = false;
      this.processAppraisalRecordSchoolB({}).then(response => {
        this.$message.success("操作成功");
        this.getData();
      });
    },
    createDataSubmit() {
      this.createDataDV = false;
      this.processAppraisalRecordB({
        schoolYearId: this.createDataForm.schoolYearId
      }).then(response => {
        this.$message.success("操作成功");
        this.getData();
      });
    },
    lockAppraisal() {
      this.lockAppraisalResult({}).then(vm => {
        this.$message.success("操作成功");
      });
    },
    ...mapActions({
      processAppraisalRecordSchoolB:
        store.namespace + "/processAppraisalRecordSchoolB",
      processAppraisalRecordB: store.namespace + "/processAppraisalRecordB",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getAppraisalRecordState: store.namespace + "/getAppraisalRecordState",
      queryAppraisalClassRecord: store.namespace + "/queryAppraisalClassRecord",
      querySchoolYear: store.namespace + "/querySchoolYear",
      lockAppraisalResult: store.namespace + "/lockAppraisalResult"
    }),
    showError(row) {
      this.$alert(row.errorCause, "错误原因", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    typeFormatter(r, c, v, i) {
      if (v == "XN") {
        return "校内综合测评";
      } else if (v == "ND") {
        return "年度综合测评";
      } else {
        return v;
      }
    },
    stateFormatter(r, c, v, i) {
      var arr = this.recordStateList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == v) {
          return arr[i].label;
        }
      }
      return v;
    },
    getSchoolYearList() {
      this.schoolYearList = [];
      this.querySchoolYear({ currentPage: 1, pageSize: 99999 }).then(
        response => {
          this.schoolYearList2 = JSON.parse(
            JSON.stringify(response.resBody.baseData)
          );

          this.schoolYearList = response.resBody.baseData;
          this.schoolYearList.unshift({ id: 0, name: "全部" });
        }
      );
    },
    defaultFormatter(r, c, v, i) {
      if (v == "Y") {
        return "是";
      } else if ((v = "N")) {
        return "否";
      } else {
        return v;
      }
    },
    showRank(row) {
      //查看排名
      this.$router.push({
        path: "/zongce/showAppraisalRankForStaff",
        query: {
          orgCode: row.orgCode,
          projectCode: row.projectCode
        }
      });
    },
    getRecordState() {
      this.recordStateList = [];
      this.getAppraisalRecordState({}).then(response => {
        this.recordStateList = response.resBody;
        this.recordStateList.unshift({ label: "全部", value: "0" });
      });
    },
    getData() {
      var requestData = this.formInline;
      (requestData.currentPage = this.pageInfo.currentPage),
        (requestData.pageSize = this.pageInfo.pageSize);
      //查询数据的方法
      this.queryAppraisalClassRecord(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
      vm.getRecordState();
      vm.getSchoolYearList();
    });
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