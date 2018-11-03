<template>
  <div class="dashboard">
    <div class="page-box">
      <div class="page-box__1">
        <div class="page-box__block flex">
          <div class="page-box__1">
            <listbody title="公告栏" :titleUrl="announceMoreUrl" :orgTypeList="orgTypeList" :data="announceDate">

            </listbody>
          </div>
        </div>

      </div>
      <div class="page-box__1">
        <div class="page-box__block">
          <listbody title="公示栏" :titleUrl="noticeMoreUrl" :orgTypeList="orgTypeList" :data="noticeDate"></listbody>

        </div>

      </div>
    </div>
    <div class="page-box">
      <div class="page-box__1">
        <div class=" page-box__block">
          <div class="weui-desktop-home-notice">
            <div class="weui-desktop-home-notice__info">
              <i class="el-icon-date"></i>
              <a href="#" class="weui-desktop-home-notice__title " style=" font-size: 16px;">
                我的待办
              </a>
            </div>
            <div class="weui-desktop-home-notice__extra">
              <router-link :to="{path:'/project/todos'}" class="weui-desktop-home-notice__readmore">
                更多
              </router-link>
            </div>
          </div>
          <hr class="line" />

          <el-table class="i-cursor" :data="tableData" @row-click="onRowClick" style="width:99%">
            <el-table-column prop="item_name" label="待办事项">
            </el-table-column>
            <el-table-column prop="projectInfo.project_service_type_name" label="业务类别">
            </el-table-column>

            <el-table-column prop="projectInfo.project_name" label="项目名称">
            </el-table-column>
            <el-table-column prop="over_time" label="结束时间" :formatter="overTimeFormatter">
              <template slot-scope="scope">
                <span v-html="overTimeFormatter(scope.row)"></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- <div class="page-box__1">
        <div class="page-box__block">
          <div class="weui-desktop-home-notice">
            <div class="weui-desktop-home-notice__info">
              <i class="el-icon-document"></i>
              <router-link :to="{path:'/user/messages'}" class="weui-desktop-home-notice__title title">
                 通知栏 
              </router-link>
            </div>
            <div class="weui-desktop-home-notice__extra">
              <router-link :to="{path:'/user/messages'}" class="weui-desktop-home-notice__readmore">
                更多
              </router-link>
            </div>
          </div>
          <hr class="line" />
          <div>
            <ul class="olli">
              <template v-for="(i,index) in noticeData">
                <router-link :to="{path:'/user/messages'}">
                  <li>{{i.title}}
                  </li>
                </router-link>
              </template>
            </ul>
          </div>

        </div>

      </div> -->
    </div>
    <!-- 我的发起的项目 -->
    <!-- <div class="page-box__block">
      <div class="weui-desktop-home-notice">
        <div class="weui-desktop-home-notice__info">
          <i class="el-icon-share"></i>
          <a href="#" class="weui-desktop-home-notice__title " style=" font-size: 16px;">
            任务列表
          </a>

        </div>
        <div class="weui-desktop-home-notice__extra">
            
          <router-link :to="{path:'/project/myScope'}"  class="weui-desktop-home-notice__readmore">
            更多
          </router-link>
        </div>
      </div>
        <hr  class="line" />
      <myProject></myProject>
    </div> -->
    <!-- 我的发起的项目  end-->

  </div>
</template>

<script>
import listbody from "./_components/ListBody";
import { mapGetters, mapActions } from "vuex";
import myProject from "./myProject";
import moment from "moment";
export default {
  components: {
    listbody,
    myProject
  },
  data() {
    return {
      announceMoreUrl: "/messages/announce/showlist",
      noticeMoreUrl: "/messages/notice/showlist",
      announceDate: [],
      noticeDate: [],
      tableData: [],
      orgTypeList: [],
      noticeData: []
    };
  },
  methods: {
    ...mapActions({
      pullPublicNoticeA: "pullPublicNoticeA",
      pullPublicNoticeP: "pullPublicNoticeP",
      queryUserPending: "queryUserPending",
      getOrgTypeDict: "getOrgTypeDict",
      queryUserNoticeByStatus: "queryUserNoticeByStatus"
    }),
    typeFormatter(row, column, cellValue, index) {
      if (row.pending_type == "Item") {
        return "任务";
      } else {
        return "工序";
      }
    },
    getOrgType() {
      this.getOrgTypeDict({}).then(response => {
        this.orgTypeList = response.resBody;
      });
    },
    overTimeFormatter(row) {
      var date = row.over_time;
      if (date == undefined) {
        return "";
      }
      return moment(date, "yyyy-MM-DD HH:mm:ss").format("MM-DD HH:mm");
      //return date;
    },
    getNoticeData() {
      this.queryUserNoticeByStatus().then(response => {
        this.noticeData = response.resBody.baseData;
      });
    },
    onRowClick(row, event, column) {
      if (row.pending_type == "Item") {
        this.$router.push({
          name: "项目控制台",
          params: {
            scopeId: row.scope_id
          }
        });
      } else {
        this.$router.push({
          path: row.action,
          query: {
            itemId: row.item_id,
            scopeId: row.scope_id
          }
        });
      }
    },
    goShowTodo(row) {
      //跳转到待办处理页面
      if (row.pending_type == "Item") {
        this.$router.push({
          name: "项目控制台",
          params: {
            scopeId: row.scope_id
          }
        });
      } else {
        this.$router.push({
          path: row.action,
          query: {
            itemId: row.item_id
          }
        });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getNoticeData();
      vm.getOrgType();
      vm.pullPublicNoticeA().then(response => {
        console.log(["123123", response]);
        vm.announceDate = [];
        var resp = response.resBody.baseData;

        resp.forEach(element => {
          var temp = {
            title: "",
            url: "",
            urlParams: {},
            date: "",
            orgLabel: ""
          };
          temp.title = element.title;
          temp.url = "/messages/announce/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = moment(element.publicTime, "yyyy-MM-DD HH:mm:ss").format(
            "MM-DD HH:mm"
          );
          temp.orgLabel = element.orgLabel;
          vm.announceDate.push(temp);
        });
      });
      vm.pullPublicNoticeP().then(response => {
        vm.noticeDate = [];
        var resp = response.resBody.baseData;

        resp.forEach(element => {
          var temp = {
            title: "",
            url: "",
            urlParams: {},
            date: "",
            orgLabel: ""
          };
          temp.title = element.title;
          temp.url = "/messages/notice/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = moment(element.publicTime, "yyyy-MM-DD HH:mm:ss").format(
            "MM-DD HH:mm"
          );
          temp.orgLabel = element.orgLabel;
          vm.noticeDate.push(temp);
        });
      });
      vm.queryUserPending({ state: "N" }).then(response => {
        vm.tableData = response.resBody.baseData;
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.line {
  margin-bottom: 5px;
  width: 90px;
}
.dashboard {
  margin: 10px;
}
.olli {
  margin: 0 20px;
  line-height: 35px;
  font-size: 14px;
  color: #666;
  & small {
    color: #999;
    float: right;
    font-size: 14px;
    margin-right: -20px;
  }
}
.title {
  font-size: 16px;
}
</style>
