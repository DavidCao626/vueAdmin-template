<template>
  <div>

    <div class="components-container">
      <el-dialog v-el-drag-dialog title="新建子任务" :visible.sync="dialogTableVisible">
        <addTaskNode :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></addTaskNode>
      </el-dialog>
      <el-dialog v-el-drag-dialog title="新建工序" :visible.sync="dialogTableVisibleFacade">
        <addTaskFacade :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></addTaskFacade>
      </el-dialog>
      <el-dialog v-el-drag-dialog title="修改项目" :visible.sync="dialogTableVisibleUpdateProject">
        <updateTaskProject :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></updateTaskProject>
      </el-dialog>
      <el-dialog v-el-drag-dialog title="修改任务" :visible.sync="dialogTableVisibleUpdateTask">
        <updateTaskNode :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></updateTaskNode>
      </el-dialog>
      <el-dialog v-el-drag-dialog title="修改工序" :visible.sync="dialogTableVisibleUpdateFacade">
        <updateTaskFacade :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></updateTaskFacade>
      </el-dialog>
      <el-dialog v-el-drag-dialog title="新增约束" :visible.sync="dialogTableVisibleAddRestrict">
        <addTaskNodeRestrict :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></addTaskNodeRestrict>
      </el-dialog>
      <el-dialog v-el-drag-dialog title="修改约束" :visible.sync="dialogTableVisibleUpdateRestrict">
        <updateTaskNodeRestrict :rootNodeNo="rootNodeNo" :parentNodeNo="parentNodeNo"></updateTaskNodeRestrict>
      </el-dialog>
    </div>

    <tree-table :data="data" :evalFunc="func" :columns="columns" :evalArgs="args" :expandAll="expandAll" border>

      <el-table-column label="完成进度">
        <template slot-scope="scope">

          <div class="processContainer">

            <el-progress v-if="scope.row.timeLine==100" :percentage="scope.row.timeLine" status="success"></el-progress>
            <el-progress v-if="scope.row.timeLine<100" :percentage="scope.row.timeLine"></el-progress>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-dropdown size="medium" trigger="click">

            <span class="el-dropdown-link" style="margin-left: 15px;">

              <el-button type="text" class="el-icon-edit-outline"></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogTable(scope.row,'task')">任务</el-dropdown-item>
              <el-dropdown-item @click.native="dialogTable(scope.row,'facade')">工序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
            <el-button type="text" @click="updateDialog(scope.row,'P')" class="el-icon-edit" size="medium"></el-button>
          </el-tooltip>

          <el-dropdown size="medium" trigger="click">

            <span class="el-dropdown-link" style="">
              <el-button type="text" class="el-icon-setting"></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="Restrict(scope.row,'add')">配置约束</el-dropdown-item>
              <el-dropdown-item @click.native="Restrict(scope.row,'updete')">修改约束</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-tooltip class="item" effect="dark" content="分配参与者" placement="bottom">
            <router-link to="/task/taskParticipant">
              <el-button type="text" class="el-icon-news" size="medium"></el-button>
            </router-link>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启动" placement="bottom">
            <el-button type="text" @click="Start(scope.row)" class="el-icon-caret-right" size="medium"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="停止" placement="bottom">
            <el-button type="text" @click="stop(scope.row)" class="el-icon-check" size="medium" style="margin-left: 0px;"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
            <router-link to="/task/nodeDate">
              <el-button type="text" class="el-icon-arrow-right" size="medium" style="margin-left: 0px;"></el-button>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import elDragDialog from '~/directive/el-dragDialog' // base on element-ui
import treeTable from '~/components/TreeTable'
import treeToArray from './customEval'
import {
  queryNodeByLiblerld,
  queryChildTaskNodeBySystemSerialNo,
  completedNode,
  startNode
} from '~/api/task'
import addTaskNode from './../addTaskNode'
import addTaskFacade from './../addTaskFacade'
import updateTaskProject from './../updateTaskProject'
import updateTaskNode from './../updateTaskNode'
import updateTaskFacade from './../updateTaskFacade'
import addTaskNodeRestrict from './../addTaskNodeRestrict'

import updateTaskNodeRestrict from './../updateTaskNodeRestrict'
import dataBuilder from './ItemFacctory'

