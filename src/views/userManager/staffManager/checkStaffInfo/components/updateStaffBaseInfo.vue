<template>
	<div>
		<el-form size="mini" :model="formStore.formData.data" disabled ref="addForm" :rules="formStore.formData.rules" label-width="100px" v-loading="iloading">
			<el-form-item label="职工编码">
				<el-input size="mini" v-model="formStore.formData.data.staffCode"></el-input>
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
				<img v-if="formStore.formData.data.personalPhoto != ''" :src="formStore.formData.data.personalPhoto" alt="加载失败" title="点击修改" height="80px" width="80px">
				<h4 v-if="formStore.formData.data.personalPhoto == ''">未上传</h4>
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
	import dataPath from '@/API/Staff/staff_info_manager.js'
	import nations from '../nations.js'
	import politicalStatus from '../politicalStatus.js'
	Vue.use(GraceComponent)

var formStore = GStoreFactory.buildServiceForm()
var formDataStore = GStoreFactory.buildServiceFormData()
formDataStore.pushData({
	  staffCode: '', // 职工编码
	  name: '', // 姓名
	  namePhoneticize: '', // 姓名拼音
	  sexType: '1', // 性别
	  nation: '', // 民族
	  phone: '', // 手机号
	  email: '', // 邮箱
	  identityNo: '', // 身份证号码
  //		checkFlag: "0", //审核状态
  //		checkComment: "", //审核备注
	  personalPhoto: '' // 证件照片
	})
formDataStore.pushRules({
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
	})
formStore.addAttr('formData', formDataStore)

var nationsData = nations.data
var checkFlagData = []
var requestData = {
	  'dicts': ['check_flag', 'sex_type']
	}
	var dictData = {}
GUtils.post(dataPath.getDictByDictNames, requestData, function(data) {
	  dictData = data.resBody
	checkFlagData.push(dictData.check_flag)
})
var iloading = false
export default {
	  props: ['bid'],
	  data() {
	    return {
	      formStore,
	      nationsData,
	      checkFlagData,
	      iloading
	    }
		},
		watch:{
			bid:function(){
			var that = this
	    GUtils.post(dataPath.queryStaffBaseInfoById, {
	      'id': this.bid
	    }, function(data) {
	      formDataStore.pushData(data.resBody)
	      formDataStore.pushData({
	        lastUpdateTime: null
	      })
	      delete formDataStore.data['lastUpdateTime']
	    })
			}
		},

	  methods: {
	    submitForm: function() {
	      var that = this
	      console.log(['this', this])
	      console.log(formStore.formData.data)
	      GUtils.post(dataPath.updateStaffBaseInfo, formStore.formData.data, function(data) {
	        that.$parent.$parent.iLoad()
	      })
    },
	    loadFormData: function(id) {
	      var that = this
	      GUtils.post(dataPath.queryStaffBaseInfoById, {
	        'id': id
	      }, function(data) {
	        formDataStore.pushData(data.resBody)
	        formDataStore.pushData({
	          lastUpdateTime: null
	        })
	        delete formDataStore.data['lastUpdateTime']
	      })
    }
	  },
	  mounted: function() {
	    var that = this
	    GUtils.post(dataPath.queryStaffBaseInfoById, {
	      'id': this.bid
	    }, function(data) {
	      formDataStore.pushData(data.resBody)
	      formDataStore.pushData({
	        lastUpdateTime: null
	      })
	      delete formDataStore.data['lastUpdateTime']
	    })
  }
	}
</script>

<style>

</style>