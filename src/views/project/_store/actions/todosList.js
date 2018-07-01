import api from '../../_api/todosList.js'



const queryUserPending = ({ commit, state }, params) => new Promise(resolve => {
    api.queryUserPending(params).then(response => {
        console.log(["queryUserPendingAction",response])
        resolve(response)
    })
})

const queryUserDonePending = ({ commit, state }, params) => new Promise(resolve => {
    api.queryUserDonePending(params).then(response => {
        console.log(["queryUserPendingAction", response])
        resolve(response)
    })
})

export default {
    queryUserPending,
    queryUserDonePending
}