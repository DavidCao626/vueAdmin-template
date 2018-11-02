<template>
  <div>
    <page class="page" :breadcrumb="false">
      <div slot="panel">

        <div class="pannel_title">项目信息</div>

        <el-form ref="form.expand" label-position="left" :model="form" label-width="110px" style="margin: 20px;">
          <el-form-item label="学年">
            <elx-select v-model="form.expand.schoolYearId" placeholder="请选择" @change="schoolYearChange">
              <el-option v-for="item in schoolYearList" :key="item.id" :obj="item" :label="item.name" :value="item.id">
              </el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="form.expand.name" autosize focus style="width:50%;">
              <i slot="suffix" class="el-icon-edit el-input__icon"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="代码">
            <el-input v-model="form.expand.userCode" autosize focus style="width:50%;">
              <i slot="suffix" class="el-icon-edit el-input__icon"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="学生类别">
             <el-checkbox-group v-model="form.expand.stuType" :min="1">
              <el-checkbox v-for="item in stuTypeList" :label="item.code" :key="item.code">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="年级">
            <el-checkbox-group v-model="form.expand.grade" :min="1">
              <el-checkbox v-for="item in gradeList" :label="item.dict_key" :key="item.dict_key">{{item.dict_desc}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="关联贫困建档">
            <el-radio-group v-model="form.expand.rules.relationPoverty.flag">
              <el-radio-button label="Y">是</el-radio-button>
              <el-radio-button label="N">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="关联校内测评">
            <el-radio-group v-model="form.expand.rules.schoolAppraisal.flag">
              <el-radio-button label="Y">是</el-radio-button>
              <el-radio-button label="N">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="校内测评名次" v-show="form.expand.rules.schoolAppraisal.flag == 'Y'">
            <el-input-number v-model="form.expand.rules.schoolAppraisal.first" :min="1" label="班级排名"></el-input-number>
          </el-form-item>

          <el-form-item label="关联年度测评">
            <el-radio-group v-model="form.expand.rules.yearAppraisal.flag">
              <el-radio-button label="Y">是</el-radio-button>
              <el-radio-button label="N">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="年度测评名次" v-show="form.expand.rules.yearAppraisal.flag == 'Y'">
            <el-input-number v-model="form.expand.rules.yearAppraisal.first" :min="1" label="班级排名"></el-input-number>
          </el-form-item>

          <el-form-item label="关联体能测试">
            <el-radio-group v-model="form.expand.rules.physical.flag">
              <el-radio-button label="Y">是</el-radio-button>
              <el-radio-button label="N">否</el-radio-button>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="建档年度综测">
            <el-radio-group v-model="form.expand.rules.createFileYearAppraisal.flag">
              <el-radio-button label="Y">是</el-radio-button>
              <el-radio-button label="N">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="建档综测排名" v-show="form.expand.rules.createFileYearAppraisal.flag == 'Y'">
            <el-input-number v-model="form.expand.rules.createFileYearAppraisal.first" :min="1" label="班级排名"></el-input-number>
          </el-form-item>
          
          <el-form-item label="关联学习成绩">
            <el-radio-group v-model="form.expand.rules.stuScore.flag">
              <el-radio-button label="Y">是</el-radio-button>
              <el-radio-button label="N">否</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="学习成绩排名" v-show="form.expand.rules.stuScore.flag == 'Y'">
            <el-input-number v-model="form.expand.rules.stuScore.first" :min="1" label="班级排名"></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="体能测试分数" v-show="form.expand.rules.physical.flag == 'Y'">
            <el-input-number v-model="form.expand.rules.physical.score" label="分数"></el-input-number>
          </el-form-item> -->

        </el-form>
      </div>
    </page>
    <page class="page" :breadcrumb="false">
      <div slot="panel">
        <div class="pannel_title">任务配置</div>
        <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">
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
      form: state.namespace + "/getNationalGrantsProjectFormData",
      uploadAttrUrl: state.namespace + "/getUploadAttrUrl",
      ioptions: state.namespace + "/getServiceTypeList",
      ClassifyTypeList: state.namespace + "/getClassifyTypeList",
      categoryList: state.namespace + "/getappraiseCategoryList"
    })
  },
  data() {
    return {
      stuTypeList: [],
      gradeList: [],
      schoolYearList: [],
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
     schoolYearChange(p1, p2, p3, p4) {
      console.log([p1, p2, p3, p4]);
      var schoolYearName = p3.obj.name;
      this.form.expand.name =
        schoolYearName +
        this.ioptions.find(el => {
          return el.classifyCode == this.form.projectServiceType;
        }).classifyName +
        "任务";
    },
    getDict() {
      var requestData = {
        dicts: ["study_degree_code", "grade"]
      };
      this.getDictByDictNames(requestData).then(response => {
        this.gradeList = response.resBody.grade;
      });
        this.queryStuTypeByEducationLevelCode({}).then(response=>{
         this.stuTypeList = response.resBody;
      })
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
      queryStuTypeByEducationLevelCode:state.namespace + "/queryStuTypeByEducationLevelCode",
      queryServiceTypeList: state.namespace + "/queryServiceTypeList",
      insertOrUpdateProject: state.namespace + "/insertOrUpdateProject",
      insertOrUpdateAndNext: state.namespace + "/insertOrUpdateAndNext",
      getSchoolYear: state.namespace + "/getSchoolYear",
      querySchoolYear: state.namespace + "/querySchoolYear",
      getDictByDictNames: state.namespace + "/getDictByDictNames"
      //    queryClassifyTypeByCode:store.namespace + "/queryClassifyTypeByCode"
    }),
    getSchoolYearList() {
      this.querySchoolYear({ currentPage: 1, pageSize: 99999 }).then(
        response => {
          this.schoolYearList = response.resBody.baseData;
        }
      );
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
        projectName: t.expand.name,
        projectUserCode: t.expand.userCode,
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
          id: 0,
          name: t.expand.name, //名称
          userCode: t.expand.userCode, //编码
          schoolYearId: t.expand.schoolYearId, //学年
          schoolYearName: t.expand.schoolYearName, //学年名称
          stuType: t.expand.stuType, //学生类别
          grade: t.expand.grade, //年级
          rules: t.expand.rules //参与者规则
        }
      };
      this.insertOrUpdateAndNext(requestData).then(response => {
        this.$message.success("保存成功!");
        this.form.id = response.resBody.projectId;
        console.log(["insertOrUpdateAndNext", response]);
        this.$router.push({
          name: "projectConfig",
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
    this.getDict();
    this.createYearTypeList();
    this.getSchoolYearList();
  }
};
</script>
<style>
.pannel_title {
  background-color: #336699;
  line-height: 32px;
  color: #ffffff;
  padding-left: 5px;
  margin: -10px;
}
</style>
