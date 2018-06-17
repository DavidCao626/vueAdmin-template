<template>
  <div>
    <el-form label-position="top" ref="form" label-width="100px" style="margin: 30px; ">

      <el-row class="data-rows" :gutter="0" v-for="(item,index) in ProjectStatusData" :key="index" style="border-bottom: 1px solid rgb(230, 230, 230);margin-bottom: 15px;">
        <el-col :span="3">

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
        <el-col :span="3">
          <el-form-item>
            <div slot="label">
              计划天数
            </div>

            <!-- <template v-if="item.nodeRunType=='自动' && item.nodeStatus!=2">
              <el-popover placement="top" width="160">
                <p>修改计划天数</p>
                <el-input-number style=" margin-top: 10px" size="small" v-model="item.plannedDays" :min="0" :max="getProjectStatusRemainingCountDays+item.plannedDays" label="描述文字"></el-input-number>
                 <div style="text-align: right; margin-top: 10px">
                                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                            </div>
                <el-button slot="reference" type="text">{{item.plannedDays}}</el-button>
              </el-popover>
            </template> -->
            <template>
              {{item.item.planTimeLong}}
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <template v-if="item.item.state!='C'">
            <el-form-item label="实际开始时间">
              {{item.item.realStartTime==''?'-':item.item.realStartTime}}
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="计划开始时间">
              {{item.startTime==''?'未配置':item.startTime}}
            </el-form-item>
          </template>

        </el-col>
        <el-col :span="4">
          <template v-if="item.item.state!=0">
            <el-form-item label="实际结束时间">
              {{item.item.realEndTime==''?'进行中...':item.item.realEndTime}}
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="计划结束时间">
              {{item.endTime==''?'未配置':item.endTime}}
            </el-form-item>
          </template>
        </el-col>
        <el-col :span="4">
          <el-form-item label="实际已用天数">
            {{item.item.realTimeLong}}
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <!-- <span v-if="item.nodeId==1">已分配 {{getCountDays}} 天 /</span>
          <span v-if="item.nodeId==1">剩余可分配
            <strong style="color:red">{{ getProjectStatusRemainingCountDays}}</strong> 天</span>-->
          <div style="height:25px"></div>
          <template v-if="item.item.nodeId==1&&item.item.state!=C">
            <el-button type="primary" @click="config">配置计划</el-button>
          </template> 
          <template v-if="item.item.itemType=='自动'&& item.item.nodeStatus!='F'">
            <el-popover placement="top" width="160" :ref="'popover'+item.item.nodeId">
              <p>请输入调整后的天数</p>
              <el-input-number style=" margin-top: 10px" size="small" v-model="item.item.planTimeLong" :min="0" :max="getProjectStatusRemainingCountDays+item.item.planTimeLong" label="描述文字"></el-input-number>
              <div style="text-align: right; margin-top: 10px">
                <el-button type="primary" size="mini" @click="saveDays(item)">保存</el-button>
              </div>
              <el-button v-if="item.item.state=='S'" type="text" slot="reference">调整天数</el-button>
              <!-- <el-button v-if="item.item.state=='S'" type="text" @click="tempButton()" slot="reference">完成</el-button> -->
              <el-button v-else type="text" disabled slot="reference">完成</el-button>
            </el-popover>
          </template>
          <template v-if="item.item.itemType=='手动'">
            <template v-if="item.item.state=='S'">
              <el-button type="text" @click="tempButton()">完成</el-button>
            </template>
            <template v-else>
              <el-button disabled type="text">完成</el-button>
            </template>
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
import {
  queryWorkItem,
  getProjectById,
  queryWorkTimeView,
  completePending
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
    this.loadWorkTime()
  },
  methods: {
    loadWorkTime() {
      new Promise((resolve, reject) => {
        var requestData = { scopeId: this.scopeId }
        debugger
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

    // loadWorkItem() {
    //   new Promise((resolve, reject) => {
    //     var requestData = { scopeId: this.scopeId };
    //     //var requestData = { scopeId: 66 };
    //     queryWorkItem(requestData).then(response => {
    //       var tempData = [];
    //       tempData = response.resBody;
    //       for (var i = 0; i < tempData.length; i++) {
    //         tempData[i].nodeId = i + 1;
    //         if (tempData[i].itemType == "manual") {
    //           tempData[i].itemType = "手动";
    //         } else {
    //           tempData[i].itemType = "自动";
    //         }
    //       }
    //       console.log(["workItem数据", tempData]);
    //       this.ProjectStatusData = tempData;
    //     });
    //   });
    // },
    tempButton() {
      // 完成代办
      console.log(['完成代办', this.pendId])
      new Promise((resolve, reject) => {
        var requestData = { pendingId: this.pendId }
        completePending(requestData).then(response => {
          console.log(['完成代办', response])
          this.loadWorkTime()
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
    },
    saveDays(nodeID) {
      // 保存天数成功!
      this.$message({
        type: 'success',
        message: '保存天数成功!'
      })
      // this.$refs['popover' + nodeID].value = false  关闭弹出层。暂时不能使用
    },
    config() {
      var scopeId = this.$route.query.scopeId
      var projectId = this.$route.query.projectId
      var pendId = this.$route.query.pendId

      this.$emit('onConfig', scopeId, projectId, pendId)
    }
  },
  data() {
    return {
      scopeId: this.$route.query.scopeId,
      pendId: this.$route.query.pendId,
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
  /* box-shadow: 2px 5px 9px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.1s ease-in-out; */
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
