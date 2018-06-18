<template>
  <page class="page" :breadcrumb="false">
    <div slot="title">新建项目</div>
    <div slot="panel">
      <el-steps active="0" simple finish-status="success">
        <el-step title="填写项目信息" icon="el-icon-edit">
        </el-step>
        <el-step title="配置计划" icon="el-icon-picture">
        </el-step>
        <el-step title="任务下发" icon="el-icon-upload">
        </el-step>
      </el-steps>
      <br/>

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
      <br/>
      <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
        <el-col :span="7">
          <el-button ref="next" @click="onSave">保存</el-button>
          <el-button ref="back" @click="onSaveAndNext" >保存并配置计划</el-button>
        </el-col>
      </el-row>
    </div>
  </page>
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
        id: '', // 项目编号
        tyleId: '', // 业务类别id
        date1: '',
        enddate: '',
        delivery: true,
        files: [],
        desc: ''
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // 不在next函数内的代码是路由请求阶段，此处代码获取不了页面vue示例和dom树
    next(vm => {
      // 路由请求加载完成后执行函数体，参数vm就是当前组件的实例。
      if (to.query.projectID) {
        // todo 如果路由参数projectID 有值，则是修改项目页面
        // ajax 根据projectID读取项目信息
        console.log('ajax 根据projectID读取项目信息')
        vm.form.tyleId = '001' // ajax读取成功后，数据赋值示例
      }
    })
  },
  methods: {
    onSaveAndNext() {
      console.log('保存并配置!')
      this.$router.push({
        name: '项目配置计划',
        query: { projectID: '123' }
      })
      // 跳转到配置计划路由，把创建成功的项目id传递过去
    },
    onSave() {
      console.log('保存项目!')
      // TODO Ajax保存项目
      this.$message({
        type: 'success', // type:error 错误消息
        message: '保存成功!'
      })

      this.$router.push({
        path: '/project/control',
        query: { projectID: '123' }
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