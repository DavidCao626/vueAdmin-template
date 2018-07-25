<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform">
            <!-- <el-row>
                <el-col :span="8">
                    <el-form-item label="学号:">
                        <el-input v-model="baseform.nid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="是否农村五保户:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isNCWBH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否低保户:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isDBH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="是否孤儿:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isGE" @change="onGEChange" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否单亲家庭子女:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isDQJTZN" ref="isDQJTZN" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="是否残疾人子女:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isCJRZN" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否父母丧失劳动能力:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isFMSSLDNL" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="是否家中有大病患者:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isJZYDBHZ" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="本人是否残疾:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isBRSFCJ" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="baseform.isBRSFCJ">
                    <el-form-item label="残疾类别:">
                        <elx-select @change="changeCjlb" :value="baseform.cjlb" :options="checkDisableType"></elx-select>

                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="是否建档立卡贫困家庭:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isJDLKPKJT" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="是否低收入家庭:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isDSRJT" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否军烈属或优抚子女:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isJLSHYFZN" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭人均收入:">
                        <el-input v-model="baseform.JTRJSR" type="Number" max="999999" min="0.01"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="9">
                    <el-form-item label="家庭主要收入来源:">
                        <elx-select @change="changeJTZYSRLY" :value="baseform.JTZYSRLY" :options="checkFamilyIncomeType"></elx-select>

                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭是否遭受自然灾害:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.JTSFZSZRZH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="16" v-if="baseform.JTSFZSZRZH =='Y'">
                    <el-form-item label="自然灾害具体情况描述:">
                        <el-input v-model="baseform.JTSFZSZRZH_text"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭是否遭受突发意外事件:">

                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.JTSFZSYTFYWSJ" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="16" v-if="baseform.JTSFZSYTFYWSJ =='Y'">
                    <el-form-item label="突发意外事件具体描述:">
                        <el-input v-model="baseform.JTSFZSYTFYWSJ_text"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭欠债金额:">
                        <el-input v-model="baseform.JTQZJE" max="999999" min="0.01"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="家庭欠债原因:">
                        <el-input v-model="baseform.JTQZYY"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="家庭人口数:">
                        <el-input v-model="baseform.JTRKS" type="Number" ::maxlength="2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="劳动力人口数:">
                        <el-input v-model="baseform.LDRKS" type="Number" ::maxlength="2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="家庭成员失业人数:">
                        <el-input v-model="baseform.JTCYSYS" type="Number" ::maxlength="2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="赡养人口数:">
                        <el-input v-model="baseform.SYRKS"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="其他家庭经济信息:">
                        <el-input v-model="baseform.QTJTJJXX"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="8">
                    <el-form-item label="是否农村低保户:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isNCDBH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否农村特困供养:">
                        <el-switch active-value="Y" inactive-value="N" v-model="baseform.isNCTKGY" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="其他:">
                        <el-input v-model="baseform.QT" placeholder="填写农村特困供养、农村低户、建档立卡相关信息"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>

                <el-col :span="8">
                    <el-form-item label="认定困难级别名称:">
                        <elx-select @change="changeDiffName" :value="baseform.checkDiffName" :options="checkDiffNames"></elx-select>

                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="认定时间:">
                        <el-input v-model="baseform.RDSJ"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-col :span="24">
                <el-form-item label="认定原因:">
                    <el-input v-model="baseform.RDYY" :maxlength="30" style="width:300%"></el-input>
                </el-form-item>
            </el-col>
            <el-row>

                <el-col :span="24">
                    <el-form-item label="班级认定意见:">
                        <el-input v-model="baseform.BJTDYJ" :maxlength="33" style="width:300%"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

                <el-col :span="24">
                    <el-form-item label="年级认定意见:">
                        <el-input v-model="baseform.NJRDYJ" :maxlength="33" style="width:300%"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
            <el-row style="margin: 0 auto;width: 150px;">
                <el-form-item>
                    <el-button type="primary" size="mini" round @click="onSubmit">保存家庭信息</el-button>
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
  mounted() {
    this.getData();
    this.getDict();
  },
  data() {
    return {
      baseform: {
        nid: "", //学号
        isNCWBH: "N", //是否农村五保户
        isDBH: "N", //是否低保户
        isGE: "N", //是否孤儿
        isDQJTZN: "N", //是否单亲家庭子女
        isFMSSLDNL: "N", //是否残疾人子女
        isJZYDBHZ: "N", //是否父母丧失劳动能力
        isBRSFCJ: "N", //是否家中有大病患者
        isCJRZN: "N", //本人是否残疾
        cjlb: "1", //残疾类别
        isJDLKPKJT: "N", //是否建档立卡贫困家庭
        isDSRJT: "N", //是否低收入家庭
        isJLSHYFZN: "N", //是否军烈属或优抚子女
        JTRJSR: "", //家庭人均收入
        JTZYSRLY: "1", //家庭主要收入来源类别
        JTSFZSZRZH: "N", //家庭是否遭受自然灾害
        JTSFZSZRZH_text: "", //家庭自然灾害具体情况描述
        JTSFZSYTFYWSJ: "N", //家庭是否遭受突发意外事件
        JTSFZSYTFYWSJ_text: "", //突发意外事件具体描述
        JTQZJE: "", //家庭欠债金额
        JTQZYY: "", //家庭欠债原因
        JTRKS: "", //家庭人口数
        LDRKS: "", //劳动力人口数
        JTCYSYS: "", //家庭成员失业人数
        SYRKS: "", //赡养人口数
        QTJTJJXX: "", //其他家庭经济信息
        isNCDBH: "N", //是否农村低保户
        isNCTKGY: "N", //是否农村特困供养
        QT: "" //填写农村特困供养、农村低户、建档立卡相关信息
        // checkDiffName: "3", //认定困难级别
        // RDSJ: "", //认定时间
        // RDYY: "", //认定原因
        // BJTDYJ: "", //班级认定意见
        // NJRDYJ: "" //年级认定意见
      },
      checkDiffNames: [],
      checkDisableType: [],
      checkFamilyIncomeType: []
    };
  },
  methods: {
    ...mapActions({
      getStuEconmyInfo: store.namespace + "/getStuEconmyInfo",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      updateStuEcoInfo: store.namespace + "/updateStuEcoInfo"
    }),
    getData() {
      this.getStuEconmyInfo({}).then(response => {
        console.log("getStuEconmyInfo", response);
        var res = response.resBody;
        this.baseform.nid = res.stuNo; //学号
        this.baseform.isNCWBH = res.isFiveGuarantees; //是否农村五保户
        this.baseform.isDBH = res.isSubsistenceAllowances; //是否低保户
        this.baseform.isGE = res.isOrphan; //是否孤儿
        this.baseform.isDQJTZN = res.isSingleParent; //是否单亲家庭子女
        this.baseform.isFMSSLDNL = res.isDisabilityChildren; //是否残疾人子女
        this.baseform.isJZYDBHZ = res.isParentLoseLabour; //是否父母丧失劳动能力
        this.baseform.isBRSFCJ = res.isHasSeriousIllness; //是否家中有大病患者
        this.baseform.isCJRZN = res.isDisability; //本人是否残疾
        this.baseform.cjlb = res.disabilityType; //残疾类别
        this.baseform.isJDLKPKJT = res.isCreatedFile; //是否建档立卡贫困家庭
        this.baseform.isDSRJT = res.isLowIncome; //是否低收入家庭
        this.baseform.isJLSHYFZN = res.isSoldierChildren; //是否军烈属或优抚子女
        this.baseform.JTRJSR = res.capitaIncomeYear; //家庭人均收入
        this.baseform.JTZYSRLY = res.incomeType; //家庭主要收入来源类别
        this.baseform.JTSFZSZRZH = res.isNaturalHazard; //家庭是否遭受自然灾害
        this.baseform.JTSFZSZRZH_text = res.naturalHazardDesc; //家庭自然灾害具体情况描述
        this.baseform.JTSFZSYTFYWSJ = res.isEmergency; //家庭是否遭受突发意外事件
        this.baseform.JTSFZSYTFYWSJ_text = res.emergencyDesc; //突发意外事件具体描述
        this.baseform.JTQZJE = res.liabilitiesMoney; //家庭欠债金额
        this.baseform.JTQZYY = res.liabilitiesReason; //家庭欠债原因
        this.baseform.JTRKS = res.familyPerson; //家庭人口数
        this.baseform.LDRKS = res.labourPersonNum; //劳动力人口数
        this.baseform.JTCYSYS = res.unemploymentPersonNum; //家庭成员失业人数
        this.baseform.SYRKS = res.supportPersonNum; //赡养人口数
        this.baseform.QTJTJJXX = res.otherInfo; //其他家庭经济信息
        this.baseform.isNCDBH = res.isVillageSubsistenceAllowances; //是否农村低保户
        this.baseform.isNCTKGY = res.isPovertySupport; //是否农村特困供养
        this.baseform.QT = res.other; //填写农村特困供养、农村低户、建档立卡相关信息
      });
    },
    getDict() {
      var requestData = {
        dicts: ["income_type", "disability_type"]
      };
      this.getDictByDictNames(requestData).then(response => {
        var res = response.resBody;
        this.zzlxType = [];
        console.log(["dict", response]);

        res.income_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkFamilyIncomeType.push(t1);
        });
        res.disability_type.forEach(element => {
          var t1 = {};
          t1.label = element.dict_desc;
          t1.value = element.dict_key;
          this.checkDisableType.push(t1);
        });
      });
    },

    onSubmit() {
      var requestData = {
        stuNo: this.baseform.nid,
        isFiveGuarantees: this.baseform.isNCWBH,
        isSubsistenceAllowances: this.baseform.isDBH,
        isOrphan: this.baseform.isGE,
        isSingleParent: this.baseform.isDQJTZN,
        isDisabilityChildren: this.baseform.isFMSSLDNL,
        isParentLoseLabour: this.baseform.isJZYDBHZ,
        isHasSeriousIllness: this.baseform.isBRSFCJ,
        isDisability: this.baseform.isCJRZN,
        disabilityType: this.baseform.cjlb,
        isCreatedFile: this.baseform.isJDLKPKJT,
        isLowIncome: this.baseform.isDSRJT,
        isSoldierChildren: this.baseform.isJLSHYFZN,
        capitaIncomeYear: this.baseform.JTRJSR,
        incomeType: this.baseform.JTZYSRLY,
        isNaturalHazard: this.baseform.JTSFZSZRZH,
        naturalHazardDesc: this.baseform.JTSFZSZRZH_text,
        isEmergency: this.baseform.JTSFZSYTFYWSJ,
        emergencyDesc: this.baseform.JTSFZSYTFYWSJ_text,
        liabilitiesMoney: this.baseform.JTQZJE,
        liabilitiesReason: this.baseform.JTQZYY,
        familyPerson: this.baseform.JTRKS,
        labourPersonNum: this.baseform.LDRKS,
        unemploymentPersonNum: this.baseform.JTCYSYS,
        supportPersonNum: this.baseform.SYRKS,
        otherInfo: this.baseform.QTJTJJXX,
        isVillageSubsistenceAllowances: this.baseform.isNCDBH,
        isPovertySupport: this.baseform.isNCTKGY,
        other: this.baseform.QT
      };
      this.updateStuEcoInfo(requestData).then(response => {
        this.$message.success("修改成功");
      });
    },
    changeCjlb(value) {
      this.baseform.cjlb = value;
    },
    onGEChange() {
      if (this.baseform.isGE) {
        this.baseform.isDQJTZN = false;
        this.$refs["isDQJTZN"].disabled = true;
      } else {
        this.$refs["isDQJTZN"].disabled = false;
      }
    },
    changeJTZYSRLY() {
      this.baseform.JTZYSRLY = value;
    },
    changeDiffName() {
      this.baseform.checkDiffName = value;
    }
  },
  components: {
    "elx-select": select
  }
};
</script>

<style>
</style>
