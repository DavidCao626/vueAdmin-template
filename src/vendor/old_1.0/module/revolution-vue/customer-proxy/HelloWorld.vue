<template>
  <div class="hello">
    <!-- :style="{'width':'800px'}"  //可控制元素宽度 -->
    <app-items :label-position="labelPosition" label-width="50px" :inline="false" >
      <app-items-item label="你好" >
        <el-input v-model="msg" placeholder="请输入内容" ></el-input>
      </app-items-item>
       <app-items-item label="你好">
        <el-input v-model="msg" placeholder="请输入内容"></el-input>
      </app-items-item>
       <app-items-item label="你好">
        <el-input v-model="msg" placeholder="请输入内容"></el-input>
      </app-items-item>
    </app-items>
  </div>
</template>

<script>
import Vue from 'vue'
import items from './Items.vue'
import item from './Item.vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Input
  // ...
} from 'element-ui'

Vue.component(Input.name, Input)

export default {
  name: 'HelloWorld',
  data() {
    return {
      labelPosition: 'right', // top ,left
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'app-items': items,
    'app-items-item': item
  }
}
</script>
