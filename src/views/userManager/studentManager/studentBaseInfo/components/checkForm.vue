<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" ref="addForm" label-width="100px">
			<el-row>
				<el-col :span='12'>
					<el-form-item label="学号">
						<span>{{formStore.formData.data.stuNo}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="姓名">
						<span>{{formStore.formData.data.name}}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="姓名拼音">
						<span>{{formStore.formData.data.namePhoneticize}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="身份证号">
						<span>{{formStore.formData.data.identityNo}}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="性别">
						<span v-if="formStore.formData.data.sexType == 0">女</span>
						<span v-if="formStore.formData.data.sexType == 1">男</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="民族">
						<template v-for="(item,index) in nationsData">
							<span v-if="item.id == formStore.formData.data.nation">{{item.name}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="籍贯">
						<template v-for="(item,index) in nativePlaceData[0]">
							<span v-if="item.code == formStore.formData.data.nativePlace">{{item.name}}</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="政治面貌">
						<template v-for="(item,index) in politicalStatusData">
							<span v-if="item.id == formStore.formData.data.politicalStatus">{{item.name}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="所在考区">
						<span>{{formStore.formData.data.examinationDistrict}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="毕业学校">
						<span>{{formStore.formData.data.PGraduationName}}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="高考成绩">
						<span>{{formStore.formData.data.collegeEntranceScore}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="录取号">
						<span>{{formStore.formData.data.admissionNo}}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="高考考生号">
						<span>{{formStore.formData.data.collegeEntranceNo}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="考试语种">
						<template v-for="(item,index) in examiniationLanguageData[0]">
							<span v-if="item.dict_key == formStore.formData.data.examiniationLanguage">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="入学日期">
						<span>{{formStore.formData.data.admissionDate}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="学籍类型">
						<template v-for="(item,index) in stuArchivesTypeData[0]">
							<span v-if="item.dict_key == formStore.formData.data.stuArchivesType">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="学籍状态">
						<template v-for="(item,index) in stuArchivesStatusData[0]">
							<span v-if="item.dict_key == formStore.formData.data.stuArchivesStatus">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="特殊类型">
						<template v-for="(item,index) in specialTypeData[0]">
							<span v-if="item.dict_key == formStore.formData.data.specialType">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="外语语种">
						<template v-for="(item,index) in foreignLanguageData[0]">
							<span v-if="item.dict_key == formStore.formData.data.foreignLanguage">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="是否应届">
						<template v-for="(item,index) in isGraduatesData[0]">
							<span v-if="item.dict_key == formStore.formData.data.isGraduates">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="学业状态">
						<template v-for="(item,index) in academicStatusData[0]">
							<span v-if="item.dict_key == formStore.formData.data.academicStatus">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="毕业类型">
						<template v-for="(item,index) in graduationTypeData[0]">
							<span v-if="item.dict_key == formStore.formData.data.graduationType">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="毕业证书号">
						<span>{{formStore.formData.data.graduationCertificateNo}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="学位类型">
						<template v-for="(item,index) in stuDegreeTypeData[0]">
							<span v-if="item.dict_key == formStore.formData.data.stuDegreeType">{{item.dict_desc}}</span>
						</template>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="学位编号">
						<span>{{formStore.formData.data.degreeCertificateNo}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="毕业日期">
						<span>{{formStore.formData.data.graduationDate}}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span='12'>
					<el-form-item label="离校日期">
						<span>{{formStore.formData.data.leaveDate}}</span>
					</el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="学位授予日期">
						<span>{{formStore.formData.data.degreeSendDate}}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<el-form-item label="个人证件照片">
				<el-button @click="" size='mini'>点击查看</el-button>
			</el-form-item>

			<!--<el-form-item label="审核备注">
				<el-input size="mini" v-model="formStore.formData.data.checkComment"></el-input>
			</el-form-item>-->
		</el-form>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Element from 'element-ui'
	import '@/theme/index.css'
	import '@/styles/app.scss'
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
	  stuNo: '', // 学号
	  name: '', // 姓名
	  namePhoneticize: '', // 名字拼音
	  identityNo: '', // 身份证号
	  sexType: '1', // 性别
	  nation: '01', // 民族
	  nativePlace: '11', // 籍贯
	  politicalStatus: '11', // 政治面貌
	  examinationDistrict: '', // 所在考区
	  PGraduationName: '', // 毕业学校
	  collegeEntranceScore: '', // 高考成绩
	  admissionNo: '', // 录取号码
	  collegeEntranceNo: '', // 高考考生号
	  examiniationLanguage: 'zh', // 考试语种
	  admissionDate: '', // 入学日期
	  stuArchivesType: '1', // 学籍类型
	  stuArchivesStatus: '1', // 学籍状态
	  specialType: '1', // 特殊类型
	  foreignLanguage: 'zh', // 外语语种
	  isGraduates: '1', // 是否应届生
	  academicStatus: '1', // 学业状态
	  graduationType: '1', // 毕业类型
	  graduationCertificateNo: '', // 毕业证书号
	  stuDegreeType: '1', // 学位类型
	  degreeCertificateNo: '', // 学位编号
	  graduationDate: '', // 毕业日期
	  leaveDate: '', // 离校日期
	  degreeSendDate: '', // 学位授予日期
	  personalPhoto: '', // 个人证件照片
	  checkFlag: '0', // 审核状态
	  checkComment: '' // 审核备注
	})
formStore.addAttr('formData', formDataStore)
var isGraduatesStore = GStoreFactory.buildSmallRadioStore(formStore.formData.data, 'isGraduates')

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
var isGraduatesData = []
// 定义是否应届组件结束
// 获取码表数据
var requestData = {
	  'dicts': ['check_flag', 'sex_type', 'language', 'stu_archives_type', 'stu_archives_status', 'special_type', 'graduation_type', 'stu_degree_type', 'is_graduates', 'academic_status']
	}
	var dictData = {}
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
	  dictData = data.resBody
	/* sexTypeStore.pushAllByFormat(dictData.sex_type, {
		"val": "dict_key",
		"name": "dict_desc"
	});*/
	examiniationLanguageData.push(dictData.language)
	stuArchivesTypeData.push(dictData.stu_archives_type)
	stuArchivesStatusData.push(dictData.stu_archives_status)
	specialTypeData.push(dictData.special_type)
	foreignLanguageData.push(dictData.language)
	academicStatusData.push(dictData.academic_status)
	stuDegreeTypeData.push(dictData.stu_degree_type)
	graduationTypeData.push(dictData.graduation_type)
	isGraduatesData.push(dictData.is_graduates)
	dictData.is_graduates
	  isGraduatesStore.pushAllByFormat(dictData.is_graduates, {
	    'val': 'dict_key',
	    'name': 'dict_desc'
	  })
})
// 获取码表数据结束

var nativePlaceData = []
GUtils.post(dataPath.getNativePlaceData, {}, function(data) {
	  nativePlaceData.push(data.resBody)
})
export default {

	  data() {
	    return {
	      formStore: formStore,
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
	      isGraduatesData: isGraduatesData
	    }
	  },
	  methods: {
	    testbt: function() {
	      console.log(this)
	    },
	    loadData: function(id) {
	      console.log('checkForm的loadData执行了')
      GUtils.post(dataPath.queryStudentBaseInfoById, { 'id': id }, function(data) {
	        console.log(data)
	        formDataStore.pushData(data.resBody[0])
	      })
    },
	    checkBT: function(result) {
	      //	checkStudentBaseInfo
	
	      GUtils.post(dataPath.checkStudentBaseInfo, {}, function(data) {
	
	      })
	    }
	
	  }
	}
</script>

<style>

</style>