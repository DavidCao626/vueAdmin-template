<template>
  <div>
    <huping title="学校组评" :dataHeader="xxHeradSytle">

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
      xxHeradSytle: [
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
  }
};
</script>

<style>
</style>
