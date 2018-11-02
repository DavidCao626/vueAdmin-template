<template>
    <div>
        <h2 @click="goBack">返回</h2><br/>
        <el-form :model="formData" size="small" label-width="80px">

            <el-form-item label="学号:">
                <el-input v-model="formData.stuNo" placeholder="学号"></el-input>
            </el-form-item>

            <el-form-item label="姓名:">
                <el-input v-model="formData.name" placeholder="姓名"></el-input>
            </el-form-item>

            <el-form-item label="考生号:">
                <el-input v-model="formData.collegeEntranceNo" placeholder="考生号"></el-input>
            </el-form-item>

            <el-form-item label="证件类型:">
                <elx-select @change="changeIdType" v-model="formData.identityType" :options="idTypeList"></elx-select>
            </el-form-item>

            <el-form-item label="证件号码:">
                <el-input v-model="formData.identityNo" placeholder="证件号码"></el-input>
            </el-form-item>

            <el-form-item label="性别:">
                <el-radio-group v-model="formData.sexType">
                    <el-radio-button v-for="item in sexTypeList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="出生日期:">
                <el-date-picker v-model="formData.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="政治面貌:">
                <elx-select @change="politicalStatus" v-model="formData.politicalStatus" :options="politicalStatusList"></elx-select>
            </el-form-item>

            <el-form-item label="民族:">
                <elx-select @change="nation" v-model="formData.nation" :options="nationList"></elx-select>
            </el-form-item>

            <el-form-item label="农村学生:">
                <el-radio-group v-model="formData.isCountryStu">
                    <el-radio-button v-for="item in isCountryStuList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="学生类型:">
                <elx-select @change="stuTypeCode" v-model="formData.stuTypeCode"  :options="stuTypeCodeList"></elx-select>
            </el-form-item>

            <el-form-item label="学习形式:">
                <elx-select @change="learnTypeCode" v-model="formData.learnTypeCode"  :options="learnTypeCodeList"></elx-select>
            </el-form-item>

            <el-form-item label="所属班级:">

                <el-cascader :show-all-levels="false" v-model="formData.orgArr" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>

            </el-form-item>

            <el-form-item label="专业:">
                <elx-select @change="majorCode" v-model="formData.majorCode" :options="majorCodeList"></elx-select>
            </el-form-item>

            <el-form-item label="学制:">
                <elx-select @change="educationalType" v-model="formData.educationalType" :options="educationalTypeList"></elx-select>
            </el-form-item>

            <el-form-item label="攻读学历:">
                <elx-select @change="studyDegreeCode" v-model="formData.studyDegreeCode" :options="studyDegreeCodeList"></elx-select>
            </el-form-item>

            <el-form-item label="入学日期:">
                <el-date-picker v-model="formData.startSchoolDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="onSubmit">保存</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
import select from "../info/_components/select";
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  components: {
    "elx-select": select
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getDicts();
    });
  },
  data() {
    return {
      orgProps: {
        label: "orgName",
        value: "orgCode",
        children: "children"
      },
      formData: {
        stuNo: "",
        name: "",
        collegeEntranceNo: "",
        identityType: "",
        identityNo: "",
        sexType: "",
        birthday: new Date(),
        politicalStatus: "",
        nation: "",
        isCountryStu: "",
        stuTypeCode: "",
        learnTypeCode: "",
        orgArr: [],
        majorCode: "",
        educationalType: "",
        studyDegreeCode: "",
        startSchoolDate: new Date()
      },
      orgList: [], //组织
      sexTypeList: [],
      isCountryStuList: [],
      idTypeList: [],
      nationList: [],
      stuTypeCodeList: [],
      learnTypeCodeList: [],
      majorCodeList: [], //专业
      educationalTypeList: [],
      studyDegreeCodeList: [],
      politicalStatusList: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onSubmit() {
      var requestData = {
        stuNo: this.formData.stuNo,
        name: this.formData.name,
        collegeEntranceNo: this.formData.collegeEntranceNo,
        identityType: this.formData.identityType,
        identityNo: this.formData.identityNo,
        sexType: this.formData.sexType,
        birthday: this.formData.birthday,
        politicalStatus: this.formData.politicalStatus,
        nation: this.formData.nation,
        isCountryStu: this.formData.isCountryStu,
        stuTypeCode: this.formData.stuTypeCode,
        learnTypeCode: this.formData.learnTypeCode,
        collegeCode: this.formData.orgArr[this.formData.orgArr.length - 2],
        orgCode: this.formData.orgArr[this.formData.orgArr.length - 1],
        majorCode: this.formData.majorCode,
        educationalType: this.formData.educationalType,
        studyDegreeCode: this.formData.studyDegreeCode,
        startSchoolDate: this.formData.startSchoolDate
      };
      this.createStudent(requestData).then(response => {
        this.$message.success("保存成功");
        this.$router.go(-1);
      });
    },
    ...mapActions({
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryAllMajor: store.namespace + "/queryAllMajor",
      createStudent: store.namespace + "/createStudent",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner" //学生任职可选组织(当前登录用户的下级组织包括自己)
    }),
    getDicts() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
      this.queryAllMajor().then(response => {
        console.log(["major", response]);
        this.majorCodeList = [];
        response.resBody.forEach(ite => {
          var t = {};
          t.label = ite.majorName;
          t.value = ite.majorCode;
          this.majorCodeList.push(t);
        });
      });
      var requestData = {
        dicts: [
          "nation",
          "sex_type",
          "identity_type",
          "political_status",
          "stu_type",
          "learnTypeCode",
          "study_degree_code",
          "educationalType",
          "isUse" //是否
        ]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.sexTypeList = res.sex_type;
        this.isCountryStuList = res.isUse;
        this.idTypeList = [];
        res.identity_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.idTypeList.push(t1);
        });
        this.nationList = [];
        res.nation.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.nationList.push(t1);
        });

        this.politicalStatusList = [];
        res.political_status.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.politicalStatusList.push(t1);
        });

        this.stuTypeCodeList = [];
        res.stu_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.stuTypeCodeList.push(t1);
        });
        this.learnTypeCodeList = [];
        res.learnTypeCode.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.learnTypeCodeList.push(t1);
        });
        this.educationalTypeList = [];
        res.educationalType.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.educationalTypeList.push(t1);
        });
        this.studyDegreeCodeList = [];
        res.study_degree_code.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.studyDegreeCodeList.push(t1);
        });
        console.log(["sex", res.sex_type[0]["dict_key"]]);
        this.formData.sexType = res.sex_type[0]["dict_key"];
        this.formData.isCountryStu = res.isUse[0]["dict_key"];
      });
    },

    changeIdType(val) {
      this.formData.identityType = val;
    },
    politicalStatus(val) {
      this.formData.politicalStatus = val;
    },
    nation(val) {
      this.formData.nation = val;
    },
    stuTypeCode(val) {
      this.formData.stuTypeCode = val;
    },
    learnTypeCode(val) {
      this.formData.learnTypeCode = val;
    },
    majorCode(val) {
      this.formData.majorCode = val;
    },
    educationalType(val) {
      this.formData.educationalType = val;
    },
    studyDegreeCode(val) {
      this.formData.studyDegreeCode = val;
    }
  }
};
</script>

<style scoped>
</style>

