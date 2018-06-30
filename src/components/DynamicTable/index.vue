<template>
  <div class="app-container">
    <template v-if="this.isdynamic && this.tableHeader.length>0">
      <div class="filter-container" style="text-align: right;margin-top: -35px;margin-bottom: 10px;">
        <el-checkbox-group v-model="checkboxVal">
          <el-checkbox v-for="(fruit1,index) in tableHeader" :key='index' v-model="fruit1.isShow" :label="fruit1.prop">{{fruit1.label}}</el-checkbox>
        </el-checkbox-group> 
      </div>
    </template>

    <el-table :data="data" :key='key' border fit highlight-current-row style="width: 100%"  @selection-change="handleSelectionChange">
       <slot name="left-column">

       </slot>
      <el-table-column :key='index' v-for='(fruit,index) in formThead' :label="fruit.label" :width="fruit.width" :prop="fruit.prop">
        <template v-if="fruit.children ">
          <el-table-column v-for='(fitem,index) in fruit.children' :key='index' :label="fitem.label" :width="fitem.width" :prop="fitem.prop">

          </el-table-column>
        </template>
      </el-table-column>
      <slot> </slot>
    </el-table>

  </div>
</template>

<script>
export default {
  props: {
    isdynamic: {
      type: Boolean,
      default: false
    },
    tableHeader: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    checkboxVal: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      key: 1, // table key
      formTheadOptions: [],
      formThead: this.tableHeader // 默认表头 Default header
    }
  },
  computed: {},
  mounted() {
    this.tableHeader.forEach(element => {
      this.formTheadOptions.push(element.prop)
      if (element.checked) {
        this.checkboxVal.push(element.prop)
      }
    })
    // debugger
  },
  methods: {
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    }
  },
  watch: {
    checkboxVal(valArr) {
      const formTheadData = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      )
      console.log("asdas:"+formTheadData);
      
      this.key = this.key + 1 // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
      const temValue = []
      formTheadData.forEach(item => {
        this.tableHeader.forEach(tableHeaderItem => {
          if (tableHeaderItem.prop === item) {
            temValue.push(tableHeaderItem)
          }
        })
      })

      this.formThead = temValue

      console.log("asdas2:"+ this.formThead);
    }
  }
}
</script>

