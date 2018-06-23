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
const getDictByDictNames = ({ commit, state }, params) =>
    new Promise(resolve => { 
        api.getDictByDictNames(params).then(response => { 
            commit("setPublicNoticeState", response.resBody.public_notice_state)
        })
    })    


export default {
    queryPublicNoticeA,
    getDictByDictNames
}

