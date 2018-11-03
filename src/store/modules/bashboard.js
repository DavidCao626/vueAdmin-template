import api from '~/api/dashboard'

const bashboard = {
  state: {

  },

  mutations: {

  },
  actions: {
    getUserScope: ({ commit, state }) => new Promise(resolve => {
      var params = { currentPage: 1, pageSize: 5 }
      api.getUserScope(params).then(response => {
        //console.log(["getDispenseTaskScopeByProjectCodeAction", response])
        resolve(response)
      })
    }),


    pullPublicNoticeA: ({ commit, state }) =>
      new Promise(resolve => {
        api.pullPublicNotice({ 'type': 'A', 'currentPage': 1, 'pageSize': 3 }).then(response => {
          resolve(response)
        })
      }),
    pullPublicNoticeP: ({ commit, state }) =>
      new Promise(resolve => {
        api.pullPublicNotice({ 'type': "P", 'currentPage': 1, 'pageSize': 3 }).then(response => {
          resolve(response)
        })
      }),

    getOrgTypeDict: ({ commit, state }) => new Promise(resolve => {
      api.getOrgTypeDict({}).then(response => {
        resolve(response)
      })
    }),
    queryUserPending: ({ commit, state }) => new Promise(resolve => {
      api.queryUserPending({ 'currentPage': 1, 'pageSize': 3, 'isActive': 'Y', 'state': "N" }).then(response => {
        console.log(["queryUserPendingAction", response])
        resolve(response)
      })
    }),

    queryUserNoticeByStatus: ({ commit, state }) => new Promise(resolve => {
      api.queryUserNoticeByStatus({ 'currentPage': 1, 'pageSize': 3, 'content': '', 'status': "N" }).then(response => {
        console.log(["queryUserNoticeByStatus", response])
        resolve(response)
      })
    }),

    getCurrentUserInfo: ({ commit, state }) => new Promise(resolve => {
      api.getCurrentUserInfo({}).then(response => {
        commit("SET_USERNAME", response.resBody.userName)
        commit("SET_ORGNAME", response.resBody.orgName)
        commit("SET_DUTYNAME", response.resBody.dutyName)
        resolve(response)
      })
    })
  }
};

export default bashboard;
