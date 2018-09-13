<template>
  <div>
    <page>
      <div slot="title">学生处分方案管理</div>
      <div slot="panel">
        <div>
          <el-dialog title="新建处分方案" :visible.sync="dialogVisible" width="500px">
            <el-form :model="formInline" class="demo-form-inline" label-width="100px">
              <el-form-item label="所属学年">
                <el-input v-model="formInline.name" placeholder="请输入学年名称"></el-input>
              </el-form-item>
              <el-form-item label="创建日期">
                <el-date-picker v-model="formInline.begindate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="生效日期">
                <el-date-picker v-model="formInline.enddate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="方案编号">
                <el-input v-model="formInline.describe" placeholder="请输入简称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">确定提交</el-button>
                <el-button @click="dialogVisible=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog title="编辑处分方案" :visible.sync="dialogVisibleEdit" width="500px">

            <el-form :model="formInline" class="demo-form-inline" label-width="100px">
              <el-form-item label="开始日期">
                <el-date-picker v-model="formInlineEdit.begindate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束日期">
                <el-date-picker v-model="formInlineEdit.enddate" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="学年名称">
                <el-input v-model="formInlineEdit.name" placeholder="请输入学年名称"></el-input>
              </el-form-item>
              <el-form-item label="学年简称">
                <el-input v-model="formInlineEdit.describe" placeholder="请输入简称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSaveEdit">保存提交</el-button>
                <el-button @click="dialogVisibleEdit=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog title="配置方案处分条目" :visible.sync="dialogVisible_todos" width="880px" style="max-hegth:50vh">
            <div style="overflow: auto;overflow-x: hidden;max-height: 50vh;">

              <todos></todos>
            </div>
            <div slot="footer">
              <el-button type="primary">提交配置</el-button>
              <el-button @click="dialogVisible_todos=false">取消</el-button>
            </div>
          </el-dialog>

          <elx-table-layout>

            <template slot="headerLeft">
              <el-button @click="add" size="small" type="primary">新建处分方案</el-button>
            </template>

            <el-table v-loading="loading" :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address', prop: 'startTime'}" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="38" v-if="deleteOpen">
              </el-table-column>
              <el-table-column prop="startTime" sortable label="方案编号" :formatter="dateFormat">
              </el-table-column>
              <el-table-column prop="endTime" label="方案名称" :formatter="dateFormat">
              </el-table-column>
              <el-table-column prop="endTime" label="方案的状态" :formatter="dateFormat">
              </el-table-column>
              <el-table-column prop="name" sortable label="所属学年">
              </el-table-column>
              <el-table-column prop="shortName" sortable label="生效日期">
              </el-table-column>

              <el-table-column prop="createUserLogin" label="所属的学院">
              </el-table-column>

              <el-table-column label="操作" width="305px">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button size="mini" plain @click="handleTodos(scope.$index, scope.row)">
                      <i class="el-icon-setting"></i> 配置</el-button>
                    <el-button size="mini" plain @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-caret-right"></i> 启动</el-button>
                    <!-- <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">拷贝</el-button> -->
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                      <i class="el-icon-edit-outline"></i> 编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">
                      <i class="el-icon-delete"></i> 删除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>

            </el-table>

            <template slot="footer">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
              </el-pagination>
            </template>

          </elx-table-layout>
        </div>
      </div>
    </page>
  </div>
</template>
<script>
import moment from "moment";
import todos from "./_components/todosManagement";

