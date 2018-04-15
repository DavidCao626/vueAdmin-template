<template>
	<div>
		<el-card class="boxCard">
			<el-collapse v-model="activeNames">
				<el-collapse-item title="基本信息" name="1">
					<update-stu-base-info :loadOrg="loadOrg" :bid="baseInfoBid"></update-stu-base-info>
				</el-collapse-item>
				<el-collapse-item title="个人信息" name="2">
					<update-stu-person-info :bid="personalInfoBid"></update-stu-person-info>
				</el-collapse-item>
				<el-collapse-item title="在校信息" name="3">
					<update-stu-university-info :loadOrg="loadOrg" :bid="universityInfoBid"></update-stu-university-info>
				</el-collapse-item>
			</el-collapse>

		</el-card>

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
Vue.use(GraceComponent);
import updateStuBaseInfo from "./updateStuBaseInfo.vue";
import updateStuPersonInfo from "./updateStuPersonInfo.vue";
import updateStuUniversityInfo from "./updateStuUniversityInfo.vue";

var baseInfoId = "65"; // 传来的
var personalInfoBid = "47"; // 传
var universityInfoBid = "54"; // 传
var loadOrg = {};
loadOrg.orgCode = "";
export default {
  components: {
    updateStuBaseInfo,
    updateStuPersonInfo,
    updateStuUniversityInfo
  },
  data() {
    return {
      loadOrg,
      baseInfoBid: baseInfoId, // -=-=-=-=-=-=-=-=-=-审核信息的id   基本信息
      personalInfoBid, // -=-=-=-=-=-=-=-=-=-审核信息的id   个人信息
      universityInfoBid, // -=-=-=-=-=-=-=-=-=-审核信息的id   在校信息
      activeNames: ["1"]
    };
  },
  methods: {},
  beforeCreate: function() {}
};
</script>

<style>
.boxCard {
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
}

.but {
  padding: 0;
  float: right;
}
/*.el-icon-arrow-left:before {
    content: "\E606";
}*/
</style>