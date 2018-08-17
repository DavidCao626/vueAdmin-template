<template>
  <div>
    <page>
      <div slot="title">生成标准科目记录</div>
    </page>
    <el-dialog title="导入数据" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <el-upload class="upload-demo" drag :action="action" :limit='1' @onSuccess="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
      </el-upload>
    </el-dialog>

    <elx-table-layout>

      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="组织机构">
            <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
          </el-form-item>
          <el-form-item label="分值科目">
            <el-input v-model="formInline.subjectCode" placeholder="分值科目"></el-input>
          </el-form-item>
          <el-form-item label="记录分项">
            <el-input v-model="formInline.subTitle" placeholder="科目项"></el-input>
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
        <el-table-column prop="subjectName" label="标准科目">
        </el-table-column>
        <el-table-column prop="scoreValue" label="得分值">
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
        <el-button size="mini" type="primary">生成</el-button>
        <el-button size="mini" type="primary">完成</el-button>
        <el-button size="mini" type="danger">回退</el-button>
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
        orgCode: [], //组织机构
        subjectCode: "", //分值科目
        subTitle: "", //记录分项
        targetId: "" //测评对象id（学号）
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      orgList: [],
      scopeId: null,
      itemId: null,
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      data: [],
      nationObj: {},
      action: "https://jsonplaceholder.typicode.com/posts/"
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
      queryTargetArtfBehviors: store.namespace + "/queryTargetArtfBehviors"
    }),
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
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
        this.getProjectData();
      });
    },
    getProjectData() {
      var requestData = {
        itemId: this.itemId,
        scopeId: this.scopeId
      };
      this.getAllCorrelationDataByScopeIdAndItemId(requestData).then(
        response => {
          var res = response.resBody;
          this.getData(res.appraiseProject.id);
        }
      );
    },
    getData(projectId) {
      var requestData = {
        targetOrgCode: this.formInline.orgCode,
        subjectCode: this.formInline.subjectCode,
        subTitle: this.formInline.subTitle,
        targetEvaluatorId: this.formInline.targetId,
        projectId: projectId,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryTargetArtfBehviors(requestData).then(response => {
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
      console.log("submit!");
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onMultipleSelectionDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$emit("onSelectionDel", this.multipleSelection);
      });
    },
    onExportExcel() {
      this.$emit("onExportExcel");
    },
    onUploadSuccess() {
      this.$emit("onUploadSuccess");
    },
    onNew() {
      this.$emit("onNew");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.itemId || !to.query.scopeId) {
        vm.$message.error("参数不正确");
      } else {
        vm.getOrgList();
        vm.itemId = to.query.itemId;
        vm.scopeId = to.query.scopeId;
        vm.getDict();
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