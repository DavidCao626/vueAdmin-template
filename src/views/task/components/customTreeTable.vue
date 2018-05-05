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

              <el-tooltip class="item" effect="dark" content="新建" placement="bottom">
                <el-button type="text" class="el-icon-edit"></el-button>
              </el-tooltip>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogTable(scope.row,'task')">任务</el-dropdown-item>
              <el-dropdown-item @click.native="dialogTable(scope.row,'facade')">工序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
              <el-button type="text" @click="updateDialog(scope.row,'P')" class="el-icon-edit-outline" size="medium"></el-button>
            </el-tooltip>
         

          <el-tooltip class="item" effect="dark" content="配置约束" placement="bottom">
            <el-button type="text" @click="message(scope.row)" class="el-icon-setting" size="medium"></el-button>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="分配参与者" placement="bottom">
           <router-link to="/task/taskParticipant" ><el-button type="text" @click="message(scope.row)" class="el-icon-news" size="medium"></el-button></router-link>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="启动" placement="bottom">
            <el-button type="text" @click="message(scope.row)" class="el-icon-caret-right" size="medium"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="完成" placement="bottom">
            <el-button type="text" @click="message(scope.row)" class="el-icon-check" size="medium"></el-button>
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
  queryChildTaskNodeBySystemSerialNo
} from '~/api/task'
import addTaskNode from './../addTaskNode'
import addTaskFacade from './../addTaskFacade'
import updateTaskProject from './../updateTaskProject'
import updateTaskNode from './../updateTaskNode'
import updateTaskFacade from './../updateTaskFacade'
export default {
  name: 'customTreeTableDemo',
  components: { treeTable, addTaskNode, addTaskFacade, updateTaskFacade, updateTaskNode, updateTaskProject },
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
      data: [
        {
          id: 1,
          nodeTitle: '内大2017年贫困建党',
          timeLine: 75,
          comment: '无',
          children: [
            {
              id: 2,
              nodeTitle: '事件2',
              timeLine: 100,
              comment: '无'
            },
            {
              id: 3,
              nodeTitle: '事件3',
              timeLine: 32,
              comment: '无',
              children: [
                {
                  id: 4,
                  nodeTitle: '事件4',
                  timeLine: 0,
                  comment: '无'
                },
                {
                  id: 5,
                  nodeTitle: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  nodeTitle: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      nodeTitle: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          nodeTitle: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          nodeTitle: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          nodeTitle: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      nodeTitle: '事件8',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      args: [null, null, 'timeLine']
    }
  },
  mounted: function() {
    new Promise((resolve, reject) => {
      queryNodeByLiblerld().then(response => {
        var l = []
        response.resBody.forEach(element => {
          l.push({
            id: element.id,
            nodeTitle: element.nodeTitle,
            type: element.nodeType,
            parentNodeNo: element.parentNodeNo,
            No: element.systemSerialNo,
            creater: element.creater,
            timeLine: element.id,
            bgintime: element.planStartTime,
            endtime: element.planCompleteTime,
            children: [{}]
          })
        })
        var ls = this.data.concat(l)
        this.data = ls
      })
    })
    new Promise((resolve, reject) => {
      queryChildTaskNodeBySystemSerialNo().then(response => {
        console.log(response.resBody)
      })
    })
  },
  methods: {

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
    message(row) {
      this.$message.info(row.nodeTitle)
    }
  }
}
</script>