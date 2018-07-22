<template>
  <el-select v-model="value" placeholder="请选择" @change="change">
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
        return [
          ({
            value: "01",
            label: "汉族"
          },
          {
            value: "02",
            label: "蒙古族"
          },
          {
            value: "03",
            label: "回族"
          },
          {
            value: "04",
            label: "藏族"
          },
          {
            value: "05",
            label: "维吾尔族"
          })
        ];
      }
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
