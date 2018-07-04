import api from '../../_api/style.js'



const getClassDataAndPageDataByItemId = ({ commit, state },params) => new Promise(resolve => {
    api.getAllDataAndPageDataByItemId(params).then(response => {
        //commit("setTableDataToDo", response.resBody);
        resolve(response)
    })
})


const updateClassRecommend = ({ commit, state }, params) => new Promise(resolve => {
    api.updateClassRecommend(params).then(response => {
    })
})

const completePendByItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.completePendByItemId(params).then(response => {
    })
})
export default {
    getClassDataAndPageDataByItemId,
    updateClassRecommend,
    completePendByItemId
}