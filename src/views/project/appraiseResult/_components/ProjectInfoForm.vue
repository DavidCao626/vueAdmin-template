<template>
  <div>
    <page class="page" :breadcrumb="false">
      <div slot="panel">
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
      </div>
    </page>

    <page class="page" :breadcrumb="false">
      <div slot="panel">

        <h3>二、测评信息</h3>
        <el-form label-position="left" :model="form.expand" label-width="110px" style="margin: 20px;">
          <el-form-item label="测评项目">
            <elx-select v-model="form.expand.appraiseProjectCode" placeholder="请选择" @change="projectChange">
              <el-option v-for="item in projectList" :key="item.id" :value="item.code" :obj="item" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="学业科目">
            <elx-select v-model="form.expand.assessSubjects" placeholder="请选择">
              <el-option v-for="item in unEnableStandardSubject" :key="item.code" :value="item.code" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="自评科目">
            <elx-select v-model="form.expand.academicSubjects" placeholder="请选择">
              <el-option v-for="item in unEnableStandardSubject" :key="item.code" :value="item.code" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="学院管理科目">
            <el-checkbox-group v-model="form.expand.collegeSubjects" @change="coChange">
              <el-checkbox v-for="item in collegeEnableStandardSubject" :disabled="item.checkNum!=1 && item.checkNum>0" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="班级管理科目">
            <el-checkbox-group v-model="form.expand.classSubjects" @change="clChange">
              <el-checkbox v-for="item in collegeEnableStandardSubject" :disabled="item.checkNum!=2 && item.checkNum>0" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
    </page>

    <page class="page" :breadcrumb="false">
      <div slot="panel">
        <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
          <el-col :span="7">
            <el-button type="primary" @click="onSaveAndNext">保存并下发</el-button>
          </el-col>
        </el-row>
      </div>
    </page>

  </div>
</template>
<script>
import tinymce from "~/components/Tinymce";
import Vue from "vue";
import ProjectTypeSelect from "./ProjectTypeSelect";
import ProjectAttachmentUplad from "./ProjectAttachmentUplad";
import state from "../../_store/index.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
import commons from "~/utils/common.js";
export default {
  name: "projectInfoForm",
  props: {
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
      form: state.namespace + "/getAppraiseResultProjectFormData",
      uploadAttrUrl: state.namespace + "/getUploadAttrUrl",
      ioptions: state.namespace + "/getServiceTypeList",
      ClassifyTypeList: state.namespace + "/getClassifyTypeList",
      categoryList: state.namespace + "/getappraiseCategoryList"
    })
  },
  data() {
    return {
      projectList: [],
      unEnableStandardSubject: [],
      collegeEnableStandardSubject: [],
      classEnableStandardSubject: [],
      currentCategoryId: 0, //当前选中的测评类别id
      appraiseTypeList: [
        {
          label: "假的测评类别",
          value: "1"
        }
      ],
      classifyTypedetailPath: "",
      iopt: [],
      classifyType: "",
      yearTypeList: []
    };
  },
  methods: {
    projectChange(val, vueCom, obj) {
      this.form.expand.assessSubject = "";
      this.form.expand.collegeSubjects = [];
      this.form.expand.classSubjects = [];
      this.queryIncludUnEnableStandardSubject({ projectId: obj.obj.id }).then(
        response => {
          this.unEnableStandardSubject = response.resBody;
        }
      );

      this.queryIncludEnableStandardSubject({ projectId: obj.obj.id }).then(
        response => {
          this.collegeEnableStandardSubject = response.resBody;
          var coe = this.collegeEnableStandardSubject;
          var that = this;
          coe.forEach(it => {
            Vue.set(it, "checkNum", 0);
          });
        }
      );
    },
    getItemDisable: function(item) {
      console.log(item);
      return false;
    },
    coChange(val) {
      var c = this.collegeEnableStandardSubject;
      c.forEach(it => {
        console.log(val.indexOf(it.code));
        if (val.indexOf(it.code) != -1) {
          it.checkNum = 1;
        } else {
          if (it.checkNum == 1) {
            it.checkNum = 0;
          }
        }
      });
    },
    clChange(val) {
      console.log(val);
      var c = this.collegeEnableStandardSubject;
      c.forEach(it => {
        console.log(val.indexOf(it.code));
        if (val.indexOf(it.code) != -1) {
          it.checkNum = 2;
        } else {
          if (it.checkNum == 2) {
            it.checkNum = 0;
          }
        }
      });
    },
    updateCategory() {
      this.currentCategoryId = this.form.expand.appraiseServiceType;
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
      insertOrUpdateAndNext: state.namespace + "/insertOrUpdateAndNext",
      getStudentApplyProject: state.namespace + "/getStudentApplyProject",
      queryIncludUnEnableStandardSubject:
        state.namespace + "/queryIncludUnEnableStandardSubject",
      queryIncludEnableStandardSubject:
        state.namespace + "/queryIncludEnableStandardSubject"
      //    queryClassifyTypeByCode:store.namespace + "/queryClassifyTypeByCode"
    }),
    getProjectList() {
      this.getStudentApplyProject({}).then(response => {
        this.projectList = response.resBody;
      });
    },
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
      if (!this.classifyType) {
        this.$message.error("子类型不能为空!");
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
          id: t.expand.id,
          academicSubjects:t.expand.academicSubjects,//学业科目
          appraiseProjectCode: t.expand.appraiseProjectCode, //测评项目代码
          assessSubjects: t.expand.assessSubjects, //考评科目(无科目项)
          collegeSubjects: t.expand.collegeSubjects, //学院可管理科目
          classSubjects: t.expand.classSubjects //班级可管理科目
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
    },
    createYearTypeList() {
      this.yearTypeList = [];
      for (var i = 2000; i < 2050; i++) {
        var temp = {
          label: i + "年",
          value: i.toString()
        };
        this.yearTypeList.push(temp);
      }
    }
  },
  mounted() {
    this.createYearTypeList();
    this.getProjectList();
  }
};
</script>
<style>
</style>
