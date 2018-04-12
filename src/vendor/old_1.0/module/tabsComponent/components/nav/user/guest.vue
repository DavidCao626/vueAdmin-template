<template>
	<ul class="nav navbar-nav login-form">
		<li @click="link(url.siteLogin)"> 登录</li>
		<li @click="link(url.siteReg)"> 注册</li>
	</ul>
</template>

<script>
	
	import RquestPathConfig from '@/API/User/user_layout_menu.js'
	export default {
	  data() {
	    return {
	      url: RquestPathConfig
	    }
   		},
   		methods: {
   			link: function(ur) {
   				window.location.href = ur
   			}
   		}
	}
</script>

<style scoped lang="scss"> 
.login-form{
	margin: 25px;
	li{
		margin-right: 20px;
	}
}
</style>