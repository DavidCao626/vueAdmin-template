import api from '../../_api/style.js'

   
const getClassDataAndPageDataByItemId = ({ commit, state },params) => new Promise(resolve => {
    api.getAllDataAndPageDataByItemId(params).then(response => {
        //commit("setTableDataToDo", response.resBody);
        resolve(response)
    })
})
const getCollegeDataAndPageDataByItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.getCollegeDataAndPageDataByItemId(params).then(response => {
        //commit("setTableDataToDo", response.resBody);
        resolve(response)
    })
})
const getSchoolDataAndPageDataByItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.getSchoolDataAndPageDataByItemId(params).then(response => {
        //commit("setTableDataToDo", response.resBody);
        resolve(response)
    })
})
const updateCollegeRecommend = ({ commit, state }, params) => new Promise(resolve => {
    api.updateCollegeRecommend(params).then(response => {
        resolve(response)
    })
})
const updateSchoolRecommend = ({ commit, state }, params) => new Promise(resolve => {
    api.updateSchoolRecommend(params).then(response => {
        resolve(response)
    })
})
const updateClassRecommend = ({ commit, state }, params) => new Promise(resolve => {
    api.updateClassRecommend(params).then(response => {
        resolve(response)
    })
})

const completePendByItemId = ({ commit, state }, params) => new Promise(resolve => {
    api.completePendByItemId(params).then(response => {
    })
})
const submitClassData = ({ commit, state }, params) => new Promise(resolve => {
    api.submitClassData(params).then(response => {
        resolve(response)
    })
})
const submitSchoolData = ({ commit, state }, params) => new Promise(resolve => {
    api.submitSchoolData(params).then(response => {
        resolve(response)
    })
})
const submitCollegeData = ({ commit, state }, params) => new Promise(resolve => {
    api.submitCollegeData(params).then(response => {
        resolve(response)
    })
})

export default {
    getClassDataAndPageDataByItemId,
    getCollegeDataAndPageDataByItemId,
    getSchoolDataAndPageDataByItemId,
    updateCollegeRecommend,
    updateClassRecommend,
    updateSchoolRecommend,
    completePendByItemId,
    submitClassData,
    submitSchoolData,
    submitCollegeData
}