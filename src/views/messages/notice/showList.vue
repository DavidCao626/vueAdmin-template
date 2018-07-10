<template>
    <page>
        <div slot="title">公示</div>
        <div class="weui-desktop-layout__main__bd weui-desktop-panel main_bd">
            <div class="weui-desktop-panel__bd">
                <ul class="mp_news_list">
                    <li class="mp_news_item" v-for="(i,index) in announceDate" :key="index">
                        <router-link :to="{path:i.url,query:i.urlParams}">
                            <strong>{{i.title}}
                                <i class="icon_common new"></i>
                            </strong>
                            <span class="read_more">{{i.publicOrg}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{i.date}}</span>
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
      dataTotal: 0,
      pageSize: 10,
      currentPage: 1,
      announceDate: [
        
      ]
    };
  },
  methods: {
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
        pageSize: this.pageSize
      };
      this.pullPublicNoticeP(requestData).then(response => {
        this.announceDate = [];
        var resp = response.resBody.baseData;
        this.dataTotal = response.resBody.pageInfo.totalRecord;
        resp.forEach(element => {
          var temp = {
            title: "",
            url: "",
            urlParams: {},
            date: "",
            publicOrg:""
          };
          temp.title = element.title;
          temp.url = "/messages/announce/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = element.publicTime;
           temp.publicOrg = element.publicOrgName;
          this.announceDate.push(temp);
        });
      });
    },
    ...mapActions({
      pullPublicNoticeP: store.namespace + "/pullPublicNoticeP"
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.queryData();
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
