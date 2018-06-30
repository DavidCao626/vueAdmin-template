<template>
    <div class="list-line">
        <div class="approval-panel" v-for="(i,index) in 1" :key="index">

            <!-- 数据表 -->

            <dynamicTable :data="tableDataTodo" @selection-change="handleSelectionChange" :tableHeader="getStylesConfig.listStyle.tableTodoHeader" isdynamic style="width: 100%">
                <template slot="left-column">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                </template>
                <el-table-column label="操作" width="155">
                    <template slot-scope="scope">
                        <el-button size="medium" type="text" @click="update"> 修改</el-button>
                        <!-- <el-button size="medium " type="text " > 修改</el-button> -->
                    </template>
                </el-table-column>
            </dynamicTable>

            <!-- 分页 -->

        </div>
    </div>
</template>

<script>
import dynamicTable from "~/components/DynamicTable";
import { mapGetters, mapMutations, mapActions } from 'vuex'
import store from "../../../_store/index.js";
export default {
  components: {
    dynamicTable
  },
  data() {
    return {
      tableDataTodo: [
        {
          apply_user_classify_no: "fruit-1",
          apply_info: "apple-10",
          huping_info: "banana-10",
          zuping_info: "orange-10"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getStylesConfig: store.namespace + "/getStylesConfig"
    })
  },
  methods: {
      update(){
          console.log(this.getStylesConfig.listStyle.tableTodoHeader);
          
      },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      console.log(val);
    }
  }
};
</script>

<style lang='scss' scoped>
.demo-form-inline .el-form-item {
  margin-bottom: 0px;
}
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
.list-line {
  th,
  div,
  td {
    font-size: 13px !important;
  }
}
</style>
