<template>
    <el-select v-model="value3" :disabled="disabled" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.classifyName" :value="item.classifyCode">
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
      },
      'options':{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
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