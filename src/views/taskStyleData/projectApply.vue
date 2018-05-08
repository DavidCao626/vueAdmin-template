<template>
	<div>

		<el-form :model="formData.data" :rules="formData.rules" ref="form1" label-width="" size="mini">
			<el-form-item prop="applyProject" label="项目名称">
				<el-input v-model="formData.data.appkyProject"></el-input>
			</el-form-item>
			<el-form-item prop="serviceType" label="业务类别">
				<el-select v-model="formData.data.serviceType">
					<el-option v-for="(item,index) in tdata" :key="index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="childServiceType" label="子业务类别">
				<el-select v-model="formData.data.childServiceType">
					<el-option v-for="(item,index) in tdata" :key="index" :label="item.label" :value="item.value">
						{{item}}
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="evaluationType" label="关联测评类别">
				<el-select v-model="formData.data.evaluationType">
					<el-option v-for="(item,index) in tdata" :key="index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="applyReason" label="申请理由">
				<el-input type="textarea" v-model="formData.data.applyReason"></el-input>
			</el-form-item>
		</el-form>
{{tdata}}
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['taskStyleData']),
    tdata() {
      return this.taskStyleData['fromData']['projectApply']['AnmeldenTypeList']
    }
  },

  data() {
    return {
      anmeldenTypeList: {},
      formData: {
        data: {
          applyProject: '',
          serviceType: '',
          childServiceType: '',
          evaluationType: '',
          applyReason: ''
        },
        rules: {}
      }
    }
  },
  methods: {
    getA() {
      this.$store
        .dispatch('getAnmeldenTypeList', 'projectApply')
        .then(function(resp) {

        })
    }
  },
  mounted() {
  }
}
</script>

<style>

</style>