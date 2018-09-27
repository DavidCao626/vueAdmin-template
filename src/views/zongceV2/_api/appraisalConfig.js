/* Automatically generated by './build/runApi.js' */

import request from "~/utils/request";
import ajax from "~/utils/ajax";

const getAppraiseAllowConfigTime = data =>
    request({
        url: "/scheme/getAppraiseAllowConfigTime.do",
        method: "post",
        data: data
    });

const saveAppraisalAllowConfigTime = data =>
    request({
        url: "/scheme/saveAppraisalAllowConfigTime.do",
        method: "post",
        data: data
    });
export default {
    getAppraiseAllowConfigTime,
    saveAppraisalAllowConfigTime
};
