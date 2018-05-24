<template>
  <div>

    <div class="components-container">
      <el-dialog v-el-drag-dialog :title="dialogTitle" :visible.sync="dialogShow">
         <keep-alive>
          <component :is="dynamicView" :rootNodeNoProp="rootNodeNo" :parentNodeNoProp="parentNodeNo" :systemSerialNoProp="systemSerialNo"></component>
         </keep-alive>
      </el-dialog>

    </div>

    <tree-table v-loading="treeTableDV" @getItemDate="getItemDate" @closeItemDate="closeItemDate" :showIndex="showIndex" :data="data" :evalFunc="func" :columns="columns" :evalArgs="args" :expandAll="expandAll">

      <el-table-column label="完成进度" width="100">
        <template slot-scope="scope">

          <div class="processContainer">

            <el-progress v-if="scope.row.timeLine==100" :percentage="scope.row.timeLine" status="success"></el-progress>
            <el-progress v-if="scope.row.timeLine<100" :percentage="scope.row.timeLine"></el-progress>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="配置" width="250">
        <template slot-scope="scope">
          <el-dropdown size="medium" trigger="click">

            <span class="el-dropdown-link">

              <el-button type="text" size="medium">
                创建
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogTable(scope.row,'task')">任务</el-dropdown-item>
              <el-dropdown-item @click.native="dialogTable(scope.row,'facade')">工序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
            <el-button type="text" @click="updateDialog(scope.row,'P')" size="medium"> 修改
              <!-- <i class="el-icon-edit el-icon--right"></i> -->
            </el-button>
          </el-tooltip>

          <el-dropdown size="medium" trigger="click">

            <span class="el-dropdown-link" style="">
              <el-button type="text" size="medium">
                配置
                <!-- <i class="el-icon-setting el-icon--right"></i> -->
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="Restrict(scope.row,'add')">配置约束</el-dropdown-item>
              <el-dropdown-item @click.native="Restrict(scope.row,'updete')">修改约束</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <el-tooltip class="item" effect="dark" content="分配参与者" placement="bottom">
            <router-link to="/task/taskParticipant">
              <el-button type="text" class="el-icon-news" size="medium"></el-button>
            </router-link>
          </el-tooltip> -->

          <!-- 王红坤 -->
          <el-tooltip class="item" effect="dark" content="分配参与者" placement="bottom">
            <el-button type="text" plain @click="dialogTable(scope.row,'participant')" size="medium">
              参与者
              <!-- <i class="el-icon-news el-icon--right"></i> -->
            </el-button>
          </el-tooltip>
        </template>

      </el-table-column>

      <el-table-column label="操作" width="120">
        <!-- 王红坤结束 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="启动" placement="bottom">
            <el-button type="text" @click="Start(scope.row)" size="small">
              启动

            </el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="停止" placement="bottom">
            &nbsp;&nbsp;
            <el-button type="text" @click="stop(scope.row)" size="small" style="margin-left: 0px;">
              停止
              <!--   <i class="el-icon-check el-icon--right"></i> -->
            </el-button>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column label="详情" width="50">
        <!-- 王红坤结束 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
            <router-link :to="{path:'/task/nodeDate',query:{'nodeNoProp':scope.row.No}}">
              <el-button type="text" class="el-icon-arrow-right" size="medium" style="margin-left: 0px;"></el-button>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>

    </tree-table>
  </div>
</template>

<script>
import elDragDialog from "~/directive/el-dragDialog"; // base on element-ui
import treeTable from "~/components/TreeTable";
import treeToArray from "./customEval";
import {
  queryNodeByLiblerld,
  queryChildTaskNodeBySystemSerialNo,
  completedNode,
  startNode
} from "~/api/task";
import addTaskNode from "./../addTaskNode";
import addTaskFacade from "./../addTaskFacade";
import updateTaskProject from "./../updateTaskProject";
import updateTaskNode from "./../updateTaskNode";
import updateTaskFacade from "./../updateTaskFacade";
import addTaskNodeRestrict from "./../addTaskNodeRestrict";
import taskParticipant from "./../taskParticipant";
import updateTaskNodeRestrict from "./../updateTaskNodeRestrict";
import dataBuilder from "./ItemFacctory";

