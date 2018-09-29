export default {
  data: function() {
    return {
      multipleSelection: [], //选中的值
      isMultipleSelection: false //是否选中
    };
  },
  methods: {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },

  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  }
};
