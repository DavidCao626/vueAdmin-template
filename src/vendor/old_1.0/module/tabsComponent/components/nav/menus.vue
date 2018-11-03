<template>
<div>
	<gc-menu :component-store="menusStore"></gc-menu>
</div>
</template>

<script>
import axios from 'axios'
import {
  Loading
} from 'element-ui'

import RquestPathConfig from '@/API/User/user_layout_menu.js'

export default {
  inject: ['menusStore'],
  data() {
    return {

    }
  },
  methods: {
      	getMenuforServer: function() {
      //		var loadingVars = Loading.service({
     //   fullscreen: true
    //  })
      		const t = this
      axios({// 获取用户菜单
        'url': RquestPathConfig.getUserMenu,
        'method': 'get'
      }).then(function(response) {
        t.menusStore.pushAll(response.data.body.resBody)

      			console.log(response)

      //  loadingVars.close()
      }).catch(function(error) {
        console.log('接口异常' + error)
      })
    }
  },
  mounted: function() {
	    this.$nextTick(function() {
      		this.menusStore.addConf('bingItem', {
        'idx': 'serial',
        'childs': 'children',
        'visible': 'disFlag'
      })
      this.getMenuforServer()
	    })
  }
}
</script>

<style>
</style>