import api from '../../_api/projectList.js'



const queryUserProject = ({ commit, state },params) => new Promise(resolve => {
    api.queryUserProject(params).then(response => {
        console.log(["queryUserProjectAction",response])
        resolve(response)
    })
})
   

const getDictByDictNames = ({ commit, state }, params) => new Promise(resolve => {
    api.getDictByDictNames(params).then(response => {
        console.log(["getDictByDictNamesAction",response])
        commit('setProjectState', response.resBody.node_state)
        commit('setTodoState', response.resBody.pend_state)
    })
})

export default {
    queryUserProject,
    getDictByDictNames
}