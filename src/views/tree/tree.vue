
<template>
  <page>
    <span slot="title">项目管理</span>
    
    <div slot="panel">
      <div class="head">
        <div>
          <el-button type="primary" size="small" icon="el-icon-plus">新建项目</el-button>
        </div>

        <div class="title">
           <i class="el-icon-arrow-left circle"  @click="leftDate()"></i>
          <strong >{{dateConfig.month+1}}月 / {{dateConfig.year}}年</strong>
          <i class="el-icon-arrow-right circle"  @click="rightDate()"></i>
        </div>
        
        <div>
          <a href="/">帮助说明</a>
        </div>
      </div>

      <tree-table :data="data" :columns="columns" :expandAll=false border></tree-table>
      <br/>
     <p>0:未开始</p> <p> 1:已经开始计划时间</p>
     
    </div>
  </page>

</template>

<script>
import treeTable from '~/components/TreeTable'

import jsCalendar from 'js-calendar'
var generator = new jsCalendar.Generator({ onlyDays: true })

export default {
  name: 'treeTableDemo',
  components: { treeTable },
  data() {
    return {
      columns: [],
      data: [
        {
          id: '内蒙古大学2017年上学期学生贫困建档项目',
          event: '内大2017年上学期学生贫困建档',
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
      ],
      dates: null,
      dateConfig: {
        year: null,
        month: null
      }
    }
  },
  created: function() {
    const date = new Date()
    this.dateConfig.year = date.getFullYear()
    this.dateConfig.month = date.getMonth()
  },
  watch: {
    dateConfig: {
      handler: function(val, oldVal) {
        this.dates = generator(this.dateConfig.year, this.dateConfig.month)

        var name = ''

        this.columns = []
        this.columns[0] = {
          text: '项目/时间',
          value: 'event'

        }
        for (let index = 0; index < this.dates.daysInMonth; index++) {
          name = 'data' + (index + 1).toString()
          this.columns[index + 1] = {
            text: (index + 1).toString(),
            value: name,
            width: 40
          }
          if (index > 12 && index < 29) { Object.defineProperty(this.data[0], name, { value: '1' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][0], name, { value: '0' }) }
          if (index > 12 && index < 27) { Object.defineProperty(this.data[0]['children'][1], name, { value: '1' }) }
          if (index > 22 && index < 27) { Object.defineProperty(this.data[0]['children'][1]['children'][0], name, { value: '1' }) }
          if (index > 16 && index < 22) { Object.defineProperty(this.data[0]['children'][1]['children'][1], name, { value: '1' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][1]['children'][2], name, { value: '0' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][1]['children'][2]['children'][0], name, { value: '0' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][1]['children'][2]['children'][0]['children'][0], name, { value: '0' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][1]['children'][2]['children'][0]['children'][1], name, { value: '0' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][1]['children'][2]['children'][0]['children'][2], name, { value: '0' }) }
          if (index > 12 && index < 14) { Object.defineProperty(this.data[0]['children'][1]['children'][2]['children'][1], name, { value: '0' }) }
        }
      },
      deep: true
    }
  },
  methods: {
    leftDate() {
      if (this.dateConfig.month < 1) {
        this.dateConfig.year--
        this.dateConfig.month = 11
        return
      }
      this.dateConfig.month -= 1
    },
    rightDate() {
      if (this.dateConfig.month > 10) {
        this.dateConfig.year++
        this.dateConfig.month = 0
        return
      }
      this.dateConfig.month += 1
    }
  }

}
</script>

<style lang="scss" >
.el-table th {
  align-content: center !important;
}
.head {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  div {
    flex: auto;
  }
  div:last-child {
    display: flex;
    justify-content: flex-end;
  }
  .title {
    display: flex;
    justify-content: center; 
    align-items: center;
  }
  .title > *{
    margin-left: 15px;
  }
  .circle{
    padding: 6px;
    font-size: 18px;
    color: var(--color-grey-light-1);
    border: 1px solid var(--color-grey-light-3);
    border-radius: 50%;
  }
}
</style>
