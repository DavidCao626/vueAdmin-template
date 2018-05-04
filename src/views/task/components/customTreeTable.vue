<template>
    <div>

        <tree-table :data="data" :evalFunc="func" :columns="columns" :evalArgs="args" :expandAll="expandAll" border >
<el-table-column label="时间线" >
        <template slot-scope="scope">
          <el-tooltip effect="dark"  placement="bottom">
            <!-- :content="scope.row.timeLine+'ms'" -->
             <!-- <div slot="content">开始时间:2016-1-02~2017-02-30</div> -->
            <div class="processContainer">开始时间:2016-1-02~2017-02-30
             <div class="process" :style="{ width:scope.row._width * 500+'px',
              background:scope.row._width>0.5?'rgba(233,0,0,.5)':'rgba(0,0,233,0.5)',
              marginLeft:scope.row._marginLeft * 500+'px' }">
                <span style="display:inline-block"></span>
               
              </div>
              
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
            <el-table-column label="完成进度"  width="150">
                <template slot-scope="scope">
                       
                        <div class="processContainer">

                          <el-progress v-if="scope.row.timeLine==100" :percentage="scope.row.timeLine" status="success"></el-progress>
                          <el-progress v-if="scope.row.timeLine<100" :percentage="scope.row.timeLine" ></el-progress>
                        </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-tooltip placement="bottom">
                        <div slot="content">多行信息<br/>第二行信息</div>
                        <el-button type="text" >新建任务</el-button>
                    </el-tooltip>
                    <el-button type="text" @click="message(scope.row)" disabled>启动</el-button>
                    <el-button type="text" @click="message(scope.row)" disabled>暂停</el-button>
                </template>
            </el-table-column>
        </tree-table>
    </div>
</template>

<script>

import treeTable from '~/components/TreeTable'
import treeToArray from './customEval'
import { queryNodeByLiblerld } from '~/api/task'
export default {
  name: 'customTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      columns: [
        {
          text: '项目名称',
          value: 'event',
          width: 300
        }
      ],
      data: [
        {
          id: 1,
          event: '内大2017年贫困建党',
          timeLine: 75,
          comment: '无',
          children: [
            {
              id: 2,
              event: '事件2',
              timeLine: 100,
              comment: '无'
            },
            {
              id: 3,
              event: '事件3',
              timeLine: 32,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '事件4',
                  timeLine: 0,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          event: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          event: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '事件8',
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
      queryNodeByLiblerld()
        .then(response => {
          var l = []
          response.resBody.forEach(element => {
            l.push({ 'id': element.id, 'event': element.nodeTitle, 'timeLine': element.id })
          })
          var ls = this.data.concat(l)
          this.data = ls
        })
    })
    console.log(this.data)
  },
  methods: {
    message(row) {
      this.$message.info(row.event)
    }
  }
}
</script>