<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" ref='form1' :rules='formStore.formData.rules' label-width="100px">
			<el-form-item label="学号">
				<el-input size="mini" v-model="formStore.formData.data.stuNo"></el-input>
			</el-form-item>
			<el-form-item label="所属机构">
				<gc-s-cas :component-store="f_org_code"></gc-s-cas>
			</el-form-item>
			<el-form-item label="专业">
				<el-select v-model="formStore.formData.data.major" placeholder="请选择">
					<el-option v-for="(item,index) in majorData[0]" :key="index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="专业描述">
				<el-input size="mini" v-model="formStore.formData.data.majorDesc"></el-input>
			</el-form-item>
			<el-form-item label="生效日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.entranceDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="退出日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.exitDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="学制类型">
				<el-select v-model="formStore.formData.data.educationalType" placeholder="请选择">
					<el-option v-for="(item,index) in educationalTypeData[0]" :key="index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学制时长">
				<el-input size="mini" v-model="formStore.formData.data.educationalLongTime"></el-input>
			</el-form-item>
			<el-form-item label="计划毕业日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.graduationDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="所属校区">
				<el-select v-model="formStore.formData.data.schoolArea" placeholder="请选择">
					<el-option v-for="(item,index) in schoolAreaData[0]" :key="index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="入学年级">
				<el-select v-model="formStore.formData.data.entranceGrade" placeholder="请选择">
					<el-option v-for="(item,index) in entranceGradeData[0]" :key="index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="是否有效">
				<el-radio-group v-model="formStore.formData.data.state" size="small">
					<el-radio-button v-for="(item,index) in stateData[0]" :key="index" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
				</el-radio-group>
			</el-form-item>

			<!--<el-form-item label="审核状态">
				<el-select v-model="formStore.formData.data.checkFlag" placeholder="请选择">
					<el-option v-for="(item,index) in checkFlagData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="审核备注">
				<el-input size="mini" v-model="formStore.formData.data.checkComment"></el-input>
			</el-form-item>-->

		</el-form>
		<div class="but">
			<br/>
			<span style="color: red;">*注意:修改此页信息将会重新进行审核</span>
			<el-button type="success" size="mini" @click="submitUpdate">修 改</el-button>
			<br/>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import Element from "element-ui";
import "@/theme/index.css";
import VueExpand from "@/components/VueExpand";
Vue.use(Element);
Vue.use(VueExpand);
import GUtils from "@/components/Utils.js";
import GStoreFactory from "@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js";
import GraceComponent from "@/ComponentPackage/GraceComponents.js";
import dataPath from "@/API/Student/student_info_manager.js";
import reqPath from "@/API/System/SystemManagerApi.js";
Vue.use(GraceComponent);

// var id = 1; //临时的数据,要修改的信息的id

var formStore = GStoreFactory.buildServiceForm();
var formDataStore = GStoreFactory.buildServiceFormData();
var dicts = [
  "isUse",
  "accommodation_type",
  "educationalType",
  "schoolArea",
  "major",
  "entranceGrade",
  "is_bandh",
  "check_flag"
];
var majorData = [];
var educationalTypeData = [];
var schoolAreaData = [];
var entranceGradeData = [];
var stateData = [];
var checkFlagData = [];
GUtils.post(
  dataPath.getDictByDictNames,
  {
    dicts: dicts
  },
  function(data) {
    majorData.push(data.resBody.major);
    educationalTypeData.push(data.resBody.educationalType);
    schoolAreaData.push(data.resBody.schoolArea);
    entranceGradeData.push(data.resBody.entranceGrade);
    stateData.push(data.resBody.is_bandh);
    checkFlagData.push(data.resBody.check_flag);
  }
);

formDataStore.pushData({
  // id:"",//

  stuNo: "", // 学号
  orgCode: [], // 所属机构
  major: "", // 专业代码
  majorDesc: "", // 专业描述
  entranceDate: "", // 生效日期
  exitDate: "", // 退出日期
  educationalType: "", // 学制类型
  educationalLongTime: "", // 学制时长
  graduationDate: "", // 计划毕业日期
  schoolArea: "", // 所属校区
  entranceGrade: "", // 入学年级
  state: "Y" // 是否有效
  //		checkFlag: "", //审核状态
  //		checkComment: "" //审核备注
});
formDataStore.pushRules({
  stuNo: [], // 学号
  orgCode: [], // 所属机构
  major: [], // 专业代码
  majorDesc: [], // 专业描述
  entranceDate: [], // 生效日期
  exitDate: [], // 退出日期
  educationalType: [], // 学制类型
  educationalLongTime: [], // 学制时长
  graduationDate: [], // 计划毕业日期
  schoolArea: [], // 所属校区
  entranceGrade: [], // 入学年级
  state: [] // 是否有效
  //		checkFlag: [], //审核状态
  //		checkComment: [] //审核备注
});

// 加载要修改的源数据结束

formStore.addAttr("formData", formDataStore);
// 组织组件
var f_org_code = GStoreFactory.buildSmallCascaderStore(
  formDataStore.data,
  "orgCode"
);
f_org_code.addConf("expandTrigger", "hover");
f_org_code.addConf("props", {
  value: "org_code",
  label: "org_name",
  children: "children",
  disabled: "disabled"
});
//	GUtils.post(reqPath.queryUserOrg, {}, function(data) {
//		f_org_code.pushAll(data.resBody);
//	});
// 组织组件结束

export default {
  props: ["bid", "loadOrg"],
  data() {
    return {
      formStore,
      f_org_code,
      majorData,
      educationalTypeData,
      schoolAreaData,
      stateData,
      entranceGradeData,
      checkFlagData
    };
  },
  methods: {
    submitUpdate: function() {
      var that = this;
      this.formStore.formData.data.managerNodeCode = this.loadOrg.orgCode;
      GUtils.post(
        dataPath.updateStuUniversityInfoSelf,
        this.formStore.formData.data,
        function(data) {
          delete that.formStore.formData.data.managerNodeCode;
          alert("修改成功");
          // 加载要修改的源数据
          GUtils.post(
            dataPath.getStudentUniversityInfoById,
            {
              id: data.resBody.id
            },
            function(data2) {
              console.log("updateStuUniversityInfoData", data2);
              formDataStore.pushData(data2.resBody.baseData[0]);
              formDataStore.pushData({
                orgCode: data2.resBody.aOrgCode,
                checkFlag: data2.resBody.baseData[0].checkFlag.toString()
              });
            }
          );
        }
      );
    }
  },
  mounted: function() {
    // 加载要修改的源数据
    GUtils.post(
      dataPath.getStudentUniversityInfoById,
      {
        id: this.bid
      },
      function(data) {
        console.log("updateStuUniversityInfoData", data);
        formDataStore.pushData(data.resBody.baseData[0]);
        formDataStore.pushData({
          orgCode: data.resBody.aOrgCode,
          checkFlag: data.resBody.baseData[0].checkFlag.toString()
        });
      }
    );
  },
  watch: {
    "loadOrg.orgCode": function(val) {
      this.formStore.formData.data.orgCode = [];
      console.log(["orgc", val]);
      f_org_code.cleanData();
      GUtils.post(
        reqPath.queryCurrentOrgListByOrgCode,
        { orgCode: val },
        function(data) {
          f_org_code.pushAll(data.resBody);
        }
      );
    }
  }
};
</script>

<style>
.but {
  padding: 0;
  float: right;
}
</style>