<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" ref="addForm" :rules="formStore.formData.rules" label-width="100px" v-loading="iloading">
			<el-form-item label="管理节点" prop="managerNodeCode">
				<el-select v-model="formStore.formData.data.managerNodeCode" @change="orgCodeChange" placeholder="请选择">
					<el-option v-for="(item,index) in managerCodeData" :key="index" :label="item.managerNodeName" :value="item.managerNodeCode">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="职工编码">
				<el-input size="mini" disabled v-model="formStore.formData.data.staffCode"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input size="mini" v-model="formStore.formData.data.name"></el-input>
			</el-form-item>
			<el-form-item label="姓名拼音">
				<el-input size="mini" v-model="formStore.formData.data.namePhoneticize"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group v-model="formStore.formData.data.sexType" size="small">
					<el-radio-button label="1">男</el-radio-button>
					<el-radio-button label="0">女</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="民族">
				<el-select v-model="formStore.formData.data.nation" placeholder="请选择">
					<el-option v-for="(item,index) in nationsData" :key="item.index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input size="mini" v-model="formStore.formData.data.phone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input size="mini" v-model="formStore.formData.data.email"></el-input>
			</el-form-item>
			<el-form-item label="身份证号">
				<el-input size="mini" v-model="formStore.formData.data.identityNo"></el-input>
			</el-form-item>
			<el-form-item label="证件照片">
				<!--<el-button size="mini">点击上传</el-button>-->
				<el-upload class="avatar-uploader" :action="upLoadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageU" :src="imageU" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

		</el-form>

		<div class="but">
			<br/>
			<span style="color: red;">*注意:修改此页信息将会重新进行审核</span>
			<el-button type="success" size="mini" @click="submitUpdate">修 改</el-button>
			<span> </span>
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
import dataPath from "@/API/Staff/staff_info_manager.js";
import nations from "../nations.js";
import politicalStatus from "../politicalStatus.js";
Vue.use(GraceComponent);

var formStore = GStoreFactory.buildServiceForm();
var formDataStore = GStoreFactory.buildServiceFormData();
formDataStore.pushData({
  managerNodeCode: "",
  staffCode: "", // 职工编码
  name: "", // 姓名
  namePhoneticize: "", // 姓名拼音
  sexType: "1", // 性别
  nation: "", // 民族
  phone: "", // 手机号
  email: "", // 邮箱
  identityNo: "", // 身份证号码
  //		checkFlag: "0", //审核状态
  //		checkComment: "", //审核备注
  personalPhoto: "" // 证件照片
});
formDataStore.pushRules({
  managerNodeCode: [
    {
      required: true,
      message: "此项不能为空",
      trigger: "blur"
    }
  ],
  staffCode: [], // 职工编码
  name: [], // 姓名
  namePhoneticize: [], // 姓名拼音
  sexType: [], // 性别
  nation: [], // 民族
  phone: [], // 手机号
  email: [], // 邮箱
  identityNo: [], // 身份证号码
  //		checkFlag: [], //审核状态
  //		checkComment: [], //审核备注
  personalPhoto: [] // 证件照片
});
formStore.addAttr("formData", formDataStore);

var nationsData = nations.data;
var checkFlagData = [];
var requestData = {
  dicts: ["check_flag", "sex_type"]
};
var dictData = {};
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
  dictData = data.resBody;
  checkFlagData.push(dictData.check_flag);
});
var iloading = false;
export default {
  props: ["bid", "loadOrg"],
  data() {
    return {
      imageUrl: "", // 证件照片
      upLoadUrl: dataPath.upLoadStaffIdentityPic,
      formStore,
      nationsData,
      checkFlagData,
      iloading,
      managerCodeData: []
    };
  },
  computed: {
    imageU: function() {
      if (this.imageUrl != "") {
        return this.imageUrl;
      } else {
        return this.formStore.formData.data.personalPhoto;
      }
    }
  },
  created: function() {},
  methods: {
    orgCodeChange: function(val) {
      this.loadOrg.orgCode = val;
    },
    submitUpdate: function() {
      var that = this;
      GUtils.post(
        dataPath.updateStaffBaseInfoSelf,
        this.formStore.formData.data,
        function(data) {
          alert("修改成功");
          that.loadFormData();
        }
      );
    },
    upLoadSuccess(response, file, fileList) {
      console.log(["response", response]);
      console.log(["file", file]);
      console.log(["fileList", fileList]);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(["res", res]); // res为文件路径
      console.log(["file", file]);
      this.formStore.formData.data.personalPhoto = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    loadFormData: function(id) {
      var that = this;
      GUtils.post(
        dataPath.queryStaffBaseInfoById,
        {
          id: this.bid
        },
        function(data) {
          formDataStore.pushData(data.resBody);
          formDataStore.pushData({
            lastUpdateTime: null
          });
          delete formDataStore.data["lastUpdateTime"];
        }
      );
    }
  },
  mounted: function() {
    var that = this;
    GUtils.post(dataPath.queryStaffUserAuth, {}, function(data) {
      console.log(["managerCodeData", data]);
      that.managerCodeData = data.resBody;
    });
    GUtils.post(
      dataPath.queryStaffBaseInfoById,
      {
        id: this.bid
      },
      function(data) {
        formDataStore.pushData(data.resBody);
        formDataStore.pushData({
          lastUpdateTime: null
        });
        that.loadOrg.orgCode = that.formStore.formData.data.managerNodeCode;
        delete formDataStore.data["lastUpdateTime"];
      }
    );
  }
};
</script>

<style>
.but {
  padding: 0;
  float: right;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 400px;
  height: 200px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}

.avatar {
  width: 400px;
  height: 200px;
  display: block;
}
</style>