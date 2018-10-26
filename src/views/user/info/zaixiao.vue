<template>
  <div style="margin: 10px;">
    <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="newForm" label-width="100px">

      <el-row>
        <el-col :span="8">
          <el-form-item label="学院:">
            <el-input v-model="newForm.collegeSocialName" disabled="" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="系名称">
            <el-input v-model="newForm.departmentName" disabled="" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业名称">
            <el-input v-model="newForm.majorSocialName" disabled="" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="攻读学历">
            <el-input v-model="newForm.studyDegreeName" disabled="" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学生类型">
            <el-input v-model="newForm.stuTypeName" disabled="" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学制">
            <el-select v-model="newForm.educationalType" disabled placeholder="">
              <el-option v-for="item in educationalTypeList"  :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>

        <el-col :span="8">
          <el-form-item label="学习形式">
            <el-select v-model="newForm.learnTypeCode" placeholder="">
              <el-option v-for="item in learnTypeList" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="政治面貌">
            <el-select v-model="newForm.politicalStatus" placeholder="">
              <el-option v-for="item in politicalStatusList" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="入学学年">
            <el-select v-model="newForm.startSchoolYearId" placeholder="">
              <el-option v-for="item in schoolYearList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="班级:">
            <el-select v-model="newForm.stuClassSocialCode" placeholder="" @change="classChange">
              <el-option v-for="item in orgClassList" :key="item.id" :value="item.socialCode" :label="item.orgName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin: 0 auto;width: 150px;">
        <el-form-item>
          <el-button type="primary" ref="btn" size="mini" round @click="onSubmit()">保存个人资料</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import select from "./_components/select";
import avatar from "~/components/Avatar";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";
export default {
  watch: {
    stuNo(newVal, oldVal) {
      this.getDict();
    }
  },
  props: {
    stuNo: {
      type: String,
      default: "0"
    }
  },
  mounted() {
    this.getDict();
  },
  data() {
    return {
      learnTypeList: [],
      educationalTypeList: [],
      politicalStatusList: [],
      schoolYearList: [],
      orgClassList: [],
      newForm: {
        stuNos: "", //学号
        educationalType: "", //学制
        collegeSocialName: "", //学院名称
        collegeSocialCode: "", //学院社会代码
        learnTypeCode: "", //学习形式
        departmentName: "", //系名称
        majorSocialName: "", //专业名称
        studyDegreeName: "", //攻读学历
        stuTypeName: "", //学生类型
        politicalStatus: "", //政治面貌
        startSchoolYearId: "", //入学学年
        stuClassSocialCode: "" //班级代码
      }
    };
  },
  methods: {
    ...mapActions({
      getStuUniverInfo: store.namespace + "/getStuUniverInfo",
      querySchoolYearDict: store.namespace + "/querySchoolYearDict",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryAllMajor: store.namespace + "/queryAllMajor",
      queryCollegeOrg: store.namespace + "/queryCollegeOrg",
      updateStuUniverInfo: store.namespace + "/updateStuUniverInfo",
      queryCollegeClassByCollegeSocailCode:
        store.namespace + "/queryCollegeClassByCollegeSocailCode",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner" //学生任职可选组织(当前登录用户的下级组织包括自己)
    }),
    classChange(val) {
      var org = this.orgClassList.find(el => {
        return el.socialCode == val;
      });
      this.newForm.departmentName = org.departmentName;
      this.newForm.majorSocialName = org.majorName;
      this.newForm.studyDegreeName = org.educationLevelName;
      this.newForm.stuTypeName = org.memberTypeName;
      this.newForm.educationalType = org.academic;
    },
    getSchoolYearList() {
      this.querySchoolYearDict({}).then(response => {
        this.schoolYearList = response.resBody;
      });
    },
    getData() {
      var requestData = {};
      if (this.stuNos != 0) {
        requestData.stuNo = this.newForm.stuNos;
      }
      this.getStuUniverInfo(requestData).then(response => {
        var res = response.resBody;
        this.newForm = res;
        this.newForm.stuNos = res.stuNo;
        this.queryCollegeClassByCollegeSocailCode({
          collegeSocailCode: this.newForm.collegeSocialCode
        }).then(response => {
          this.orgClassList = response.resBody.baseData;
        });
      });
    },
    getDict() {
      this.getSchoolYearList();
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
      var requestData = {
        dicts: ["educationalType", "learnTypeCode", "political_status"]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        res.educationalType.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.educationalTypeList.push(t1);
        });
        res.learnTypeCode.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.learnTypeList.push(t1);
        });
        res.political_status.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.politicalStatusList.push(t1);
        });
      });
      this.getData();
    },
    onSubmit(event) {
      var requestData = {
        stuNo: this.newForm.stuNos,
        learnTypeCode: this.newForm.learnTypeCode,
        schoolYearId: this.newForm.startSchoolYearId,
        politicalStatus: this.newForm.politicalStatus,
        stuClassSocialCode: this.newForm.stuClassSocialCode
      };
      this.updateStuUniverInfo(requestData).then(response => {
        this.$message.success("保存成功");
        this.getDict();
      });
    }
  },
  components: {
    "elx-select": select
  }
};
</script>

<style>
</style>
