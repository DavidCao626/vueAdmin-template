<template>
  <page :Breadcrumb="false">
    <div slot="title">节点信息</div>

    <div slot="panel">
      <ProjectProgress>
        <div style="max-width:800px">
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">节点名称：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.node_title}}</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">创建人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{nodeInfo.creator_name}}</div>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">开始时间：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.plan_start_time}}</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">结束时间：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{nodeInfo.plan_complete_time}}</div>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">节点描述：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.node_desc}}</div>
            </el-col>
            <!-- <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">刘能</div>
            </el-col> -->
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">创建时间</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.create_time}}</div>
            </el-col>
            <!-- <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">刘能</div>
            </el-col> -->
          </el-row>
        </div>
      </ProjectProgress>
    </div>
    <div>
      <div class="components-container">
        <el-dialog v-el-drag-dialog title="审批数据" :visible.sync="dialogTableVisible">
          <div>
            <!-- <el-tag v-for="tag in multipleSelection" :key="tag.key" size="medium" closable style="margin: 0 10px 10px 10px" @close="handleClose(tag)">
              {{tag.name}}
            </el-tag> -->
          </div>
          <el-form label-width="100px" label-position="top">
            <el-form-item label="* 审批意见">
              <el-input type="textarea" v-model="approveRecordData.opinion"></el-input>
            </el-form-item>
            <el-form-item label="* 是否同意">
              <el-radio-group v-model="approveRecordData.applyStatus">
                <el-radio label="Y">同意</el-radio>
                <el-radio label="N">不同意</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button type="info" plain @click="hideVisible"> 关闭</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="top" type="border-card">
        <el-tab-pane label="待审核数据" name="second">
          <!-- 按钮区域 -->
          <div style="margin-bottom:10px;">
            <!-- <el-button  type="default" class="el-icon-circle-chec" plain @click="toggleSelection([tableData3[1], tableData3[2]])">
              全选
            </el-button> -->
            <el-button type="info" class="el-icon-edit-outline" plain @click="showVisible">
              审核
            </el-button>
          </div>
          <div class="clearfix"></div>

          <!-- 数据表 -->
          <dynamicTable :data="tableDataTodo" :tableHeader="tableTodoHeader" isdynamic style="width: 100%">
            <el-table-column label="操作" width="155">
              <template slot-scope="scope">
                <el-button size="medium" type="text" class="el-icon-arrow-right"> 详情</el-button>
              </template>
            </el-table-column>
          </dynamicTable>

          <!-- 分页 -->
          <div style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.dataCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核数据" name="third">
          <div style="margin-bottom:10px;">
            <!-- <el-button  type="default" class="el-icon-circle-chec" plain @click="toggleSelection([tableData3[1], tableData3[2]])">
              全选
            </el-button> -->
            <el-button type="info" class="el-icon-edit-outline" plain @click="showVisible">
              审核
            </el-button>
          </div>
          <!-- 数据表 -->
          <dynamicTable :data="tableDataDone" :tableHeader="tableDoneHeader" isdynamic style="width: 100%">
            <el-table-column label="操作" width="155">
              <template slot-scope="scope">
                <el-button size="medium" type="text" class="el-icon-arrow-right"> 详情</el-button>
              </template>
            </el-table-column>
          </dynamicTable>
          <!-- 分页 -->
          <div style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pagination2.currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagination2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination2.dataCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </page>
</template>
<script>
import {
  getNodeInfo,
  queryTodo,
  queryDone,
  approveRecord
} from "~/api/taskData";
import { ProjectProgress } from "~/views/task/components/Progress";
import elDragDialog from "~/directive/el-dragDialog"; // base on element-ui
import dynamicTable from "~/components/DynamicTable"; // base on element-ui

