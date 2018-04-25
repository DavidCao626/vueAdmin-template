<template>
  <div>
    <el-date-picker format="yyyy 年 MM 月 dd 日  HH 时 mm 分 ss 秒 " value-format="yyyy-MM-dd HH:mm:ss" v-model="testData" type="datetime" placeholder="选择">
    </el-date-picker>
    <el-button @click="testBT">测试</el-button>
  </div>
</template>

<script>
import { test } from '~/api/whktest'
export default {
  data() {
    return {
      testData: ''
    }
  },
  methods: {

    testBT() {
      var data = {
        'asAnswerDate': this.testData
      }
      console.log({
        'asAnswerDate': this.testData
      })
      new Promise((resolve, reject) => {
        test(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }

  }
}
</script>

<style>

</style>