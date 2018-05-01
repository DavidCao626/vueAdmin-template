<template>
  <page>
    <div slot="title">项目管理</div>
    <div slot="panel" class="panel">
      <div class="panel-control">
        <div class="panel-control__float-right">
          <router-link to="/task/addTaskProject">
            <el-button type="primary" icon="el-icon-plus">新建项目</el-button>
          </router-link>
        </div>
        <div class=""></div>
      </div>

      <div class="panel-body">
        <customTreeTable></customTreeTable>
      </div>
      <br/>
      <div class="panel-body">
        <transfer :data="data" v-model="value" :transferHeight="300" :titles="['数据列1', '数据列2']" filterable :valueItems="valueItem">

          <span slot="operation-slot">
            <el-button type="primary" size="small" @click="saveBlock">保存提交</el-button>
          </span>
        </transfer>
      </div>
    </div>

  </page>
</template>
<script>
import customTreeTable from "./components/customTreeTable";
import transfer from "./components/transfer";
const generateData = _ => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`
    });
  }
  return data;
};
const generateData2 = _ => {
  const data = [];
  for (let i = 16; i <= 25; i++) {
    data.push({
      key: i,
      label: `用户 ${i}`
    });
  }
  return data;
};
export default {
  components: {
    customTreeTable,
    transfer
  },
  data() {
    return {
      data: generateData(),
      valueItem: [
        //加载编辑时拉去服务器的加载项
        {
          key: 1,
          label: `备选项 1`
        }
      ],
      value: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      }
    };
  },
  methods: {
    data2() {
      this.data = generateData2();
    },
    saveBlock: function() {
      console.log(this.valueItem);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
