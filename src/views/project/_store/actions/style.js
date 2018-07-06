import api from '../../_api/style.js'



const getAllDataAndPageDataByItemId = ({ commit, state },params) => new Promise(resolve => {
    params.currentPage = 1;
    params.pageSize = 9999999;
    api.getAllDataAndPageDataByItemId(params).then(response => {
        commit("setTableDataToDo", response.resBody);
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
    getAllDataAndPageDataByItemId,
    updateClassRecommend,
    completePendByItemId
}