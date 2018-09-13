import multipleSelection from "./multipleSelection";
import page from "./page";
import api from "./api";
export default {
  mixins: [multipleSelection, page, api],
  data: function() {
    return {
      dialogVisible: false,
      deleteOpen: false,
      importOpen: true,
      exportOpen: false,
      newOpen: false,
      data: [],
      action: "https://jsonplaceholder.typicode.com/posts/",
      loading: true
    };
  },
  methods: {
    onExportExcel() {
      this.$emit("onExportExcel");
    },
    onUploadSuccess(response, file, fileList) {
      this.importForm.urlPath = response.body.resBody.fileId;
    },
    onNew() {
      this.$emit("onNew");
    },
    gatPage() {
      if (this.pageInfo.currentPage && this.pageInfo.pageSize) {
        return {
          currentPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        };
      }
    },
    setData(response) {
      if (response.resBody.baseData && response.resBody.pageInfo) {
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      }
    }
  }
};
