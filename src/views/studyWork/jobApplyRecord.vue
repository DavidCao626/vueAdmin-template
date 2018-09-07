<template>
  <div>
    <page>
      <div slot="title">申请记录</div>
    </page>
    <elx-table-layout>
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="组织机构">
            <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select expand-trigger="hover" :props="orgProps"></el-cascader>
          </el-form-item>

          <el-form-item label="记录状态">
            <el-select v-model="formInline.recordState" placeholder="记录状态">
              <el-option v-for="item in recordStateList" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学号">
            <el-input v-model="formInline.applyUserCode" placeholder="学号"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="applyUserName" label="学生名称">
        </el-table-column>
        <el-table-column prop="applyUserCode" label="学号">
        </el-table-column>
        <el-table-column prop="orgName" label="组织">
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间">
        </el-table-column>
        <el-table-column prop="state" label="状态" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="employTime" label="录用时间">
        </el-table-column>
        <el-table-column prop="postTime" label="到岗时间">
        </el-table-column>

        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showResume(scope.row)">查看简历</el-dropdown-item>
                <el-dropdown-item @click.native="employ(scope.row)">录用</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="reEmploy(scope.row)">解除录用</el-dropdown-item> -->
                <el-dropdown-item @click.native="post(scope.row)">到岗确认</el-dropdown-item>
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

    <el-dialog title="录用关系" :visible.sync="employDV">
      <el-form :model="employData">
        <el-form-item label="录用关系">
          <el-radio-group v-model="employData['type']" size="mini" >
            <el-radio label="Y" border>录用</el-radio>
            <el-radio label="N" border>不录用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="employDV = false">取 消</el-button>
        <el-button type="primary" @click="employSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="到岗状态" :visible.sync="postDV">
      <el-form :model="postData">
        <el-form-item label="到岗状态">
          <el-radio-group v-model="postData['type']" size="mini" >
            <el-radio label="Y" border>到岗</el-radio>
            <el-radio label="N" border>未到岗</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="postDV = false">取 消</el-button>
        <el-button type="primary" @click="postSubmit">确 定</el-button>
      </div>
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
      employDV: false,
      postDV: false,
      employData: {
        id: null,
        type: "Y"
      },
      postData: {
        id: null,
        type: "Y"
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      recordStateList: [],
      jobCode: "",
      formInline: {
        orgCode: [], //组织机构
        recordState: "0",
        applyUserCode: "" //学号
      },
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },

      orgList: [],
      data: []
    };
  },
  watch: {},
  methods: {
    showResume(row){
 this.$router.push({
        path: "/studyWork/resumeDetail",
        query: {
          id: row.resumeId,
          onlyShow:true
        }
      });
    },
    employSubmit() {
      this.affirmEmploy(this.employData).then(response => {
        this.$message.success("成功");
        this.getData();
        this.employDV = false;
      });
    },
    postSubmit() {
      this.affirmPost(this.postData).then(response => {
        this.$message.success("成功");
        this.getData();
        this.postDV = false;
      });
    },
    stateFormatter(row, column, cellValue, index) {
      var arr = this.recordStateList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value == cellValue) {
          return arr[i].label;
        }
      }
    },
    employ(row) {
      this.employData.id = row.id;
      this.employDV = true;
    },
    reEmploy(row) {},
    post(row) {
      this.postData.id = row.id;
      this.postDV = true;
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
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryApplyRecord: store.namespace + "/queryApplyRecord",
      getRecordStateDict: store.namespace + "/getRecordStateDict",
      affirmEmploy: store.namespace + "/affirmEmploy",
      affirmPost: store.namespace + "/affirmPost"
    }),
    getRecordStateList() {
      this.getRecordStateDict({}).then(response => {
        this.recordStateList = response.resBody;
        this.recordStateList.unshift({ label: "全部", value: "0" });
      });
    },
    getData() {
      var requestData = {
        jobCode: this.jobCode,
        recordState: this.formInline.recordState,
        applyUserCode: this.formInline.applyUserCode,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      var targetOrgCode = this.formInline.orgCode;
      if (targetOrgCode.length > 0) {
        requestData.orgCode = targetOrgCode[targetOrgCode.length - 1];
      }
      //查询数据的方法
      this.queryApplyRecord(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
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
        this.getData();
        this.getOrgList();
        this.getRecordStateList();
      });
    },

    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.jobCode) {
        vm.$message.error("参数错误");
      } else {
        vm.jobCode = to.query.jobCode;
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