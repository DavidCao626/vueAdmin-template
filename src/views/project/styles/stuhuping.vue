<template>
  <div>
    <huping title="班级互评" :dataHeader="hupingHeadSytle">
      <div slot="footer">
        <div class="approval-panel" style="text-align: center;">
          <el-button type="primary" size="mini" @click="subForm">提交</el-button>
        </div>
      </div>

    </huping>
  </div>
</template>

<script>
import huping from "./huping/index";
export default {
  components: {
    huping
  },
  data() {
    return {
      hupingHeadSytle: [
        {
          label: "申请人情况",
          key: "",
          width: "",
          value: "",
          children: [
            {
              label: "姓名",
              key: "label",
              width: ""
            },
            {
              label: "学号",
              key: "code",
              width: ""
            }
          ]
        },
        {
          label: "家庭情况",
          prop: "",
          width: "",
          data: "",
          children: [
            {
              label: "状况",
              key: "jtQk",
              width: ""
            },
            {
              label: "收入",
              key: "jtdesc",
              width: ""
            }
          ]
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let taskCode = to.params.taskCode;
      // ajax初始化灌入数据
      vm.$store.dispatch("initQuuestion", taskCode);
    });
  },
  methods: {
    subForm() {
      this.$store.dispatch("subForm");
    }
  }
};
</script>

<style>
</style>
