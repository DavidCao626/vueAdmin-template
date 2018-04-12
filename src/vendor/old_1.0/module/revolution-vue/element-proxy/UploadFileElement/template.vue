<template>
	<div>
		<div class="grace-item-content">
			<div class="grace-item">
				<span style="font-size:12px;padding:3px;border:1px solid #F2F2F2;margin-right:3px" v-if="getName">
		<a :href="getPath" target="_blank">{{getName}}</a>
	</span>
				<span style="font-size:12px;padding:3px;margin-right:3px;border:1px solid #F2F2F2" v-if="getPath && fields.isDisplayPath">
		{{getPath}}
	</span>
				<span style="font-size:12px;padding:3px;margin-right:3px;border:1px solid #F2F2F2" v-if="fields.message">
		{{fields.message}}
	</span>
				<el-upload class="upload" :style="{display:'inline-block'}" :on-success="onSuccess" :on-error="onError" v-bind="innerProp" v-on="innerEvent">
					<el-button size="small" type="primary">{{fields.buttonText}}</el-button>
				</el-upload>
			</div>
		</div>
		<div class="grace-form-rule-message" v-if="fields._rule_message">
			{{fields._rule_message}}
		</div>
	</div>
</template>
<script>
	// 动态的去创建组件
	import inputButton from '../InputTextElement/resolver.js'
	// inputButton.getResolver()._assign_store({"_fields":{"prepend":"文件上传"}});
	export default {
	  data() {
	    return {
	      innerProp: this.fields.inner_prop,
	      innerEvent: this.fields.inner_event
	    }
	  },
	  components: {
	    'upload-button': inputButton
	  },
	  props: ['fields'],
	  methods: {
	    onSuccess: function(response, file, fileList) {
	      this.fields._value = [file.name, response.body.resBody]
	    },
	    onError: function(err, file, fileList) {
	      this.fields._value = [file.name, 'errorUpload']
      this.fields.message = '上传错误'
    }
	  },
	  computed: {
	    getName: function() {
	      return this.fields._value[0]
	    },
	    getPath: function() {
	      return this.fields._value[1]
	    }
	  },
	  watch: {},
	  mounted: function() {
	    var resolver = this.fields._getResolver()
	    if (resolver.isItem) {
	      resolver.mountedItem()
	    }
	  }
	}
</script>
<style>

</style>