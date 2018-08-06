<template>
  <div style="margin: 10px;">
    <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">

      <el-row>
        <el-col :span="8">
          <el-form-item label="学号:">
            <el-input v-model="baseform.nid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学生类型:">
            <elx-select @change="changeCheckXSLX" :value="baseform.checkXSLX" :options="checkXSLXs"></elx-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="学习形式:">
            <elx-select @change="changeCheckXXXS" :value="baseform.checkXXXS" :options="checkXXXSs"></elx-select>

          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <!-- <el-col :span="8">
          <el-form-item label="院系名称:">
            <elx-select @change="changeYuanxi" :value="baseform.yuanxi" :options="collegeOrg"></elx-select>
          </el-form-item>
        </el-col> -->

        <!-- <el-col :span="8">
          <el-form-item label="所在年级:">
            <elx-select @change="changeCheckNJ" :value="baseform.checkNJ" :options="checkNJs"></elx-select>

          </el-form-item>
        </el-col> -->

        <el-col :span="8">
          <el-form-item label="班级:">
            <el-cascader :show-all-levels="false" v-model="baseform.banji" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="专业:">
            <elx-select @change="changezhuangye" :value="baseform.zhuanye" :options="majorList"></elx-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="攻读学历:">
            <elx-select @change="changeXueli" :value="baseform.xueli" :options="xuelis"></elx-select>

          </el-form-item>
        </el-col>

      </el-row>
      <!-- <el-row> -->
      <!-- <el-col :span="8">
                    <el-form-item label="专业大类:">
                        <elx-select @change="changeCheckZYDL" :value="baseform.checkZYDL" :options="checkZYDLs"></elx-select>

                    </el-form-item>
                </el-col> -->

      <!-- </el-row> -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="学制:">
            <elx-select @change="changeCheckXZ" :value="baseform.checkXZ" :options="checkXZs"></elx-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="入学日期:">
            <el-date-picker v-model="baseform.ruxueDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item label="是否已毕业:">
            <el-switch active-value="Y" inactive-value="N" v-model="baseform.isBiYe" active-color="#13ce66" inactive-color="#ccc">
            </el-switch>

          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="baseform.isBiYe == 'Y'">
          <el-form-item label="毕业日期:">
            <el-input v-model="baseform.BiYeDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
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
      this.getAllMajor();
      this.getCollegeOrg();
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
    this.getAllMajor();
    this.getCollegeOrg();
  },
  data() {
    return {
      orgProps: {
        label: "org_name",
        value: "org_code",
        children: "children"
      },
      orgList: [], //组织
      baseform: {
        nid: "", //学号
        checkXSLX: "", //学生类型
        checkXXXS: "", //学习形式
        checkXZ: "", //学制
        checkNJ: "", //年级
        checkZYDL: "", //专业大类
        ruxueDate: "", //入学日期
        xueli: "", //攻读学历,
        yuanxi: "",
        banji: [], //班级
        zhuanye: "", //专业
        isNongCun: "", //是否农村学生
        isBiYe: "", //是否毕业
        BiYeDate: "" //毕业日期
      },

      checkXSLXs: [],
      checkZZMMs: [],
      checkXXXSs: [],
      checkXZs: [],
      checkNJs: [],
      checkZYDLs: [],
      xuelis: [],
      majorList: [],
      collegeOrg: []
    };
  },
  methods: {
    ...mapActions({
      getStuUniverInfo: store.namespace + "/getStuUniverInfo",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      queryAllMajor: store.namespace + "/queryAllMajor",
      queryCollegeOrg: store.namespace + "/queryCollegeOrg",
      updateStuUniverInfo: store.namespace + "/updateStuUniverInfo",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner" //学生任职可选组织(当前登录用户的下级组织包括自己)
    }),
    getCollegeOrg() {
      this.queryCollegeOrg().then(response => {
        console.log(["queryCollegeOrg", response]);
        this.collegeOrg = [];
        response.resBody.forEach(ite => {
          var t = {};
          t.label = ite.orgName;
          t.value = ite.orgCode;
          this.collegeOrg.push(t);
        });
      });
    },
    getAllMajor() {
      this.queryAllMajor().then(response => {
        console.log(["major", response]);
        this.majorList = [];
        response.resBody.forEach(ite => {
          var t = {};
          t.label = ite.majorName;
          t.value = ite.majorCode;
          this.majorList.push(t);
        });
      });
    },
    getData() {
      var requestData = {};
      if (this.stuNo != 0) {
        requestData.stuNo = this.stuNo;
      }
      this.getStuUniverInfo(requestData).then(response => {
        console.log("getStuUniverInfo", response);
        var res = response.resBody;

        this.baseform.nid = res.stuNo; //学号
        this.baseform.checkXSLX = res.stuTypeCode; //学生类
        this.baseform.checkXXXS = res.learnTypeCode; //学习形式
        this.baseform.checkXZ = res.educationalType; //学制
        this.baseform.checkNJ = res.stuGradeCode; //年级
        this.baseform.checkZYDL = res.majorTypeCode; //专业大类
        if (res.startSchoolDate) {
          this.baseform.ruxueDate = moment(
            res.startSchoolDate,
            "YYYY-MM-DD HH:mm:ss"
          ).format("YYYY-MM-DD");
        }
        this.baseform.xueli = res.studyDegreeCode; //攻读学历,
        this.baseform.yuanxi = res.collegeCode;

        var s = []; //数组的长度:(orgCode.length() - 2) / 2
        if (res.orgCode) {
          var orgCode = res.orgCode;
          for (var i = 0; i < (orgCode.length - 2) / 2; i++) {
            s[i] = orgCode.substring(0, 2 + (i + 1) * 2);
          }
        }

        this.baseform.banji = s; //班级

        this.baseform.zhuanye = res.majorCode; //专业

        this.baseform.isBiYe = res.isEndSchool; //是否毕业

        if (res.endSchoolDate) {
          this.baseform.BiYeDate = moment(
            res.endSchoolDate,
            "YYYY-MM-DD HH:mm:ss"
          ).format("YYYY-MM-DD");
        }
      });
    },
    getDict() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
      var requestData = {
        dicts: [
          "stu_type",
          "learnTypeCode",
          "grade",
          "major_type",
          "study_degree_code",
          "educationalType"
        ]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.zzlxType = [];
        console.log(["dict", response]);
        this.checkXSLXs = []
        res.stu_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkXSLXs.push(t1);
        });
        this.checkXXXSs=[]
        res.learnTypeCode.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkXXXSs.push(t1);
        });
        this.checkXZs=[]
        res.educationalType.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkXZs.push(t1);
        });
        this.checkNJs=[]
        res.grade.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkNJs.push(t1);
        });
        this.checkZYDLs=[]
        res.major_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkZYDLs.push(t1);
        });
          this.xuelis=[]
        res.study_degree_code.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.xuelis.push(t1);
        });
      });
      this.getData();
    },
    onSubmit(event) {
      //this.$refs["btn"].loading = true;
      var requestData = {
        stuNo: this.baseform.nid,
        stuTypeCode: this.baseform.checkXSLX,
        learnTypeCode: this.baseform.checkXXXS,
        collegeCode: this.baseform.banji[this.baseform.banji.length - 2],
        orgCode: this.baseform.banji[this.baseform.banji.length - 1],
        majorCode: this.baseform.zhuanye,
        educationalType: this.baseform.checkXZ,
        studyDegreeCode: this.baseform.xueli,
        startSchoolDate: this.baseform.ruxueDate
      };
      this.updateStuUniverInfo(requestData).then(response => {
        this.$message.success("保存成功");
       // this.$refs["btn"].loading = false;
        this.getDict();
      });
    },
    changezhuangye(item) {
      this.baseform.zhuanye = item;
    },
    changeCheckXSLX(item) {
      this.baseform.checkXSLX = item;
    },
    changeCheckXXXS(item) {
      this.baseform.checkXXXS = item;
    },
    changeCheckXZ(item) {
      this.baseform.checkXZ = item;
    },
    changeCheckNJ(item) {
      this.baseform.checkNJ = item;
    },
    changeCheckZYDL(item) {
      this.baseform.checkZYDL = item;
    },
    changeYuanxi(item) {
      this.baseform.yuanxi = item;
    },
    changeXueli(item) {
      this.baseform.xueli = item;
    }
  },
  components: {
    "elx-select": select
  }
};
</script>

<style>
</style>
