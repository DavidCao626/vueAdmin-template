<template>
  <div>
    <page>
      <div slot="title">测评方案管理</div>
    </page>
    <elx-table-layout>
      <!-- <template slot="headerRight">
        <el-button-group>
          <el-tooltip class="item" effect="dark" content="新增测评方案" placement="bottom">
            <el-button @click="dialogVisible = true" plain size="mini">
              新增
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template> -->
      <template slot="headerLeft">

        <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
          <el-form-item label="方案名称">
            <el-input v-model="formInline.name" placeholder="方案名称"></el-input>
          </el-form-item>
          <el-form-item label="测评类别">
            <el-select v-model="formInline.categoryId" placeholder="测评类别">
              <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <el-table :data="data" style="width: 100%" border size="mini">
        <el-table-column prop="name" label="方案名称">
        </el-table-column>
        <el-table-column prop="categoryId" :formatter="categoryFormatter" label="测评类别">
        </el-table-column>
        <el-table-column prop="orgName" label="所属机构">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>

        <el-table-column label="操作" width="88" header-align="left" align="center">
          <template slot-scope="scope">
            <el-dropdown>
              <el-button size="mini" @click="">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showDetail(scope.row)">查看详情</el-dropdown-item>
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
        name: "",
        categoryId: 0
      },
      orgProps: {
       label: "orgName",
        value: "orgCode",
        children: "children"
      },

      orgList: [],
      data: [],
      categoryList: []
    };
  },
  watch: {},
  methods: {
    showDetail(row) {
      this.$router.push({
        path: "/zongce/showScheme",
        query: {
          schemeId: row.id
        }
      });
    },
    categoryFormatter(r, c, v, i) {
      for (var j = 0; j < this.categoryList.length; j++) {
        if (this.categoryList[j].id == v) {
          return this.categoryList[j].name;
        }
      }
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
      queryCategoryList: store.namespace + "/queryCategoryList",
      querySchemes: store.namespace + "/querySchemes"
    }),
    getCategory() {
      this.queryCategoryList({}).then(response => {
        this.categoryList = response.resBody;
        this.categoryList.unshift({ id: 0, name: "全部" });
      });
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        name: this.formInline.name,
        categoryId: this.formInline.categoryId
      };
      //查询数据的方法
      this.querySchemes(requestData).then(response => {
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
        this.getCategory();
        this.getData();
      });
    },

    onSubmit() {
      this.pageInfo.currentPage = 1;
      this.getData(this.projectId);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDict();
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