<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" ref='form1' :rules='formStore.formData.rules' label-width="80px">
			<el-form-item label="头像">
				<el-upload class="avatar-uploader" :action="upLoadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageU" :src="imageU" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="学号">
				<el-input size="mini" v-model="formStore.formData.data.stuNo"></el-input>
			</el-form-item>
			<el-form-item label="学生别名">
				<el-input size="mini" v-model="formStore.formData.data.nameAlias"></el-input>
			</el-form-item>
			<el-form-item label="家庭住址">
				<el-input size="mini" v-model="formStore.formData.data.postalAddress"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input size="mini" v-model="formStore.formData.data.contactNo"></el-input>
			</el-form-item>
			<el-form-item label="邮编">
				<el-input size="mini" v-model="formStore.formData.data.postalCode"></el-input>
			</el-form-item>
			<el-form-item label="住宿类型">
				<el-select v-model="formStore.formData.data.accommodationType" placeholder="请选择">
					<el-option v-for="(item,index) in adTypeData[0]" :key="index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="校舍编号">
				<el-input size="mini" v-model="formStore.formData.data.dormitoryNo"></el-input>
			</el-form-item>
			<el-form-item label="住宿地址">
				<el-input size="mini" v-model="formStore.formData.data.outsideDormitoryAddress"></el-input>
			</el-form-item>

		</el-form>
		<div class="but">
			<br/>
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
import dataPath from "@/API/Student/student_info_manager.js";
Vue.use(GraceComponent);

// var id = "1";//临时数据=-----------------=-=-=-=-=传进来的

var formStore = GStoreFactory.buildServiceForm();
var formDataStore = GStoreFactory.buildServiceFormData();
var adTypeData = [];
var dicts = ["accommodation_type", "isUse"];
GUtils.post(
  dataPath.getDictByDictNames,
  {
    dicts: dicts
  },
  function(data) {
    adTypeData.push(data.resBody.accommodation_type);
    console.log(["dictResponseData", data]);
  }
);

formDataStore.pushData({
  stuNo: "", // 学号
  nameAlias: "", // 学生别名
  postalAddress: "", // 家庭住址
  postalCode: "", // 邮编
  contactNo: "", // 联系电话
  accommodationType: "", // 住宿类型
  dormitoryNo: "", // 校舍编号
  outsideDormitoryAddress: "", // 住宿地址
  headPortrait: "" // 头像
});
formDataStore.pushRules({
  stuNo: [], // 学号
  nameAlias: [], // 学生别名
  postalAddress: [], // 家庭住址
  postalCode: [], // 邮编
  contactNo: [], // 联系电话
  accommodationType: [], // 住宿类型
  dormitoryNo: [], // 校舍编号
  outsideDormitoryAddress: [], // 住宿地址
  headPortrait: [] // 头像
});
formStore.addAttr("formData", formDataStore);
export default {
  props: ["bid"],
  data() {
    return {
      imageUrl: "", // 证件照片
      upLoadUrl: dataPath.upLoadStuHeadPic,
      formStore: formStore,
      adTypeData: adTypeData // 住宿类型
    };
  },
  computed: {
    imageU: function() {
      if (this.imageUrl != "") {
        return this.imageUrl;
      } else {
        return this.formStore.formData.data.headPortrait;
      }
    }
  },
  methods: {
    upLoadSuccess(response, file, fileList) {
      console.log(["response", response]);
      console.log(["file", file]);
      console.log(["fileList", fileList]);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(["res", res]); // res为文件路径
      console.log(["file", file]);
      this.formStore.formData.data.headPortrait = res;
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
    submitUpdate: function() {
      var that = this;
      GUtils.post(
        dataPath.updateStuPersonalInfoSelf,
        this.formStore.formData.data,
        function(data) {
          alert("修改成功");
          that.loadData();
        }
      );
    },
    loadData() {
      GUtils.post(
        dataPath.getStudentPersonalInfoById,
        {
          id: this.bid
        },
        function(data) {
          formDataStore.pushData(data.resBody[0]);
          delete formDataStore.data.lastUpdateDate;
        }
      );
    }
  },
  mounted: function() {
    this.loadData();
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
  width: 100px;
  height: 100px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 99px;
  height: 99px;
  line-height: 99px;
  text-align: center;
}

.avatar {
  width: 99px;
  height: 99px;
  display: block;
}
</style>