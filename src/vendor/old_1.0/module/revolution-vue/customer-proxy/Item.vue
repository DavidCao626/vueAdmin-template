<template>
  <div class="app-items-item">
    <label  class="app-items-item__label" v-bind:style="labelStyle" v-if="label || $slots.label">
      <slot name="label">{{label + form.labelSuffix}}</slot>
    </label>
    <div class="app-items-item__content" v-bind:style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-items-item',
  componentName: 'app-items-item',
  props: {
    label: String,
    labelWidth: String
  },
  data() {
    return {
      isNested: false
    }
  },
  computed: {
    labelStyle() {
      const ret = {}
      if (this.form.labelPosition === 'top') return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.width = labelWidth
      }
      return ret
    },
    contentStyle() {
      const ret = {}
      const label = this.label
      if (this.form.labelPosition === 'top' || this.form.inline) return ret
      if (!label && !this.labelWidth && this.isNested) return ret
      const labelWidth = this.labelWidth || this.form.labelWidth
      if (labelWidth) {
        ret.marginLeft = labelWidth
      }
      return ret
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'app-items') {
        if (parentName === 'app-items-item') {
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    }
  }
}
</script>
