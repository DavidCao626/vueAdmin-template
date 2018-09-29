export default {
  data: function() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      }
    };
  },
  methods: {
    gatPage() {
      if (this.pageInfo.currentPage && this.pageInfo.pageSize) {
        return {
          currentPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        };
      }
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
    }
  }
};
