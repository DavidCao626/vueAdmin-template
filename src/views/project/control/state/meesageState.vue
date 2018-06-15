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

          <div :class="getStateOfCircle(item.nodeStatus)">

            <div class="state-circle-text">
              <template v-if="item.nodeRunType=='手动'">
                <el-badge :value="item.nodeRunType" class="item">
                  <strong>{{item.nodeId}}</strong><br> {{item.nodeName}}
                </el-badge>
              </template>
              <template v-else>
                <el-badge :value="item.nodeRunType" class="item">
                  <strong>{{item.nodeId}}</strong><br> {{item.nodeName}}
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

            <template v-if="item.nodeRunType=='手动'">
              <el-input-number disabled style=" margin-top: 10px" size="mini" v-model="item.plannedDays" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字">
              </el-input-number>

            </template>
            <template v-else>
              <el-input-number  style=" margin-top: 10px" size="mini" v-model="item.plannedDays" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字">
              </el-input-number>
            </template>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="计划开始时间">
            {{item.plannedBeginDate==''?'未配置':item.plannedBeginDate}}
          </el-form-item>
        </el-col>

        <el-col :span="6">

          <el-form-item label="计划结束时间">
            {{item.plannedEndDate==''?'未配置':item.plannedEndDate}}
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
  methods: {
    getStateOfCircle(State) {
      if (State === 0) return 'state-circle'
      else if (State === 1) return 'state-circle ' + 'state-circle__run'
      else return 'state-circle ' + 'state-circle__ok'
    },
    handleChange(value) {
      console.log(value)
    }
  },
  data() {
    return {
      ProjectStatusBeginDate: '2018-06-01', // 项目总开始时间
      ProjectStatusEndDate: '2018-09-01', // 项目总开始时间
      ProjectStatusCountDays: 246, // 项目总天数
      ProjectStatusRemainingCountDays: 2, // 未分配可用天数

      ProjectStatusData: [
        {
          nodeId: 1,
          nodeName: '配置计划',
          nodeRunType: '手动',
          nodeStatus: 1, // 0未启动，1运行中，2已完成
          plannedDays: 30,
          plannedBeginDate: '2018-06-01',
          plannedEndDate: '2018-06-01',
          actualBeginDate: '2018-06-01',
          actualEndDate: '2018-06-01',
          actualDays: 30,
          actionItems: [
            {
              actionName: '配置计划',
              actionUrl: '#/project/control'
            }
          ]
        },
        {
          nodeId: 2,
          nodeName: '学校汇总',
          nodeRunType: '自动',
          nodeStatus: 0, // 0未启动，1运行中，2已完成
          plannedDays: 30,
          plannedBeginDate: '2018-06-01', // '2018-06-01',
          plannedEndDate: '2018-06-01', // '2018-06-01',
          actualBeginDate: '2018-06-01', // '2018-06-01',
          actualEndDate: '', // '2018-06-01',
          actualDays: 14,
          actionItems: [
            {
              actionName: '调整天数',
              actionUrl: '#'
            }
          ]
        },
        {
          nodeId: 3,
          nodeName: '配置组评',
          nodeRunType: '手动',
          nodeStatus: 0, // 0未启动，1运行中，2已完成
          plannedDays: 0,
          plannedBeginDate: '',
          plannedEndDate: '',
          actualBeginDate: '',
          actualEndDate: '',
          actualDays: 0,
          actionItems: [
            {
              actionName: '配置评议人员',
              actionUrl: '#'
            }
          ]
        },
        {
          nodeId: 4,
          nodeName: '学校评议',
          nodeRunType: '自动',
          nodeStatus: 0, // 0未启动，1运行中，2已完成
          plannedDays: 30,
          plannedBeginDate: '',
          plannedEndDate: '',
          actualBeginDate: '',
          actualEndDate: '',
          actualDays: 0,
          actionItems: {
            actionName: '调整天数',
            actionUrl: '#'
          }
        },
        {
          nodeId: 5,
          nodeName: '预审',
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
              actionName: '查看预审数据',
              actionUrl: '#'
            }
          ]
        },
        {
          nodeId: 6,
          nodeName: '公示',
          nodeRunType: '手动',
          nodeStatus: 0, // 0未启动，1运行中，2已完成
          plannedDays: 30,
          plannedBeginDate: '',
          plannedEndDate: '',
          actualBeginDate: '',
          actualEndDate: '',
          actualDays: 0,
          actionItems: [
            {
              actionName: '查看公示名单',
              actionUrl: '#'
            }
          ]
        },
        {
          nodeId: 7,
          nodeName: '终审',
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
              actionName: '查看终审数据',
              actionUrl: '#'
            }
          ]
        },
        {
          nodeId: 8,
          nodeName: '结束',
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
              actionName: '结束项目',
              actionUrl: '#'
            }
          ]
        },
        {
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
