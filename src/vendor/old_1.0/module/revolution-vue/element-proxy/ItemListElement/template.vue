<template>
	<div class="grace-form-item">
		<app-items v-bind="innerProp">
			<template v-for="item in fields.items">
				<app-items-item :label="item.label">
					<input-text :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='text'"></input-text>
					<input-select :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='select'"></input-select>
					<input-checkbox :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='checkbox'"></input-checkbox>
					<input-radio :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='radio'"></input-radio>
					<input-date :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='date'"></input-date>
					<input-date-time :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='datetime'"></input-date-time>
					<input-switch :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='switch'"></input-switch>
					<input-upload-file :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='uploadfile'"></input-upload-file>
					<input-upload-img :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='uploadimg'"></input-upload-img>
					<input-cascader :context-store="item.store" :item-resolver="fields._getResolver()" :item-key="item.key" :key="item.id" v-if="item.type=='cascader'"></input-cascader>
				</app-items-item>
			</template>
		</app-items>
	</div>
</template>
<script>
	import inputText from '../InputTextElement/resolver.js'
	import inputSelect from '../SelectElement/resolver.js'
	import inputCheckBox from '../CheckBoxGroupElement/resolver.js'
	import inputRadioGroup from '../RadioGroupElement/resolver.js'
	import inputDatePicker from '../DatePickerElement/resolver.js'
	import inputDateTimePicker from '../DateTimePickerElement/resolver.js'
	import inputSwitch from '../SwitchElement/resolver.js'
	import inputUploadFile from '../UploadFileElement/resolver.js'
	import inputUploadImg from '../UploadImgElement/resolver.js'
	import inputCascaderElement from '../CascaderElement/resolver.js'
	export default {
	  data() {
	    return {
	      innerProp: this.fields.inner_prop
	    }
	  },
	  components: {
	    'input-text': inputText,
	    'input-select': inputSelect,
	    'input-checkbox': inputCheckBox,
	    'input-radio': inputRadioGroup,
	    'input-date': inputDatePicker,
	    'input-date-time': inputDateTimePicker,
	    'input-switch': inputSwitch,
	    'input-upload-file': inputUploadFile,
	    'input-upload-img': inputUploadImg,
	    'input-cascader': inputCascaderElement
	  },
	  props: ['fields'],
	  methods: {},
	  computed: {},
	  mounted: function() {
	    var resolver = this.fields._getResolver()
	    console.log('itemMounted', resolver)
	  },
	  updated: function() {
	    var resolver = this.fields._getResolver()
	    console.log('itemUpdated', resolver)
	  },
	  watch: {}
	}
</script>
<style>

</style>