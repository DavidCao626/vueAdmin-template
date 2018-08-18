<template>
  <div>
    <page>
      <div slot="title">科目行为管理</div>
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
      <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="录入数据" placement="bottom">
            <el-button plain size="mini">
              录入
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
            <elx-select v-model="formInline.subjectCode" placeholder="" @change="fzkmChange">
              <el-option v-for="item in standardSubjectList" :key="item.code" :value="item.code" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="科目项">
            <elx-select v-model="formInline.itemId" placeholder="">
              <el-option v-for="(item,index) in subjectList" :key="index" :value="item.id" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="formInline.targetId" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item label="事件名称">
            <el-input v-model="formInline.titleLike" placeholder="事件名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <elx-select v-model="formInline.state" placeholder="">
              <el-option v-for="item in stateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>
        <el-table-column prop="title" label="行为名称">
        </el-table-column>
        <el-table-column prop="targetName" label="测评对象">
        </el-table-column>
        <el-table-column prop="targetOrgName" label="测评对象组织">
        </el-table-column>
        <el-table-column prop="hcSubjectName" label="分值科目名称">
        </el-table-column>
        <el-table-column prop="state" label="记录状态">
        </el-table-column>
        <el-table-column prop="cognizanceItemName" label="认定科目项">
        </el-table-column>
        <el-table-column prop="cognizanceScoreName" label="认定分值项">
        </el-table-column>
        <el-table-column prop="cognizanceScoreValue" label="实际得分值">
        </el-table-column>
        <el-table-column prop="cognizanceOperationTime" label="认定时间">
        </el-table-column>
        <el-table-column prop="cognizanceOperatorId" label="认定人">
        </el-table-column>

        <el-table-column type="expand" label="#" width="42">
          <template slot-scope="props" style="background-color:#f7f8f9">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="申请科目项:">
                <span>{{ props.row.applyItemName }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="申请分值项:">
                <span>{{ props.row.applyScoreName }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="数量:">
                <span>{{ props.row.quantity }}</span>
              </el-form-item>
              <el-form-item label="申请得分值:">
                <span>{{ props.row.applyScoreValue }}</span>
              </el-form-item>
              <!-- <el-form-item label="申请原因:">
                <span>{{ props.row.applyReason }}</span>
              </el-form-item> -->
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native="edit(scope.row)">编辑</el-dropdown-item> -->
                <el-dropdown-item @click.native="rending(scope.row)">认定</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <template slot="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
        </el-pagination>
      </template>

    </elx-table-layout>

    <el-dialog title="认定" :visible.sync="rendingDV" width="30%" :before-close="handleClose">
      <el-form :model="rendingForm" label-width="80px" size="mini">
        <el-form-item label="分值科目">
          <el-input v-model="rendingForm.hcSubjectName" disabled="" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="事件时间">
          <el-date-picker disabled="" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="rendingForm.occurrenceDate" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="科目项">
          <elx-select v-model=" rendingForm.itemId" placeholder="" @change="rendingkmChange">
            <el-option v-for="(item,index) in rkemuList" :key="index" :value="item.item.id" :obj="item" :label="item.item.name"></el-option>
          </elx-select>
        </el-form-item>
        <el-form-item label="分值项">
          <elx-select v-model=" rendingForm.scoreId" placeholder="" @change="rendingfzChange">
            <el-option v-for="(item,index) in rfenzhiList" :key="index" :value="item.id" :obj="item" :label="item.name"></el-option>
          </elx-select>
        </el-form-item>
        <el-form-item label="认定状态">
          <el-radio-group v-model="rendingForm.cState">
            <el-radio-button label="Y">通过</el-radio-button>
            <el-radio-button label="N">不通过</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原因" v-if="rendingForm.cState == 'N'">
          <el-input v-model="rendingForm.reason" type="textarea" rows="3" placeholder="不通过原因"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="rendingDV = false">取 消</el-button>
        <el-button type="primary" @click="rendingSubmit">确 定</el-button>
      </span>
    </el-dialog>

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
      rkemuList: [],
      rfenzhiList: [],
      rendingDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      formInline: {
        orgCode: [], //组织机构
        subjectCode: "0", //分值科目
        itemId: 0, //科目项
        targetId: "", //测评对象id（学号）
        titleLike: "", //事件名称
        state: "0"
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      standardSubjectCode: "",
      orgList: [],
      scopeId: null,
      projectId: null,
      itemId: null,
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      data: [],
      nationObj: {},
      stateList: [{ label: "全部", value: "0" }],
      standardSubjectList: [{ code: "0", name: "全部" }],
      subjectList: [{ id: 0, name: "全部" }],
      action: "https://jsonplaceholder.typicode.com/posts/",
      rendingForm: {
        hcSubjectName: "",
        behaviorId: null,
        itemId: null,
        itemName: "",
        scoreId: null,
        scoreName: "",
        scoreValue: null,
        cState: "Y",
        reason: "",
        occurrenceDate: ""
      }
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
    rendingSubmit() {
      this.applyRegBehavior(this.rendingForm).then(response => {
        this.$message.success("认定成功");
        this.rendingDV = false;
        this.getData(this.projectId);
      });
    },
    rendingkmChange(val, vueCom, obj) {
      console.log([val, vueCom, obj]);
      this.rendingForm.scoreId = null;
      this.rendingForm.scoreName = null;
      this.rendingForm.scoreValue = null;
      this.rendingForm.itemName = obj.obj.item.name;
      this.rfenzhiList = obj.obj.scoreList;
    },
    rendingfzChange(val, vueCom, obj) {
      console.log([val, vueCom, obj]);
      this.rendingForm.scoreName = obj.obj.name;
      this.rendingForm.scoreValue = obj.obj.value;
    },
    rending(row) {
      this.rendingDV = true;
      this.rendingForm.hcSubjectName = row.hcSubjectName;
      this.rendingForm.behaviorId = row.id;
      this.rendingForm.itemId = row.applyItemId;
      this.rendingForm.itemName = row.applyItemName;
      this.rendingForm.scoreId = row.applyScoreId;
      this.rendingForm.scoreName = row.applyScoreName;
      this.rendingForm.scoreValue = row.applyScoreValue;
      this.rendingForm.occurrenceDate = row.occurrenceDate;
      console.log(["row", row]);
      this.rkemuList = [];
      this.rfenzhiList = [];
      this.getItemListAndScoreBySubjectCodeAndProjectId({
        projectId: this.projectId,
        subjectCode: row.hcSubjectCode
      }).then(response => {
        var res = response.resBody;
        res.forEach(it => {
          this.rkemuList.push(it);
        });
        var itemm = this.rkemuList.find(item => {
          console.log(["item", item]);
          return item.item.id == row.applyItemId;
        });
        this.rfenzhiList = itemm.scoreList;
      });
    },
    fzkmChange(val) {
      this.formInline.itemId = 0;
      if (val == "0") {
        this.subjectList = [{ id: 0, name: "全部" }];
      } else {
        this.getItemListAndScoreBySubjectCodeAndProjectId({
          projectId: this.projectId,
          subjectCode: val
        }).then(response => {
          var res = response.resBody;
          this.subjectList = [];
          res.forEach(it => {
            this.subjectList.push(it.item);
          });
          this.subjectList.unshift({ id: 0, name: "全部" });
        });
      }
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
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
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getAllCorrelationDataByScopeIdAndItemId:
        store.namespace + "/getAllCorrelationDataByScopeIdAndItemId",
      queryTargetOrgBehaviors: store.namespace + "/queryTargetOrgBehaviors",
      getSubjectBySSCodeAndProjectId:
        store.namespace + "/getSubjectBySSCodeAndProjectId",
      getItemListAndScoreBySubjectCodeAndProjectId:
        store.namespace + "/getItemListAndScoreBySubjectCodeAndProjectId",
      getStateList: store.namespace + "/getStateList",
      applyRegBehavior: store.namespace + "/applyRegBehavior"
    }),
    getSubjectList() {
      this.getSubjectBySSCodeAndProjectId({
        projectId: this.projectId,
        standardSubjectCode: this.standardSubjectCode
      }).then(response => {
        this.standardSubjectList = response.resBody;
        this.standardSubjectList.unshift({ code: "0", name: "全部" });
      });
    },
    getDict() {
      this.getStateList({}).then(response => {
        this.stateList = response.resBody;
        this.stateList.unshift({ label: "全部", value: "0" });
      });
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
        scopeId: this.scopeId
      };
      this.getAllCorrelationDataByScopeIdAndItemId(requestData).then(
        response => {
          var res = response.resBody;
          this.projectId = res.appraiseProject.id;
          this.getData(res.appraiseProject.id);
          this.getSubjectList();
        }
      );
    },
    getData(projectId) {
      var requestData = {
        state: this.formInline.state,
        orgCode: this.formInline.orgCode,
        subjectCode: this.formInline.subjectCode,
        itemId: this.formInline.itemId,
        targetId: this.formInline.targetId,
        titleLike: this.formInline.titleLike,
        projectId: projectId,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        standardSubjectCode: this.standardSubjectCode
      };
      this.queryTargetOrgBehaviors(requestData).then(response => {
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
      this.getData(this.projectId);
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
      if (!to.query.scopeId || !to.query.standardSubjectCode) {
        vm.$message.error("参数不正确");
      } else {
        vm.standardSubjectCode = to.query.standardSubjectCode;
        vm.getOrgList();
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