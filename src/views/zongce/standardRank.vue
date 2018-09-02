<template>
  <div>
    <page>
      <div slot="title">标准科目排名</div>
    </page>
    <elx-table-layout>

      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">

          <el-form-item label="组织机构">
            <el-cascader v-model="formInline.orgCode" placeholder="输入进行搜索" :options="orgList" filterable expand-trigger="hover" :props="orgProps"></el-cascader>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="formInline.targetId" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formInline.targetName" placeholder="学号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>
        <el-table-column prop="targetId" label="学号">
        </el-table-column>
        <el-table-column prop="targetName" label="学生名称">
        </el-table-column>
        <el-table-column prop="targetOrgName" label="学生机构">
        </el-table-column>
        <el-table-column prop="scoreValue" label="得分值">
        </el-table-column>
        <el-table-column prop="rank" label="排名">
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
        <el-button size="mini" @click="complateItem" v-show="complateBtnIsShow" type="primary">完成</el-button>
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
      complateBtnIsShow:true,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      formInline: {
        orgCode: [], //组织机构
        targetName: "", //姓名
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
      queryStdSubjectRank: store.namespace + "/queryStdSubjectRank",
      truncateStdSubjectRank: store.namespace + "/truncateStdSubjectRank",
      produceStdSubjectRank: store.namespace + "/produceStdSubjectRank",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),
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
        this.delFreeChildren(response.resBody);
        this.orgList = response.resBody;
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
    createRecord() {
      this.produceStdSubjectRank({ projectId: this.projectId }).then(
        response => {
          this.$message.success("生成成功,点击查询查看");
          //this.getData();
        }
      );
    },
    backRecord() {
      this.truncateStdSubjectRank({ projectId: this.projectId }).then(
        response => {
          this.$message.success("回退成功");
          this.getData();
        }
      );
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
        //this.getData();
      });
    },
    getData() {
      var requestData = {
        targetName: this.formInline.targetName,
        targetId: this.formInline.targetId,
        projectId: this.projectId,
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      var targetOrgCode = this.formInline.orgCode;
      if (targetOrgCode.length > 0) {
        requestData.targetOrgCode = targetOrgCode[targetOrgCode.length - 1];
      }else{
        this.$message.error("请选择班级后查看")
        return;
      }

      this.queryStdSubjectRank(requestData).then(response => {
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
      if ( !to.query.projectId) {
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