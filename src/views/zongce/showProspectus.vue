<template>
  <div>
    <h2>查阅计划书</h2>
    <elx-table-layout>
      <!-- <template slot="headerRight">
                <el-button-group>
                    <el-tooltip class="item" effect="dark" content="创建新的基础用户" placement="bottom">
                        <el-button plain size="mini" @click="addStu">
                            新建
                        </el-button>
                    </el-tooltip>
                </el-button-group>
            </template> -->

      <!-- <template slot="headerLeft">
        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="编号:">
                        <el-input v-model="formInline.sysNo" placeholder="编号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
      </template> -->

      <el-table :data="formData" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="38">
        </el-table-column>

        <el-table-column prop="appraiseProject.name" label="测评名称">
        </el-table-column>
        <el-table-column prop="scope.orgName" label="院系名称">
        </el-table-column>
        <el-table-column prop="complete" label="完成状态" :formatter="stateFormatter">
        </el-table-column>
        <el-table-column prop="prosectus.schemeName" label="方案名称">
        </el-table-column>
        <!-- <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="resignation(scope.row)">任职</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column> -->
      </el-table>

      <template slot="footer">
        <div id="my-template">
          <el-button size="mini" type="danger" @click="goBack">返回</el-button>
          <el-button size="mini" type="primary" @click="completeTask">完成</el-button>
        </div>
      </template>

    </elx-table-layout>
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
      scopeId: 0,
      itemId: 0,
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      dialogVisible: false,
      formData: [],
      formInline: {
        sysNo: "",
        name: ""
      },
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
    goBack(){
      this.$router.go(-1)
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryAppraiseProspectus: store.namespace + "/queryAppraiseProspectus",
      startAppraiseProject: store.namespace + "/startAppraiseProject"
    }),
    stateFormatter(r, c, v, i) {
      if (v) {
        return "已完成";
      } else {
        return "未完成";
      }
    },
    completeTask() {
      this.$confirm("此操将结束此节点,下级机构将无法提交 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var requestData = {
            itemId: this.itemId,
            scopeId: this.scopeId
          };
          this.startAppraiseProject(requestData).then(response => {
            this.$message.success("操作成功");
            this.$router.go(-1);
          });
        })
        .catch(() => {});
    },
    getData() {
      var requestData = {
        scopeId: this.scopeId,
        itemId: this.itemId
      };
      this.queryAppraiseProspectus(requestData).then(response => {
        console.log(["查询数据", response]);
        var res = response.resBody;
        this.formData = res;
        console.log(["this", this.data]);
      });
    },
    onSubmit() {
      console.log("submit!");
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
    // getDict() {
    //   var requestData = {
    //     dicts: ["nation", "sex_type", "identity_type"]
    //   };
    //   this.getDictByDictNames(requestData).then(response => {
    //     console.log(["dict", response]);
    //     var res = response.resBody;
    //     res.nation.forEach(el => {
    //       this.nationObj[el.dict_key] = el.dict_desc;
    //     });
    //     res.sex_type.forEach(el => {
    //       this.sexObj[el.dict_key] = el.dict_desc;
    //     });
    //     res.identity_type.forEach(el => {
    //       this.idTypeObj[el.dict_key] = el.dict_desc;
    //     });
    //     this.getData();
    //   });
    // },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.scopeId || !to.query.itemId) {
        vm.$message.error("参数不正确");
        vm.$router.go(-1);
        return;
      }
      vm.scopeId = to.query.scopeId;
      vm.itemId = to.query.itemId;
      vm.getData();
    });
  }
};
</script>

<style scoped>
#my-template {
  text-align: right;
}

.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline {
  display: inline !important;
}
</style>