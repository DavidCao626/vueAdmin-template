<template>
  <div>
    <page style="width: 1000px;margin: 0 auto;" :Breadcrumb="false">
      <!-- <div slot="title">学生业务申请</div> -->
      <div slot="panel">
        <h2>{{formTitle}}</h2>
        <hr />
        <proInfo :itemId="itemId"></proInfo>
        <h4 v-if="formFiles.length>0">
          下载附件：
          <div>
            <a v-for="(i,index) in formFiles" :key="index" :href="i.url">{{i.name}} &nbsp;&nbsp; </a>
          </div>
        </h4>
      </div>
    </page>
    <page style="width: 1000px;margin: 0 auto;">
      <div slot="panel">
        <h3 style="font-weight:400">一、填写申请信息</h3>
        <hr />
        <el-form ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="学生姓名">
                <el-input v-model="form.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="学号">
                <el-input v-model="form.number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="所在班级">
                <el-input v-model="form.class" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="业务类别">
                <el-input v-model="form.type" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="申请子业务类别">
                <el-select v-model="form.typeValue" placeholder="请选择">
                  <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">

              <el-form-item label="主要原因">
                <el-select v-model="form.mainReason" placeholder="请选择">
                  <el-option v-for="item in reasonList" :key="item['dict_desc']" :label="item['dict_desc']" :value="item['dict_desc']">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="申请理由">
                <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="相关附件">
                <el-upload class="upload-demo" :action="uploadAttrUrl" :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="form.fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

      </div>
    </page>
    <!-- <page style="width: 1000px;margin: 0 auto;" v-if="hasEconmyData">
      <div slot="panel">
        <h3 style="font-weight:400">二、家庭情况信息 <el-button type="text" @click="editEn">修改</el-button>
        </h3>
        <hr />
        <el-form disabled="" ref="form" :model="form" label-width="120px" size="small">
          <el-row>
            <el-col :span="10">
              <el-form-item label="家庭人口数">
                <el-input v-model="form.familyNumber" type="Number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="家庭情况">
                <el-radio-group v-model="form.familyStatus">
                  <el-radio-button label="S">双亲</el-radio-button>
                  <el-radio-button label="D">单亲</el-radio-button>
                  <el-radio-button label="G">孤儿</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="是否低保">
                <el-switch v-model="form.isSubsistenceAllowance" active-value="Y" inactive-value="N"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="是否建档立卡">
                <el-switch v-model="form.isRecord" active-value="Y" inactive-value="N"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="人均月收入">
                <el-input v-model="form.income" type="Number" placeholder="单位（元）"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </page> -->

    <!-- <page style="width: 1000px;margin: 0 auto;" v-else>
      <div slot="panel">
        <h3 style="font-weight:400">二、家庭情况信息 <el-button type="text" @click="createjiating">创建家庭信息</el-button>
        </h3>
        <hr />
      </div>
    </page> -->

    <page style="width: 1000px;margin: 0 auto;">
      <div slot="panel">
        <div style="text-align:center">
          <!-- <h4 v-if="formDays>=0" style="text-align:center">截止最后提交日期 还有
                        <strong style="color:red;">{{formDays}}</strong> 天</h4> -->
          <!-- <h4 v-else style="text-align:center;color:red;">申请表单已到最后截止日期，不能提交。如有问题请联系相关老师。</h4> -->
          <br>
          <el-button v-if="formDays>=0" type="primary" @click="onSubmit">提交申请</el-button>
          <el-button @click="cancle">返回取消</el-button>
        </div>
      </div>
    </page>

    <!-- <el-dialog title="家庭信息" :visible.sync="jiatingDV" width="70%" :before-close="handleCloseJT">

      <el-form ref="baseform" label-position="left" size="mini" :inline="true" :model="baseform">
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
              <el-switch active-value="Y" inactive-value="N" v-model="baseform.isGE" active-color="#13ce66" inactive-color="#ccc">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="baseform.isGE == 'N'">
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
          <el-col :span="8" v-if="baseform.isBRSFCJ == 'Y'">
            <el-form-item label="残疾类别:">
              <el-select v-model="baseform.cjlb" placeholder="">
                <el-option v-for="item in checkDisableType" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>

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
              <el-select v-model="baseform.JTZYSRLY" placeholder="家庭主要收入来源">
                <el-option v-for="item in checkFamilyIncomeType" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
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
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="jiatingDV = false">取 消</el-button>
        <el-button type="primary" @click="submitjiating">确 定</el-button>
      </span>
    </el-dialog> -->

    <el-dialog :show-close="false" title="提示" :visible.sync="jiatingDV" width="30%" :close-on-click-modal="false" :close-on-press-escape="false">
      <span v-if="hasEconmyData">是否前往维护家庭信息</span>
      <span v-else>您还没有家庭信息，请先完善家庭信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="hasEconmyData" @click="jiatingDV = false">取 消</el-button>
        <el-button type="primary" @click="createjiating">前往完善</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import proInfo from "../_components/projectSimpleInfo";
