<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" ref="addForm" :rules="formStore.formData.rules" label-width="100px" v-loading="iload">
			<el-form-item label="管理节点" prop="managerNodeCode">
				<el-select v-model="formStore.formData.data.managerNodeCode" @change="orgCodeChange" placeholder="请选择">
					<el-option v-for="(item,index) in managerCodeData" :key="index" :label="item.managerNodeName" :value="item.managerNodeCode">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学号">
				<el-input size="mini" v-model="formStore.formData.data.stuNo"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input size="mini" v-model="formStore.formData.data.name"></el-input>
			</el-form-item>
			<el-form-item label="姓名拼音">
				<el-input size="mini" v-model="formStore.formData.data.namePhoneticize"></el-input>
			</el-form-item>
			<el-form-item label="身份证号">
				<el-input size="mini" v-model="formStore.formData.data.identityNo"></el-input>
			</el-form-item>
			<!--<el-form-item label="性别">
				<gc-s-radio  :component-store="sexTypeStore"></gc-s-radio>
			</el-form-item>-->
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
			<el-form-item label="籍贯">
				<el-select v-model="formStore.formData.data.nativePlace" placeholder="请选择">
					<el-option v-for="(item,index) in nativePlaceData[0]" :key="item.index" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="政治面貌">
				<el-select v-model="formStore.formData.data.politicalStatus" placeholder="请选择">
					<el-option v-for="(item,index) in politicalStatusData" :key="item.index" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所在考区">
				<el-input size="mini" v-model="formStore.formData.data.examinationDistrict"></el-input>
			</el-form-item>
			<el-form-item label="毕业学校">
				<el-input size="mini" v-model="formStore.formData.data.PGraduationName"></el-input>
			</el-form-item>
			<el-form-item label="高考成绩">
				<el-input size="mini" v-model="formStore.formData.data.collegeEntranceScore"></el-input>
			</el-form-item>
			<el-form-item label="录取号">
				<el-input size="mini" v-model="formStore.formData.data.admissionNo"></el-input>
			</el-form-item>
			<el-form-item label="高考考生号">
				<el-input size="mini" v-model="formStore.formData.data.collegeEntranceNo"></el-input>
			</el-form-item>
			<el-form-item label="考试语种">
				<el-select v-model="formStore.formData.data.examiniationLanguage" placeholder="请选择">
					<el-option v-for="(item,index) in examiniationLanguageData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="入学日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.admissionDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="学籍类型">
				<el-select v-model="formStore.formData.data.stuArchivesType" placeholder="请选择">
					<el-option v-for="(item,index) in stuArchivesTypeData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学籍状态">
				<el-select v-model="formStore.formData.data.stuArchivesStatus" placeholder="请选择">
					<el-option v-for="(item,index) in stuArchivesStatusData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="特殊类型">
				<el-select v-model="formStore.formData.data.specialType" placeholder="请选择">
					<el-option v-for="(item,index) in specialTypeData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="外语语种">
				<el-select v-model="formStore.formData.data.foreignLanguage" placeholder="请选择">
					<el-option v-for="(item,index) in foreignLanguageData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="是否应届">
				<gc-s-radio :component-store="isGraduatesStore"></gc-s-radio>
			</el-form-item>
			<el-form-item label="学业状态">
				<el-select v-model="formStore.formData.data.academicStatus" placeholder="请选择">
					<el-option v-for="(item,index) in academicStatusData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="毕业类型">
				<el-select v-model="formStore.formData.data.graduationType" placeholder="请选择">
					<el-option v-for="(item,index) in graduationTypeData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="毕业证书号 ">
				<el-input size="mini" v-model="formStore.formData.data.graduationCertificateNo"></el-input>
			</el-form-item>
			<el-form-item label="学位类型">
				<el-select v-model="formStore.formData.data.stuDegreeType" placeholder="请选择">
					<el-option v-for="(item,index) in stuDegreeTypeData[0]" :key="item.index" :label="item.dict_desc" :value="item.dict_key">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学位编号">
				<el-input size="mini" v-model="formStore.formData.data.degreeCertificateNo"></el-input>
			</el-form-item>
			<el-form-item label="毕业日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.graduationDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="离校日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.leaveDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="学位授予日期">
				<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formStore.formData.data.degreeSendDate" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="个人证件照片">

				<!--<img v-if="formStore.formData.data.personalPhoto != ''" :src="formStore.formData.data.personalPhoto" alt="加载失败" title="点击修改" height="80px" width="80px">
				<h4 v-if="formStore.formData.data.personalPhoto == ''">未上传</h4>-->
				<el-upload class="avatar-uploader" :action="upLoadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageU" :src="imageU" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
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
			<span> </span>
			<br/>
		</div>

	</div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import '@/theme/index.css'
