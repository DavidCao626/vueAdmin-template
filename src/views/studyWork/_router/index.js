// export const zongceRouter = {
//   path: "/zongce", //redirect: "/zongce/index",
//   name: "综测",
//   component: () => import("../index.vue"),
//   meta: { title: "新建综测计划模版", icon: "example", hidden: true }
// };

export const studyWorkRouter = {
  path: "/studyWork",
  name: "勤工俭学",
  redirect: "/studyWork/baseTable",
  component: () => import("../_layout/layout.vue"),
  meta: { title: "勤工俭学", icon: "example", hidden: true },
  children: [
    {
      path: "baseTable",
      name: "baseTable",
      component: () => import("../baseTable.vue"),
      meta: { title: "勤工俭学测试页面", icon: "example", hidden: true }
    },
    {
      path: "jobManager",
      name: "jobManager",
      component: () => import("../jobManager.vue"),
      meta: { title: "岗位管理", icon: "example", hidden: true }
    },
    {
      path: "publishJob",
      name: "publishJob",
      component: () => import("../publishJob.vue"),
      meta: { title: "岗位信息", icon: "example", hidden: true }
    },
    {
      path: "jobApplyRecord",
      name: "jobApplyRecord",
      component: () => import("../jobApplyRecord.vue"),
      meta: { title: "岗位申请", icon: "example", hidden: true }
    },
    {
      path: "resumeDetail",
      name: "resumeDetail",
      component: () => import("../resumeDetail.vue"),
      meta: { title: "简历信息", icon: "example", hidden: true }
    },
    {
      path: "resumeManager",
      name: "resumeManager",
      component: () => import("../resumeManager.vue"),
      meta: { title: "简历管理", icon: "example", hidden: true }
    },
    {
      path: "allowApplyJob",
      name: "allowApplyJob",
      component: () => import("../allowApplyJob.vue"),
      meta: { title: "岗位申请", icon: "example", hidden: true }
    },
    {
      path: "applyRecordManager",
      name: "applyRecordManager",
      component: () => import("../applyRecordManager.vue"),
      meta: { title: "申请记录管理", icon: "example", hidden: true }
    },
    {
      path: "studyWorkProjectList",
      name: "studyWorkProjectList",
      component: () => import("../studyWorkProjectList.vue"),
      meta: { title: "勤工俭学项目列表", icon: "example", hidden: true }
    },
    {
      path: "showJobList",
      name: "showJobList",
      component: () => import("../showJobList.vue"),
      meta: { title: "岗位列表", icon: "example", hidden: true }
    }

    


  ]
};
