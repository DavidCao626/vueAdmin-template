<template>
    <page>
        <div slot="title">
            学生信息管理
        </div>
        <elx-table deleteOpen importOpen exportOpen newOpen :data="tableData">
            <template slot="headerLeft">
                <el-form :inline="true" :model="formInline" size="mini" class="demo-form-inline">
                    <el-form-item label="学号:">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </template>
            <template slot="tableHeader">
                <el-table-column prop="date" sortable label="姓名">
                </el-table-column>
                <el-table-column prop="name" sortable label="学号">
                </el-table-column>
                <el-table-column prop="address" label="性别">
                </el-table-column>
                <el-table-column prop="address" label="民族">
                </el-table-column>
                <el-table-column prop="address" label="入学日期">
                </el-table-column>
                <el-table-column prop="address" label="是否应届毕业生">
                </el-table-column>
                <el-table-column prop="address" label="最后修改时间">
                </el-table-column>
                <el-table-column prop="address" label="审核状态">
                </el-table-column>
            </template>

            <template slot="tableOperation">
                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>详情12</el-dropdown-item>
                                <el-dropdown-item>任职2</el-dropdown-item>
                                <el-dropdown-item>审核2</el-dropdown-item>
                                <el-dropdown-item>删除2</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </template>

            <template slot="tableMore">
                <el-table-column type="expand" label="#" width="42">
                    <template slot-scope="props" style="background-color:#f7f8f9">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="身份证号码:">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="高考成绩:">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="备注资料:">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
            </template>
             <template slot="footer">
                <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                </el-pagination>
            </template>
        </elx-table>
    </page>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
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
      ]
    };
  },
  methods: {
    onSubmit() {
      alert("查询数据按钮触发");
    }
  }
};
</script>

<style scoped>
</style>
