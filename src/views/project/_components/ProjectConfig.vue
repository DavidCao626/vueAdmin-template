<template>
    <div>
        <span>&nbsp;&nbsp;开始日期：
            <strong>{{scopeInfo.planStartTime}}</strong>
        </span>
        <span>&nbsp;&nbsp;结束日期：
            <strong>{{scopeInfo.planEndTime}}</strong>
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总共
            <strong>{{scopeConfig.scopePlanTimeLong}}</strong>小时&nbsp;&nbsp;&nbsp; 剩余：
            <strong>{{scopeConfig.scopeUsableTimeLong}}</strong> 小时</span>
        <span>&nbsp;&nbsp;当前计划用：<strong style="color:red">{{scopeConfig.scopeAllocationedTimeLong}}</strong> 小时</span>

        <div style="height:25px"></div>
        <el-form label-position="top" ref="form" label-width="100px" style="margin-left:30px; margin-right:30px;">
            <el-row class="data-rows" :gutter="0" v-for="(item,index) in scopeWorkItems" :key="index" style="border-bottom: 1px solid rgb(230, 230, 230);margin-bottom: 15px;">
                <el-col :span="6">
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

                <el-col :span="6">

                    <el-form-item>
                        <div slot="label">
                            计划用时
                        </div>

                        <template v-if="item.item.itemType=='manual'">
                            <el-input-number disabled style=" margin-top: 10px" size="mini" v-model="item.item.planTimeLong" :min="0"  label="小时">
                            </el-input-number>
                        </template>
                        <template v-else>
                            <el-input-number style=" margin-top: 10px" size="mini" v-model="item.item.planTimeLong" :min="0"  label="小时">
                            </el-input-number>
                        </template>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="预计开始时间">
                        {{item.startTime==''?'未配置':item.startTime}}
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="预计结束时间">
                        {{item.endTime==''?'未配置':item.endTime}}
                    </el-form-item>
                </el-col>

            </el-row>
            <div class="line"></div>
            <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
                <el-col :span="7">
                    <el-button ref="next" @click="onSave">保存配置</el-button>
                    <el-button ref="back" @click="onSaveAndNext" type="primary">保存并下发任务</el-button>
                </el-col>
            </el-row>
        </el-form>

    </div>
</template>

<script>
import formData from './ProjectDate'
import formDisabledSelect from './ProjectTypeSelect'
import { mapGetters, mapActions } from 'vuex'
import store from '../_store/index.js'
import commons from '~/utils/common.js'

export default {
  components: {
    formData,
    formDisabledSelect
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      scopeInfo: store.namespace + '/getScopeConfigInfoScope',
      scopeWorkItems: store.namespace + '/getScopeConfigInfoWorkItems',
      scopeConfig: store.namespace + '/getScopeConfigInfo'
    })
  },
  methods: {
    ...mapActions({
      updateScopePlanTimeLong: store.namespace + '/updateScopePlanTimeLong',
      updateScopePlanTimeLongAndNext: store.namespace + '/updateScopePlanTimeLongAndNext'
    }),
    onSaveAndNext() {
      console.log('保存并下发任务!')
      var planItems = {}
      debugger
      for (var i = 0; i < this.scopeWorkItems.length; i++) {
        var workItem = this.scopeWorkItems[i]
        planItems[workItem.item.stepKey] = workItem.item.planTimeLong
      }
      var itemId = commons.getRouterParam(this.$route, 'itemId')
      this.updateScopePlanTimeLongAndNext({ 'scopeId': this.scopeInfo.id, 'itemId': itemId, 'planItems': planItems }).then(result => {
        this.$router.push({
          name: 'project_start',
          params: { scopeId: this.scopeInfo.id, itemId: result.resBody.id }
        })
      })

      // 跳转到配置下发任务路由，把项目id传递过去
    },
    onSave() {
      console.log('保存配置!')
      var planItems = {}
      debugger
      for (var i = 0; i < this.scopeWorkItems.length; i++) {
        var workItem = this.scopeWorkItems[i]
        planItems[workItem.item.stepKey] = workItem.item.planTimeLong
      }
      var itemId = commons.getRouterParam(this.$route, 'itemId')
      this.updateScopePlanTimeLong({ 'scopeId': this.scopeInfo.id, 'itemId': itemId, 'planItems': planItems })
    },
    getStateOfCircle(State) {
      if (State === 'C') return 'state-circle'
      else if (State === 'S') return 'state-circle ' + 'state-circle__run'
      else if (State === 'E') return 'state-circle ' + 'state-circle__ex'
      else return 'state-circle ' + 'state-circle__ok'
    },
    handleChange(value) {
      console.log(value)
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