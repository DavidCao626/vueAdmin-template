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
  navMenu: state => state.user.navMenu
}
export default getters
