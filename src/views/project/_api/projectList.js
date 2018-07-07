import request from '~/utils/request'
import ajax from '~/utils/ajax'

//查码表
const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })

//查询项目列表
const queryUserProject = data =>
    request({
        url: '/project/queryUserProject.do',
        method: 'post',
        data: data
    })

//根据项目编号查询根实例 
const getDispenseTaskScopeByProjectCode = data =>
    request({
        url: '/project/getDispenseTaskScopeByProjectCode.do',
        method: 'post',
        data: data
    })

    /**
     * 
     * @param {获取用户相关scope} data 
     */
const getUserScope = data =>
    request({
        url: '/projectApply/getUserScope.do',
        method: 'post',
        data: data
    })


export default {
    queryUserProject,
    getDictByDictNames,
    getDispenseTaskScopeByProjectCode,
    getUserScope
}