<template>
  <div>
    <el-form label-position="top" ref="form"  label-width="100px" style="margin: 30px; ">

      <el-row class="data-rows" :gutter="0" v-for="(item,index) in items" :key="index" style="border-bottom: 1px solid rgb(230, 230, 230);margin-bottom: 15px;">
        <el-col :span="3">

          <div :class="getStateOfCircle(item.item.state)">
            <div class="state-circle-text">
              <template v-if="item.item.itemType=='manual'">
                <el-badge :value="'手动'" class="item">
                  <strong>{{item.item.id}}</strong><br> {{item.item.stepName}}
                </el-badge>
              </template>
              <template v-else>
                <el-badge :value="'自动'" class="item">
                  <strong>{{item.item.id}}</strong><br> {{item.item.stepName}}
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
            <template>
              {{item.planTimeDay}}
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <template v-if="(item.item.state==='S' || item.item.state==='F')">
            <el-form-item label="实际开始时间">
              {{item.start==''?'-':item.start}}
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="计划开始时间">
              {{item.start==''?'未配置':item.start}}
            </el-form-item>
          </template>

        </el-col>
        <el-col :span="4">
          <template v-if="(item.item.state==='F')">
            <el-form-item label="实际结束时间">
              {{item.end==''?'进行中...':item.end}}
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="计划结束时间">
              {{item.end==''?'未配置':item.end}}
            </el-form-item>
          </template>
        </el-col>
        <el-col :span="4">
          
          <el-form-item label="实际用时" v-if="item.item.state==='F'">
            {{item.item.realTimeLong}}
          </el-form-item>
           <el-form-item label="计划用时" v-else>
            {{item.item.planTimeLong}}
          </el-form-item>

        </el-col>
        <el-col :span="5">
          <!-- <span v-if="item.nodeId==1">已分配 {{getCountDays}} 天 /</span>
          <span v-if="item.nodeId==1">剩余可分配
            <strong style="color:red">{{ getProjectStatusRemainingCountDays}}</strong> 天</span>-->
          <div style="height:25px"></div> 
          <template v-if="item.item.itemType==='manual'" >
            <el-button type="primary" :disabled="getItemEnableState(item)"  @click="config">操作</el-button>
          </template>
          <template v-else>
            <el-popover placement="top" width="160"  :ref="'popover'+item.item.id"  >
              <p>请输入调整后的天数</p>
              <el-input-number style=" margin-top: 10px" size="small" v-model="item.planTimeDay" :min="0" label="描述文字"></el-input-number>
              <div style="text-align: right; margin-top: 10px">
                <el-button type="primary" size="mini" >保存</el-button>
              </div>
              <el-button  type="text" slot="reference">调整天数</el-button>
            </el-popover>
          </template>
          <template >
            <template >
              <el-button v-for="(action,index) in item.actionItems" :key="index">{{action.actionName}}</el-button>
            </template>
          </template>

        </el-col>
      </el-row>
      <div class="line"></div>
    </el-form>

  </div>
</template>

<script>
import formData from './ProjectDate'
import formDisabledSelect from './ProjectTypeSelect'
import { mapGetters, mapActions } from 'vuex'
import store from '../_store/index.js'
import commons from '~/utils/common.js'
import moment from 'moment'
export default {
  components: {
    formData,
    formDisabledSelect
  },
  computed: {
    ...mapGetters({
      items: store.namespace + '/getInteratedItems'
    })
  },
  methods: {
    getItemEnableState: function(item) {
      debugger
      if (item.item.state === 'S') {
        return false
      } else {
        return true
      }
    },
    getStateOfCircle(State) {
      if (State === 'C') return 'state-circle'
      else if (State === 'S') return 'state-circle ' + 'state-circle__run'
      else if (State === 'E') return 'state-circle ' + 'state-circle__run'
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
    },
    config() {
      this.$router.push({
        name: '项目配置计划',
        query: { projectId: this.projectId }
      })
    }
  },
  data() {
    return {

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
