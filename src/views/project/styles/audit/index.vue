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
              <el-select size="mini" v-model="scope.row.banjipingshen">
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
      value: "",
      itemId: ""
    };
  },
  computed: {
    ...mapGetters({
      getStylesConfig: store.namespace + "/getStylesConfig",
      options: store.namespace + "/serviceTypeList"
    })
  },
  methods: {
    ...mapActions({
      getAllDataAndPageDataByItemId:
        store.namespace + "/getAllDataAndPageDataByItemId",
      updateClassRecommend: store.namespace + "/updateClassRecommend",
      completePendByItemId: store.namespace + "/completePendByItemId"
    }),
    onChange(scope) {
      console.log(scope.row);
    },
    onSubmit() {
      var tempA = [];
      this.getStylesConfig.listStyle.data.forEach(item => {
        var a = {
          'dataNo': item.dataNo,
          'classRecommend': item.banjipingshen
        };
        tempA.push(a);
      });
      var updateReqData = {
        itemId: this.itemId,
        updateClassData: tempA
      };
      this.updateClassRecommend(updateReqData);
      //this.completePendByItemId({itemId:this.itemId})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      console.log(val);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let itemId = to.query.itemId;
      vm.itemId = to.query.itemId;
      if (itemId != "" && itemId != null) {
        vm.getAllDataAndPageDataByItemId({ itemId: itemId });
      } else {
        vm.$message.error("itemId不能为空");
      }
    });
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
