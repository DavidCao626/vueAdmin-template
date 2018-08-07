import request from '~/utils/request'
import ajax from '~/utils/ajax'


const queryImportRecordList = data =>
    request({
        url: "/importRecord/queryImportRecordList.do",
        method: 'post',
        data: data
    })


const rollBackStudentInfoByBatch = data =>
    request({
        url: "/stuInfo/rollBackStudentInfoByBatch.do",
        method: 'post',
        data: data
    })

const rollBackStaffInfoByBatch = data =>
    request({
        url: "/staInfo/rollBackStaffInfoByBatch.do",
        method: 'post',
        data: data
    })


export default {
    queryImportRecordList,
    rollBackStaffInfoByBatch,
    rollBackStudentInfoByBatch
};
