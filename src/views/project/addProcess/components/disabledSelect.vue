<template>
    <el-select v-model="value3" disabled placeholder="请选择">
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
        'optionData':{
          type:Array,
          default:[]
        }
    },
    watch:{
      optionData:function(newValue,oldValue){
        this.options = newValue
      },
      value:function(newValue,oldValue){
        this.value3=this.value
      }
    },
    data() {
      console.log(["this.optionData",this.optionData])
      return {
        options: this.optionData,
        value3: this.value
      }
    }
  }
</script>