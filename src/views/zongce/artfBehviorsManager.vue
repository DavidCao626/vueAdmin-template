<template>
  <div>
    <page>
      <div slot="title">考评行为记录管理</div>
    </page>
    <el-dialog title="导入数据" :visible.sync="dialogVisible" width="50vw">
      <el-form :model="importFormData" label-width="80px" size="small">
        <el-form-item label="机构">
          <elx-cascader @change="importOrgChange" v-model="importFormData.orgCode" :options="orgList" expand-trigger="hover" :props="orgProps"></elx-cascader>
        </el-form-item>
        <el-form-item label="分值科目">
          <elx-select v-model="importFormData.subjectCode" @change="importSubjectChange" placeholder="">
            <el-option v-for="item in importStandardSubjectList" :key="item.code" :obj="item" :value="item.code" :label="item.name"></el-option>
          </elx-select>
        </el-form-item>
        <el-form-item label="事件标题">
          <el-input v-model="importFormData.stitle" placeholder="事件标题"></el-input>
        </el-form-item>
        <el-form-item label="文件上传">
          <el-upload drag :action="importAction" :on-success="importSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="importSubmit">确 定</el-button>
      </span>

    </el-dialog>

    <elx-table-layout>
      <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="录入数据" placement="bottom">
            <el-button @click="dialogVisible = true" plain size="mini">
              导入
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="组织机构">
            <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
          </el-form-item>
          <el-form-item label="分值科目">
            <elx-select v-model="formInline.subjectCode" placeholder="">
              <el-option v-for="item in standardSubjectList" :key="item.code" :value="item.code" :label="item.name"></el-option>
            </elx-select>
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
        <el-table-column prop="title" label="行为标题">
        </el-table-column>
        <el-table-column prop="targetName" label="测评对象">
        </el-table-column>
        <el-table-column prop="targetOrgName" label="测评对象组织">
        </el-table-column>
        <el-table-column prop="hcSubjectName" label="分值科目名称">
        </el-table-column>
        <el-table-column prop="subTitle" label="分项业务">
        </el-table-column>
        <el-table-column prop="original_score" label="原始分值">
        </el-table-column>
        <el-table-column prop="conversion_ratio" label="转换比率">
        </el-table-column>
        <el-table-column prop="reality_score" label="实际得分值">
        </el-table-column>
        <el-table-column prop="record_time" label="记录时间">
        </el-table-column>

      </el-table>

      <template slot="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
        </el-pagination>

      </template>
    </elx-table-layout>
  </div>
</template>

  <script>
import api from "./_api/appraise.js";
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
      importAction: api.importArtRecord,
      importStandardSubjectList: [],
      importFormData: {
        orgCode: [],
        orgName: "",
        subjectCode: "",
        subjectName: "",
        stitle: "",
        fileId: null
      },
      dialogVisible: false,
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
      standardSubjectList: [],
      orgList: [],
      projectId: null,
      standardSubjectCode: "",
      multipleSelection: [], //选中的值
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
    importSuccess(response, file, fileList) {
      console.log([response, file, fileList]);
      this.importFormData.fileId = response.body.resBody.fileId;
    },
    importSubjectChange(val, xx, obj) {
      this.importFormData.subjectName = obj.obj.name;
    },
    importOrgChange(val, xx, obj) {
      this.importFormData.orgName = obj[obj.length - 1].org_name;
    },
    importSubmit() {
      var requestData = {
        projectId: this.projectId,
        orgName: this.importFormData.orgName,
        subjectCode: this.importFormData.subjectCode,
        subjectName: this.importFormData.subjectName,
        stitle: this.importFormData.stitle,
        fileId: this.importFormData.fileId
      };
      var org = this.importFormData.orgCode;
      requestData.orgCode = org[org.length - 1];
      this.startImportRecord(requestData).then(response => {
        this.$message.success("操作成功");
        this.dialogVisible = false;
        var batch = response.resBody.batch;
        this.$alert("您的导入批次号是:" + batch, "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.getData();
          }
        });
      });
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
        this.delFreeChildren(this.orgList);
      });
    },
    delFreeChildren(children) {
      console.log(["del", children]);
      children.forEach(it => {
        if (it.children.length == 0) {
          delete it.children;
        } else {
          this.delFreeChildren(it.children);
        }
      });
    },
    getSubjectList() {
      this.getSubjectBySSCodeAndProjectId({
        projectId: this.projectId,
        standardSubjectCode: this.standardSubjectCode
      }).then(response => {
        this.importStandardSubjectList = JSON.parse(
          JSON.stringify(response.resBody)
        );
        this.standardSubjectList = response.resBody;
        this.standardSubjectList.unshift({ code: "0", name: "全部" });
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getData();
    },
    ...mapActions({
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getAllCorrelationDataByScopeIdAndItemId:
        store.namespace + "/getAllCorrelationDataByScopeIdAndItemId",
      queryTargetArtfBehviors: store.namespace + "/queryTargetArtfBehviors",
      getSubjectBySSCodeAndProjectId:
        store.namespace + "/getSubjectBySSCodeAndProjectId",
      startImportRecord: store.namespace + "/startImportRecord"
    }),
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
        this.getData();
      });
    },

    getData() {
      var requestData = {
        targetOrgCode: this.formInline.orgCode,
        subjectCode: this.formInline.subjectCode,
        subTitle: this.formInline.subTitle,
        targetEvaluatorId: this.formInline.targetId,
        projectId: this.projectId,
        standardSubjectCode: this.standardSubjectCode,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      this.queryTargetArtfBehviors(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    handleClose(done) {},
    onSubmit() {
      console.log("submit!");
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.projectId || !to.query.standardSubjectCode) {
        vm.$message.error("参数不正确");
      } else {
        vm.getOrgList();
        vm.projectId = to.query.projectId;
        vm.standardSubjectCode = to.query.standardSubjectCode;
        vm.getDict();
        vm.getSubjectList();
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