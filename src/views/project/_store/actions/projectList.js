import api from '../../_api/projectList.js'



const queryUserProject = ({ commit, state },params) => new Promise(resolve => {
    api.queryUserProject(params).then(response => {
        console.log(["queryUserProjectAction",response])
        resolve(response)
    })
})
   

const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction", response])
        resolve(response)
        commit('setProjectState', response.resBody.node_state)
        commit('setTodoState', response.resBody.pend_state)
    })
})

const getDispenseTaskScopeByProjectCode = ({ commit, state }, params) => new Promise(resolve => {
    api.getDispenseTaskScopeByProjectCode(params).then(response => {
        //console.log(["getDispenseTaskScopeByProjectCodeAction", response])
        resolve(response)
    })
})
const getUserScope = ({ commit, state }, params) => new Promise(resolve => {
    api.getUserScope(params).then(response => {
        //console.log(["getDispenseTaskScopeByProjectCodeAction", response])
        resolve(response)
    })
})
const getChildScope = ({ commit, state }, params) => new Promise(resolve => {
    api.getChildScope(params).then(response => {
        //console.log(["getDispenseTaskScopeByProjectCodeAction", response])
        resolve(response)
    })
})

export default {
    queryUserProject,
    getDictByDictNames,
    getDispenseTaskScopeByProjectCode,
    getUserScope,
    getChildScope
}