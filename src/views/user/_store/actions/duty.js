import api from '../../_api/duty.js'

const deleteUserResigDutyById = ({ commit, state }, params) => new Promise(resolve => {
    api.deleteUserResigDutyById(params).then(response => {
        console.log(["deleteUserResigDutyById", response])
        resolve(response)
    })
})

export default {
    deleteUserResigDutyById
}