export default {
  name: "customTreeTableDemo",
  components: {
    treeTable,
    addTaskNode,
    addTaskFacade,
    updateTaskFacade,
    updateTaskNode,
    updateTaskProject,
    addTaskNodeRestrict,
    updateTaskNodeRestrict,
    taskParticipant
  },
  directives: { elDragDialog },
  props: {
    propsData: {}
  },
  data() {
    return {
      treeTableDV: false,
      dynamicView: addTaskNode,
      dialogShow: false,
      dialogTitle: "",
      showIndex: 0,
      rootNodeNo: 0,
      parentNodeNo: 0,
      systemSerialNo: 0,
      dialogTableVisible: false,
      dialogTableVisibleFacade: false,
      dialogTableVisibleUpdateProject: false,
      dialogTableVisibleUpdateTask: false,
      dialogTableVisibleUpdateFacade: false,
      dialogTableVisibleAddRestrict: false,
      dialogTableVisibleUpdateRestrict: false,
      dialogTableVisibleMParticipant: false, //王红坤  参与者
      func: treeToArray,
      expandAll: false,
      columns: [
        {
          text: "项目流程",
          value: "nodeTitle"
        },
        {
          text: "组织机构",
          value: "nodeOrgCode"
        },
        {
          text: "任务状态",
          value: "nodeState",
          width:80
        },
        {
          text: "类型",
          value: "type",
          width: 50
        },
        {
          text: "编号",
          value: "No",
          width: 200
        },
        {
          text: "项目负责人",
          value: "creater",
          width: 100
        },
        {
          text: "开始时间",
          value: "bgintime",
          width: 100
        },
        {
          text: "结束时间",
          value: "endtime",
          width: 100
        }
      ],
      data: [],
      args: [null, null, "timeLine"]
    };
  },
  watch: {
    propsData() {
      //debugger
      console.log(this.propsData);
      var l = [];
      this.propsData.forEach(element => {
        var item = {
          id: element.id,
          nodeTitle: element.nodeTitle,
          type: element.nodeType,
          parentNodeNo: element.parentNodeNo,
          No: element.systemSerialNo,
          creater: element.creater,
          nodeState: element.nodeState,
          nodeOrgCode: element.nodeOrgCode,
          timeLine: 45,
          bgintime: element.planStartTime,
          endtime: element.planCompleteTime,
          rootNodeNo: element.rootNodeNo,
          _expanded: false
        };
        // debugger
        if (element.isLeafNode === "N") {
          item.children = [];
        }
        item = dataBuilder.call(null, item, null);
        l.push(item);
      });
      this.data.length = 0;
      var ls = this.data.concat(l);
      this.data = ls;
    }
  },
  mounted: function() {
    if (this.propsData.length === 0) {
      new Promise((resolve, reject) => {
        this.treeTableDV = true;
        queryNodeByLiblerld().then(response => {
          this.treeTableDV = false;
          var l = [];
          this.$emit("dataCount", response.resBody.dataCount);
          response.resBody.data.forEach(element => {
            var item = {
              id: element.id,
              nodeTitle: element.nodeTitle,
              type: element.nodeType,
              parentNodeNo: element.parentNodeNo,
              No: element.systemSerialNo,
              creater: element.creater,
              nodeState: element.nodeState,
              nodeOrgCode: element.nodeOrgCode,
              timeLine: 84,
              bgintime: element.planStartTime,
              endtime: element.planCompleteTime,
              rootNodeNo: element.rootNodeNo,
              _expanded: false
            };
            if (element.isLeafNode === "N") {
              item.children = [];
            }
            if (element.isLeafNode === "N") {
              item.children = [];
            }
            item = dataBuilder.call(null, item, null);
            l.push(item);
            this.treeTableDV = false;
          });
          var ls = this.data.concat(l);
          this.data = ls;
        });
      }).catch(error => {
        this.treeTableDV = false;
      });
    }
  },
  methods: {
    //王红坤
    mParticipant(item) {
      //分配参与者
      this.systemSerialNo = item.No;
      alert("eqweqwe" + this.systemSerialNo);
       this.dynamicView = taskParticipant
      this.dialogTableVisibleMParticipant = true;
    },
    //王红坤结束
    getItemDate(trIndex, scope) {
      var th = this;
      th.treeTableDV = true;
      /* var item = {
        No: 'P15256087592557662',
        bgintime: '2018-05-01',
        children: [],
        creater: 'student',
        endtime: '2018-05-22',
        id: undefined,
        nodeTitle: '545645',
        parentNodeNo: null,
        timeLine: 'timeLine',
        type: 'N'
      }()*/
      //
      var p1 = new Promise((resolve, reject) => {
        queryChildTaskNodeBySystemSerialNo(scope.row.No).then(response => {
          th.treeTableDV = false;
          if (response.resBody.length > 0) {
            response.resBody.forEach((element, index) => {
              var item = {
                id: element.id,
                nodeTitle: element.nodeTitle,
                type: element.nodeType,
                parentNodeNo: element.parentNodeNo,
                rootNodeNo: element.rootNodeNo,
                No: element.systemSerialNo,
                creater: element.creater,
                nodeState: element.nodeState,
                nodeOrgCode: element.nodeOrgCode,
                timeLine: 62,
                bgintime: element.planStartTime,
                endtime: element.planCompleteTime
              };
              if (element.isLeafNode === "N") {
                item.children = [];
              }
              item = dataBuilder(item, scope.row, "timeLine");
              console.log(item);

              th.data.splice(trIndex + 1, 0, item);
              this.showIndex = index;
              // alert(this.showIndex)
            });
          } else {
            this.showIndex = 0;
            // alert(this.showIndex)
            reject(response);
          }
        });
      });
      p1.then(function(result) {
        // debugger

        console.log(th.data);
      });
      p1.catch(function(reason) {});
      const record = th.data[trIndex];
      record._expanded = !record._expanded;
    },
    closeItemDate(trIndex, showCount) {
      //console.log(trIndex+showCount)
      // debugger
      this.data.splice(trIndex + 1, showCount + 1);
    },
    Restrict(item, act) {
      alert(item.No);
      if (act === "add") {
        this.systemSerialNo = item.No;
        //this.parentNodeNo = item.parentNodeNo;
        this.dialogTableVisibleAddRestrict = true;
      } else {
        this.systemSerialNo = item.No;
        //this.parentNodeNo = item.parentNodeNo;
        this.dialogTableVisibleUpdateRestrict = true;
      }
    },
    dialogTable(item, act) {
      if (item.type === "P") {
        this.rootNodeNo = item.No;
        this.parentNodeNo = item.No;
      } else {
        this.rootNodeNo = item.rootNodeNo;
        this.parentNodeNo = item.No;
      }
      this.systemSerialNo = item.No;
      //  this.dynamicView = taskParticipant
      // this.dialogTableVisibleMParticipant = true;
      console.log(["新建子节点上级节点的编号 ", item.No]);
      if (act === "task") {
        //this.dialogTableVisible = true
        this.dynamicView = addTaskNode;
        this.dialogShow = true;
        this.dialogTitle = "新建任务";
        //alert(item.rootNodeNo)
      } else if (act === "facade") {
        this.dynamicView = addTaskFacade;
        this.dialogShow = true;
        this.dialogTitle = "新建工序";
      } else if (act === "restrict") {
        this.dynamicView = addTaskNodeRestrict;
        this.dialogShow = true;
        this.dialogTitle = "新建约束";
      } else if (act === "participant") {
        this.dynamicView = taskParticipant;
        this.dialogShow = true;
        this.dialogTitle = "配置参与者";
      }
    },
    updateDialog(row) {
      this.rootNodeNo = row.rootNodeNo;
      this.parentNodeNo = row.parentNodeNo;
      this.systemSerialNo = row.No;

      if (row.type === "P") {
        this.dynamicView = updateTaskProject;
        this.dialogShow = true;
        this.dialogTitle = "更新项目";
      } else if (row.type === "N") {
        this.dynamicView = updateTaskNode;
        this.dialogShow = true;
        this.dialogTitle = "更新节点";
      } else {
        this.dynamicView = updateTaskFacade;
        this.dialogShow = true;
        this.dialogTitle = "更新工序";
      }
    },
    Start(row) {
      new Promise((resolve, reject) => {
        startNode({ systemSerialNo: row.No }).then(response => {
          console.log(response.resBody);
        });
      });
    },
    stop(row) {
      new Promise((resolve, reject) => {
        completedNode({ systemSerialNo: row.No }).then(response => {
          console.log(response.resBody);
        });
      });
    },
    message(row) {
      this.$message.info(row.nodeTitle);
    }
  }
};
</script>