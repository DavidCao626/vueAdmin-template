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
                        <el-switch v-model="baseform.isNCWBH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否低保户:">
                        <el-switch v-model="baseform.isDBH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="是否孤儿:">
                        <el-switch v-model="baseform.isGE" @change="onGEChange" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否单亲家庭子女:">
                        <el-switch v-model="baseform.isDQJTZN" ref="isDQJTZN" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">

                <el-col :span="8">
                    <el-form-item label="是否残疾人子女:">
                        <el-switch v-model="baseform.isCJRZN" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否父母丧失劳动能力:">
                        <el-switch v-model="baseform.isFMSSLDNL" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="是否家中有大病患者:">
                        <el-switch v-model="baseform.isJZYDBHZ" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">

                <el-col :span="8">
                    <el-form-item label="本人是否残疾:">
                        <el-switch v-model="baseform.isBRSFCJ" active-color="#13ce66" inactive-color="#ccc">
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
                        <el-switch v-model="baseform.isJDLKPKJT" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="是否低收入家庭:">
                        <el-switch v-model="baseform.isDSRJT" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否军烈属或优抚子女:">
                        <el-switch v-model="baseform.isJLSHYFZN" active-color="#13ce66" inactive-color="#ccc">
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

                <el-col :span="8">
                    <el-form-item label="家庭主要收入来源:">
                        <elx-select @change="changeJTZYSRLY" :value="baseform.JTZYSRLY" :options="checkFamilyIncomeType"></elx-select>

                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭是否遭受自然灾害:">
                        <el-switch v-model="baseform.JTSFZSZRZH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="16" v-if="baseform.JTSFZSZRZH">
                    <el-form-item label="自然灾害具体情况描述:">
                        <el-input v-model="baseform.JTSFZSZRZH_text"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="家庭是否遭受突发意外事件:">

                        <el-switch v-model="baseform.JTSFZSYTFYWSJ" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>

                <el-col :span="16">
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
                        <el-switch v-model="baseform.isNCDBH" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否农村特困供养:">
                        <el-switch v-model="baseform.isNCTKGY" active-color="#13ce66" inactive-color="#ccc">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="其他:">
                        <el-input v-model="baseform.QT" placeholder="填写农村特困供养、农村低户、建档立卡相关信息"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>

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
            </el-row>
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
export default {
  data() {
    return {
      baseform: {
        nid: "", //学号
        isNCWBH: false, //是否农村五保户
        isDBH: false, //是否低保户
        isGE: false, //是否孤儿
        isDQJTZN: false, //是否单亲家庭子女
        isFMSSLDNL: false, //是否残疾人子女
        isJZYDBHZ: false, //是否父母丧失劳动能力
        isBRSFCJ: false, //是否家中有大病患者
        isCJRZN: false, //本人是否残疾
        cjlb: "1", //残疾类别
        isJDLKPKJT: false, //是否建档立卡贫困家庭
        isDSRJT: false, //是否低收入家庭
        isJLSHYFZN: false, //是否军烈属或优抚子女
        JTRJSR: "", //家庭人均收入
        JTZYSRLY: "1", //家庭主要收入来源类别
        JTSFZSZRZH: false, //家庭是否遭受自然灾害
        JTSFZSZRZH_text: "", //家庭自然灾害具体情况描述
        JTSFZSYTFYWSJ: false, //家庭是否遭受突发意外事件
        JTSFZSYTFYWSJ_text: "", //突发意外事件具体描述
        JTQZJE: "", //家庭欠债金额
        JTQZYY: "", //家庭欠债原因
        JTRKS: "", //家庭人口数
        LDRKS: "", //劳动力人口数
        JTCYSYS: "", //家庭成员失业人数
        SYRKS: "", //赡养人口数
        QTJTJJXX: "", //其他家庭经济信息
        isNCDBH: false, //是否农村低保户
        isNCTKGY: false, //是否农村特困供养
        QT: "", //填写农村特困供养、农村低户、建档立卡相关信息
        checkDiffName: "3", //认定困难级别
        RDSJ: "", //认定时间
        RDYY: "", //认定原因
        BJTDYJ: "", //班级认定意见
        NJRDYJ: "" //年级认定意见
      },
      checkDiffNames: [
        {
          value: "1",
          label: "特别困难"
        },
        {
          value: "21",
          label: "困难"
        },
        {
          value: "22",
          label: "一般困难"
        },
        {
          value: "3",
          label: "不困难"
        }
      ],
      checkDisableType: [
        {
          value: "1",
          label: "视力残疾"
        },
        {
          value: "2",
          label: "听力残疾"
        },
        {
          value: "3",
          label: "智力残疾"
        },
        {
          value: "9",
          label: "其他残疾"
        }
      ],
      checkFamilyIncomeType: [
        {
          value: "1",
          label: "工资、奖金、津贴、补贴和其他劳动收入"
        },
        {
          value: "2",
          label: "离退休金、基本养老金、基本生活费、失业保险金"
        },
        {
          value: "3",
          label: "继承、接受赠予、出租或出售家庭财产获得的收入"
        },
        {
          value: "4",
          label: "存款及利息，有价证券及红利、股票、博彩收入"
        },
        {
          value: "5",
          label: "经商、办厂以及从事种植业、 养植业、加工业扣除必要成本后的收入"
        },
        {
          value: "6",
          label: "赡养费、抚(扶)养费"
        },
        {
          value: "7",
          label: "自谋职业收入"
        },
        {
          value: "8",
          label: "其他应当计入家庭的收入"
        }
      ]
    };
  },
  methods: {
    onSubmit() {},
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
