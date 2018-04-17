const getters = {
  sidebar: state => state.app.sidebar,
  token: function(state) {
    return state.app.token
  },
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  navMenu: state => state.app.navMenu
}
export default getters
