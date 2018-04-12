<template>
	<div>
		<add-form></add-form>
		<hr/>
		<update-form></update-form>
	</div>
</template>

<script>
	import addForm from './components/addStuPersonInfo.vue'
import updateForm from './components/updateStuPersonInfo.vue'
export default {
	  components: {
	    addForm,
	    updateForm
	  }
	}
</script>

<style>

</style>