<template>
	<div >
	
		<router-view ></router-view>
			
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueRouter from 'vue-router'
	Vue.use(VueRouter)
	
	import main from './components/main.vue'
	
	const routes = [
	  { path: '/', component: main }
	]
	
	const router = new VueRouter({
 		 routes
	})
	
export default {
  router
}

</script>
