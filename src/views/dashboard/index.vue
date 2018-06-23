<template>
  <div class="dashboard">
    <div class="weui-desktop-panel">
      <div class="weui-desktop-home-notice">
        <div class="weui-desktop-home-notice__info">
          <a href="/cgi-bin/announce?action=getannouncement&amp;announce_id=11518228081c7A0o&amp;version=&amp;lang=zh_CN" target="_blank" class="weui-desktop-home-notice__title">
            学工系统文档手册发布
          </a>
        </div>
        <div class="weui-desktop-home-notice__extra">
          <em class="weui-desktop-home-notice__date">2018-02-10</em>
          <a href="/cgi-bin/announcement?t=home/notice&amp;token=2058891718&amp;lang=zh_CN" target="_blank" class="weui-desktop-home-notice__readmore">更多</a>
        </div>
      </div>
    </div>

    <div class="weui-desktop-panel">
      <div class="weui-desktop-home-notice">
        <div class="weui-desktop-home-notice__info">
          <a href="/cgi-bin/announce?action=getannouncement&amp;announce_id=11518228081c7A0o&amp;version=&amp;lang=zh_CN" target="_blank" class="weui-desktop-home-notice__title">
            学工系统文档手册发布
          </a>
        </div>
        <div class="weui-desktop-home-notice__extra">
          <em class="weui-desktop-home-notice__date">2018-02-10</em>
          <a href="/cgi-bin/announcement?t=home/notice&amp;token=2058891718&amp;lang=zh_CN" target="_blank" class="weui-desktop-home-notice__readmore">更多</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  & {
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
