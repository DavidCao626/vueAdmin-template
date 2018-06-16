import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'
import stuLayout from '../views/layout/stu-Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/test', component: () => import('~/views/userManager/test/index') },
  {
    path: '/whktest',
    component: () =>
      import('~/views/publicNotice/test')
  },
  { path: '/login', component: () => import('~/views/login') },
  { path: '/404', component: () => import('~/views/404') },
  {
    path: '/register',
    component: () => import('~/views/register'),
    hidden: true
  },
  {
    path: '/',
    component: stuLayout,
    redirect: '/task',
    name: 'home_index',
    meta: { title: '首页' },
    children: [
      {
        path: 'dashboard',
        meta: { title: '首页' },
        component: () => import('~/views/dashboard/index')
      },
      {
        path: 'home',
        meta: { title: '控制面板' },
        component: () => import('~/views/task/home')
      },
      {
        path: 'demo',
        meta: { title: 'Demo' },
        component: () => import('~/views/dashboard/demo')
      }
    ]
  },
  {
    path: '/t',
    component: stuLayout,
    redirect: '/t/tables',
    name: '默认栏目',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: 'tables',
        name: 'tabls',
        component: () => import('~/views/table/complexTable'),
        meta: { title: 'complexTable' }
      },
      {
        path: 'table',
        name: '问卷',
        component: () => import('~/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: '树',
        component: () => import('~/views/tree/tree'),
        meta: { title: '项目计划', icon: 'tree', hidden: true }
      }
    ]
  },
  {
    path: '/question',
    component: stuLayout,
    redirect: '/question/list',
    name: '调查问卷',
    meta: { title: '调查问卷', icon: 'example', hidden: true },
    children: [
      {
        path: 'list',
        name: '问卷填写',
        component: () => import('~/views/question/components/main'),
        meta: { hidden: true }
      },
      {
        path: 'show',
        name: '填表',
        component: () => import('~/views/question/components/show')
      },
      {
        path: 'showTask',
        name: '填表task',
        component: () => import('~/views/question/components/showTask')
      },
      {
        path: 'results',
        name: '展现问卷结果',
        component: () => import('~/views/question/components/results')
      }
    ]
  },
  {
    path: '/form',
    component: stuLayout,
    children: [
      {
        path: 'index',
        name: '表单',
        component: () => import('~/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/task',
    component: stuLayout,
    redirect: '/task/index',
    name: '123',
    meta: { title: '项目管理' },
    children: [
      {
        path: 'index',
        name: '所有项目',
        meta: { title: '所有项目', hidden: true },
        component: () => import('~/views/task/index')
      },
      {
        path: 'home',
        name: '我的项目',
        meta: { title: '我的项目', hidden: true },
        component: () => import('~/views/task/home')
      },
      {
        path: 'styleData',
        name: '外观数据',
        meta: { title: '外观数据', hidden: true },
        component: () => import('~/views/taskStyleData/projectApply')
      },
      {
        path: 'style',
        name: '外观主页',
        meta: { title: '外观主页', hidden: true },
        component: () => import('~/views/taskStyleData/home')
      },
      {
        path: 'nodeDate',
        name: '节点数据',
        meta: { title: '我的项目', hidden: true },
        component: () => import('~/views/task/taskDataPages')
      },
      {
        path: 'addTaskProject',
        name: '增加项目',
        meta: { title: '增加项目' },
        component: () => import('~/views/task/addTaskProject')
      },
      {
        path: 'updateTaskProject',
        name: '更新项目',
        component: () => import('~/views/task/updateTaskProject')
      },
      {
        path: 'addTaskNode',
        name: '增加节点',
        component: () => import('~/views/task/addTaskNode')
      },
      {
        path: 'updateTaskNode',
        name: '更新节点',
        component: () => import('~/views/task/updateTaskNode')
      },
      {
        path: 'addTaskFacade',
        name: '增加工序',
        component: () => import('~/views/task/addTaskFacade')
      },
      {
        path: 'updateTaskFacade',
        name: '更新工序',
        component: () => import('~/views/task/updateTaskFacade')
      },
      {
        path: 'addTaskNodeRestrict',
        name: '增加节点约束',
        component: () => import('~/views/task/addTaskNodeRestrict')
      },
      {
        path: 'updateTaskNodeRestrict',
        name: '更新节点约束',
        component: () => import('~/views/task/updateTaskNodeRestrict')
      },
      {
        path: 'taskParticipant',
        name: '配置参与者',
        component: () => import('~/views/task/taskParticipant')
      },
      {
        path: 'serviceTypeManager',
        name: '管理业务类别',
        component: () => import('~/views/task/serviceTypeManager')
      }
    ]
  },
  {
    path: '/user',
    component: stuLayout,
    name: '用户中心',
    children: [
      {
        path: 'messages',
        name: '消息中心',
        component: () => import('~/views/userManager/messages')
      },
      {
        path: 'updateUserPwd',
        name: '用户修改密码',
        component: () => import('~/views/userManager/updateUserPwd')
      },
      {
        path: 'updateUserInfo',
        name: '用户修改资料',
        component: () => import('~/views/userManager/updateUserInfo')
      },
      {
        path: 'updateUserPwd',
        name: '用户修改密码',
        component: () => import('~/views/userManager/updateUserPwd')
      },
      {
        path: 'userduty',
        name: '任职详情',
        component: () => import('~/views/userManager/dutyManager/showUserDuty')
      },
      {
        path: 'userSelfAuth',
        name: '用户认证表单',
        component: () => import('~/views/userManager/userSelfAuth/index')
      },
      {
        path: 'userManager',
        name: '用户信息管理',
        component: () => import('~/views/userManager/userManager/index')
      },
      {
        path: 'userAuth',
        name: '认证信息管理',
        component: () => import('~/views/userManager/userAuth/index')
      }
    ]
  },
  {
    path: '/student',
    component: stuLayout,
    children: [
      {
        path: 'stuSelfInfo',
        name: '创建学生信息',
        component: () =>
          import('~/views/userManager/studentManager/stuSelfInfo/index'),
        hidden: true
      },
      {
        path: 'updateStuInfo',
        name: '修改学生信息',
        component: () =>
          import('~/views/userManager/studentManager/updateStuInfo/index'),
        hidden: true
      },
      {
        path: 'studentBaseInfo',
        name: '学生信息管理',
        component: () =>
          import('~/views/userManager/studentManager/studentBaseInfo/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/unitViews',
    component: stuLayout,
    children: [
      {
        path: 'stuBaseInfo',
        name: 'stuBaseInfo',
        component: () => import('~/views/unitViews/stuBaseInfo'),
        hidden: true
      },
      {
        path: 'stuPersonalInfo',
        name: 'stuPersonalInfo',
        component: () => import('~/views/unitViews/stuPersonalInfo'),
        hidden: true
      },
      {
        path: 'stuUniversityInfo',
        name: 'stuUniversityInfo',
        component: () => import('~/views/unitViews/stuUniversityInfo'),
        hidden: true
      },
      {
        path: 'staffBaseInfo',
        name: 'staffBaseInfo',
        component: () => import('~/views/unitViews/staffBaseInfo'),
        hidden: true
      },
      {
        path: 'staffUniversityInfo',
        name: 'staffUniversityInfo',
        component: () => import('~/views/unitViews/staffUniversityInfo'),
        hidden: true
      }
    ]
  },
  {
    path: '/staff',
    component: stuLayout,
    children: [
      {
        path: 'staffSelfInfo',
        name: '创建职工信息',
        component: () =>
          import('~/views/userManager/staffManager/staffSelfInfo/index'),
        hidden: true
      },
      {
        path: 'updateStaffInfo',
        name: '修改职工信息',
        component: () =>
          import('~/views/userManager/staffManager/updateStaffInfo/index'),
        hidden: true
      },
      {
        path: 'staffBaseInfo',
        name: '职工信息管理',
        component: () =>
          import('~/views/userManager/staffManager/staffBaseInfo/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/system',
    component: stuLayout,
    children: [
      {
        path: 'managerNodeConfig',
        name: '管理节点配置用户对象',
        component: () => import('~/views/userManager/managerNodeConfig/index'),
        hidden: true
      },
      {
        path: 'dutyManager',
        name: '职务管理',
        component: () => import('~/views/userManager/dutyManager/index'),
        hidden: true
      },
      {
        path: 'socializeClassify',
        name: '系统用户管理',
        component: () => import('~/views/userManager/socializeClassify/index'),
        hidden: true
      },
      {
        path: 'menuManager',
        name: '系统菜单管理',
        component: () => import('~/views/systemManager/menuManager/index'),
        hidden: true
      },
      {
        path: 'orgManager',
        name: '系统机构管理',
        component: () => import('~/views/systemManager/orgManager/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/test',
    component: () => import('~/views/unitViews/test'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/project',
    component: stuLayout,
    redirect: '/project/control',
    name: '项目管理',
    meta: { title: '项目管理', icon: 'example', hidden: false },
    children: [
      {
        path: 'process',
        name: '新建项目步骤',
        component: () => import('~/views/project/addProcess/index'),
        meta: { hidden: false }
      },
      {
        path: 'control',
        name: '项目控制台',
        component: () => import('~/views/project/control/index')
      },
      {
        path: 'todo',
        name: '我的待办',
        component: () => import('~/views/project/todo/index')
      },
      {
        path: 'my',
        name: '我的项目',
        component: () => import('~/views/project/index')
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
