<template>
  <div>
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
        <ProjectTypeSelect @selectValue="selectValue" :value="form.projectServiceType" :options="ioptions" :disabled="isProjectTypeSelectDisDisabled"></ProjectTypeSelect>
      </el-form-item>

      <el-form-item label="计划开始日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.planStartTime" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
      <el-form-item label="计划结束日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.planCompleteTime" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>

      <el-form-item label="是否生成公告:">
        <el-switch v-model="form.isSendPublicNotice" active-value="Y" inactive-value="N"></el-switch>
      </el-form-item>
      <el-form-item label="项目内容:">
        <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.projectDesc"></el-input>
      </el-form-item>

      <el-form-item label="项目附件:">
        <ProjectAttachmentUplad :fileList2="form.attrDetailBean" :url="uploadAttrUrl" style="width: 30%;" @onSuccess="formUploadOnSuccess"></ProjectAttachmentUplad>
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
import ProjectDate from "./ProjectDate";
import ProjectTypeSelect from "./ProjectTypeSelect";
import ProjectAttachmentUplad from "./ProjectAttachmentUplad";
import state from "../_store/index.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "projectInfoForm",
  props: {
    // form: {
    //   type: Object,
    //   default: function(){
    //   return {
    //     name: '',
    //     id: '', // 项目编号
    //     tyleId: '001', // 业务类别id
    //     date1: '',
    //     enddate: '',
    //     delivery: true,
    //     files: [],
    //     desc: ''
    //     }
    //   }
    // },
    isProjectTypeSelectDisDisabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ProjectDate,
    ProjectTypeSelect,
    ProjectAttachmentUplad
  },
  computed: {
    dataArr() {
      var t = [];
      t[0] = this.form.planStartTime;
      t[1] = this.form.planCompleteTime;
      return t;
    },
    ...mapGetters({
      form: state.namespace + "/getProjectFormData",
      uploadAttrUrl: state.namespace + "/getUploadAttrUrl",
      ioptions: state.namespace + "/getServiceTypeList"
    })
  },
  data() {
    return { iopt: [] };
  },
  methods: {
    ...mapActions({
      queryServiceTypeList: state.namespace + "/queryServiceTypeList",
      insertOrUpdateProject: state.namespace + "/insertOrUpdateProject",
      insertOrUpdateAndNext:state.namespace +"/insertOrUpdateAndNext"
    }),
    onSaveAndNext(e) {
console.log(this.form);
      var t = this.form;
      var requestData = {
        projectName: t.projectName,
        projectUserCode: t.projectUserCode,
        projectDesc: t.projectDesc,
        projectServiceType: t.projectServiceType,
        planStartTime: t.planStartTime,
        planCompleteTime: t.planCompleteTime,
        isSendPublicNotice: t.isSendPublicNotice,
        projectId: t.id,
        projectAttachmentId: t.projectAttachmentId,
        attrDetailBean: null
      };
      this.insertOrUpdateAndNext(requestData).then(response=>{
        this.$message.success("保存成功!");
        this.form.id = response.resBody.projectId
        console.log(["insertOrUpdateAndNext",response])
        this.$router.push({
          name:"projectConfig",
          params:{
            'itemId':response.resBody.itemId,
            'scopeId':response.resBody.scopeId
          }
        })
      });

    },
    onSave(e) {
      console.log(this.form);
      var t = this.form;
      var requestData = {
        projectName: t.projectName,
        projectUserCode: t.projectUserCode,
        projectDesc: t.projectDesc,
        projectServiceType: t.projectServiceType,
        planStartTime: t.planStartTime,
        planCompleteTime: t.planCompleteTime,
        isSendPublicNotice: t.isSendPublicNotice,
        projectId: t.id,
        projectAttachmentId: t.projectAttachmentId,
        attrDetailBean: null
      };
      this.insertOrUpdateProject(requestData).then(response=>{
        console.log(["!!!",response]);
        this.form.id = response.resBody.id
        this.$message.success("保存成功!");
      });
    },
    formDataOnChange(value) {
      console.log("开始时间" + value[0]);
      this.form.planStartTime = value[0];
      console.log("结束时间" + value[1]);
      this.form.planCompleteTime = value[1];
    },
    selectValue(val) {
      console.log(["外下拉框选中的val", val]);
      this.form.projectServiceType = val;
    },
    formUploadOnSuccess(files) {
      console.log(["文件成功上传后的列表", files]);
      var tempArr = [];
      for (var i = 0; i < files.length; i++) {
        tempArr[i] = files[i].response.body.resBody.fileId;
      }
      this.form.projectAttachmentId = tempArr;
    }
  }
};
</script>
<style>
</style>
