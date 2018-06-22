//公告
import api from '../../_api/publicNotice.js'
const queryPublicNoticeA = ({ commit, state }, data) =>
    new Promise(resolve => {
        data.type="A"
        api.queryPublicNotice(data).then(response => {
            console.log(["queryPublicNoticeAction", response])
            resolve(response)
        })
    })
// const queryPublicNoticeState = ({ commit, state }) =>
// new Promise    

export default {
    queryPublicNoticeA
}

