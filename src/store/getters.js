const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  token: function(state) {
    return state.app.token
  },
  user: state => state.user,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  navMenu: state => state.user.navMenu,
  task: state => state.task,
  taskStyleData: state => state.task.taskStyleData,
  taskStyleDataFamily: state => state.task.taskStyleData.fromData.family,
  projectApply: state => state.task.taskStyleData.fromData.projectApply,
  messageCount: state => state.user.messageCount,
  userName:state=>state.user.userName,
  orgName: state=>state.user.orgName,
  dutyName: state => state.user.dutyName
}
export default getters
