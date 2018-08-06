<template>
  <div style="margin: 10px;">
    <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform" label-width="100px">
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="学生姓名:">
            <el-input v-model="baseform.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学号:">
            <el-input v-model="baseform.nid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考生号:">
            <el-input v-model="baseform.kid"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="0">

        <el-col :span="8">
          <el-form-item label="身份证件类型:">
            <elx-select @change="changeCidTypes" v-model="baseform.cidType" :options="cidTypes"></elx-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证件号码:">
            <el-input v-model="baseform.cid"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="0">
        <el-col :span="8">
          <el-form-item label="性别:">

            <el-select v-model="baseform.sex" placeholder="请选择">
              <el-option v-for="item in sexType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="出生日期">
            <el-date-picker v-model="baseform.birth" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="政治面貌:">
            <elx-select @change="changeCheckZZMM" v-model="baseform.checkZZMM" :options="checkZZMMs"></elx-select>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族:">
            <elx-select @change="change" v-model="baseform.minzu" :options="minzulist"></elx-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="是否农村学生:">
            <el-switch active-value="Y" inactive-value="N" v-model="baseform.isNongCun" active-color="#13ce66" inactive-color="#ccc">
            </el-switch>

          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin: 0 auto;width: 150px;">
        <el-form-item>
          <el-button type="primary" ref="btn" size="mini" round @click="onSubmit($event)">保存个人资料</el-button>
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
      baseform: {
        name: "",
        sex: "", //性别
        birth: "", //出生日期
        nid: "", //学号
        kid: "", //考试号
        minzu: "", //民族
        cidType: "", //身份证件类型
        cid: "", //身份证号码
        checkZZMM: "", //政治面貌
        isNongCun: "Y", //是否农村学生
        BiYeDate: "", //毕业日期
        Zjz: "" //证件照
      },
      minzulist: [],
      sexType: [],
      cidTypes: [],

      checkZZMMs: []
    };
  },
  methods: {
    ...mapActions({
      getStuBaseInfo: store.namespace + "/getStuBaseInfo",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      updateStuBaseInfo: store.namespace + "/updateStuBaseInfo"
    }),
    getData() {
      var requestData = {};
      if (this.stuNo != 0) {
        requestData.stuNo = this.stuNo;
      }
      this.getStuBaseInfo(requestData).then(response => {
        console.log("getStuBaseInfo", response);
        var res = response.resBody;
        this.baseform.name = res.name;
        this.baseform.sex = res.sexType;
        this.baseform.birth = moment(
          res.birthday,
          "YYYY-MM-DD HH:mm:ss"
        ).format("YYYY-MM-DD");
        this.baseform.nid = res.stuNo;
        this.baseform.kid = res.collegeEntranceNo;
        this.baseform.minzu = res.nation;
        this.baseform.cidType = res.identityType;
        this.baseform.cid = res.identityNo;
        this.baseform.checkZZMM = res.politicalStatus;
        this.baseform.isNongCun = res.isCountryStu;
        this.baseform.Zjz = res.personalPhoto;
      });
    },
    getDict() {
      var requestData = {
        dicts: ["nation", "sex_type", "identity_type", "political_status"]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.minzulist = [];
        this.sexType = [];
        this.cidTypes = [];
        this.checkZZMMs = [];
        console.log(["dict", response]);
        res.nation.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.minzulist.push(t1);
        });
        res.sex_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.sexType.push(t1);
        });
        res.identity_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.cidTypes.push(t1);
        });
        res.political_status.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkZZMMs.push(t1);
        });
      });
      this.getData();
    },
    onSuccess(imgUrl) {
      //上传成功后图片地址 imgUrl
      this.baseform.imgUrl = imgUrl;
    },
    onSubmit(event) {
      var requestData = {
        stuNo: this.baseform.nid,
        name: this.baseform.name,
        collegeEntranceNo: this.baseform.kid,
        identityType: this.baseform.cidType,
        identityNo: this.baseform.cid,
        sexType: this.baseform.sex,
        birthday: this.baseform.birth,
        politicalStatus: this.baseform.checkZZMM,
        nation: this.baseform.minzu,
        isCountryStu: this.baseform.isNongCun
      };
      this.updateStuBaseInfo(requestData).then(response => {
        this.$message.success("保存成功");
        this.getDict();
      });
    },
    change(item) {
      this.baseform.minzu = item;
    },
    changeCidTypes(item) {
      console.log(item);
      this.baseform.cidTypes = item;
    },
    changeCheckZZMM(item) {
      this.baseform.checkZZMM = item; //政治面貌
    }
  },
  components: {
    "elx-select": select,
    avatar
  }
};
</script>

<style>
</style>
