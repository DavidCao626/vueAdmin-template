import multipleSelection from "./multipleSelection";
import page from "./page";
import api from "./api";
import navigation from "./navigation";
export default {
  mixins: [multipleSelection, page, api, navigation],
  data: function() {
    return {
      dialogVisible: false,
      deleteOpen: false,
      importOpen: true,
      exportOpen: false,
      newOpen: false,
      data: [],
      action: "https://jsonplaceholder.typicode.com/posts/",
      loading: true,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
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
  
    setData(response) {
      if (response.resBody.baseData && response.resBody.pageInfo) {
        this.data = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      }
    },
    onSubmit() {
      this.getData();
    }
  }
};
