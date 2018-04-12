<template>
	<div>
		<div class="grace-item-content">
			<el-radio-group v-model="fields._value" v-bind="innerProp" v-on="innerEvent">
				<template v-for="item in fields.options">
					<el-radio-button :disabled="item.disabled" :label="getLabel(item)" :key="getLabel(item)" :size="fields.size" :border="fields.isBorder" v-if="fields.isButton">{{getTitle(item)}}</el-radio-button>
					<el-radio :disabled="item.disabled" :label="getLabel(item)" :key="getLabel(item)" :size="fields.size" :border="fields.isBorder" v-else>{{getTitle(item)}}</el-radio>
				</template>
			</el-radio-group>
		</div>
		<div class="grace-form-rule-message" v-if="fields._rule_message">
			{{fields._rule_message}}
		</div>
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
	      innerProp: this.fields.inner_prop,
	      innerEvent: this.fields.inner_event
	    }
	  },
	  components: {},
	  props: ['fields'],
	  methods: {
	    getLabel: function(item) {
	      return item[this.fields.props['label']]
	    },
	    getTitle: function(item) {
	      return item[this.fields.props['title']]
	    }
	  },
	  computed: {},
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