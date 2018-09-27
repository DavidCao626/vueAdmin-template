<template>
    <div>
        <page :Breadcrumb="false">
            <div slot="title">方案管理</div>
            <div slot="panel">
                <div>
                    <el-dialog title="新建方案" :visible.sync="dialogVisible" width="500px">
                        <el-row>
                            <el-col :span="22">
                                <el-form :model="formInline" label-width="100px">
                                    <el-form-item label="所属学年:">
                                        <el-select v-model="formInline.schoolYearId">
                                            <el-option v-for="item in this.formInline.schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="方案名称">
                                        <el-input v-model="formInline.name" placeholder="请输入方案名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属学历:">
                                        <el-select v-model="formInline.stuType">
                                            <el-option v-for="item in stuTypes" :key="item.dict_key" :label="item.dict_desc" :value="item.dict_key">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <div slot="footer">
                            <el-button type="primary" @click="onSave">确定提交</el-button>
                            <el-button @click="dialogVisible=false">取消</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="编辑方案" :visible.sync="dialogVisibleEdit" width="500px">

                        <el-form :model="formInlineEdit" label-width="100px">
                            <el-form-item label="所属学年:">
                                <el-select v-model="formInlineEdit.schoolYearId">
                                    <el-option v-for="item in this.formInline.schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="方案名称">
                                <el-input v-model="formInlineEdit.name" placeholder="请输入方案名称"></el-input>
                            </el-form-item>
                            <el-form-item label="所属学历:">
                                <el-select v-model="formInlineEdit.stuType">
                                    <el-option v-for="item in stuTypes" :key="item.dict_key" :label="item.dict_desc" :value="item.dict_key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>

                        <div slot="footer">
                            <el-button type="primary" @click="onSaveEdit">保存提交</el-button>
                            <el-button @click="dialogVisibleEdit=false">取消</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="配置方案质条目 " :visible.sync="dialogVisible_todos" width="980px" style="max-hegth:80vh">
                        <div style="overflow: auto;overflow-x: hidden;max-height: 80vh;">
                        </div>
                        <div slot="footer">
                            <el-button type="primary" @click="onSaveTodos">提交保存条目</el-button>
                            <el-button @click="dialogVisible_todos=false">取消</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="拷贝为新副本方案" :visible.sync="dialogVisible_copy" width="500px">

                        <el-form :model="formInlines" label-width="100px">
                            <el-form-item label="新方案学年:">
                                <el-select v-model="formInlines.schoolYearId">
                                    <el-option v-for="item in this.formInline.schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="新方案名称">
                                <el-input v-model="formInlines.name" placeholder="请输入方案名称"></el-input>
                            </el-form-item>
                            <el-form-item label="所属学历:">
                                <el-select v-model="formInlines.stuType">
                                    <el-option v-for="item in stuTypes" :key="item.dict_key" :label="item.dict_desc" :value="item.dict_key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>

                        <div slot="footer">
                            <el-button type="primary" @click="onSaveCopy">保存提交</el-button>
                            <el-button @click="dialogVisible_copy=false">取消</el-button>
                        </div>
                    </el-dialog>

                    <elx-table-layout>

                        <template slot="headerLeft">
                            <el-form :inline="true" size="small">
                                <el-form-item label="所属学年:">
                                    <el-select v-model="schoolYearId" placeholder="全部">
                                        <el-option v-for="item in schoolYearDict" :key="item.value" :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="方案名称:">
                                    <el-input v-model="name" placeholder="全部"></el-input>
                                </el-form-item>
                                <el-form-item label="所属学历:">
                                    <el-select v-model="stuType" placeholder="全部">
                                        <el-option v-for="item in stuTypes" :key="item.dict_key" :label="item.dict_desc" :value="item.dict_key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :loading="loading" @click="onSubmit">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </template>

                        <template slot="headerRight">
                            <el-button @click="add" size="small" type="primary">新建扩展素质方案</el-button>
                        </template>

                        <el-table v-loading="loading" :row-class-name="tableRowClassName" :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'name', prop: 'createTime',prop: 'effectTime', prop: 'state'}" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="38" v-if="deleteOpen">
                            </el-table-column>

                            <el-table-column prop="name" sortable label="方案名称">
                            </el-table-column>
                            <el-table-column prop="stuType" sortable label="学生类型" :formatter="dataStuType">
                            </el-table-column>
                            <el-table-column prop="schoolYearName" sortable label="所属学年">
                            </el-table-column>
                            <el-table-column prop="createTime" sortable label="创建日期" :formatter="dateFormat">
                            </el-table-column>

                            <el-table-column prop="orgName" label="组织名称">
                            </el-table-column>
                            <el-table-column prop="lastUpdateTime" sortable label="最后更新时间" :formatter="dateFormat">
                            </el-table-column>

                            <el-table-column label="操作" width="305px">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.state === 'EF'">
                                        <el-button size="small" type="text" @click="handleSeeTodos(scope.$index, scope.row)">
                                            <i class="el-icon-view"></i>&nbsp;&nbsp;查看配置</el-button>
                                        <el-button size="small" type="text" @click="handleCopy(scope.$index, scope.row)">
                                            <i class="el-icon-document"></i>&nbsp;&nbsp;拷贝为方案副本</el-button>
                                    </div>
                                    <el-button-group v-else>
                                        <el-button size="mini" plain @click="handleTodos(scope.$index, scope.row)">
                                            <i class="el-icon-setting"></i> 配置</el-button>

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
import elxTable from "../_mixin/elxTable.js";
import scheme from "../_mixin/scheme.js";
import expandEval from "../_mixin/expandEval.js";
import config from "./index";

