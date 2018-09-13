export default {
  methods: {
    getApi(apiName, requestData, callback = function() {}) {
      this.loading = true;
      apiName(Object.assign(requestData, this.gatPage())).then(response => {
        this.loading = false;
        if (response.resBody == "success") {
          return this.$message({
            message: "操作成功",
            type: "success"
          });
        }
        this.setData(response);
        callback(response.resBody);
      });
    }
  }
};
