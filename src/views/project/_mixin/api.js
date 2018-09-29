
import page from "./page";
  
export default {
  mixins: [page],
  methods: {
    getApi(apiName = function() {}, requestData, callback = function() {}) {
      this.loading = true;
      apiName(Object.assign(requestData, this.gatPage())).then(response => {
        this.loading = false;
        if (response.respStatus == "1") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
        }
        this.setData(response);
        callback(response.resBody, this);
      });
    }
  }
};
