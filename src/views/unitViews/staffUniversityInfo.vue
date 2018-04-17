<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" ref='form1' disabled :rules='formStore.formData.rules' label-width="100px">
			<el-form-item label="职工编码">
				<el-input size="mini" v-model="formStore.formData.data.staffCode"></el-input>
			</el-form-item>
			<el-form-item label="所属机构">
				<gc-s-cas :component-store="f_org_code"></gc-s-cas>
			</el-form-item>
			<el-form-item label="职称">
				<el-select v-model="formStore.formData.data.staffJob" placeholder="请选择">
					<el-option v-for="(item,index) in staffJobData" :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人事编码" prop="personnelCode">
				<el-input size="mini" v-model="formStore.formData.data.personnelCode"></el-input>
			</el-form-item>
			<el-form-item label="党政职务">
				<el-select v-model="formStore.formData.data.pgposts" placeholder="请选择">
					<el-option v-for="(item,index) in pgpostsData" :key="index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否停职">
				<el-radio-group v-model="formStore.formData.data.suspension" size="small">
					<el-radio-button v-for="(item,index) in stateData[0]" :key="index" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="生效时间">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.entranceDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="失效时间">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.exitDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="是否有效">
				<el-radio-group v-model="formStore.formData.data.state" size="small">
					<el-radio-button v-for="(item,index) in stateData[0]" :key="index" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="审核状态">
				<el-select v-model="formStore.formData.data.checkFlag" placeholder="请选择">
					<el-option v-for="(item,index) in checkFlagData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="审核备注">
				<el-input size="mini" v-model="formStore.formData.data.checkComment"></el-input>
			</el-form-item>
		</el-form>
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
import dataPath from "@/API/Staff/staff_info_manager.js";
import reqPath from "@/API/System/SystemManagerApi.js";
Vue.use(GraceComponent);
var staffJobData = [
  {
    id: "1",
    name: "职称"
  }
];
var pgpostsData = [
  {
    id: "1",
    name: "党政职务"
  }
];
var id = "1";

var formStore = GStoreFactory.buildServiceForm();
var formDataStore = GStoreFactory.buildServiceFormData();

var dicts = ["isUse", "is_bandh", "check_flag"];
var stateData = [];
var checkFlagData = [];
GUtils.post(
  dataPath.getDictByDictNames,
  {
    dicts: dicts
  },
  function(data) {
    stateData.push(data.resBody.is_bandh);
    checkFlagData.push(data.resBody.check_flag);
  }
);

formDataStore.pushData({
  staffCode: "", // 教职工编码
  orgCode: [], // 所属机构
  staffJob: "", // 职称
  personnelCode: "", // 人事编号
  pgposts: "", // 党政职务
  suspension: "Y", // 是否停职
  entranceDate: "", // 生效日期
  exitDate: "", // 失效日期
  state: "Y", //是否有效
  checkFlag: "0", //审核
  checkComment: "" //审核备注
});
formDataStore.pushRules({});

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
GUtils.post(reqPath.queryUserOrg, {}, function(data) {
  f_org_code.pushAll(data.resBody);
});

export default {
  props: ["bid"],
  data() {
    return {
      formStore,
      f_org_code,
      stateData,
      checkFlagData,
      staffJobData,
      pgpostsData
    };
  },
  methods: {
    test: function() {
      console.log(this);
    }
  },
  mounted: function() {
    GUtils.post(
      dataPath.queryStaffUniversityInfoById,
      {
        id: this.$route.params.staffUniversityInfoCode
      },
      function(data) {
        console.log(["loadFormData", data]);
        formDataStore.pushData({
          checkComment: data.resBody.baseData.checkComment,
          checkFlag: data.resBody.baseData.checkFlag,
          entranceDate: data.resBody.baseData.entranceDate,
          exitDate: data.resBody.baseData.exitDate,
          // data.resBody.baseData.id,
          personnelCode: data.resBody.baseData.personnelCode,
          pgposts: data.resBody.baseData.pgposts,
          staffCode: data.resBody.baseData.staffCode,
          staffJob: data.resBody.baseData.staffJob,
          state: data.resBody.baseData.state,
          suspension: data.resBody.baseData.suspension
        });
        formDataStore.pushData({
          orgCode: data.resBody.aOrgCode
        });
        console.log(["aOrgCode", data.resBody.aOrgCode]);
      }
    );
  }
};
</script>

<style>

</style>