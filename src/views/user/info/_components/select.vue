<template>
  <el-select v-model="val" placeholder="请选择" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch:{
    value(newv,oldv){
      this.val = newv;
    }
  },
  data(){
    return {
      val:this.value
    }
  },
  methods: {
    change(item) {
      //选中的触发 参数为当前选中的值
      this.$emit("change", item);
    }
  }
};
</script>

<style>
</style>
