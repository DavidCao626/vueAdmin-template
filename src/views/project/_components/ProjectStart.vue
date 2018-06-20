<template>
    <div>
        <el-form ref="form" label-position="right" label-width="220px" style="margin: 20px;">
            <el-form-item label="分配给下级节点的可用计划天数:">
                <el-input-number style=" margin-top: 10px" size="small" v-model="start.plannedDays" :min="0" label="描述文字" @change='onNumberChange'>
                </el-input-number>
            </el-form-item>
            <el-form-item label="分配给下级节点的开始时间:">
                <el-date-picker disabled v-model="start.bginDate" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="分配给下级节点的结束时间:">
                <el-date-picker disabled v-model="start.endDate" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="生效节点:">
                <el-radio v-model="start.datalistType" label="0" border>全部子节点</el-radio>
                <el-radio v-model="start.datalistType" label="1" border>部分子节点</el-radio>
            </el-form-item>
            <transfer v-show="start.datalistType==1"></transfer>
            <br/><br/><br/><br/>
        </el-form>
        <br/>
        <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
            <el-col :span="7">
                <el-button ref="next" @click="onBack">返回上一步</el-button>
                <el-button ref="back" @click="onSaveAndNext" type="primary">启动下发任务</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import transfer from "./ProjectParticipantsTransfer.vue";
export default {
  data() {
    return {
      start: {
        plannedDays: 30,
        bginDate: "2018-06-01",
        endDate: "2018-07-01",
        datalistType: "0", // 0全部下级节点，1部分
        datalist: []
      },
      projectId: 0
    };
  },
  methods: {
    onSaveAndNext() {
      this.$confirm("你即将执行任务下发操作, 是否确定继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "任务已经开始执行!"
        });
        this.$router.push({
          path: "/project/control",
          query: {
            projectId: this.projectId
          }
        });
      });
    },
    onBack() {
      this.$router.go(-1);
    },
    onNumberChange() {
      // 计数器控件内数据改变出发事件
    }
  },
  components: {
    transfer
  }
};
</script>
<style scoped>
</style>
