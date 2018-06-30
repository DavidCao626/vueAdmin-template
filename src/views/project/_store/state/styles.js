export const styles = {
  config: {
    listStyle: {
      tableTodoHeader: [
        {
          label: "申请人信息",
          prop: "shenqinren",
          checked: true,
          children: [
            { label: "姓名", width: 100, prop: "name" },
            { label: "学号", width: 160, prop: "cid" },
            { label: "联系电话", width: 200, prop: "phone", style: "line" },
            { label: "所在班级", width: 200, prop: "class" }
          ]
        },
        {
          label: "家庭情况信息",
          prop: "jiating",
          checked: true,
          children: [
            { label: "家庭人数", width: 100, prop: "jtNumber" },
            { label: "家庭情况", width: 100, prop: "jtQk" },
            { label: "是否低保", width: 100, prop: "jtisDb" },
            { label: "是否建档立卡", width: 120, prop: "jtisjdlk" },
            { label: "人均月收入", width: 200, prop: "jtsr", style: "line" },
            { label: "人均月支出", width: 200, prop: "jtzc", style: "line" }
          ]
        },
        {
          label: "申请信息",
          checked: true,
          prop: "shenqin",
          children: [
            { label: "申请类别", width: 119, prop: "sqType", style: "line" },
            { label: "申请等级", width: 119, prop: "sqdengji" },
            { label: "申请理由", width: 119, prop: "sqLiyou", style: "line" },
            {
              label: "申请附件",
              width: 119,
              prop: "sqFujian",
              style: "line",
              children: [
                { label: "附件名", width: 119, prop: "name", style: "line" },
                { label: "地址", width: 119, prop: "url", style: "line" }
              ]
            }
          ]
        },
        {
          label: "班级评审情况",
          checked: false,
          prop: "banjipingshen",
          children: [
            { label: "推荐结果", width: 80, prop: "classJieguo" },
            {
              label: "推荐人",
              width: 180,
              prop: "classTujianRen",
              style: "line"
            },
            { label: "推荐人职务", width: 180, prop: "classTujianRenZhiwu" },
            {
              label: "学院评议总参与人员数",
              width: 180,
              prop: "classPingYiCountNumber",
              style: "line"
            },
            { label: "支持", width: 180, prop: "classPingYiOk", style: "line" },
            { label: "反对", width: 180, prop: "classPingYiNo", style: "line" }
          ]
        },
        {
          label: "学院评审情况",
          checked: true,
          prop: "xueyuanpingshen",
          children: [
            { label: "推荐结果", width: 80, prop: "xueyuanJieguo" },
            {
              label: "推荐人",
              width: 180,
              prop: "xueyuanTujianRen",
              style: "line"
            },
            { label: "推荐人职务", width: 180, prop: "xueyuanTujianRenZhiwu" },
            {
              label: "学院评议总参与人员数",
              width: 180,
              prop: "xueyuanPingYiCountNumber",
              style: "line"
            },
            {
              label: "支持",
              width: 180,
              prop: "xueyuanPingYiOk",
              style: "line"
            },
            {
              label: "反对",
              width: 180,
              prop: "xueyuanPingYiNo",
              style: "line"
            }
          ]
        }
      ]
    }
  }
};
