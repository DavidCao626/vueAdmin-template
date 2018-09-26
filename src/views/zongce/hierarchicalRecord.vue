<template>
  <div>
    <page>
      <div slot="title">分值科目记录管理</div>
    </page>
    <elx-table-layout>

      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="标准科目">
            <elx-select v-model="formInline.subjectCode" placeholder="请选择" @change="stdSubjectChange">
              <el-option v-for="item in stdSubjectList" :key="item.code" :value="item.code" :obj="item" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="分值科目">
            <elx-select v-model="formInline.hcsubjectCode" placeholder="请选择">
              <el-option v-for="item in hcSubjectList" :key="item.code" :value="item.code" :label="item.label"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="组织机构">
            <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="formInline.targetId" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>
        <el-table-column prop="targetName" label="学生名称">
        </el-table-column>
        <el-table-column prop="targetOrgName" label="学生机构">
        </el-table-column>
        <el-table-column prop="subjectName" label="分录科目">
        </el-table-column>
        <el-table-column prop="scoreValue" label="得分值">
        </el-table-column>
        <el-table-column prop="behaviorType" label="行为类型">
        </el-table-column>
        <el-table-column prop="recordTime" label="记录日期">
        </el-table-column>
      </el-table>
      <template slot="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
        </el-pagination>
      </template>
    </elx-table-layout>
    <page>
      <div slot="panel" style="text-align: right">
        <el-button size="mini" @click="createRecord" type="primary">生成</el-button>
        <el-button size="mini" @click="backRecord" type="danger">回退</el-button>
        <el-button size="mini" @click="complateItem" v-if="complateBtnIsShow" type="primary">完成</el-button>
      </div>
    </page>
  </div>
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
      formInline: {
        subjectCode: "", //标准科目
        hcsubjectCode: "", //分值科目
        orgCode: [], //组织机构
        targetId: "" //测评对象id（学号）
      },
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      stdProps: {
        label: "label",
        value: "code",
        children: "subs"
      },
      complateBtnIsShow:true,
      hcSubjectList: [], //分值科目list
      stdSubjectCode: [], //路由传进来的 标准可目
      stdSubjectList: [],
      orgList: [],
      scopeId: null,
      itemId: null,
      projectId: null,
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      data: [],
      nationObj: {}
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  },
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
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getAllCorrelationDataByScopeIdAndItemId:
        store.namespace + "/getAllCorrelationDataByScopeIdAndItemId",
      queryTargetArtfBehviors: store.namespace + "/queryTargetArtfBehviors",
      queryStdSubjectTree: store.namespace + "/queryStdSubjectTree",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId",
      queryHierarchicalRecord: store.namespace + "/queryHierarchicalRecord",
      truncateHcSubjectRecord: store.namespace + "/truncateHcSubjectRecord",
      produceHcSubjectRecord: store.namespace + "/produceHcSubjectRecord",
      queryStdSubjectListByCode: store.namespace + "/queryStdSubjectListByCode"
    }),
    stdSubjectChange(val, vueCom, obj) {
      this.hcSubjectList = [];
      this.formInline.hcsubjectCode = "";
      this.hcSubjectList = JSON.parse(JSON.stringify(obj.obj.children));
      this.hcSubjectList.unshift({ label: "全部", code: "0" });
    },
    querystdSubjectList() {
      var requestData = {
        stdSubjectCode: this.stdSubjectCode,
        projectId: this.projectId
      };
      this.queryStdSubjectListByCode(requestData).then(response => {
        this.stdSubjectList = response.resBody;
      });
    },
    complateItem() {
      this.completeUserPendingByItemId({ itemId: this.itemId }).then(
        response => {
          this.$message.success("操作成功");
          this.$router.go(-1);
        }
      );
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    createRecord() {
      this.produceHcSubjectRecord({
        projectId: this.projectId,
        standardSubjectCodes: this.stdSubjectCode
      }).then(response => {
        this.$message.success("生成成功,点击查询进行查看");
        // this.getData();
      });
    },
    backRecord() {
      this.truncateHcSubjectRecord({
        projectId: this.projectId,
        standardSubjectCodes: this.stdSubjectCode
      }).then(response => {
        this.$message.success("回退成功");
        this.getData();
      });
    },
    getDict() {
      var requestData = {
        dicts: ["nation"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["dict", response]);
        var res = response.resBody;
        res.nation.forEach(el => {
          this.nationObj[el.dict_key] = el.dict_desc;
        });
        // this.getData();
      });
    },
    getData() {
      if (
        this.formInline.subjectCode == "" ||
        this.formInline.subjectCode == null ||
        this.formInline.subjectCode == "0"
      ) {
        this.$message.error("标准科目不能为空!");
        return;
      }
      var requestData = {
        sdtSubjectCode: this.formInline.subjectCode, //标准科目
        subject_code: this.formInline.hcsubjectCode, //分值科目
        targetId: this.formInline.targetId,
        projectId: this.projectId,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      var targetOrgCode = this.formInline.orgCode;
      if (targetOrgCode.length > 0) {
        requestData.target_org_code = targetOrgCode[targetOrgCode.length - 1];
      }
      this.queryHierarchicalRecord(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log(["submit!!!!", this.projectId, "submit"]);
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.projectId || !to.query.stdSubjectCode) {
        vm.$message.error("参数不正确");
      } else {
        if (!to.query.itemId || to.query.scopeId) {
          vm.complateBtnIsShow = false
        } else {
          vm.itemId = to.query.itemId;
          vm.scopeId = to.query.scopeId;
        }
        vm.getOrgList();
        vm.projectId = to.query.projectId;
        vm.stdSubjectCode = to.query.stdSubjectCode;
        vm.getDict();
        vm.querystdSubjectList();
      }
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