export default {
  directives: { elDragDialog },
  components: { ProjectProgress, dynamicTable },
  data() {
    return {
      nodeNo: this.$route.query.nodeNoProp, //----这是传过来的节点编号
      approveRecordData: {
        opinion: "",
        applyStatus: "Y",
        nodeNo: this.$route.query.nodeNoProp,
        blocks: []
      },
      pagination: { dataCount: 0, currentPage: 1, pageSize: 10 }, //未审核分页
      pagination2: { dataCount: 0, currentPage: 1, pageSize: 10 }, //已审核分页

      nodeInfo: {},
      dialogTableVisible: false,
      data: [],
      activeName: "second",
      tableDataTodo: [
        {
          apply_user_classify_no: "fruit-1",
          apply_info: "apple-10",
          huping_info: "banana-10",
          zuping_info: "orange-10"
        }
      ],
      tableDataDone: [],
      multipleSelection: [],
      tableTodoHeader: [
        {
          label: "用户对象编号",
          width: 120,
          prop: "apple",
          children: []
        },
        {
          label: "业务申请",
          prop: "huping_info",
          children: [
            {
              label: "申请人",
              width: 120,
              prop: "apply_user_id"
            },
            {
              label: "所在机构",
              width: 120,
              prop: "apply_user_org"
            },
            {
              label: "业务类别",
              width: 120,
              prop: "ywsq-201807.data.serviceType"
            },
            {
              label: "子业务",
              width: 120,
              prop: "ywsq-201807.data.childServiceType"
            },
            {
              label: "申请时间",
              width: 120,
              prop: "apply_time"
            },
            {
              label: "申请人职务",
              width: 120,
              prop: "apply_user_duty"
            }
          ]
        },
        {
          label: "班级互评",
          prop: "bjhp",
          children: [
            {
              label: "同意",
              width: 120,
              prop: "bjhpY.selectionNum"
            },
            {
              label: "不同意",
              width: 120,
              prop: "bjhpN.selectionNum"
            }
          ]
        },
        {
          label: "小组评议",
          prop: "xzpi",
          children: [
            { label: "同意", width: 120, prop: "xzpyY.selectionNum" },
            { label: "不同意", width: 120, prop: "xzpyN.selectionNum" }
          ]
        }
      ],
      tableDoneHeader: [
        {
          label: "用户对象编号",
          width: 120,
          prop: "apple",
          children: []
        },
        {
          label: "业务申请",
          prop: "huping_info",
          children: [
            {
              label: "申请人",
              width: 120,
              prop: "apply_user_id"
            },
            {
              label: "所在机构",
              width: 120,
              prop: "apply_user_org"
            },
            {
              label: "业务类别",
              width: 120,
              prop: "ywsq-201807.data.serviceType"
            },
            {
              label: "子业务",
              width: 120,
              prop: "ywsq-201807.data.childServiceType"
            },
            {
              label: "申请时间",
              width: 120,
              prop: "apply_time"
            },
            {
              label: "申请人职务",
              width: 120,
              prop: "apply_user_duty"
            }
          ]
        },
        {
          label: "班级互评",
          prop: "bjhp",
          children: [
            {
              label: "同意",
              width: 120,
              prop: "bjhpY"
            },
            {
              label: "不同意",
              width: 120,
              prop: "bjhpN"
            }
          ]
        },
        {
          label: "小组评议",
          prop: "xzpi",
          children: [
            { label: "同意", width: 120, prop: "xzpyY" },
            { label: "不同意", width: 120, prop: "xzpyN" }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    // 下面是未审核的分页事件
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.queryTodoData();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.queryTodoData();
    },
    // 下面是已审核的分页事件
    handleSizeChange2(val) {
      this.pagination2.pageSize = val;
      this.queryDoneData();
    },
    handleCurrentChange2(val) {
      this.pagination2.currentPage = val;
      this.queryDoneData();
    },
    handleClose(tag) {
      this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      console.log(val);
    },
    onSubmit() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("您没有选择任何数据!");
        return;
      }

      var that = this;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var d = {
          recordId: this.multipleSelection[i].id,
          applyDataNo: this.multipleSelection[i].data_no,
          userHashCode: this.multipleSelection[i].apply_user_hash_code
        };
        this.approveRecordData.blocks.push(d);
      }
      approveRecord(this.approveRecordData).then(data => {
        that.approveRecordData.blocks = [];
        that.queryTodoData();
        that.queryDoneData();
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showVisible() {
      this.dialogTableVisible = true;
    },
    hideVisible() {
      this.dialogTableVisible = false;
    },
    queryTodoData() {
      var that = this;
      var queryTodeConfig = this.pagination;
      queryTodeConfig.nodeNo = this.nodeNo;
      queryTodo(queryTodeConfig).then(response => {
        that.tableDataTodo = response.resBody.resultList;
        for (var i = 0; i < response.resBody.resultList.length; i++) {
          if (response.resBody.resultList[i]["bjhp-201710"] != null) {
            if (
              (response.resBody.resultList[i][
                "bjhp-201710"
              ].data.items[0].itemValue =
                "Y")
            ) {
              that.tableDataTodo[i].bjhpY =
                response.resBody.resultList[i]["bjhp-201710"].data.items[0];
              that.tableDataTodo[i].bjhpN =
                response.resBody.resultList[i]["bjhp-201710"].data.items[1];
            } else {
              that.tableDataTodo[i].bjhpY =
                response.resBody.resultList[i]["bjhp-201710"].data.items[1];
              that.tableDataTodo[i].bjhpN =
                response.resBody.resultList[i]["bjhp-201710"].data.items[0];
            }
          }
          if (response.resBody.resultList[i]["xzpy-201710"] != null) {
            if (
              (response.resBody.resultList[i][
                "xzpy-201710"
              ].data.items[0].itemValue =
                "Y")
            ) {
              that.tableDataTodo[i].xzpyY =
                response.resBody.resultList[i]["xzpy-201710"].data.items[0];
              that.tableDataTodo[i].xzpyN =
                response.resBody.resultList[i]["xzpy-201710"].data.items[1];
            } else {
              that.tableDataTodo[i].xzpyY =
                response.resBody.resultList[i]["xzpy-201710"].data.items[1];
              that.tableDataTodo[i].xzpyN =
                response.resBody.resultList[i]["xzpy-201710"].data.items[0];
            }
          }
        }
        console.log(that.tableDataTodo);
        that.pagination.dataCount = response.resBody.page.totalRecord;
      });
    },
    queryDoneData() {
      var that = this;
      var queryDoneConfig = this.pagination2;
      queryDoneConfig.nodeNo = this.nodeNo;
      queryDone(queryDoneConfig).then(response => {
        that.tableDataDone = response.resBody.resultList;
        for (var i = 0; i < response.resBody.resultList.length; i++) {
          if (response.resBody.resultList[i]["bjhp-201710"] != null) {
            if (
              (response.resBody.resultList[i][
                "bjhp-201710"
              ].data.items[0].itemValue =
                "Y")
            ) {
              that.tableDataDone[i].bjhpY =
                response.resBody.resultList[i]["bjhp-201710"].data.items[0];
              that.tableDataDone[i].bjhpN =
                response.resBody.resultList[i]["bjhp-201710"].data.items[1];
            } else {
              that.tableDataDone[i].bjhpY =
                response.resBody.resultList[i]["bjhp-201710"].data.items[1];
              that.tableDataDone[i].bjhpN =
                response.resBody.resultList[i]["bjhp-201710"].data.items[0];
            }
          }
          if (response.resBody.resultList[i]["xzpy-201710"] != null) {
            if (
              (response.resBody.resultList[i][
                "xzpy-201710"
              ].data.items[0].itemValue =
                "Y")
            ) {
              that.tableDataDone[i].xzpyY =
                response.resBody.resultList[i]["xzpy-201710"].data.items[0];
              that.tableDataDone[i].xzpyN =
                response.resBody.resultList[i]["xzpy-201710"].data.items[1];
            } else {
              that.tableDataDone[i].xzpyY =
                response.resBody.resultList[i]["xzpy-201710"].data.items[1];
              that.tableDataDone[i].xzpyN =
                response.resBody.resultList[i]["xzpy-201710"].data.items[0];
            }
          }
        }
        that.pagination2.dataCount = response.resBody.page.totalRecord;
      });
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      );
      this.key = this.key + 1; // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  mounted() {
    var that = this;
    // 获取节点信息
    var getNodeInfoConfig = {
      nodeNo: this.nodeNo
    };
    getNodeInfo(getNodeInfoConfig).then(response => {
      this.nodeInfo = response.resBody;
    });
    this.queryTodoData();
    this.queryDoneData();
    // --------------------------
  }
};
</script>
<style lang="scss" scoped>
</style>
