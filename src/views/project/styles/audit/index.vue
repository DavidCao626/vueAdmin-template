<template>
    <div>
        <page :Breadcrumb="false">
            <div slot="title">
                预审
            </div>
            <div slot="panel">
                <dynamicTable :data="getStylesConfig.listStyle.data" :checkboxVal="checkboxVal" @selection-change="handleSelectionChange" :tableHeader="getStylesConfig.listStyle.tableTodoHeader" style="width: 100%">
                    <el-table-column label="班级推荐情况" width="155">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="value" placeholder="推荐为" @change="onChange(scope)">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                </dynamicTable>
            </div>
        </page>
        <div class="approval-panel" style="text-align: center;">
            <el-button type="primary" size="mini" @click="onSubmit">全部保存</el-button>
            <el-button size="mini">取消返回</el-button>
        </div>
    </div>
</template>

<script>
import dynamicTable from "~/components/DynamicTable";
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../../_store/index.js";
export default {
  components: {
    dynamicTable
  },
  props: {
    checkboxVal: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "一般困难"
        },
        {
          value: "选项2",
          label: "困难"
        },
        {
          value: "选项3",
          label: "特殊困难"
        }
      ],
      value: ""
    };
  },
  computed: {
    ...mapGetters({
      getStylesConfig: store.namespace + "/getStylesConfig"
    })
  },
  methods: {
    onChange(scope) {
      console.log(scope.row);
    },
    onSubmit() {
      //
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      console.log(val);
    }
  }
};
</script>

<style >
.approval-panel {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
}
</style>