import VueExpand from '@/components/VueExpand'
Vue.use(Element)
Vue.use(VueExpand)
import GUtils from '@/components/Utils.js'
import GStoreFactory from '@/ElementDataFactory/ComponentStoreFactoryRelase1.0.js'
import GraceComponent from '@/ComponentPackage/GraceComponents.js'
import dataPath from '@/API/Student/student_info_manager.js'
import nations from '../nations.js'
import politicalStatus from '../politicalStatus.js'
Vue.use(GraceComponent)

var formStore = GStoreFactory.buildServiceForm()
var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
  managerNodeCode: '',
  stuNo: '', // 学号
  name: '', // 姓名
  namePhoneticize: '', // 名字拼音
  identityNo: '', // 身份证号
  sexType: '1', // 性别
  nation: '', // 民族
  nativePlace: '', // 籍贯
  politicalStatus: '', // 政治面貌
  examinationDistrict: '', // 所在考区
  PGraduationName: '', // 毕业学校
  collegeEntranceScore: '', // 高考成绩
  admissionNo: '', // 录取号码
  collegeEntranceNo: '', // 高考考生号
  examiniationLanguage: '', // 考试语种
  admissionDate: '', // 入学日期
  stuArchivesType: '', // 学籍类型
  stuArchivesStatus: '', // 学籍状态
  specialType: '', // 特殊类型
  foreignLanguage: '', // 外语语种
  isGraduates: '1', // 是否应届生
  academicStatus: '', // 学业状态
  graduationType: '', // 毕业类型
  graduationCertificateNo: '', // 毕业证书号
  stuDegreeType: '', // 学位类型
  degreeCertificateNo: '', // 学位编号
  graduationDate: '', // 毕业日期
  leaveDate: '', // 离校日期
  degreeSendDate: '', // 学位授予日期
  personalPhoto: '' // 个人证件照片
  //	checkFlag: "0", //审核状态
  //	checkComment: "" //审核备注
})
formDataStore.pushRules({
  managerNodeCode: [
    {
      required: true,
      message: '此项不能为空',
      trigger: 'blur'
    }
  ],
  stuNo: [], // 学号
  name: [], // 姓名
  namePhoneticize: [], // 名字拼音
  identityNo: [], // 身份证号
  sexType: [], // 性别
  nation: [], // 民族
  nativePlace: [], // 籍贯
  politicalStatus: [], // 政治面貌
  examinationDistrict: [], // 所在考区
  PGraduationName: [], // 毕业学校
  collegeEntranceScore: [], // 高考成绩
  admissionNo: [], // 录取号码
  collegeEntranceNo: [], // 高考考生号
  examiniationLanguage: [], // 考试语种
  admissionDate: [], // 入学日期
  stuArchivesType: [], // 学籍类型
  stuArchivesStatus: [], // 学籍状态
  specialType: [], // 特殊类型
  foreignLanguage: [], // 外语语种
  isGraduates: [], // 是否应届生
  academicStatus: [], // 学业状态
  graduationType: [], // 毕业类型
  graduationCertificateNo: [], // 毕业证书号
  stuDegreeType: [], // 学位类型
  degreeCertificateNo: [], // 学位编号
  graduationDate: [], // 毕业日期
  leaveDate: [], // 离校日期
  degreeSendDate: [], // 学位授予日期
  personalPhoto: [] // 个人证件照片
  //	checkFlag: [], //审核状态
  // checkComment: [] //审核备注
})
formStore.addAttr('formData', formDataStore)

// var sexTypeStore = GStoreFactory.buildSmallRadioStore(formDataStore.data, 'sexType');

var isGraduatesStore = GStoreFactory.buildSmallRadioStore(
  formStore.formData.data,
  'isGraduates'
)

