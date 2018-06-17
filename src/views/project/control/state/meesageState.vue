<template>
  <div>
    <span>&nbsp;&nbsp;项目开始时间：
      <strong>{{ProjectStatusBeginDate}}</strong>
    </span>
    <span>&nbsp;&nbsp;项目结束时间：
      <strong>{{ProjectStatusEndDate}}</strong>
    </span>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总共
      <strong>{{ProjectStatusCountDays}}</strong>天&nbsp;&nbsp;&nbsp; 当前已分配：
      <strong>{{getCountDays}}</strong> 天 </span>
    <span>&nbsp;&nbsp;剩余可分配：
      <strong style="color:red">{{ getProjectStatusRemainingCountDays}}</strong> 天</span>

    <div style="height:25px"></div>
    <el-form label-position="top" ref="form" label-width="100px" style="margin-left:30px; margin-right:30px;">

      <el-row class="data-rows" :gutter="0" v-for="(item,index) in ProjectStatusData" :key="index" style="border-bottom: 1px solid rgb(230, 230, 230);margin-bottom: 15px;">

        <el-col :span="6">

          <div :class="getStateOfCircle(item.item.state)">

            <div class="state-circle-text">
              <template v-if="item.item.itemType=='手动'">
                <el-badge :value="item.item.itemType" class="item">
                  <strong>{{item.item.nodeId}}</strong><br> {{item.item.stepName}}
                </el-badge>
              </template>
              <template v-else>
                <el-badge :value="item.item.itemType" class="item">
                  <strong>{{item.item.nodeId}}</strong><br> {{item.item.stepName}}
                </el-badge>
              </template>
            </div>

          </div>

        </el-col>

        <el-col :span="6">

          <el-form-item>
            <div slot="label">
              计划分配天数
            </div>
            <template v-if="item.item.itemType=='手动'">
              <el-input-number disabled style=" margin-top: 10px" size="mini" v-model="item.item.planTimeLong" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字">
              </el-input-number>

            </template>
            <template v-else>
              <el-input-number style=" margin-top: 10px" size="mini" v-model="item.item.planTimeLong" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字">
              </el-input-number>
            </template>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="计划开始时间">
            {{item.startTime==''?'未配置':item.startTime}}
          </el-form-item>
        </el-col>

        <el-col :span="6">

          <el-form-item label="计划结束时间">
            {{item.endTime==''?'未配置':item.endTime}}
          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>
      <!-- <span  class="dialog-footer" style="float:right"> 
                <el-button>返 回</el-button>
                <el-button type="primary">下 一 步</el-button>
            </span>
            <br style="float:none"/> -->
    </el-form>

  </div>
</template>

