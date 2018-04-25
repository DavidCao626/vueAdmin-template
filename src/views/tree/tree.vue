
<template>
    <page>
        <span slot="title">任务管理</span>

        <div slot="panel">
            内蒙古大学2017年上学期学生贫困建档项目
         <tree-table :data="data" :columns="columns" border></tree-table>
         </div>
    </page>
   

</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '~/components/TreeTable'
export default {
  name: 'treeTableDemo',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '发起单位',
          value: 'event',
          width: 400
        },
        {
          text: '任务名称',
          value: 'id'
        },
        {
          text: '任务状态',
          value: 'timeLine'
        },
        {
          text: '操作',
          value: 'comment'
        }
      ],
      data: [
        {
          id: '内蒙古大学2017年上学期学生贫困建档项目',
          event: '内蒙古大学学工处',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: '-',
              event: '计算机学院（软件学院）',
              timeLine: 10,
              comment: '无'
            },
            {
              id: '-',
              event: '蒙古学学院',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: '-',
                  event: '蒙古语言文学系',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: '-',
                  event: '新闻出版学系',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: '-',
                  event: '蒙古历史系',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: '-',
                      event: '2015级',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: '-',
                          event: '1班',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: '-',
                          event: '2班',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: '-',
                          event: '3班',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: '-',
                      event: '2016级',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>