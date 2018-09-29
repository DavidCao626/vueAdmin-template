export default {
  methods: {
    isOk(
      title = "此操作将永久删除该文件, 是否继续?",
      callbackOk,
      callbackNo = () => {}
    ) {
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          callbackOk();
        })
        .catch(() => {
          callbackNo();
        });
    },
    msgBox(title, object, callbackOk, callbackNo = () => {}) {
      this.$prompt(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(object => {
          callbackOk(object);
        })
        .catch(() => {
          callbackNo();
        });
    },
    msgBoxVNode(title, message, callbackOk, callbackNo = () => {}) {
      const h = this.$createElement;
      this.$msgbox({
        title,
        message,
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // beforeClose: (action, instance, done) => {
        //   if (action === "confirm") {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButtonText = "执行中...";
        //     setTimeout(() => {
        //       done();
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // }
      }).then(() => {
        callbackOk();
      });
    }
  }
};