import store from "../_store/index.js";
import { mapActions, mapMutations, mapGetters, Store } from "vuex";
import moment from "moment";
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getEconmyData();
      vm.getReasonList();
      if (to.query.itemId != undefined) {
        let itemId = to.query.itemId;
        if (itemId != "" && itemId != null) {
          vm.itemId = itemId;
          vm.getApplyData({ itemId: itemId }).then(response => {
            var resp = response.resBody;
            vm.resData = resp;
            vm.projectSystemCode = resp.projectData.projectSystemCode;
            vm.formTitle = resp.projectData.projectName + "申请表";
            //附件
            vm.formFiles = [];
            if (resp.projectData.files) {
              resp.projectData.files.forEach(item => {
                let temp = {
                  name: "",
                  url: ""
                };
                temp.name = item.userFileName;
                temp.url = item.userPath;
                vm.formFiles.push(temp);
              });
            }
            if (
              resp.itemData.planCompleteTime != null &&
              resp.itemData.planCompleteTime != ""
            ) {
              vm.formDays = vm.DateDiff(
                resp.itemData.planCompleteTime,
                moment(new Date()).format("YYYY-MM-DD")
              );
            }
            vm.form.username = resp.studentData.userName;
            vm.form.number = resp.studentData.userNo;
            vm.form.class = resp.studentData.userOrgsName;
            vm.form.type = resp.projectData.projectServiceTypeName;
            vm.form.options = [];
            resp.childServiceType.forEach(item => {
              let temp = {
                value: item.classifyCode,
                label: item.classifyName
              };
              vm.form.options.push(temp);
            });
          });
        }
      } else {
        vm.$message.error("参数不正确");
      }
    });
  },
  components: {
    proInfo
  },
  computed: {
    ...mapGetters({
      uploadAttrUrl: store.namespace + "/getUploadAttrUrl"
    }),
    endTime() {
      if (this.resData.scopeData.realStartTime) {
        return moment(
          this.resData.scopeData.realStartTime,
          "YYYY-MM-DD HH:mm:ss"
        )
          .add(this.resData.scopeData.planTimeLong, "hours")
          .format("YYYY-MM-DD HH:mm");
      } else {
        return "";
      }
    }
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
      checkFamilyIncomeType: [],
      reasonList: [],
      resData: {
        projectData: {
          projectName: "",
          projectServiceTypeName: ""
        },
        scopeData: {
          realStartTime: "",
          planTimeLong: 0
        }
      },
      jiatingDV: true,
      itemId: "",
      projectSystemCode: "",
      formTitle: "",
      formDesc: "", //项目公告
      formFiles: [
        //项目附件表
        {
          name: "",
          url: ""
        },
        {
          name: "",
          url: ""
        }
      ],
      formDays: 0, //填表可用天数
      form: {
        username: "",
        number: "",
        class: "", //个人信息不能更改 控件已经disabled
        type: "", //业务类别
        options: [],
        typeValue: "", //子业务类别选中值
        mainReason: "",
        desc: "", //申请理由
        delivery: false,
        fileList: [], //申请附件

        familyNumber: "3", //家庭人口
        familyStatus: "S", //家庭情况
        isSubsistenceAllowance: 0, //是否低保
        isRecord: 0, //是否建档立卡
        income: 0, //收入
        spending: 0 //支出
      },
      hasEconmyData: false,
      attArr: []
    };
  },
  methods: {
    submitjiating() {
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
        familyPersonNum: this.baseform.JTRKS,
        labourPersonNum: this.baseform.LDRKS,
        unemploymentPersonNum: this.baseform.JTCYSYS,
        supportPersonNum: this.baseform.SYRKS,
        otherInfo: this.baseform.QTJTJJXX,
        isVillageSubsistenceAllowances: this.baseform.isNCDBH,
        isPovertySupport: this.baseform.isNCTKGY,
        other: this.baseform.QT
      };
      this.updateStuEcoInfo(requestData).then(response => {
        this.$message.success("保存成功");
        this.jiatingDV = false;
        this.getEconmyData();
      });
    },
    editEn() {
      //TODO 获取家庭信息
      this.getData();
      this.jiatingDV = true;
    },
    createjiating() {
      this.$router.push({
        path: "/user/info"
      });
    },
    handleCloseJT() {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    ...mapActions({
      getApplyData: store.namespace + "/getApplyData",
      povertyApply: store.namespace + "/povertyApply",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      getStuEconmyInfo: store.namespace + "/getStuEconmyInfo",
      updateStuEcoInfo: store.namespace + "/updateStuEcoInfo"
    }),
    cancle() {
      this.$router.go(-1);
    },
    getData() {
      var requestData = {};
      this.getStuEconmyInfo(requestData).then(response => {
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
        this.baseform.JTRKS = res.familyPersonNum; //家庭人口数
        this.baseform.LDRKS = res.labourPersonNum; //劳动力人口数
        this.baseform.JTCYSYS = res.unemploymentPersonNum; //家庭成员失业人数
        this.baseform.SYRKS = res.supportPersonNum; //赡养人口数
        this.baseform.QTJTJJXX = res.otherInfo; //其他家庭经济信息
        this.baseform.isNCDBH = res.isVillageSubsistenceAllowances; //是否农村低保户
        this.baseform.isNCTKGY = res.isPovertySupport; //是否农村特困供养
        this.baseform.QT = res.other; //填写农村特困供养、农村低户、建档立卡相关信息
      });
    },
    getEconmyData() {
      this.getStuEconmyInfo().then(response => {
        console.log(["getStuEconmyInfo", response]);
        var res = response.resBody;
        if (res != null) {
          this.hasEconmyData = true;
          this.form.familyNumber = res.familyPersonNum;
          if (res.isOrphan == "Y") {
            this.form.familyStatus = "G";
          } else if (res.isSingleParent == "Y") {
            this.form.familyStatus = "D";
          } else {
            this.form.familyStatus = "S";
          }
          this.form.isSubsistenceAllowance = res.isSubsistenceAllowances;
          this.form.isRecord = res.isCreatedFile;
          this.form.income = res.capitaIncomeYear;
        } else {
          this.hasEconmyData = false;
        }
      });
    },
    getReasonList() {
      console.log(["getReasonList"]);
      var requestData = {
        dicts: ["poverty_apply_reason", "income_type", "disability_type"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["getDictByDictNames1", response]);
        this.reasonList = response.resBody.poverty_apply_reason;
        console.log(["getDictByDictNames2", this.reasonList]);
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
    DateDiff(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      var aDate, oDate1, oDate2, iDays;
      aDate = sDate1.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为12-18-2006格式
      aDate = sDate2.split("-");
      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      return iDays;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      console.log(["上传成功", file, fileList]);
      var tempArr = [];
      for (var i = 0; i < fileList.length; i++) {
        tempArr[i] = fileList[i].response.body.resBody.fileId;
      }
      this.attArr = tempArr;
    },
    handleRemove(response, fileList) {
      console.log(["移除成功", fileList]);
      var tempArr = [];
      for (var i = 0; i < fileList.length; i++) {
        tempArr[i] = fileList[i].response.body.resBody.fileId;
      }
      this.attArr = tempArr;
    },
    onSubmit() {
      if (!this.hasEconmyData) {
        this.$message.error("请完善家庭信息");
        return;
      }
      console.log("submit!");
      var requestData = {
        mainReason: this.form.mainReason,
        itemId: this.itemId,
        childServiceTypeCode: this.form.typeValue,
        projectSystemCode: this.projectSystemCode,
        applyReason: this.form.desc, //申请原因
        attachment: this.attArr, // 附件
        homePersonCount: this.form.familyNumber, // 家庭人口数
        isSingleParent: "", // 是否单亲
        isOrphan: "", // 孤儿
        isBasicAllowance: this.form.isSubsistenceAllowance, // 低保
        isCreateFile: this.form.isRecord, // 建档立卡
        perCapitaIncome: this.form.income, // 人均收入
        perCapitalExpenditure: this.form.spending // 人均支出
      };
      if (this.form.familyStatus == "S") {
        requestData.isSingleParent = "N";
        requestData.isOrphan = "N";
      } else if (this.form.familyStatus == "D") {
        requestData.isSingleParent = "Y";
        requestData.isOrphan = "N";
      } else if (this.form.familyStatus == "G") {
        requestData.isSingleParent = "N";
        requestData.isOrphan = "Y";
      }
      console.log(["requestData", requestData]);
      this.povertyApply(requestData).then(response => {
        this.$message.success("提交成功");
        this.$router.go(-1);
      });
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
h2,
h4 {
  text-align: center;
  font-weight: 400;
}
h4 {
  color: #999;

  text-align: left;
}
</style>
