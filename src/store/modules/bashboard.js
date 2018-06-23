import api from '~/api/dashboard'

const bashboard = {
  state: {

  },

  mutations: {

  },
  actions: {
    pullPublicNoticeA: ({ commit, state }) =>
      new Promise(resolve => {
        api.pullPublicNotice({'type':'A','currentPage':1,'pageSize':3}).then(response => {
          resolve(response)
        })
      }),
    pullPublicNoticeP: ({ commit, state }) =>
      new Promise(resolve => {
        api.pullPublicNotice({ 'type': "P", 'currentPage': 1, 'pageSize': 3 }).then(response => {
          resolve(response)
        })
      })
  }
};

export default bashboard;