var examiniationLanguageData = []
var stuArchivesTypeData = []
var stuArchivesStatusData = []
var specialTypeData = []
var foreignLanguageData = []
var academicStatusData = []
var graduationTypeData = []
var stuDegreeTypeData = []
var checkFlagData = []
var nationsData = nations.data
var politicalStatusData = politicalStatus.data
// 定义是否应届组件结束
// 获取码表数据
var requestData = {
  dicts: [
    'check_flag',
    'sex_type',
    'language',
    'stu_archives_type',
    'stu_archives_status',
    'special_type',
    'graduation_type',
    'stu_degree_type',
    'is_graduates',
    'academic_status'
  ]
}
var dictData = {}
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
  dictData = data.resBody
  examiniationLanguageData.push(dictData.language)
  stuArchivesTypeData.push(dictData.stu_archives_type)
  stuArchivesStatusData.push(dictData.stu_archives_status)
  specialTypeData.push(dictData.special_type)
  foreignLanguageData.push(dictData.language)
  academicStatusData.push(dictData.academic_status)
  stuDegreeTypeData.push(dictData.stu_degree_type)
  graduationTypeData.push(dictData.graduation_type)
  checkFlagData.push(dictData.check_flag)
  isGraduatesStore.pushAllByFormat(dictData.is_graduates, {
    val: 'dict_key',
    name: 'dict_desc'
  })
})
// 获取码表数据结束

var nativePlaceData = []
GUtils.post(dataPath.getNativePlaceData, {}, function(data) {
  nativePlaceData.push(data.resBody)
})

export default {
  props: ['bid', 'loadOrg'],
  data() {
    return {
      formStore: formStore,
      imageUrl: '', // 证件照片
      upLoadUrl: dataPath.upLoadStuidentityPic,
      // sexTypeStore: sexTypeStore,
      nationsData: nationsData,
      politicalStatusData: politicalStatusData,
      examiniationLanguageData: examiniationLanguageData,
      stuArchivesTypeData: stuArchivesTypeData,
      stuArchivesStatusData: stuArchivesStatusData,
      specialTypeData: specialTypeData,
      foreignLanguageData: foreignLanguageData,
      isGraduatesStore: isGraduatesStore,
      academicStatusData: academicStatusData,
      graduationTypeData: graduationTypeData,
      stuDegreeTypeData: stuDegreeTypeData,
      checkFlagData: checkFlagData,
      nativePlaceData: nativePlaceData,
      loading: false,
      iload: false,
      managerCodeData: []
    }
  },
  computed: {
    imageU: function() {
      if (this.imageUrl != '') {
        return this.imageUrl
      } else {
        return this.formStore.formData.data.personalPhoto
      }
    }
  },
  methods: {
    orgCodeChange: function(val) {
      this.loadOrg.orgCode = val
    },
    submitUpdate: function() {
      var that = this

      GUtils.post(
        dataPath.updateStuBaseInfo,
        this.formStore.formData.data,
        function(data) {
          alert('修改成功')
          that.getBaseInfo()
        }
      )
    },
    testbt: function() {
      console.log(this)
    },
    upLoadSuccess(response, file, fileList) {
      console.log(['response', response])
      console.log(['file', file])
      console.log(['fileList', fileList])
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(['res', res]) // res为文件路径
      console.log(['file', file])
      this.formStore.formData.data.personalPhoto = res
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getBaseInfo: function() {
      console.log(['updatethis', this])
      var baseId = this.bid
      this.iload = true
      var that = this
      GUtils.post(
        dataPath.queryStudentBaseInfoById,
        {
          id: baseId
        },
        function(data) {
          console.log(['update', data])

          var responseBody = data.resBody[0]
          formDataStore.pushData(responseBody)
          formDataStore.pushData({
            checkFlag: responseBody.checkFlag.toString(),
            isGraduates: responseBody.isGraduates.toString(),
            sexType: responseBody.sexType.toString(),
            PGraduationName: responseBody.pgraduationName
          })
          that.loadOrg.orgCode = that.formStore.formData.data.managerNodeCode
          that.iload = false
        }
      )
    }
  },
  mounted: function() {
    this.getBaseInfo()
    var that = this
    GUtils.post(dataPath.queryStudentUserAuth, {}, function(data) {
      console.log(['managerCodeData', data])
      that.managerCodeData = data.resBody
    })
  }
}
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