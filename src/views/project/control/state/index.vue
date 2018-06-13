<template>
    <div>
        <el-form label-position="top" ref="form" :model="form" label-width="100px" style="margin: 30px; min-width: 1200px;">
       
            <el-row class="data-rows" :gutter="0" v-for="(item,index) in ProjectStatusData" :key="index" style="border-bottom: 1px solid rgb(230, 230, 230);margin-bottom: 15px;">
                <el-col :span="3">

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

                <el-col :span="3">
                    <el-form-item>
                        <div slot="label">
                            计划天数
                        </div>

                        <template v-if="item.nodeRunType=='自动' && item.nodeStatus!=2">
                            <el-popover placement="top" width="160">
                                <p>修改计划天数</p>
                                <el-input-number style=" margin-top: 10px" size="small" v-model="item.plannedDays" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字"></el-input-number>
                                <!-- <div style="text-align: right; margin-top: 10px">
                                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                            </div> -->
                                <el-button slot="reference" type="text">{{item.plannedDays}}</el-button>
                            </el-popover>
                        </template>
                        <template v-else>
                            0
                        </template>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <template v-if="item.nodeStatus!=0">
                        <el-form-item label="实际开始时间">
                            {{item.actualBeginDate==''?'-':item.actualBeginDate}}
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="计划开始时间">
                            {{item.plannedBeginDate==''?'未配置':item.plannedBeginDate}}
                        </el-form-item>
                    </template>

                </el-col>
                <el-col :span="4">
                    <template v-if="item.nodeStatus!=0">
                        <el-form-item label="实际结束时间">
                            {{item.actualEndDate==''?'进行中...':item.actualEndDate}}
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="计划结束时间">
                            {{item.plannedEndDate==''?'未配置':item.plannedEndDate}}
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="实际天数">
                        {{item.actualDays}}
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <span v-if="item.nodeId==1">已分配 {{getCountDays}} 天 /</span>
                    <span v-if="item.nodeId==1">剩余可分配
                        <strong style="color:red">{{ getProjectStatusRemainingCountDays}}</strong> 天</span>
                    <div style="height:25px"></div>
                    <template v-if="item.nodeId==1&&item.nodeStatus!=2">
                        <el-button type="primary">保存配置</el-button>
                        <el-button disabled v-if="getProjectStatusRemainingCountDays>=0">下发项目</el-button>
                    </template>
                    <template v-if="item.nodeRunType=='自动'&& item.nodeStatus!=2">
                        <el-popover placement="top" width="160">
                            <p>请输入调整后的天数</p>
                            <el-input-number style=" margin-top: 10px" size="small" v-model="item.plannedDays" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字"></el-input-number>
                            <!-- <div style="text-align: right; margin-top: 10px">
                                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                            </div> -->
                            <el-button type="text" slot="reference">调整天数</el-button>
                        </el-popover>
                    </template>
                    <template v-if="item.nodeRunType=='手动'&&item.nodeId!=1">
                        <el-button v-for="(action,index) in item.actionItems" :key="index">{{action.actionName}}</el-button>
                    </template>

                </el-col>
            </el-row>
                 <div class="line"></div>
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
      form: {
        name: '2018年上学期2017级贫困学生建档项目',
        tyleId: '001', // 业务类别id
        date1: '2018-06-1',
        endDate: '2018-09-1',
        endDateCount: '90',
        delivery: true,
        files: [
          { name: '2018年上学期2017级贫困学生建档项目.doc' },
          { name: '新版学工系统建档操作手册.doc' }
        ],
        desc:
          '“2018年上学期2017级贫困学生建档项目开始了，请各级学院老师提前做好准备！”'
      },
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
          actionItems: {
            actionName: '配置计划',
            actionUrl: '#/project/control'
          }
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
          actualDays: 30,
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
          plannedBeginDate: '2018-06-01',
          plannedEndDate: '2018-06-01',
          actualBeginDate: '2018-06-01',
          actualEndDate: '2018-06-01',
          actualDays: 30,
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
          actualDays: 30,
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
          plannedBeginDate: '2018-06-01',
          plannedEndDate: '2018-06-01',
          actualBeginDate: '2018-06-01',
          actualEndDate: '2018-06-01',
          actualDays: 30,
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
          actualDays: 30,
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
          actualDays: 30,
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
          actualDays: 30,
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
  background: #ddd;
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
  background: #ddd;
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
  background-color: #ccc;
  margin-top: -1050px;
  margin-left:44px;
  float: left;
}
</style>
