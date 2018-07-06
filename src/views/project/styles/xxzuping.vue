<template>
    <div>
        <huping title="学校组评" :dataheader="xxHeradSytle"></huping>
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
              key: "cname",
              width: ""
            },
            {
              label: "学号",
              key: "cid",
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
  }
};
</script>

<style>
</style>
