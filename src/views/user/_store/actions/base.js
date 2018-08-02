import api from '../../_api/base.js'


const queryCurrentOrgBaseList = ({ commit, state }, params) => new Promise(resolve => {
    api.queryCurrentOrgBaseList(params).then(response => {
        console.log(["queryCurrentOrgBaseList", response])
        resolve(response)
    })
})


const createBaseClassify = ({ commit, state }, params) => new Promise(resolve => {
    api.createBaseClassify(params).then(response => {
        console.log(["createBaseClassify", response])
        resolve(response)
    })
})
export default {
    queryCurrentOrgBaseList,
    createBaseClassify
}