<template>
  <div class="el-transfer">
    <transfer-panel v-bind="$props" :data="sourceData" :title="titles[0] || t('el.transfer.titles.0')" :default-checked="leftDefaultChecked" :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')" :transferHeight="transferHeight" @checked-change="onSourceCheckedChange">
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="el-transfer__buttons">

      <el-button type="primary" :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']" @click.native="addToRight" :disabled="leftChecked.length === 0">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <transfer-panel v-bind="$props" :data="targetData" :title="titles[1] || t('el.transfer.titles.1')" :default-checked="rightDefaultChecked" :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')" @checked-change="onTargetCheckedChange" :transferHeight="transferHeight">

      <el-button type="text" @click="delitem" :disabled="rightChecked.length === 0">
        <i class="el-icon-arrow-delete"></i>
        <span>移除</span>
      </el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <slot name="operation-slot" style="float:right"></slot>
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script>
import ElButton from "element-ui/packages/button";
import Emitter from "element-ui/src/mixins/emitter";
import Locale from "element-ui/src/mixins/locale";
import TransferPanel from "./transfer-panel.vue";
import Migrating from "element-ui/src/mixins/migrating";

export default {
  name: "ElTransfer",

  mixins: [Emitter, Locale, Migrating],

  components: {
    TransferPanel,
    ElButton
  },

  props: {
    operation: {
      type: Object
    },

    transferHeight: {
      type: Number
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    valueItems: {
      type: Array,
      default() {
        return [];
      }
    },
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return [];
      }
    },
    filterPlaceholder: {
      type: String,
      default: ""
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    format: {
      type: Object,
      default() {
        return {};
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: "label",
          key: "key",
          disabled: "disabled"
        };
      }
    }
  },

  data() {
    return {
      leftChecked: [],
      rightChecked: []
    };
  },

  computed: {
    sourceData() {
      return this.data;
    },

    targetData() {
      // this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1);

      return this.valueItems;
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2;
    }
  },

  watch: {
    value(val) {
      this.dispatch("ElFormItem", "el.form.change", val);
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          "footer-format": "footer-format is renamed to format."
        }
      };
    },

    onSourceCheckedChange(val) {
      this.leftChecked = val;
    },

    onTargetCheckedChange(val) {
      this.rightChecked = val;
    },

    addToLeft() {
      const currentValue = this.value.slice();
      this.rightChecked.forEach(item => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit("input", currentValue);
      this.$emit("change", currentValue, "left", this.rightChecked);
    },
    getItemFromData(key) {
      const t = this;
      let a;
      this.data.forEach(item => {
        if (item[t.props.key] === key) {
          a = item;
          return;
        }
      });
      return a;
    },
    delitem() {
      var items = [];
      var currentValue = this.value.slice();
      var that = this;
      this.rightChecked.forEach(function(item, index) {
        var s = -1;
        if ((s = currentValue.indexOf(item)) > -1) {
          currentValue.splice(s, 1);
          that.valueItems.splice(s, 1);
             items.push(that.getItemFromData(item));
        }
      });
         var result = this.operation.remove.call(this.$parent, items);
         items=[]
      this.rightChecked = [];
      this.$emit("input", currentValue);
      this.$emit("change", currentValue, "delitem", this.leftChecked);
    },
    addToRight() {
      console.log(["zthis",this]);
       var items = [];
      let currentValue = this.value.slice();
       var that = this;
      this.leftChecked.forEach(item => {
        if (this.value.indexOf(item) === -1) {
          this.valueItems.push(that.getItemFromData(item));
          currentValue = currentValue.concat(item);
          items.push(this.getItemFromData(item));
        }
      });
        var result = this.operation.add.call(this.$parent, items);
        items=[]
      this.$emit("input", currentValue);
      this.$emit("change", currentValue, "right", this.leftChecked);
    }
  }
};
</script>
