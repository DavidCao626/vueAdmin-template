 <template>
    <page :Breadcrumb="false">
        <div slot="title">我的排名查询</div>
        <div slot="panel">
            <div>
                <el-dialog title="导入数据" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
                    <el-upload class="upload-demo" drag :action="action" :limit='1' @onSuccess="onUploadSuccess">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传xlx/xlsx</div>
                    </el-upload>
                </el-dialog>

                <elx-table-layout>
                    <template slot="headerRight">
                        <el-button-group>
                            <el-tooltip class="item" effect="dark" content="导入数据" placement="bottom" v-if="importOpen">
                                <el-button plain size="mini" @click="dialogVisible = true">
                                    <i class="el-icon-download"></i>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="导出数据" placement="bottom" v-if="exportOpen">
                                <el-button plain size="mini" @click="onExportExcel">
                                    <i class="el-icon-upload2"></i>
                                </el-button>
                            </el-tooltip>
                        </el-button-group>
                    </template>

                    <template slot="headerLeft">
                        <span v-if="deleteOpen && isMultipleSelection">
                            <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 1px;margin-right: 20px;">
                                <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                            </el-button>
                        </span>
                        <el-form label-position="left" :inline="true" :model="formInline" size="mini" label-width="80px" class="demo-form-inline">
                            <el-form-item label="筛选学科:">
                                <el-input v-model="formInline.user" placeholder="所属学年等"></el-input>
                            </el-form-item>
                            <el-form-item label="所属学年:">
                                <el-input v-model="formInline.user" placeholder="学号"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </template>

                    <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="38" v-if="deleteOpen">
                        </el-table-column>

                        <el-table-column prop="name" sortable label="学生姓名">
                        </el-table-column>
                        <el-table-column prop="date" sortable label="学号">
                        </el-table-column>

                        <el-table-column prop="address" label="所属学年">
                        </el-table-column>
                        <el-table-column prop="address" label="分值">
                        </el-table-column>

                        <!-- <el-table-column type="expand" label="#" width="42">
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
                        </el-table-column> -->
                    </el-table>

                    <template slot="footer">
                        <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                        </el-pagination>
                    </template>

                </elx-table-layout>
            </div>
        </div>
    </page>

</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中

      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      newOpen: false,
      data: [
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
      formInline: {
        user: "",
        region: ""
      },
      action: "https://jsonplaceholder.typicode.com/posts/"
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log("submit!");
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

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline {
  display: inline !important;
}
</style>