<template>
	<div>
		<el-card class="boxCard">
			<el-collapse v-model="activeNames">
				<el-collapse-item title="基本信息" name="1">
					<update-staff-base-info :loadOrg="loadOrg" :bid="baseInfoBid"></update-staff-base-info>
				</el-collapse-item>
				<el-collapse-item title="在校信息" name="2">
					<update-staff-university-info :loadOrg="loadOrg" :bid="universityInfoBid"></update-staff-university-info>
				</el-collapse-item>
			</el-collapse>
		</el-card>
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
Vue.use(GraceComponent)
import updateStaffBaseInfo from './updateStaffBaseInfo.vue'
import updateStaffUniversityInfo from './updateStaffUniversityInfo.vue'

// 这两个参数是传来的
var baseInfoBid = '483'
var universityInfoBid = '470'
var loadOrg = {}
loadOrg.orgCode = ''
export default {
  components: {
    updateStaffBaseInfo,
    updateStaffUniversityInfo
  },
  data() {
    return {
      loadOrg,
      baseInfoBid, // -=-=-=-=-=-=-=-=-=-审核信息的id   基本信息
      universityInfoBid, // -=-=-=-=-=-=-=-=-=-审核信息的id   在校信息
      activeNames: ['1'],
      rows: 5
    }
  },
  methods: {}
}
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