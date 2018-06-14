<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">项目控制台</div>
    <div class="page-box">

      <div class="page-box__1">
        <div class="page-box__block">
          <project-info></project-info>
        </div>
      </div>
    </div>
    <div class="page-box">

      <div class="page-box__1">
        <div class="page-box__block">
          <div class="weui-desktop-page__title" style="font-size:18px">项目状态</div>
          <project-state @onConfig="onConfig"></project-state>
        </div>
      </div>
    </div>
    <el-dialog title="配置项目计划" :visible.sync="centerConfigDialogVisible" >
      <el-steps :active="active" finish-status="success" simple>
        <el-step title="配置计划" icon="el-icon-edit">
        </el-step>
        <el-step title="分发机构" icon="el-icon-upload">
        </el-step>
      </el-steps>
      <br/>
      <keep-alive>
        <!-- 上一步下一步 不会删除里面内容 -->
        <component :is="componentId" style="height:45vh; overflow:scroll;"></component>
      </keep-alive>

      <span slot="footer" class="dialog-footer">
        <el-button @click="back">上 一 步</el-button>
        <el-button type="primary" @click="next"> 下 一 步</el-button>
      </span>
    </el-dialog>
  </page>
</template>
<script>
import projectInfo from './info'
import projectState from './state'
import projectMessageState from './state/meesageState'
import projectStart from '../addProcess/start'
export default {
  components: {
    projectInfo,
    projectState,
    projectMessageState,
    projectStart
  },
  data() {
    return {
      centerConfigDialogVisible: false,
      componentId: projectMessageState,
      active: 0
    }
  },
  watch: {
    active() {
      switch (this.active) {
        case 0:
          this.componentId = projectMessageState
          break
        case 1:
          this.componentId = projectStart
          break
      }
    }
  },

  methods: {
    back() {
      switch (this.active) {
        case 0:
          this.centerConfigDialogVisible = false
          break
        case 1:
          this.active--
          break
        case 2:
          this.active--
          break
      }
    },
    next() {
      switch (this.active) {
        case 0:
          this.active++
          break
        case 1:
          this.$confirm('你即将执行任务下发操作, 是否确定继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.centerConfigDialogVisible = false
              this.active = 0
              this.$message({
                type: 'success',
                message: '任务已经开始执行!'
              })
            })
            .catch(() => {
            })
          break
      }
    },
    onConfig() {
      this.centerConfigDialogVisible = true
    }
  }
}
</script>
<style lang="scss">
.page {
  &-box {
    display: flex;
    &__0 {
      flex: 0;
    }
    &__1 {
      flex: 1;
    }
    &__2 {
      flex: 2;
    }
    &__block {
      margin: 0px 20px 20px auto;
      padding: 25px;
      background-color: #ffffff;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;

      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
    }
    &__block:hover {
      box-shadow: 0 2px 7px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.1s ease-in-out;
    }
  }
}
</style>
