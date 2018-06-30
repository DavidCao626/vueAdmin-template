export const styles = {
  config: {
    listStyle: {
      tableTodoHeader: [
        {
          label: "申请人信息",
          prop: "huping_info",
          checked: true,
          children: [
            {
              label: "姓名",
              width: 100,
              prop: "apply_user_id"
            },
            {
              label: "学号",
              width: 160,
              prop: "apply_user_org"
            },
            {
              label: "所在班级",
              width: 200,
              prop: "apply_user_org"
            }
          ]
        },
        {
          label: "家庭信息",
          prop: "bjhp",
          checked: true,
          children: [
            {
              label: "家庭人口",
              width: 100,
              prop: "bjhpY.selectionNum"
            },
            {
              label: "家庭情况",
              width: 100,
              prop: "bjhpN.selectionNum"
            },
            {
              label: "是否低保",
              width: 100,
              prop: "bjhpN.selectionNum"
            },
            {
              label: "是否建档立卡",
              width: 120,
              prop: "bjhpN.selectionNum"
            }
          ]
        },
        {
          label: "申请信息",
          checked: true,
          prop: "xzpi",
          children: [
            { label: "申请等级", width: 119, prop: "xzpyY.selectionNum" }
          ]
        },
        {
          label: "班级评审情况",
          checked: false,
          prop: "spqk",
          children: [
            { label: "推荐结果", width: 80, prop: "examine_status" },
            { label: "推荐人职务", width: 180, prop: "examine_user_id" }
          ]
        },
        {
          label: "学院评审情况",
          checked: true,
          prop: "spqk1",
          children: [
            { label: "推荐结果", width: 80, prop: "examine_status" },
            { label: "推荐人职务", width: 180, prop: "examine_user_id" }
          ]
        }
      ]
    }
  }
};
