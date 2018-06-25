<template>
  <div class="dashboard">

    <div class="page-box">
      <div class="page-box__2">
        <div class="page-box__block flex">
          <div class="page-box__1">
            <listbody title="公告栏" titleUrl="/messages/announce/list" :titleUrlParams="announceDate.urlParams" :data="announceDate"></listbody>
          </div>
        </div>

      </div>
      <div class="page-box__1">
        <div class="page-box__block">
          <listbody title="公示栏" titleUrl="/messages/notice/list" :titleUrlParams="noticeDate.urlParams" :data="noticeDate"></listbody>

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
        <el-table-column prop="name" label="待办名称">
        </el-table-column>
        <el-table-column prop="type" label="待办类别" width="180">
        </el-table-column>
        <el-table-column prop="date" label="时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="goShowTodo(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import listbody from "./_components/ListBody";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    listbody
  },
  data() {
    return {
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
      pullPublicNoticeP: "pullPublicNoticeP"
    }),

    onRowClick(row, event, column) {
      alert(row.id, event, column);
      //跳转到待办处理页面
    },
    goShowTodo(id) {
      //跳转到待办处理页面
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.pullPublicNoticeA().then(response => {
        console.log(["123123",response])
        vm.announceDate = [];
        var resp = response.resBody.baseData;
        var temp = {
          title: "",
          url: "",
          urlParams: {},
          date: ""
        };
        resp.forEach(element => {
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
        var temp = {
          title: "",
          url: "",
          urlParams: {},
          date: ""
        };
        console.log(resp)
        resp.forEach(element => {
          temp.title = element.title;
          temp.url = "/messages/notice/show"; //详情地址
          temp.urlParams = { publicNoticeId: element.id };
          temp.date = element.publicTime;
          vm.noticeDate.push(temp);
        });
      });
    });
  }
};
</script>
