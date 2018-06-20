<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel">
      <el-steps :active="0" simple finish-status="success">
        <el-step title="填写项目信息" icon="el-icon-edit">
        </el-step>
        <el-step title="配置计划" icon="el-icon-picture">
        </el-step>
        <el-step title="任务下发" icon="el-icon-upload">
        </el-step>
      </el-steps>
      <br/>
      <ProjectInfoForm :form="projectInfo" @onSave="onSave" @onSaveAndNext="onSaveAndNext"></ProjectInfoForm>
    </div>
  </page>
</template>

<script>
import store from './_store'

import { mapGetters } from 'vuex'
import ProjectInfoForm from './_components/ProjectInfoForm'

export default {
  name: 'projectBase',
  components: {
    ProjectInfoForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      projectInfo: '$_project/projectInfoData'
    })
  },
  created() {
    const STORE_KEY = '$_project'
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store)
    }
  },
  mounted() {

  },
   beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch(
        "$_project/getProjectInfoData",
        to.query.projectId
      ).then((result) => {
        console.log(result)
      })
    });
  },
  methods: {
    onSaveAndNext(e) {
      console.log('保存并配置!' + [e])
      this.$router.push({
        name: '项目配置计划',
        query: { projectId: '123' }
      })
    },
    onSave(e) {
      this.$store.commit('$_project/setProjectInfoData', e)
      this.$store.dispatch(
        "$_project/getProjectInfoData",
        to.query.projectId
      ).then((result) => {
        console.log(result)
      })
      console.log('保存项目!' + [e])
      // TODO Ajax保存项目
      this.$message({
        type: 'success', // type:error 错误消息
        message: '保存成功!'
      })
      this.$router.push({
        path: '/project/control',
        query: { projectId: '123' }
      }) // 跳转到 项目控制台
    }
  }
}
</script>