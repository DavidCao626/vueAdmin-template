<template>
    <div>
        <huping title="学院组评" :dataheader="xyHeradSytle"></huping>
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
      xyHeradSytle: [
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
