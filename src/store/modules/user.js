import {
  login,
  logout,
  getInfo,
  getNavMenu,
  getDutyList as getRuleList,
  switchDuty
} from '~/api/login'
import { getToken, setToken, removeToken } from '~/utils/auth'
import { uregister } from '~/api/register'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    navMenu: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAVMENU: (state, navMenu) => {
      state.navMenu = navMenu
    },
    SET_CURRENTLY: (state, currEntly) => {
      state.roles.AppointDutyList[0].currently = currEntly
    }
  },

  actions: {
    Register({ commit }, registerForm) {
      return new Promise((resolve, reject) => {
        uregister(
          registerForm.username,
          registerForm.pass,
          registerForm.checkPass
        )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.pass)
          .then(response => {
            // const data = response.data
            // setToken(data.token)
            setToken('user')
            // commit('SET_TOKEN', data.token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.resBody[0]
            // commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.userInfo[0].login_name)
            commit('SET_AVATAR', data.userInfo[0].head_pic)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户rule职务
    GetDutyList({ commit, state }) {
      return new Promise((resolve, reject) => {
        getRuleList()
          .then(response => {
            const MemberDutyList = []
            const AppointDutyList = []
            const data = response

            const members = data.resBody.MEMBER

            for (let i = 0; i < members.length; i++) {
              MemberDutyList.push(members[i])
            }
            const appoints = data.resBody.APPOINT
            for (let i = 0; i < appoints.length; i++) {
              AppointDutyList.push(appoints[i])
            }
            commit('SET_ROLES', { MemberDutyList, AppointDutyList })
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 切换职务
    SwitchDuty({ commit }, postData) {
      return new Promise((resolve, reject) => {
        switchDuty(postData)
          .then(response => {
            const result = response.resBody
            if (result.status === 'Y') {
              this.$message('职务切换成功！' + result.type)
              commit('SET_CURRENTLY', true)
              // item.currently = true
            } else {
              this.$message(result.message)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户组可用菜单
    GetNavMenu({ commit, state }) {
      return new Promise((resolve, reject) => {
        getNavMenu(state.navMenu)
          .then(response => {
            const data = response.resBody
            commit('SET_NAVMENU', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