<script>
import formData from '../../addProcess/components/Data'
import formDisabledSelect from '../../addProcess/components/disabledSelect'
import {
  queryWorkItem,
  getProjectById,
  queryWorkTimeView
} from '~/api/project'
export default {
  components: {
    formData,
    formDisabledSelect
  },
  computed: {
    getCountDays() {
      let tempDays = 0 // 已分配计划天数
      this.ProjectStatusData.forEach(item => {
        tempDays = tempDays + Number(item.plannedDays)
      })
      return tempDays
    },
    getProjectStatusRemainingCountDays() {
      return this.ProjectStatusCountDays - this.getCountDays
    }
  },
  mounted: function() {
    debugger
    this.loadWorkItem()
  },
  methods: {
    loadWorkTime() {
      new Promise((resolve, reject) => {
        debugger
        var requestData = { scopeId: this.scopeId }
        // var requestData = { scopeId: 66 };
        queryWorkTimeView(requestData).then(response => {
          var tempData = []
          var i = 0
          var responseTemp = response.resBody
          for (var key in responseTemp) {
            tempData[i] = responseTemp[key]
            i++
          }
          console.log(tempData)
          for (var i = 0; i < tempData.length; i++) {
            tempData[i].item.nodeId = i + 1
            if (tempData[i].item.itemType == 'manual') {
              tempData[i].item.itemType = '手动'
            } else {
              tempData[i].item.itemType = '自动'
            }
          }
          this.ProjectStatusData = tempData
        })
      })
    },

    loadWorkItem() {
      new Promise((resolve, reject) => {
        var requestData = { scopeId: this.scopeId }
        // var requestData = { scopeId: 66 };
        queryWorkItem(requestData).then(response => {
          var tempData = []
          tempData = response.resBody
          for (var i = 0; i < tempData.length; i++) {
            tempData[i].nodeId = i + 1
            if (tempData[i].itemType == 'manual') {
              tempData[i].itemType = '手动'
            } else {
              tempData[i].itemType = '自动'
            }
          }
          console.log(['workItem数据', tempData])
          this.ProjectStatusData = tempData
        })
      })
    },
    getDays(date1, date2) {
      var date1Str = date1.split('-') // 将日期字符串分隔为数组,数组元素分别为年.月.日
      // 根据年 . 月 . 日的值创建Date对象
      var date1Obj = new Date(date1Str[0], date1Str[1] - 1, date1Str[2])
      var date2Str = date2.split('-')
      var date2Obj = new Date(date2Str[0], date2Str[1] - 1, date2Str[2])
      var t1 = date1Obj.getTime()
      var t2 = date2Obj.getTime()
      var dateTime = 1000 * 60 * 60 * 24 // 每一天的毫秒数
      var minusDays = Math.floor((t2 - t1) / dateTime) // 计算出两个日期的天数差
      var days = Math.abs(minusDays) // 取绝对值
      return days
    },
    loadProject() {
      new Promise((resolve, reject) => {
        var requestData = {
          projectId: this.projectId
        }
        getProjectById(requestData).then(response => {
          console.log(['这是项目数据', response.resBody])
          this.ProjectStatusBeginDate = response.resBody.planStartTime // 项目总开始时间
          this.ProjectStatusEndDate = response.resBody.planCompleteTime // 项目总开始时间
          var dayCount = this.getDays(
            response.resBody.planStartTime,
            response.resBody.planCompleteTime
          )
          console.log(dayCount)
          this.ProjectStatusCountDays = dayCount // 项目总天数
          this.ProjectStatusRemainingCountDays = 999 // 未分配可用天数
        })
      })
    },

    getStateOfCircle(State) {
      if (State === 'C') return 'state-circle'
      else if (State === 'S') return 'state-circle ' + 'state-circle__run'
      else return 'state-circle ' + 'state-circle__ok'
    },
    handleChange(value) {
      console.log(value)
    }
  },

  props: ['propScopeId', 'propProjectId'],
  watch: {
    propScopeId: function(newValue, oldValue) {
      this.scopeId = newValue
      // this.loadWorkItem();
      this.loadWorkTime()
    },
    propProjectId: function(newValue, oldValue) {
      this.projectId = newValue
      this.loadProject()
    }
  },

  data() {
    return {
      scopeId: this.propScopeId,
      projectId: this.propProjectId,
      ProjectStatusBeginDate: '2018-06-01', // 项目总开始时间
      ProjectStatusEndDate: '2018-09-01', // 项目总开始时间
      ProjectStatusCountDays: 246, // 项目总天数
      ProjectStatusRemainingCountDays: 2, // 未分配可用天数

      ProjectStatusData: [
        {
          item: {
            state: ''
          },
          nodeId: 9,
          nodeName: '归档',
          nodeRunType: '手动',
          nodeStatus: 0, // 0未启动，1运行中，2已完成
          plannedDays: 30,
          plannedBeginDate: '2018-06-01',
          plannedEndDate: '2018-06-01',
          actualBeginDate: '2018-06-01',
          actualEndDate: '2018-06-01',
          actualDays: 0,
          actionItems: [
            {
              actionName: '查看归档数据',
              actionUrl: '#'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
.state-circle {
  width: 90px;
  height: 90px;
  background: #f6f8f9;
  border: #cccccc 1px solid;
  color: #222;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  text-align: center;
  z-index: 1;
}
.state-circle__ok {
  background: #67c23a;
  color: #ffffff;
}
.state-circle__run {
  background: #f6f8f9;
  border: 2px solid #67c23a;
  color: #67c23a;
}

.state-circle-text {
  padding-top: 15px;
}
.data-rows:hover {
  box-shadow: 2px 5px 9px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.1s ease-in-out;
}
.data-rows {
}
.line {
  height: 1000px;
  width: 3px;
  z-index: -999;
  background-color: #cccccc;
  margin-top: -1050px;
  margin-left: 44px;
  float: left;
}
</style>
