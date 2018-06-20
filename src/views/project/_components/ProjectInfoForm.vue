<template>
  <div>
    <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">
      <el-form-item label="项目名称:">
        <el-input v-model="form.name" autosize focus style="width:50%;">
          <i slot="suffix" class="el-icon-edit el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="项目编号:">
        <el-input v-model="form.id" autosize focus style="width:50%;">
          <i slot="suffix" class="el-icon-edit el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="业务类型:">
        <ProjectTypeSelect v-model="form.tyleId" :disabled="isProjectTypeSelectDisDisabled"></ProjectTypeSelect>
      </el-form-item>
      <el-form-item label="项目时间:">
        <el-col :span="11">
          <project-date @onChange="formDataOnChange"></project-date>
        </el-col>
      </el-form-item>
      <el-form-item label="是否生成公告:">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="项目内容:">
        <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.desc"></el-input>
      </el-form-item>

      <el-form-item label="项目附件:">
        <ProjectAttachmentUplad style="width: 30%;" onSuccess="formUploadOnSuccess"></ProjectAttachmentUplad>
      </el-form-item>
    </el-form>
    <br/>
    <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
      <el-col :span="7">
        <el-button ref="next" @click="onSave">保存</el-button>
        <el-button ref="back" @click="onSaveAndNext">保存并配置计划</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ProjectDate from './ProjectDate';
import ProjectTypeSelect from './ProjectTypeSelect';
import ProjectAttachmentUplad from './ProjectAttachmentUplad';

export default {
  name: 'projectInfoForm',
  props: {
    form: {
      type: Object,
      default: function(){
      return {
        name: '',
        id: '', // 项目编号
        tyleId: '001', // 业务类别id
        date1: '',
        enddate: '',
        delivery: true,
        files: [],
        desc: ''
        }
      }
    },
    isProjectTypeSelectDisDisabled: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ProjectDate,
    ProjectTypeSelect,
    ProjectAttachmentUplad
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
    },
    formDataOnChange(value) {
      console.log('开始时间' + value[0])
      this.date1 = value[0]
      console.log('结束时间' + value[1])
      this.enddate = value[1]
    },
    formUploadOnSuccess(files) {
      console.log('文件成功上传后的列表' + files)
      this.files = files
    }
  }
}
</script>
<style>
</style>
