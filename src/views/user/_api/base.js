import request from '~/utils/request'
import ajax from '~/utils/ajax'

const queryCurrentOrgBaseList = data =>
    request({
        url: "/classifyBase/queryCurrentOrgBaseList.do",
        method: 'post',
        data: data
    })



export default {
    queryCurrentOrgBaseList
};