import elxTable from "../_mixin/elxTable.js";
import store1 from "../_mixin/store.js";
export default {
  mixins: [elxTable, store],
  components: {
    todos
  },
  data() {
    return {
      dialogVisibleEdit: false,
      dialogVisible_todos: false,
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中

      dialogVisible: false,
      dialogVisiblePl: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      newOpen: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      data: [],
      formItems: {
        schoolYear: "2017",
        enddate: "",
        name: "",
        describe: ""
      },

      formInline: {
        begindate: "",
        enddate: "",
        name: "",
        describe: ""
      },
      formInlines: {
        begindate: "",
        enddate: "",
        num: 1,
        name: "",
        describe: ""
      },
      formInlineEdit: {
        id: 0,
        begindate: "",
        enddate: "",
        name: "",
        describe: ""
      },
      loading: true
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    },
    formInline: {
      handler: function(val, oldVal) {
        if (
          oldVal.begindate == "" ||
          oldVal.enddate == "" ||
          oldVal.begindate == null ||
          oldVal.enddate == null
        ) {
          return;
        }
        if (
          new Date(Date.parse(oldVal.enddate)) <=
          new Date(Date.parse(oldVal.begindate))
        ) {
          this.$message.error("结束日期必须大于开始日期");
          return (val.enddate = "");
        }

        var requestData = {
          startTime: Date.parse(val.begindate),
          endTime: Date.parse(val.enddate)
        };
        this.getSchoolYearName(requestData).then(response => {
          console.log(["getSchoolYearName", response]);
          var res = response.resBody;
          val.name = res.name;
          val.describe = res.shortName;
        });
      },
      deep: true
    },
    formInlineEdit: {
      handler: function(val, oldVal) {
        if (
          oldVal.begindate == "" ||
          oldVal.enddate == "" ||
          oldVal.begindate == null ||
          oldVal.enddate == null
        ) {
          return;
        }
        if (
          new Date(Date.parse(oldVal.enddate)) <=
          new Date(Date.parse(oldVal.begindate))
        ) {
          this.$message.error("结束日期必须大于开始日期");
          return (val.enddate = "");
        }

        var requestData = {
          startTime: Date.parse(val.begindate),
          endTime: Date.parse(val.enddate)
        };
        this.getSchoolYearName(requestData).then(response => {
          console.log(["getSchoolYearName", response]);
          var res = response.resBody;
          val.name = res.name;
          val.describe = res.shortName;
        });
      },
      deep: true
    },
    formInlines: {
      handler: function(val, oldVal) {
        if (
          val.begindate == "" ||
          val.begindate == NaN ||
          val.enddate == NaN ||
          val.enddate == ""
        ) {
          return;
        }
        if (
          new Date(Date.parse(val.enddate)) <=
          new Date(Date.parse(val.begindate))
        ) {
          this.$message.error("结束日期必须大于开始日期");
          return (val.enddate = "");
        }
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getData();
    });
  },
  methods: {
    ...mapActions({
      getSchoolYearName: store.namespace + "/getSchoolYearName",
      insertSchoolYear: store.namespace + "/insertSchoolYear",
      querySchoolYear: store.namespace + "/querySchoolYear",
      updateSchoolYear: store.namespace + "/updateSchoolYear",
      insertBatchSchoolYear: store.namespace + "/insertBatchSchoolYear",
      deleteSchoolYear: store.namespace + "/deleteSchoolYear"
    }),
    handleTodos(index, row) {
      this.dialogVisible_todos = true;
    },
    handleEdit(index, row) {
      this.dialogVisibleEdit = true;
      this.formInlineEdit.begindate = row.startTime;
      this.formInlineEdit.enddate = row.endTime;
      this.formInlineEdit.name = row.name;
      this.formInlineEdit.describe = row.shortName;
      this.formInlineEdit.id = row.id;
      console.log(index, row);
    },
    onSaveEdit() {
      var requestData = {
        startTime: Date.parse(this.formInlineEdit.begindate),
        endTime: Date.parse(this.formInlineEdit.enddate),
        name: this.formInlineEdit.name,
        shortName: this.formInlineEdit.describe,
        id: this.formInlineEdit.id
      };
      this.updateSchoolYear(requestData).then(response => {
        var res = response.resBody;
        if (res) {
          this.dialogVisibleEdit = false;
          this.$message({
            type: "success",
            message: "更新成功!"
          });
          this.getData();
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var requestData = {
          id: row.id
        };
        this.deleteSchoolYear(requestData).then(response => {
          var res = response.resBody;
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getData();
          }
        });
      });
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY年MM月DD日");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageInfo.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageInfo.currentPage = val;
      this.getData();
    },
    getData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      //查询数据的方法
      this.querySchoolYear(requestData).then(response => {
        this.loading = false;
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    onSave() {
      var requestData = {
        startTime: Date.parse(this.formInline.begindate),
        endTime: Date.parse(this.formInline.enddate),
        name: this.formInline.name,
        shortName: this.formInline.describe
      };
      this.insertSchoolYear(requestData).then(response => {
        console.log(["insertSchoolYear", response]);
        var res = response.resBody;
        if (res) {
          this.$message.success("添加成功");
          this.dialogVisible = false;
          for (let key in this.formInline) {
            this.formInline[key] = "";
          }
          this.getData();
        }
      });
    },
    onSavePL() {
      var requestData = {
        startTime: Date.parse(this.formInlines.begindate),
        endTime: Date.parse(this.formInlines.enddate),
        numbers: this.formInlines.num
      };
      this.insertBatchSchoolYear(requestData).then(response => {
        var res = response.resBody;
        if (res) {
          this.$message.success("添加成功");
          this.dialogVisiblePl = false;
          this.getData();
          this.formInlines.begindate = "";
          this.formInlines.enddate = "";
          this.formInlines.num = 1;
        }
      });
    },
    handleCommand(command) {
      if (command == "adds") {
        this.dialogVisiblePl = true;
      }
    },
    add() {
      this.dialogVisible = true;
    },
    onSubmitPL() {
      this.dialogVisiblePL = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onMultipleSelectionDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$emit("onSelectionDel", this.multipleSelection);
      });
    },
    onExportExcel() {
      this.$emit("onExportExcel");
    },
    onUploadSuccess() {
      this.$emit("onUploadSuccess");
    },
    onNew() {
      this.$emit("onNew");
    }
  }
};
</script>

<style lang="scss" scoped>
.page-component__scroll {
  height: 50vh;

  .el-scrollbar__bar {
    display: none;
  }
}
</style>