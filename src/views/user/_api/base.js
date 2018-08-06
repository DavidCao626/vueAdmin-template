import request from '~/utils/request'
import ajax from '~/utils/ajax'

const queryCurrentOrgBaseList = data =>
    request({
        url: "/classifyBase/queryCurrentOrgBaseList.do",
        method: 'post',
        data: data
    })


const createBaseClassify = data =>
    ajax({
        url: "/classifyBase/createBaseClassify.do",
        method: 'post',
        data: data
    })
export default {
    queryCurrentOrgBaseList,
    createBaseClassify
};
