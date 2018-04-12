<template>
	<div>
		<add-form></add-form>
		<hr />
		<hr />
		<hr />
		<update-form></update-form>
	</div>
</template>

<script>
	import addForm from './components/addStaffUniversityInfo.vue'
import updateForm from './components/updateStaffUniversityInfo.vue'
export default {
	  components: {
	    addForm,
	    updateForm
	  }
	}
</script>

<style>

</style>