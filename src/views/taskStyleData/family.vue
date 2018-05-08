<template>
	<div>
		<el-form :model="taskStyleDataFamily.data" :rules="formData.rules" ref="form1" size="mini" label-width="80px">
			<el-form-item prop="familyPopulation" label="家庭人口数量">
				<el-input-number v-model="taskStyleDataFamily.data.familyPopulation"></el-input-number>
			</el-form-item>
			<el-form-item prop="familyAddress" label="家庭住址">
				<el-input v-model="taskStyleDataFamily.data.familyAddress"></el-input>
			</el-form-item>
			<el-form-item prop="familyCapitaincome" label="人均收入">
				<el-input v-model="taskStyleDataFamily.data.familyCapitaincome"></el-input>
			</el-form-item>
			<el-form-item prop="naturalHazard" label="自然灾害">
				<el-input v-model="taskStyleDataFamily.data.naturalHazard"></el-input>
			</el-form-item>
			<el-form-item prop="isSingleParent" label="是否单亲">
				<el-radio-group v-model="taskStyleDataFamily.data.isSingleParent">
					<el-radio-button v-for="(item,index) in isSingleParentData" :key="index" :label="item.value">{{item.label}}</el-radio-button>
					<el-radio-button label="N"></el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="anmeldenType" label="户口类型">
				<el-select v-model="taskStyleDataFamily.data.anmeldenType">
					<el-option v-for="(item,index) in anmeldenTypeList" :key="index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="familyDebt" label="欠款金额">
				<el-input v-model="taskStyleDataFamily.data.familyDebt"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
var isSingleParentData = [
  {
    label: '是',
    value: 'Y'
  },
  {
    label: '否',
    value: 'N'
  }
]

var anmeldenTypeList = [
  {
    label: '农村',
    value: 'nc'
  },
  {
    label: '城镇',
    value: 'cz'
  }
]
// import { mapGetters } from 'vuex'
export default {
  name: 'as',
  computed: {
    taskStyleDataFamily: {
      get() {
        return this.$store.getters['taskStyleDataFamily']
      }
    }
  },
  watch: {
    taskStyleDataFamily: {
      get() {
        return this.$store.getters['taskStyleDataFamily']
      },

      handler: function(val) {
        this.$store.dispatch('updatetaskStyleDataFamily', val)
      },
      deep: true
    }
  },
  data() {
    return {
      isSingleParentData,
      anmeldenTypeList,
      formData: {
        rules: {}
      }
    }
  }
}
</script>

<style>

</style>