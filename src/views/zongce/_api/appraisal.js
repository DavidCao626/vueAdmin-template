import request from '~/utils/request'
import ajax from '~/utils/ajax'

//附件上传地址
const importArtRecord = process.env.BASE_API + "/appraise/importArtRecord.do"


const getDictByDictNames = data =>
    request({
        url: "/systemConfApi/getDictByDictNames.do",
        method: 'post',
        data: data
    })
const completeUserPendingByItemId = data =>
    request({
        url: "/project/completeUserPendingByItemId.do",
        method: "post",
        data: data
    })




export default {
   
    
};
