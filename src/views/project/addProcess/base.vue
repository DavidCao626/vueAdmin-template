<template>
  <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">

    <el-form-item label="项目名称:">
      <el-input v-model="form.projectName" autosize focus style="width:50%;">
        <i slot="suffix" class="el-icon-edit el-input__icon"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="项目编号:">
      <el-input v-model="form.projectUserCode" autosize focus style="width:50%;">
        <i slot="suffix" class="el-icon-edit el-input__icon"></i>
      </el-input>
    </el-form-item>
    <el-form-item label="业务类型:">
      <form-disabled-select :value="form.projectServiceType" :optionData="serviceTypeList"></form-disabled-select>
    </el-form-item>
    <el-form-item label="项目时间:">
      <el-col :span="11">
        <form-data @onChange="formDataOnChange"></form-data>
      </el-col>
    </el-form-item>
    <el-form-item label="是否生成公告:">
      <el-switch active-value="Y" inactive-value="N" v-model="form.isSendPublicNotice"></el-switch>
    </el-form-item>
    <el-form-item label="项目内容:">
      <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.projectDesc"></el-input>
    </el-form-item>

    <el-form-item label="项目附件:">
      <form-upload style="width: 30%;" :url="uploadUrl" @handleRemove="fileRemove" @onSuccess="formUploadOnSuccess"></form-upload>
    </el-form-item>
  </el-form>

</template>

<script>
import formData from "./components/Data";
import formDisabledSelect from "./components/disabledSelect";
import formUpload from "./components/upload";
import {
  insertProject,
  insertProjectAndRun,
  updateProject,
  deleteProject,
  queryUserProject,
  queryServiceTypeList
} from "~/api/project";
import{uploadAttachmentUrl}  from "~/api/project";

var serviceType = "201805"; //这是通过跳转传过来的参数,业务类型

export default {
  components: {
    formData,
    formDisabledSelect,
    formUpload
  },
  mounted: function() {
    this.loadServiceTypeData()
  },
  watch: {
    serviceType: function(newValue, oldValue) {
      this.projectServiceType = newValue;
    }
  },
  data() {
    return {
      uploadUrl:uploadAttachmentUrl,
      serviceTypeList: [],
      form: {
        projectName: "",
        projectUserCode: "",
        projectDesc: "",
        projectServiceType: serviceType, // 业务类别id
        planStartTime: "",
        planCompleteTime: "",
        isSendPublicNotice: "Y",
        projectAttachmentId: []
      }
    };
  },
  methods: {
    loadServiceTypeData() {
      new Promise((resolve, reject) => {
        queryServiceTypeList().then(response => {
          this.serviceTypeList = response.resBody;
          console.log(["loadServiceTypeData",this.serviceTypeList])
        });
      }); 
    },
    onSubmit() {
      console.log("submit!");
    },
    formDataOnChange(value) {
      console.log("开始时间" + value[0]);
      this.form.planStartTime = value[0];
      console.log("结束时间" + value[1]);
      this.form.planCompleteTime = value[1];
    },
    fileRemove(files){
 console.log(["文件删除后的列表",files]);
      var fileList = [];
      fileList = files;
      var AttachmentIds = [];
      for(var i = 0; i < fileList.length;i++){
        AttachmentIds[i] = fileList[i].response.body.resBody[0].fileId
      }
      this.form.projectAttachmentId = AttachmentIds;
    },
    formUploadOnSuccess(files) {
      console.log(["文件成功上传后的列表",files]);
      var fileList = [];
      fileList = files;
      var AttachmentIds = [];
      for(var i = 0; i < fileList.length;i++){
        AttachmentIds[i] = fileList[i].response.body.resBody[0].fileId
      }
      this.form.projectAttachmentId = AttachmentIds;
    }
  }
};
</script>