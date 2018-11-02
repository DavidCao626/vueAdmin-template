<template>
  <page>
    <div slot="title">公示</div>
    <div class="weui-desktop-layout__main__bd weui-desktop-panel main_bd">
      <div class="weui-desktop-panel__bd">
        <el-form :inline="true" size="mini">
          <el-form-item label="标题:">
            <el-input v-model="searchData" placeholder="输入标题搜索"></el-input>
          </el-form-item>
          <el-form-item label="来源:">
            <el-select v-model="source" placeholder="">
              <el-option v-for="item in orgTypeList" :key="item.key" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
        <ul class="mp_news_list">
          <li class="mp_news_item" v-for="(i,index) in announceDate" :key="index" style="list-style:none">
            <router-link :to="{path:i.url,query:i.urlParams}">
              <strong>{{i.title}}
                <i class="icon_common new"></i>
              </strong>
              <span class="read_more">{{i.publicOrg}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span v-html="orgTypeFormatter(i.orgLabel)"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{i.date}}</span>
            </router-link>
          </li>

        </ul>
        <div class="pagination_wrp pageNavigator" v-if="announceDate.length>0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  data() {
    return {
      searchData: "",
      source: "0",
      dataTotal: 0,
      pageSize: 10,
      currentPage: 1,
      announceDate: [],
      orgTypeList: []
    };
  },
  methods: {
    search() {
      this.currentPage = 1;
      this.queryData();
    },
    orgTypeFormatter(orgLable) {
      var a = this.orgTypeList;
      console.log(["=-=-=-=-", a, orgLable]);
      for (var i = 0; i < a.length; i++) {
        if (a[i].type == orgLable) {
          return a[i].name;
        }
      }
        return orgLable;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryData();
    },
    queryData() {
      var requestData = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        title: this.searchData,
        orgLabel: this.source
      };
      this.pullPublicNoticeA(requestData).then(response => {
        this.announceDate = [];
        var resp = response.resBody.baseData;
        this.dataTotal = response.resBody.pageInfo.totalRecord;
        resp.forEach(element => {
          var temp = {
            title: "",
            url: "",
            urlParams: {},
            date: "",
            publicOrg: "",
            orgLabel:""
          };
          temp.title = element.title;
          temp.url = "/messages/notice/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = element.publicTime;
          temp.publicOrg = element.publicOrgName;
          temp.orgLabel = element.orgLabel;
          this.announceDate.push(temp);
        });
      });
    },
    getOrgTypeList() {
      this.getOrgTypeDict({}).then(response => {
        this.orgTypeList = response.resBody;
        this.orgTypeList.unshift({ type: "0", name: "全部" });
        this.queryData();
      });
    },
    ...mapActions({
      pullPublicNoticeA: store.namespace + "/pullPublicNoticeP",
      getOrgTypeDict: store.namespace + "/getOrgTypeDict"
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getOrgTypeList();
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
