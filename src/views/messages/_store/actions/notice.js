import api from '../../_api/publicNotice.js'
const queryPublicNoticeP = ({ commit, state }, data) =>
    new Promise(resolve => {
        data.type = "P"
        api.queryPublicNotice(data).then(response => {
            console.log(["queryPublicNoticePAction", response])
            resolve(response)
        })
    })

export default {
    queryPublicNoticeP
}
