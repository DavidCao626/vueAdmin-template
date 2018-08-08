<template>
    <div>
        <el-form ref="form" label-position="right" label-width="220px" style="margin: 20px;">
           <el-form-item label="父节点" v-if="dispenseView.relaseWorkItemName">
                {{dispenseView.relaseWorkItemName}}&nbsp;&nbsp;&nbsp;&nbsp;配置的天数为:{{dispenseView.oldRelaseTimeDay}}
            </el-form-item>
            <el-form-item label="可用时长:">
                <template v-if="dispenseView.relaseWorkItemName">
                       <el-input-number style=" margin-top: 3px" size="small" v-model="dispenseView.relaseTimeDay" :min="0" :max="dispenseView.oldRelaseTimeDay" label="描述文字">
                       </el-input-number>
                </template >
                <template v-else>
                       <el-input-number style=" margin-top: 3px" size="small" v-model="dispenseView.relaseTimeDay" :min="0"  label="描述文字">
                       </el-input-number>
                </template>
            </el-form-item>
            <el-form-item label="开始时间:">
                <el-date-picker disabled v-model="getStartTime" type="datetime" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="完成时间:">
                <el-date-picker disabled v-model="getEndTime" type="datetime" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="下级机构:">
                <el-radio v-if="getDispenseLiablerRule" v-model="start.datalistType" label="0" checked border>{{getDispenseLiablerRule.name}}</el-radio>
                <el-radio v-model="start.datalistType" :disabled="ruleEditable" label="1" border>选择机构</el-radio>
            </el-form-item>
            <transfer ref="tran" v-show="start.datalistType==1"></transfer>
            <br/><br/><br/><br/>
        </el-form>
        <br/>
        <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
            <el-col :span="7">
                <el-button ref="back" @click="onSaveAndNext" type="primary">下发任务</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import transfer from './ProjectParticipantsTransfer.vue'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import store from '../_store/index.js'
import commons from '~/utils/common.js'
export default {
  data() {
    return {
      start: {
        datalistType: '0', // 0全部下级节点，1部分
        selectOrgs: []
      },
      projectId: 0
    }
  },
  computed: {
    ...mapGetters({
      dispenseView: store.namespace + '/getDispenseView',
      getDispenseLiablerRule: store.namespace + '/getDispenseLiablerRule'
    }),
    getStartTime: function() {
      return moment().second(0).minute(0).format('YYYY-MM-DD HH:mm:ss')
    },
    getTimeLong: function() {
      var timelong = this.dispenseView.relaseTimeDay
      if (timelong == null) {
        return 0
      } else {
        return this.dispenseView.relaseTimeDay
      }
    },
    ruleEditable: function() {
      if (this.dispenseView.deployPack.ruleEditable === 'N') {
        return true
      } else {
        return false
      }
    },
    getEndTime: function() {
      var now = moment().second(0).minute(0)
      var timelong = this.getTimeLong;
      var end = now.add(timelong, 'days')
      return end.format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    ...mapActions({
      disChildScope: store.namespace + '/disChildScope'
    }),
    onSaveAndNext() {
      console.log(["this.$refs['tran']",this.$refs['tran'].value1])
      this.selectOrgs = this.$refs['tran'].value1;
      this.$confirm('你即将执行任务下发操作,该操作不可逆， 是否确定继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('下发任务!')
        var itemId = commons.getRouterParam(this.$route, 'itemId')
        var scopeId = this.dispenseView.scope.id
        var timelong = this.dispenseView.relaseTimeDay
        var planStartTime = this.getStartTime
        var planCompleteTime = this.getEndTime
        this.disChildScope({ 'scopeId': scopeId, 'planStartTime': planStartTime, 'planCompleteTime': planCompleteTime, 'itemId': itemId, 'planTimeLong': timelong, 'orgs': this.selectOrgs }).then(result => {
          this.$router.push({
            path: '/project/control',
            query: { scopeId: scopeId }
          })
        })
      })
    }
  },
  components: {
    transfer
  }
}
</script>
<style scoped>
</style>
