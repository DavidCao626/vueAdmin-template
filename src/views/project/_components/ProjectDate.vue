<template>
  <div class="block">
    <el-date-picker v-model="value7" type="daterange" @change="onChange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">

    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        [new Date(2016, 9, 10), new Date(2016, 9, 10)]
      }
    }
  },
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value6: '',
      value7: this.value
    }
  },
  watch: {
    value() {
      this.value7 = this.value
    }
  },
  methods: {
    onChange() {
      this.$emit('onChange', this.value7)
    }
  }
}
</script>