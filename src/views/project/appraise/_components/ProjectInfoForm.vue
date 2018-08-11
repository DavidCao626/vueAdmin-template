<template>
  <div>
    <h3>一、项目信息</h3>
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

      <el-form-item label="子类型:">
        <el-select v-model="classifyType" placeholder="请选择" @change="classifyTypeDetail">
          <el-option v-for="item in ClassifyTypeList" :key="item.value" :label="item.typeName" :value="item.templateKey">
          </el-option>
        </el-select>
        <el-button size="small" @click="clasDetail">详细</el-button>

      </el-form-item>

      <el-form-item label="计划开始日期">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.planStartTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束日期">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.planCompleteTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="项目附件:">
        <ProjectAttachmentUplad :fileList2="form.attrDetailBean" :url="uploadAttrUrl" style="width: 30%;" @onSuccess="formUploadOnSuccess"></ProjectAttachmentUplad>
      </el-form-item>

      <el-form-item label="是否生成公告:">
        <el-switch v-model="form.isSendPublicNotice" active-value="Y" inactive-value="N"></el-switch>
      </el-form-item>
      <el-form-item label="公告内容:" v-show="form.isSendPublicNotice=='Y'?true:false">
        <!-- <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form.projectDesc"></el-input> -->
        <tinymce :height="300" v-model="form.projectDesc" id='tinymce'></tinymce>
      </el-form-item>
    </el-form>
    <br/>
    </hr>
    <br/>
    <h3>二、测评信息</h3>
    <el-form ref="form.expand" label-position="left" :model="form" label-width="110px" style="margin: 20px;">
      <el-form-item label="名称">
        <el-input v-model="form.expand.appraiseName" autosize focus style="width:50%;">
          <i slot="suffix" class="el-icon-edit el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-input v-model="form.expand.appraiseYearType" autosize focus style="width:50%;">
          <i slot="suffix" class="el-icon-edit el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.expand.appraiseStartTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.expand.appraiseEndTime" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="测评类别">

        <el-select v-model="form.expand.appraiseServiceType" placeholder="请选择" @change="appraiseServiceTypeChange">
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-button type="" @click="updateCategory">修改</el-button>
        <el-button type="" @click="insertCategory">新增</el-button>

      </el-form-item>
    </el-form>

    <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
      <el-col :span="7">
        <!-- <el-button ref="next" @click="onSave">保存</el-button> -->
        <el-button ref="back" @click="onSaveAndNext">保存并下发</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import tinymce from "~/components/Tinymce";
import ProjectTypeSelect from "./ProjectTypeSelect";
import ProjectAttachmentUplad from "./ProjectAttachmentUplad";
import state from "../../_store/index.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
import commons from "~/utils/common.js";
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
      default: true
    }
  },
  components: {
    ProjectTypeSelect,
    ProjectAttachmentUplad,
    tinymce
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
      ioptions: state.namespace + "/getServiceTypeList",
      ClassifyTypeList: state.namespace + "/getClassifyTypeList",
      categoryList: state.namespace + "/getappraiseCategoryList"
    })
  },
  data() {
    return {
      currentCategoryId: 0, //当前选中的测评类别id
      appraiseTypeList: [
        {
          label: "假的测评类别",
          value: "1"
        }
      ],
      classifyTypedetailPath: "",
      iopt: [],
      classifyType:""
    };
  },
  methods: {
    updateCategory() {
      this.currentCategoryId = this.form.expand.appraiseServiceType
      if (!this.currentCategoryId) {
        this.$message.error("请选择一个类别再进行操作");
        return;
      }
      this.$router.push({
        path: "/zongce/addCategory",
        query: {
          id: this.currentCategoryId,
          serviceType: 0
        }
      });
    },
    insertCategory() {
      this.$router.push({
        path: "/zongce/addCategory",
        query: {
          serviceType: 0
        }
      });
    },
    ...mapActions({
      queryServiceTypeList: state.namespace + "/queryServiceTypeList",
      insertOrUpdateProject: state.namespace + "/insertOrUpdateProject",
      insertOrUpdateAndNext: state.namespace + "/insertOrUpdateAndNext"
      //    queryClassifyTypeByCode:store.namespace + "/queryClassifyTypeByCode"
    }),
    appraiseServiceTypeChange(val) {
      this.currentCategoryId = val;
    },
    clasDetail() {
      if (this.classifyTypedetailPath != "") {
        window.open(this.classifyTypedetailPath);
      }
    },
    classifyTypeDetail(val) {
      console.log([val, this.ClassifyTypeList]);
      for (var i = 0; i < this.ClassifyTypeList.length; i++) {
        if (this.ClassifyTypeList[i].templateKey == val) {
          this.classifyTypedetailPath = this.ClassifyTypeList[i].detailPath;
        }
      }
      console.log([
        " this.classifyTypedetailPath",
        this.classifyTypedetailPath
      ]);
    },
    onSaveAndNext(e) {
      if(!this.classifyType){
        this.$message.error("子类型不能为空!")
        return;
      }
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
        classifyType: this.classifyType,
        attrDetailBean: null,
        expand: {
          appraiseId: t.expand.appraiseId,
          appraiseName: t.expand.appraiseName, //名称
          appraiseStartTime: t.expand.appraiseStartTime, //开始时间
          appraiseEndTime: t.expand.appraiseEndTime, //结束时间
          appraiseYearType: t.expand.appraiseYearType, //年度
          appraiseServiceType: t.expand.appraiseServiceType //测评类别
        }
      };
      this.insertOrUpdateAndNext(requestData).then(response => {
        this.$message.success("保存成功!");
        this.form.id = response.resBody.projectId;
        console.log(["insertOrUpdateAndNext", response]);
        this.$router.push({
          name: "issuedAppraiseProject",
          params: {
            itemId: response.resBody.itemId,
            scopeId: response.resBody.scopeId
          }
        });
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
        classifyType: this.classifyType,
        attrDetailBean: null
      };
      this.insertOrUpdateProject(requestData).then(response => {
        console.log(["!!!", response]);
        this.form.id = response.resBody.id;
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
  },
  mounted() {}
};
</script>
<style>
</style>
