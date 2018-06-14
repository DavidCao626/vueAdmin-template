<template>
    <div>

        <el-form ref="form" label-position="right" label-width="220px" style="margin: 20px;">

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

    </div>
</template>

<script>
import transfer from './components/transfer.vue'
export default {
  data() {
    return {
      start: {
        bginDate: '2018-06-01',
        endDate: '2018-07-01',
        datalistType: '0', // 0全部下级节点，1部分
        datalist: []
      }
    }
  },
  components: {
    transfer
  }
}
</script>