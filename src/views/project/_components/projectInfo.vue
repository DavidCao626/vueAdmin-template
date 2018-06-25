<template>
    <div>
        <div class="weui-desktop-page__title" style="font-size:18px">项目基本信息</div>
        <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">

            <el-form-item label="项目名称:">
                <p>{{projectInfo.projectName}}</p>
            </el-form-item>
            <el-form-item label="业务类型:">
                {{projectInfo.projectServiceTypeName}}
            </el-form-item>
            <el-form-item label="项目开始时间:">
                <p>{{projectInfo.planStartTime}}</p>
            </el-form-item>
            <el-form-item label="项目结束时间:">
                        <p>{{projectInfo.planCompleteTime}}</p>
            </el-form-item>

            <el-form-item label="项目附件:">
                <p v-for="(file,index) in projectInfo.files" :key="index">
                    <a :href="file.userPath" target="_blank">{{file.userFileName}}</a>
                    </p>
            </el-form-item>
             <el-form-item label="当前任务环节:">
                        <p>{{scopeInfo.scopeName}}</p>
            </el-form-item>

             <el-form-item label="环节开始时间:">
                        <p>{{scopeInfo.planStartTime}}</p>
            </el-form-item>
             <el-form-item label="环节结束时间:">
                        <p>{{scopeInfo.planEndTime}}</p>
            </el-form-item>
          
            <el-form-item label="已用时长:">
                <span style="color:red">{{scopeInfo.useredDay}}天</span>
            </el-form-item>
            <el-form-item label="环节可用时长:">
                <span style="color:red">{{scopeInfo.useabledDay}}天</span>
            </el-form-item>
             <el-form-item label="任需时长:">
                <span style="color:red">{{scopeInfo.neededDay}}天</span>
            </el-form-item>
            <el-form-item label="预计超时时长:">
                <span style="color:red">{{scopeInfo.delayDay}}天</span>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

import formData from './ProjectDate'
import formDisabledSelect from './ProjectTypeSelect'
import { mapGetters, mapActions } from 'vuex'
import store from '../_store/index.js'
import commons from '~/utils/common.js'
import moment from 'moment'
export default {
  components: {
    formData,
    formDisabledSelect
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters({
      projectInfo: store.namespace + '/getInteratedProjectInfo',
      scopeInfo: store.namespace + '/getInteratedScopeInfo'
    })
  }
}
</script>