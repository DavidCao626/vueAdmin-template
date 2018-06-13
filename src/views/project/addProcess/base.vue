<template>
  <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">

    <el-form-item label="项目名称:">
      <el-input v-model="form.name" autosize focus style="width:50%;">
        <i slot="suffix" class="el-icon-edit el-input__icon"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="业务类型:">
      <form-disabled-select v-model="form.tyleId"></form-disabled-select>
    </el-form-item>
    <el-form-item label="项目时间:">
      <el-col :span="11">
        <form-data @onChange="formDataOnChange"></form-data>
      </el-col>
    </el-form-item>
    <el-form-item label="是否生成公告:">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="项目内容:">
      <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.desc"></el-input>
    </el-form-item>

    <el-form-item label="项目附件:">
      <form-upload style="width: 30%;" onSuccess="formUploadOnSuccess"></form-upload>
    </el-form-item>
  </el-form>

</template>

<script>
import formData from './components/Data'
import formDisabledSelect from './components/disabledSelect'
import formUpload from './components/upload'
export default {
  components: {
    formData,
    formDisabledSelect,
    formUpload
  },
  data() {
    return {
      form: {
        name: '',
        tyleId: '001', // 业务类别id
        date1: '',
        enddate: '',
        delivery: true,
        files: [],

        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
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