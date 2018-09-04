import bashPath from '../bashPath.js'
var requestPath = {
  /* 查询角色 */
  queryUserGrantRole: bashPath + "/systemManagerApi/getGrantRole.do",
  /* 查询子组织*/
  queryChildOrg: bashPath + "/systemManagerApi/queryChildOrg.do",
  /* 查询子区域*/
  queryChildArea: bashPath + "/systemManagerApi/getChildArea.do",
  /* 查询默认值的区域*/
  queryDefaultArea: bashPath + "/systemManagerApi/getDefaultArea.do",
  /* 字典属性的装饰器*/
  queryDecortor: bashPath + "/systemConfApi/getDictByDecorator.do",
  /* 获取组织信息*/
  queryOrgInfo: bashPath + "/systemManagerApi/getOrg.do",
  queryCurrentOrgListByOrgCode:
    bashPath + "/systemManagerApi/getCurrentOrgListByOrgCode.do",
  /* 新增组织*/
  addOrg: bashPath + "/systemManagerApi/addSystemOrg.do",
  /* 更新组织*/
  updateOrg: bashPath + "/systemManagerApi/updateSystemOrg.do",

  /* -------------------------菜单管理--------------------*/
  /* 查询下级菜单*/
  queryChildMenu: bashPath + "/systemManagerApi/queryChildMenu.do",
  /* 查询菜单信息*/
  queryMenu: bashPath + "/systemManagerApi/getMenu.do",
  /* 新增菜单*/
  addMenu: bashPath + "/systemManagerApi/addSystemMenu.do",
  /* 更新菜单*/
  updateMenu: bashPath + "/systemManagerApi/updateSystemMenu.do",
  /* -------------------------公共组织--------------------*/
  /* 查询下级菜单*/
  queryUserOrg: bashPath + "/systemManagerApi/getCurrentOrgList.do",
  queryUserDuty: bashPath + "/user/getUserDutyList.do",
  /* ------------------------------- 节点配置管理------------------------------*/
  submitAuthCert: bashPath + "/managerNodeConfig/submitAuthCertificate.do",
  getManagerNodeMemberDuty:
    bashPath + "/managerNodeConfig/getManagerNodeMemberDuty.do",
  getMemberDutyAuthRelaseInfo:
    bashPath + "/managerNodeConfig/getMemberDutyAuthRelaseInfo.do",

  /* ------------------------------- 问卷配置管理------------------------------*/
  saveQuestion: bashPath + "/questionApi/saveQuestion.do",
  getQuestionResult: bashPath + "/questionApi/getQuestionResult.do",
  queryEnablePrivilegeState:bashPath + "/systemManagerApi/queryEnablePrivilegeState.do",
  queryDefaultEnablePrivilegeState:bashPath + "/systemManagerApi/queryDefaultEnablePrivilegeState.do"
};
export default requestPath
