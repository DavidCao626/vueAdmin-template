export const projectRouter = {
  path: '/project',
  redirect: '/project/add',
  name: '项目管理',
  component: () => import('../_layout/layout.vue'),
  meta: { title: '项目管理', icon: 'example', hidden: false },
  children: [
    {
      path: 'add',
      name: 'add',
      title: '新建项目',
      component: () => import('../base.vue'),
      meta: { hidden: false }
    },
    {
      path: 'control',
      name: '项目控制台',
      component: () => import('../contrl.vue')
    },
    {
      path: 'config',
      name: 'project_config',
      title: '配置计划',
      component: () => import('../config')
    },
    { path: 'start', name: 'project_start', title: '下发任务', component: () => import('../start') }
  ]
}
