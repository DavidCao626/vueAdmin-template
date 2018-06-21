import api from '../../_api/base.js'
//增加或者修改项目
const insertOrUpdateProject = ({ commit, state }, projectData) =>{
  new Promise(resolve => {
    // if (state.projectInfoData.id) return;
    api.insertOrUpdateProject(projectData).then(response => {
      resolve(response)
    })
  })
}
//查询业务类别列表调用mutations赋值给state
const queryServiceTypeList = ({ commit, state }) => {
  new Promise(resolve => { 
    api.queryServiceTypeList().then(response => { 
      commit("setServiceTypeList",response.resBody)
    })
  }) 
  // var s = [4,5,6]
  // setTimeout(() => {
  //   console.log("sssss")
  //   commit("setServiceTypeList", s)
   
  // }, 5000)
}
export default {
  insertOrUpdateProject,
  queryServiceTypeList
}