// var itemData = {
//   No: 'P15256087592557662',
//   bgintime: '2018-05-01',
//   children: [],
//   creater: 'student',
//   endtime: '2018-05-22',
//   id: undefined,
//   nodeTitle: '测试项目1',
//   parentNodeNo: null,
//   timeLine: undefined,
//   type: 'P',
//   _expanded: false,
//   _level: 1,
//   _marginLeft: 0,
//   _show: true,
//   _width: 1
// }

export default {
  name: 'customTreeTableDemo',
  components: {
    treeTable,
    addTaskNode,
    addTaskFacade,
    updateTaskFacade,
    updateTaskNode,
    updateTaskProject,
    addTaskNodeRestrict,
    updateTaskNodeRestrict
  },
  directives: { elDragDialog },
  data() {
    return {
      rootNodeNo: 0,
      parentNodeNo: 0,
      dialogTableVisible: false,
      dialogTableVisibleFacade: false,
      dialogTableVisibleUpdateProject: false,
      dialogTableVisibleUpdateTask: false,
      dialogTableVisibleUpdateFacade: false,
      dialogTableVisibleAddRestrict: false,
      dialogTableVisibleUpdateRestrict: false,
      func: treeToArray,
      expandAll: false,
      columns: [
        {
          text: '项目名称',
          value: 'nodeTitle',
          width: 500
        },
        {
          text: '类型',
          value: 'type',
          width: 50
        },
        {
          text: '编号',
          value: 'No',
          width: 150
        },
        {
          text: '项目负责人',
          value: 'creater',
          width: 90
        },
        {
          text: '开始时间',
          value: 'bgintime',
          width: 90
        },
        {
          text: '结束时间',
          value: 'endtime',
          width: 90
        }
      ],
      data: [],
      args: [null, null, 'timeLine']
    }
  },
  mounted: function() {
    new Promise((resolve, reject) => {
      queryNodeByLiblerld().then(response => {
        var l = []
        console.log(response.resBody.dataCount)
        response.resBody.data.forEach(element => {
          var item = {
            id: element.id,
            nodeTitle: element.nodeTitle,
            type: element.nodeType,
            parentNodeNo: element.parentNodeNo,
            No: element.systemSerialNo,
            creater: element.creater,
            timeLine: element.id,
            bgintime: element.planStartTime,
            endtime: element.planCompleteTime,
            _expanded: false
          }
          if (element.isLeafNode === 'N') {
            item.children = []
          }
          item = dataBuilder.call(null, item, null)
          l.push(item)
        })
        var ls = this.data.concat(l)
        this.data = ls
      })
    })
  },
  methods: {
    Restrict(item, act) {
      if (act === 'add') {
        this.rootNodeNo = item.rootNodeNo
        this.parentNodeNo = item.parentNodeNo
        this.dialogTableVisibleAddRestrict = true
      } else {
        this.rootNodeNo = item.rootNodeNo
        this.parentNodeNo = item.parentNodeNo
        this.dialogTableVisibleUpdateRestrict = true
      }
    },
    dialogTable(item, act) {
      if (item.type === 'P') {
        this.rootNodeNo = item.No
        this.parentNodeNo = item.No
      } else {
        this.rootNodeNo = item.rootNodeNo
        this.parentNodeNo = item.parentNodeNo
      }

      if (act === 'task') {
        this.dialogTableVisible = true
      } else {
        this.dialogTableVisibleFacade = true
      }
    },
    updateDialog(row) {
      this.rootNodeNo = row.rootNodeNo
      this.parentNodeNo = row.parentNodeNo
      if (row.type === 'P') {
        this.dialogTableVisibleUpdateProject = true
      } else if (row.type === 'N') {
        this.dialogTableVisibleUpdateTask = true
      } else {
        this.dialogTableVisibleUpdateFacade = true
      }
    },
    Start(row) {
      new Promise((resolve, reject) => {
        startNode(row.No).then(response => {
          console.log(response.resBody)
        })
      })
    },
    stop(row) {
      new Promise((resolve, reject) => {
        completedNode(row.No).then(response => {
          console.log(response.resBody)
        })
      })
    },
    message(row) {
      this.$message.info(row.nodeTitle)
    }
  }
}
</script>