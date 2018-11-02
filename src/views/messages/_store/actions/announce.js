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
const pullPublicNoticeA= ({ commit, state },params) =>
    new Promise(resolve => {
        params.type="A"
        api.pullPublicNotice(params).then(response => {
            resolve(response)
        })
    })
const getPublicNoticeById = ({ commit, state }, params) =>
    new Promise(resolve => { 
        api.getPublicNoticeById(params).then(response => {
            console.log(["getPublicNoticeByIdAction",response])
            resolve(response);
        })
    })    

const insertNotice = ({ commit, state }, params) =>
    new Promise(resolve => {
        api.insertNotice(params).then(response => {
            resolve(response);
        })
    })    
const getOrgTypeDict = ({ commit, state }, params) =>
    new Promise(resolve => {
        api.getOrgTypeDict(params).then(response => {
            resolve(response);
        })
    })    
export default {
    getOrgTypeDict,
    pullPublicNoticeA,
    queryPublicNoticeA,
    getDictByDictNames,
    getPublicNoticeById,
    insertNotice
}

