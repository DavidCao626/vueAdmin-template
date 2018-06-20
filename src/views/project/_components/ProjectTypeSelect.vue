<template>
    <el-select v-model="value3" :disabled="disabled" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item. id">
        </el-option>
    </el-select>
</template>
  
<script>
  export default {
    props: {
      'value':
        {
          type: String,
          default: ''
        },
      'disabled': {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        options: [{
          id: '001',
          label: '贫困建档'
        }, {
          id: '002',
          label: '助学金'
        }, {
          id: '003',
          label: '奖学金'
        }, {
          id: '004',
          label: '助学贷款'
        }, {
          id: '005',
          label: '其他'
        }],
        value3: this.value
      }
    },
    watch: {
      value() {
        this.value3 = this.value
      }
    }
  }
</script>