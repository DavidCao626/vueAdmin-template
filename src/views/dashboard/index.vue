<template>
  <div class="dashboard">

    <div class="page-box">
      <div class="page-box__2">
        <div class="page-box__block flex">
          <div class="page-box__1">
            <listbody title="公告栏" :titleUrl="announceMoreUrl" :data="announceDate"></listbody>
          </div>
        </div>

      </div>
      <div class="page-box__1">
        <div class="page-box__block">
          <listbody title="公示栏" :titleUrl="noticeMoreUrl" :data="noticeDate"></listbody>

        </div>

      </div>
    </div>
    <div class="page-box__block">
      <div class="weui-desktop-home-notice">
        <div class="weui-desktop-home-notice__info">
          <a href="#" class="weui-desktop-home-notice__title " style=" font-size: 16px;">
            我未处理的待办
          </a>
        </div>
        <div class="weui-desktop-home-notice__extra">
          <router-link :to="{path:'/project/todos'}" target="_blank" class="weui-desktop-home-notice__readmore">
            全部待办
          </router-link>
        </div>
      </div>
      <br>
      <el-table :data="tableData" style="width: 100%" @row-click="onRowClick">
        <!-- <el-table-column prop="item_name" label="待办名称" min-width="180">
        </el-table-column>
        <el-table-column prop="projectInfo.project_service_type_name" label="所属项目业务" min-width="120">
        </el-table-column>
        <el-table-column prop="over_time" label="结束时间" min-width="120">
        </el-table-column> -->
        <el-table-column prop="projectInfo.project_name" label="项目名称" min-width="120">
        </el-table-column>
        <el-table-column prop="projectInfo.project_service_type_name" label="业务类别" min-width="100">
        </el-table-column>
        <!-- <el-table-column prop="scope_name" label="待办来源" min-width="80">
          </el-table-column> -->
        <el-table-column prop="org_name" label="组织" min-width="80">
        </el-table-column>
        <el-table-column prop="item_name" label="待办名称" min-width="80">
        </el-table-column>
        <!-- <el-table-column prop="state" :formatter="stateFormatter" label="状态" min-width="80">
          </el-table-column> -->
        <el-table-column prop="pending_type" :formatter="typeFormatter" label="类型" min-width="80">
        </el-table-column>
        <!-- <el-table-column prop="real_start_time" label="开始时间" min-width="120">
          </el-table-column> -->
        <el-table-column prop="over_time" label="结束时间" :formatter="overTimeFormatter" min-width="120">
          <template slot-scope="scope">
            <span v-html="overTimeFormatter(scope.row)"></span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="create_time" label="创建时间" width="120">
          </el-table-column> -->
        <!-- <el-table-column prop="state" :formatter="stateFormatter" label="状态" min-width="80">
          </el-table-column> -->
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="goShowTodo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 我的发起的项目 -->
    <div class="page-box__block">
      <div class="weui-desktop-home-notice">
        <div class="weui-desktop-home-notice__info">
          <a href="#" class="weui-desktop-home-notice__title " style=" font-size: 16px;">
            与我相关
          </a>
         
        </div>
        <div class="weui-desktop-home-notice__extra">
            
          <router-link :to="{path:'/project/my'}" target="_blank" class="weui-desktop-home-notice__readmore">
            全部
          </router-link>
        </div>
      </div>
      <br>
      <myProject></myProject>
    </div>
 <!-- 我的发起的项目  end-->

  </div>
</template>

<script>
import listbody from "./_components/ListBody";
import { mapGetters, mapActions } from "vuex";
import myProject from './myProject'
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
      announceDate: [
        {
          title: "标题1",
          url: "/messages/announce/show",
          urlParams: { id: 1 },
          date: "2018-06-01"
        },
        {
          title: "标题2",
          url: "/messages/announce/show",
          urlParams: { id: 2 },
          date: "2018-06-01"
        },
        {
          title: "标题3",
          url: "/messages/announce/show",
          urlParams: { id: 3 },
          date: "2018-06-01"
        }
      ],
      noticeDate: [
        {
          title: "公示1",
          url: "/messages/notice/show",
          urlParams: { nid: 1 },
          date: "2018-06-01"
        },
        {
          title: "公示2",
          url: "/messages/notice/show",
          urlParams: { nid: 2 },
          date: "2018-06-01"
        },
        {
          title: "公示3",
          url: "/messages/notice/show",
          urlParams: { nid: 3 },
          date: "2018-06-01"
        }
      ],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          type: "贫困建档",
          name: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          type: "贫困建档",
          name: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          type: "学生填表",
          name: "上海市普陀区金沙江路 1519 弄"
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      pullPublicNoticeA: "pullPublicNoticeA",
      pullPublicNoticeP: "pullPublicNoticeP",
      queryUserPending: "queryUserPending"
    }),
    typeFormatter(row, column, cellValue, index) {
      if (row.pending_type == "Item") {
        return "任务";
      } else {
        return "工序";
      }
    },
    overTimeFormatter(row) {
      var date = row.over_time;
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
      //return date;
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
            scopeId:row.scope_id
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
      vm.pullPublicNoticeA().then(response => {
        console.log(["123123", response]);
        vm.announceDate = [];
        var resp = response.resBody.baseData;

        resp.forEach(element => {
          var temp = {
            title: "",
            url: "",
            urlParams: {},
            date: ""
          };
          temp.title = element.title;
          temp.url = "/messages/announce/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = element.publicTime;
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
            date: ""
          };
          temp.title = element.title;
          temp.url = "/messages/notice/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = element.publicTime;
          vm.noticeDate.push(temp);
        });
      });
      vm.queryUserPending().then(response => {
        vm.tableData = response.resBody.baseData;
      });
    });
  }
};
</script>
