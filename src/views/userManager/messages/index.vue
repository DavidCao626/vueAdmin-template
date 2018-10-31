<template>
  <page>
    <span slot="title">通知中心</span>

    <div slot="panel" class="messages">
      <!-- <div class="panel-control">
        <div class="panel-control__flex">
          <div class="panel-control__flex-left">
          </div>
          <div class="panel-control__flex-right" style="margin-right:20px;">

          </div>
        </div>
      </div> -->

      <div class="panel-body">
        <div style="margin:5px 0 0px;font-size:12px;">

          <el-form :inline="true" size="mini">
            <el-form-item label="">
              <el-input v-model="currentShowContent" placeholder="输入消息标题或关键字搜索"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="queryDataByStatus('')">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-collapse accordion>

          <el-collapse-item :name="index" v-for="(notice,index) in noticeData" :key="index">
            <template slot="title" @click="messageShow(notice)">
              <template v-if="isScreening==true">
                <el-checkbox :true-label="12"></el-checkbox>
              </template>
              &nbsp;
              <!-- <el-tooltip content="标记已读/未读" placement="top"> -->
              <div class="circle messages-readState" :class="{'messages-readState__true':(notice.status=='Y')}">
              </div>
              <!-- </el-tooltip> -->
              &nbsp;
              <span class="messages-title" style="font-size:14px">{{notice.title}}</span>

              <!-- <span class="messages-mark" @click.stop="markSwitch">
                                <i class="el-icon-star-off" :class="{'messages-mark__true':isMarkForMessage}"></i>
                            </span> -->
              <span class="messages-time">&nbsp;{{notice.sendTime}}</span>
              <span class="messages-author">来源&nbsp;:&nbsp;{{notice.source}}</span>
            </template>
            <div class="messages-body">
              <div v-html="notice.content" @click="gotopage(notice.id)">{{notice.content}}</div>
              <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
            </div>
          </el-collapse-item>

        </el-collapse>

        <div class="messages-pagination">
          <el-pagination @size-change="handleSizeChange" :current-page="currentPage" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dataCount">
          </el-pagination>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>

  </page>
</template>
<script>
import {
  changeNoticeState,
  queryUserNoticeByStatus,
  queryUserNotice,
  queryUserNoticeCountByStatus,
  queryUserNoticeCount
} from "~/api/notice";

var noticeData = [];

export default {
  data() {
    return {
      currentShowState: "",
      currentShowContent: "",
      currentPage: 1,
      dataCount: 0,
      pageSize: 10,
      noticeData,
      noReadNumber: 0, // 未读数量
      ReadNumber: 0, // 已读数量
      allNumber: 0, // 全部数量
      // messagesMarkCount: 8,//收藏
      isReadForMessage: false,
      // isMarkForMessage: false,
      isScreening: false
    };
  },

  methods: {
    gotopage(id) {
      this.changeNoticeStatus(id, "Y");
    },
    search() {
      // this.currentShowState
      // this.currentShowContent
    },
    messageShow(itme) {
      console.log("你点开了该消息");
      // ToDo: itme.isReadForMessage = true
      if (itme.status == "Y") {
        return; // 如果该消息已读直接return，不再执行以下未读处理逻辑
      }
      this.noReadNumber--;
      this.ReadNumber++;
      itme.status = "Y"; // 真实数据情况下去改变以上item循环元素中对应的值
    },
    readSwitch(itemID, notice) {
      // ToDo: 拿到行内id
      if (notice.status == "N") {
        this.noReadNumber--;
        this.ReadNumber++;
        // this.$message({
        //   message: "标为已读状态",
        //   type: "success"
        // });
        notice.status = "Y";
        this.changeNoticeStatus(itemID, "Y");
      } else {
        this.noReadNumber++;
        this.ReadNumber--;
        notice.status = "N";
        this.changeNoticeStatus(itemID, "N");
      }
    },
    markSwitch(itemID) {
      // ToDo: 拿到行内id
      if (this.isMarkForMessage) {
        this.isMarkForMessage = false;
        this.$message({
          message: "已取消收藏",
          type: "info"
        });
      } else {
        this.isMarkForMessage = true;
        this.$message({
          message: "收藏成功",
          type: "success"
        });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.currentShowState == "") {
        this.queryDataByStatus("");
      }
      if (this.currentShowState == "Y") {
        this.queryDataByStatus("Y");
      }
      if (this.currentShowState == "N") {
        this.queryDataByStatus("N");
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.currentShowState == "") {
        this.queryDataByStatus("");
      }
      if (this.currentShowState == "Y") {
        this.queryDataByStatus("Y");
      }
      if (this.currentShowState == "N") {
        this.queryDataByStatus("N");
      }
    },
    queryAllData() {
      this.currentShowState = "";
      var that = this;
      queryUserNotice({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(data => {
        // 查全部通知
        that.noticeData = data.resBody.baseData;
        that.dataCount = data.resBody.dataCount;
      });
    },
    queryDataByStatus(status) {
      this.currentShowState = status;
      var that = this;
      queryUserNoticeByStatus({
        status: status,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        content: this.currentShowContent
      }).then(data => {
        that.noticeData = data.resBody.baseData;
        that.dataCount = data.resBody.dataCount;
      });
    },
    changeNoticeStatus(id, status) {
      console.log("执行了改变");
      var that = this;
      changeNoticeState({ id: id, status: status }).then(data => {
        if (that.currentShowState == "") {
          this.queryDataByStatus("");
        }
        if (that.currentShowState == "Y") {
          that.queryDataByStatus("Y");
        }
        if (that.currentShowState == "N") {
          that.queryDataByStatus("N");
        }
      });
    }
  },
  mounted: function() {
    var that = this;
    queryUserNoticeCountByStatus({
      status: "Y"
    }).then(data => {
      // 查已读数量
      that.ReadNumber = data.resBody.count;
    });
    queryUserNoticeCountByStatus({
      status: "N"
    }).then(data => {
      // 查未读数量
      that.noReadNumber = data.resBody.count;
    });
    queryUserNoticeCount().then(data => {
      // 查全部数量
      that.allNumber = data.resBody.count;
    });
    this.queryDataByStatus("");
  }
};
</script>
<style lang="scss" scoped>
.messages {
  color: #8d8d8d;
  &-time {
    float: right;
    margin-right: 20px;
    font-size: 13px;
  }
  &-author {
    float: right;
    margin-right: 20px;
    font-size: 13px;
  }
  &-readState {
    background-color: red;
    &__true {
      background-color: #e4e8eb;
    }
  }
  &-mark {
    float: right;
    margin-right: 20px;
    font-size: 18px;
    color: var(--color-grey-light-2);
    &__true {
      color: rgb(247, 186, 42);
    }
    &__true:before {
      content: "\E637";
    }
  }
  &-pagination {
    margin-top: 30px;
    margin-bottom: 40px;
  }
}
</style>