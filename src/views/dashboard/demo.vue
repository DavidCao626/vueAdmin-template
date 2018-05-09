<template>
    <page>
        <div slot="title">自定义表格</div>
        <div slot="panel">
            <div class="table">
                <div class="table-header">

                </div>
                <div class="table-body">
                    <el-table :data="tableData" style="width: 100%" size="medium" :stripe='false' highlight-current-row @current-change="handleCurrentChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="date" label="日期" width="150">
                        </el-table-column>
                        <el-table-column label="配送信息">
                            <el-table-column prop="name" label="姓名" width="120">
                            </el-table-column>
                            <el-table-column label="地址">
                                <el-table-column prop="province" label="省份" width="120">
                                </el-table-column>
                                <el-table-column prop="city" label="市区" width="120">
                                </el-table-column>
                                <el-table-column prop="address" label="地址" width="300">
                                </el-table-column>
                                <el-table-column prop="zip" label="邮编" width="120">
                                </el-table-column>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </div>
    </page>
</template>
<script>
export default {
  name: "dataTable",
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dataSource: [
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          address: "西湖区湖底公园1号"
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 42,
          address: "西湖区湖底公园1号"
        }
      ],

      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age"
        },
        {
          title: "住址",
          dataIndex: "address",
          key: "address"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.el-table .warning-row {
  //background: oldlace;
}

.el-table .success-row {
  //background: #f0f9eb;
}
</style>
