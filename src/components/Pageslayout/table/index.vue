<template>
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

        <div class="approval-panel ">
            <div style="float: right;margin-top: 4px;">
                <el-button-group>
                    <slot name="haederRight"></slot>

                    <el-tooltip class="item" effect="dark" content="新增项" placement="bottom" v-if="newOpen">

                        <el-button plain size="mini" @click="onNew">
                            <i class="el-icon-plus"></i>
                        </el-button>

                    </el-tooltip>

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
            </div>
            <span v-if="deleteOpen && isMultipleSelection">
                <el-button plain @click="onMultipleSelectionDel" size="mini" style="margin-top: 5px;margin-right: 20px;">
                    <i class="el-icon-delete"> ({{ multipleSelection.length }})</i>
                </el-button>
            </span>
            <slot name="headerLeft"></slot>
            <div style="clear: none;height: 50px;" v-if="!$slots.headerLeft"></div>
            <div>
                <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="38" v-if="deleteOpen">
                    </el-table-column>

                    <slot name="tableHeader">

                    </slot>
                    <slot name="tableOperation">

                    </slot>
                    <slot name="tableMore"></slot>

                </el-table>
            </div>
            <div style="margin-top: 10px;">

                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    deleteOpen: {
      type: Boolean,
      default: false
    },
    importOpen: {
      type: Boolean,
      default: false
    },
    exportOpen: {
      type: Boolean,
      default: false
    },
    newOpen: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        [];
      }
    },
    action:{
        type:String,
        default:'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  data() {
    return {
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中

      dialogVisible: false
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
      this.$confirm("此操作将永久删除该学生数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         this.$emit("onSelectionDel",this.multipleSelection);
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
.approval-panel {
  padding: 15px;
  margin-bottom: 0px;
  background-color: #ffffff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
