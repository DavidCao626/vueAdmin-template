<template>
    <div>

        <tree-table :data="data" :evalFunc="func" :columns="columns" :evalArgs="args" :expandAll="expandAll">

            <el-table-column label="时间线">
                <template slot-scope="scope">
                    <el-tooltip effect="light" placement="bottom">
                        <div slot="content">开始时间:2016-1-02~结束:2017-02-30</div>
                        <div class="processContainer">
                           <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
                        </div>
                    </el-tooltip>
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
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '~/components/TreeTable'
import treeToArray from './customEval'
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
          width: 200
        }
      ],
      data: {
        id: 1,
        event: '内大2017年贫困建党',
        timeLine: 100,
        comment: '无',
        children: [
          {
            id: 2,
            event: '事件2',
            timeLine: 10,
            comment: '无'
          },
          {
            id: 3,
            event: '事件3',
            timeLine: 90,
            comment: '无',
            children: [
              {
                id: 4,
                event: '事件4',
                timeLine: 5,
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
      },
      args: [null, null, 'timeLine']
    }
  },
  methods: {
    message(row) {
      this.$message.info(row.event)
    }
  }
}
</script>