export default {
  components: {
    config
  },
  mixins: [elxTable, expandEval, scheme],
  data() {
    return {
      dialogVisibleEdit: false,
      dialogVisible_todos: false,
      dialogVisible_copy: false,
      dialogVisible: false,
      dialogVisiblePl: false,
      importOpen: false,

      schoolYearDict: [],
      schoolYearId: "",
      name: "",
      formItems: {
        schoolYear: "2017",
        enddate: "",
        name: "",
        describe: ""
      },

      formInline: {
        stuType: "",
        schoolYearDict: [],
        schoolYearId: "",
        name: ""
      },

      formInlines: {
        id: 0,
        stuType: "",
        schoolYearId: "",
        name: ""
      },
      formInlineEdit: {
        stuType: "",
        schoolYearId: "",
        name: "",
        id: 0
      },
      todosdata: [],
      formtodos: {
        id: 0
      },
      todoIsRuning: false,
      stuType: "",
      stuTypes: []
    };
  },
  watch: {
    formInline: {
      handler: function(val, oldVal) {
        if (
          oldVal.schoolYearId == "" ||
          oldVal.schoolYearId == null ||
          oldVal.schoolYearId == 0
        ) {
          return;
        }
        this.getApi(
          this.processPunishName,
          { schoolYearId: oldVal.schoolYearId },
          res => {
            val.name = res.name;
          }
        );
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
          oldVal.schoolYearId == "" ||
          oldVal.schoolYearId == null ||
          oldVal.schoolYearId == 0
        ) {
          return;
        }

        if (val.name.length > 0) {
          return;
        }
        this.getApi(
          this.processSchemeName,
          { schoolYearId: oldVal.schoolYearId },
          res => {
            val.name = res.name;
          }
        );
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSchoolYearDict();
      vm.getData();
    });
  },
  methods: {
    dataStuType: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      if (this.stuTypes.length == 0) {
        return;
      }
      let a = this.stuTypes.find(e => {
        return e.dict_key == date;
      }).dict_desc;
      return a;
      //moment(date).format("YYYY年MM月DD日");
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.state !== "DR") {
        return "success-row";
      }
      return "";
    },
    handleSeeTodos(index, row) {
      // this.todoIsRuning = true;
      // this.dialogVisible_todos = true;
      this.formtodos.id = row.id;

      this.$router.push({ path: "/zongceV2/fangan?id=" + row.id });
      //   this.getEvalItemBeanBySchemeId({
      //     id: row.id
      //   }).then(res => {
      //     let arr = [];
      //     if (!res.resBody) {
      //       return (this.todosdata = arr);
      //     }
      //     this.todosdata = res.resBody.list;
      //   });
    },
    handleTodos(index, row) {
      //this.todoIsRuning = false;
      //this.dialogVisible_todos = true;
      //this.formtodos.id = row.id;

      this.$router.push({ path: "/zongceV2/fangan?id=" + row.id });
      //   this.getEvalItemBeanBySchemeId({
      //     id: row.id
      //   }).then(res => {
      //     let arr = [];
      //     if (!res.resBody) {
      //       return (this.todosdata = arr);
      //     }
      //     this.todosdata = res.resBody.list;
      //   });
    },
    handleCopy(index, row) {
      this.dialogVisible_copy = true;
      this.formInlines.id = row.id;
    },
    handleRun(index, row) {
      this.isOk("启动生效后将不能编辑删除信息，是否继续？", () => {
        this.getApi(this.startScheme, {
          punishId: row.id
        });
      });
      this.getData();
    },
    handleEdit(index, row) {
      this.dialogVisibleEdit = true;
      this.formInlineEdit.id = row.id;
      this.formInlineEdit.name = row.name;
      this.formInlineEdit.schoolYearId = row.schoolYearId;
    },
    onSaveTodos() {
      this.saveExEveluateBean({
        schemeId: this.formtodos.id,
        expandEvalBean: { list: this.todosdata }
      }).then(res => {
        this.$message.success("保存成功！");
        this.dialogVisible_todos = false;
      });
    },
    onSaveCopy() {
      this.getApi(
        this.copyScheme,
        {
          punishId: this.formInlines.id,
          name: this.formInlines.name,
          schoolYearId: this.formInlines.schoolYearId
        },
        (res, vm) => {
          vm.dialogVisible_copy = false;
          this.$message.success("拷贝成功！");
          vm.getData();
        }
      );
    },
    onSaveEdit() {
      this.getApi(
        this.updateScheme,
        {
          name: this.formInlineEdit.name,
          schoolYearId: this.formInlineEdit.schoolYearId,
          id: this.formInlineEdit.id
        },
        (res, vm) => {
          vm.dialogVisibleEdit = false;
          vm.$message({
            type: "success",
            message: "更新成功!"
          });
          vm.getData();
        }
      );
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.getApi(this.deleteScheme, { schemeId: row.id }, (res, vm) => {
          if (res) {
            vm.$message({
              type: "success",
              message: "删除成功!"
            });
            vm.getData();
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
    getData() {
      this.data = [];
      this.getApi(this.querySchemeList, {
        schoolYearId: this.schoolYearId,
        name: this.name,
        stuType: this.stuType
      });
    },
    onSave() {
      this.getApi(
        this.insertScheme,
        {
          name: this.formInline.name,
          schoolYearId: this.formInline.schoolYearId
        },
        function(resBody, vm) {
          vm.formInline["name"] = "";
          vm.dialogVisible = false;

          vm.getData();
        }
      );
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
    getDict(key, callback) {
      this.getDictByDictNames({ dicts: [key] }).then(response => {
        callback(response.resBody);
      });
    },
    getSchoolYearDict() {
      this.querySchoolYearDict({}).then(response => {
        this.loading = false;
        this.schoolYearDict = response.resBody;
        this.schoolYearDict.unshift({ id: 0, name: "全部" });
        let a = response.resBody.shift();
        this.formInline.schoolYearDict = response.resBody;
        this.getDict("study_degree_code", body => {
          this.stuTypes = body["study_degree_code"];
          this.loading = false;
          this.getData();
        });
      });
    }
  }
};
</script>
<style >
.el-table .success-row {
  background: #f0f9eb;
}
</style>
