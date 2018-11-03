<template>
    <div style="margin: 10px;">
        <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item label="是否农村五保户:">
                        <el-radio-group v-model="baseform.isNCWBH">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否家中有大病患者:">
                        <el-radio-group v-model="baseform.isBRSFCJ">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="是否孤儿:">
                        <el-radio-group v-model="baseform.isGE">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否单亲家庭子女:">

                        <el-radio-group :disabled="!baseform.isGE == 'N'" v-model="baseform.isDQJTZN">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">

            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="本人是否残疾:">
                        <el-radio-group v-model="baseform.isCJRZN">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="残疾类别:">
                        <el-select :disabled="baseform.isCJRZN != 'Y'" v-model="baseform.cjlb" placeholder="">
                            <el-option v-for="item in checkDisableType" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>

                <el-col :span="8">
                    <el-form-item label="是否低收入家庭:">
                        <el-radio-group v-model="baseform.isDSRJT">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否军烈属或优抚子女:">
                        <el-radio-group v-model="baseform.isJLSHYFZN">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
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
                        <el-select v-model="baseform.JTZYSRLY" placeholder="家庭主要收入来源">
                            <el-option v-for="item in checkFamilyIncomeType" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
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
                        <el-radio-group v-model="baseform.isNCDBH">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否农村特困供养:">
                        <el-radio-group v-model="baseform.isNCTKGY">
                            <el-radio-button label="Y">是</el-radio-button>
                            <el-radio-button label="N">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="其他:">
                        <el-input v-model="baseform.QT" placeholder="填写农村特困供养、农村低户、建档立卡相关信息"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-checkbox-group v-model="resonArr">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="1、">
                            <el-checkbox label="A">家庭遭受自然灾害</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="自然灾害具体情况描述:">
                            <el-input :disabled="getState('A')" v-model="ADesc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="2、">
                            <el-checkbox label="B">家庭遭受突发意外事件</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="突发意外事件具体描述:">
                            <el-input :disabled="getState('B')" v-model="BDesc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="3、">
                            <el-checkbox label="C">家庭成员因残疾</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="4、">
                            <el-checkbox label="D">年迈而劳动能力弱情况</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="5、">
                            <el-checkbox label="E">家庭适龄就学子女较多</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="适龄就学子女人数:">
                            <el-input :disabled="getState('E')" v-model="EDesc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="6、">
                            <el-checkbox label="F">家庭成员失业</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="家庭成员失业人数:">
                            <el-input :disabled="getState('F')" v-model="FDesc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="7、">
                            <el-checkbox label="G">家庭欠债</el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="家庭欠债金额:">
                            <el-input :disabled="getState('G')" v-model="GDesc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="家庭欠债原因:">
                            <el-input :disabled="getState('G')" v-model="GDescB"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="8、">
                            <el-checkbox label="I">建档立卡家庭</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="9、">
                            <el-checkbox label="J">是否低保</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-checkbox-group>

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
      resonArr: [],
      ADesc: "",
      BDesc: "",
      EDesc: "",
      FDesc: "",
      GDesc: "",
      GDescB: "",
      baseform: {
        nid: "", //学号
        isNCWBH: "N", //是否农村五保户
        isGE: "N", //是否孤儿
        isDQJTZN: "N", //是否单亲家庭子女
        isBRSFCJ: "N", //是否家中有大病患者
        isCJRZN: "N", //本人是否残疾
        cjlb: "1", //残疾类别
        isDSRJT: "N", //是否低收入家庭
        isJLSHYFZN: "N", //是否军烈属或优抚子女
        JTRJSR: "", //家庭人均收入
        JTZYSRLY: "1", //家庭主要收入来源类别
        JTRKS: "", //家庭人口数
        LDRKS: "", //劳动力人口数
        SYRKS: "", //赡养人口数
        QTJTJJXX: "", //其他家庭经济信息
        isNCDBH: "N", //是否农村低保户
        isNCTKGY: "N", //是否农村特困供养
        QT: "" //填写农村特困供养、农村低户、建档立卡相关信息
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
    getState(str) {
      var resonArr = this.resonArr;
      for (var i = 0; i < resonArr.length; i++) {
        if (str == resonArr[i]) {
          return false;
        }
      }
      return true;
    },
    getData() {
      var requestData = {};
      if (this.stuNo != 0) {
        requestData.stuNo = this.stuNo;
      }
      this.getStuEconmyInfo(requestData).then(response => {
        console.log("getStuEconmyInfo", response);
        var res = response.resBody;
        this.baseform.nid = res.stuNo; //学号
        this.baseform.isNCWBH = res.isFiveGuarantees; //是否农村五保户
        this.baseform.isGE = res.isOrphan; //是否孤儿
        this.baseform.isDQJTZN = res.isSingleParent; //是否单亲家庭子女
        this.baseform.isBRSFCJ = res.isHasSeriousIllness; //是否家中有大病患者
        this.baseform.isCJRZN = res.isDisability; //本人是否残疾
        this.baseform.cjlb = res.disabilityType; //残疾类别
        this.baseform.isDSRJT = res.isLowIncome; //是否低收入家庭
        this.baseform.isJLSHYFZN = res.isSoldierChildren; //是否军烈属或优抚子女
        this.baseform.JTRJSR = res.capitaIncomeYear; //家庭人均收入
        this.baseform.JTZYSRLY = res.incomeType; //家庭主要收入来源类别
        this.baseform.JTRKS = res.familyPersonNum; //家庭人口数
        this.baseform.LDRKS = res.labourPersonNum; //劳动力人口数
        this.baseform.SYRKS = res.supportPersonNum; //赡养人口数
        this.baseform.QTJTJJXX = res.otherInfo; //其他家庭经济信息
        this.baseform.isNCDBH = res.isVillageSubsistenceAllowances; //是否农村低保户
        this.baseform.isNCTKGY = res.isPovertySupport; //是否农村特困供养
        this.baseform.QT = res.other; //填写农村特困供养、农村低户、建档立卡相关信息

        var arr = this.resonArr;
        arr = [];
        var darr = response.resBody.economyDict;
        darr.forEach(el => {
          console.log("---" + arr);
          switch (el.dkey) {
            case "A":
              this.ADesc = el.desc.desc.desc;
              arr.push("A");
              break;
            case "B":
              this.BDesc = el.desc.desc.desc;
              arr.push("B");
              break;
            case "C":
              arr.push("C");
              break;
            case "D":
              arr.push("D");
              break;
            case "E":
              this.EDesc = el.desc.desc.desc;
              arr.push("E");
              break;
            case "F":
              this.FDesc = el.desc.desc.desc;
              arr.push("F");
              break;
            case "G":
              this.GDesc = el.desc.desc.desc;
              this.GDescB = el.desc.desc.descb;
              arr.push("G");
              break;
            case "I":
              arr.push("I");
              break;
            case "J":
              arr.push("J");
              break;
          }
          this.$set(this, "resonArr", arr);
        });
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
      this.getData();
    },

    onSubmit() {
      var requestData = {
        stuNo: this.baseform.nid,
        isFiveGuarantees: this.baseform.isNCWBH,
        isOrphan: this.baseform.isGE,
        isSingleParent: this.baseform.isDQJTZN,
        isHasSeriousIllness: this.baseform.isBRSFCJ,
        isDisability: this.baseform.isCJRZN,
        disabilityType: this.baseform.cjlb,
        isLowIncome: this.baseform.isDSRJT,
        isSoldierChildren: this.baseform.isJLSHYFZN,
        capitaIncomeYear: this.baseform.JTRJSR,
        incomeType: this.baseform.JTZYSRLY,
        familyPersonNum: this.baseform.JTRKS,
        labourPersonNum: this.baseform.LDRKS,
        supportPersonNum: this.baseform.SYRKS,
        otherInfo: this.baseform.QTJTJJXX,
        isVillageSubsistenceAllowances: this.baseform.isNCDBH,
        isPovertySupport: this.baseform.isNCTKGY,
        other: this.baseform.QT
      };
      var arr = this.resonArr;
      var temp = [];
      if (arr.length != 0) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "A") {
            var tempo = {
              dkey: "A",
              desc: {
                desc: {
                  desc: this.ADesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "B") {
            var tempo = {
              dkey: "B",
              desc: {
                desc: {
                  desc: this.BDesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "C") {
            var tempo = {
              dkey: "C",
              desc: {
                desc: {
                  desc: this.CDesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "D") {
            var tempo = {
              dkey: "D",
              desc: {
                desc: {
                  desc: this.DDesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "E") {
            var tempo = {
              dkey: "E",
              desc: {
                desc: {
                  desc: this.EDesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "F") {
            var tempo = {
              dkey: "F",
              desc: {
                desc: {
                  desc: this.FDesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "G") {
            var tempo = {
              dkey: "G",
              desc: {
                desc: {
                  desc: this.GDesc,
                  descb: this.GDescB
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "I") {
            var tempo = {
              dkey: "I",
              desc: {
                desc: {
                  desc: this.IDesc
                }
              }
            };
            temp.push(tempo);
          } else if (arr[i] == "J") {
            var tempo = {
              dkey: "J",
              desc: {
                desc: {
                  desc: this.JDesc
                }
              }
            };
            temp.push(tempo);
          }
        }
      }
      requestData.economyDict = temp;

      this.updateStuEcoInfo(requestData).then(response => {
        this.$message.success("修改成功");
      });
    },
    changeCjlb(value) {
      this.baseform.cjlb = value;
    },
    onGEChange() {
      //   if (this.baseform.isGE) {
      //     this.baseform.isDQJTZN = false;
      //     this.$refs["isDQJTZN"].disabled = true;
      //   } else {
      //     this.$refs["isDQJTZN"].disabled = false;
      //   }
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
