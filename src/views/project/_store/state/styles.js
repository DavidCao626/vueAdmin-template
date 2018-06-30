export const styles = {
  config: {
    listStyle: {
      data: [
        {
          id: 0,
          name: "乌兰巴布尔",
          cid: "13123132",
          jtNumber: "3",
          jtQk: "单亲",
          jtisDb: "是",
          jtisjdlk: "是",
          jtsr: "3000",
          jtzc: "2800",
          sqType: "贫困建档",
          shenqin: "特殊困难",
          banjipingshen: "123",
          huping: "hao",
          zuping: "1"
        }
      ],
      tableTodoHeader: [
        {
          label: "申请人信息",
          prop: "shenqinren",
          checked: true,
          children: [
            { label: "姓名",  prop: "name" },
            { label: "学号",  prop: "cid" }
          ]
        },
        {
          label: "家庭情况信息",
          prop: "jiating",
          checked: true,
          children: [
            { label: "家庭人数", prop: "jtNumber" },
            { label: "家庭情况",  prop: "jtQk" },
            { label: "是否低保",  prop: "jtisDb" },
            { label: "是否建档立卡", prop: "jtisjdlk" },
            { label: "人均月收入",  prop: "jtsr" },
            { label: "人均月支出",  prop: "jtzc" }
          ]
        },
        { label: "申请信息", checked: true, prop: "shenqin", width: 80 },
        { label: "互评结果", checked: true, prop: "huping" },
        { label: "组评结果", checked: true, prop: "zuping" },
        // {
        //   label: "班级评审情况",
        //   checked: true,
        //   prop: "banjipingshen"
        // }
      ]
    }
  }
};
