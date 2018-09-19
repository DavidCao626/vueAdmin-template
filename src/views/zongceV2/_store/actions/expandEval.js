/* Automatically generated by './build/make/*.js' */

import api from "../../_api/expandEval.js";

const queryPunishList3 = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryPunishList(params).then(response => {
      resolve(response);
    });
  });

const getSchemeStateDict = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getSchemeStateDict(params).then(response => {
      resolve(response);
    });
  });

const updateScheme = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.updateScheme(params).then(response => {
      resolve(response);
    });
  });

const insertScheme = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.insertScheme(params).then(response => {
      resolve(response);
    });
  });

const copyScheme = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.copyScheme(params).then(response => {
      resolve(response);
    });
  });

const processSchemeName = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.processSchemeName(params).then(response => {
      resolve(response);
    });
  });

const deleteSchemeById = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.deleteSchemeById(params).then(response => {
      resolve(response);
    });
  });

const startScheme = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.startScheme(params).then(response => {
      resolve(response);
    });
  });

const getEvalItemBeanBySchemeId = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getEvalItemBeanBySchemeId(params).then(response => {
      resolve(response);
    });
  });

const saveExEveluateBean = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.saveExEveluateBean(params).then(response => {
      resolve(response);
    });
  });

const queryExpandEvalCategory = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryExpandEvalCategory(params).then(response => {
      resolve(response);
    });
  });

const getExpandEvalCatagoryBySchoolYearId = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getExpandEvalCatagoryBySchoolYearId(params).then(response => {
      resolve(response);
    });
  });

const getExpandEvalCatagoryByDate = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getExpandEvalCatagoryByDate(params).then(response => {
      resolve(response);
    });
  });

const createExpandRecord = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.createExpandRecord(params).then(response => {
      resolve(response);
    });
  });

const applyExpandRecord = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.applyExpandRecord(params).then(response => {
      resolve(response);
    });
  });

const checkExpandRecord = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.checkExpandRecord(params).then(response => {
      resolve(response);
    });
  });

const getExpandEvalRecordById = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getExpandEvalRecordById(params).then(response => {
      resolve(response);
    });
  });

const getExpandCheckStateDict = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getExpandCheckStateDict(params).then(response => {
      resolve(response);
    });
  });

const getDataSourceDict = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getDataSourceDict(params).then(response => {
      resolve(response);
    });
  });

const queryExpandEvalRecordForStaff = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryExpandEvalRecordForStaff(params).then(response => {
      resolve(response);
    });
  });

const queryExpandEvalRecordForStu = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryExpandEvalRecordForStu(params).then(response => {
      resolve(response);
    });
  });

const queryExpandEvalRecordForCheck = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryExpandEvalRecordForCheck(params).then(response => {
      resolve(response);
    });
  });

const adStuExpandEval = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.adStuExpandEval(params).then(response => {
      resolve(response);
    });
  });

const importExpandEvalRecord = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.importExpandEvalRecord(params).then(response => {
      resolve(response);
    });
  });
const getExpandEvalTemplateUrl = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getExpandEvalTemplateUrl(params).then(response => {
      resolve(response);
    });
  });
export default {
  getExpandEvalTemplateUrl,
  queryPunishList3,
  getSchemeStateDict,
  updateScheme,
  insertScheme,
  copyScheme,
  processSchemeName,
  deleteSchemeById,
  startScheme,
  getEvalItemBeanBySchemeId,
  saveExEveluateBean,
  queryExpandEvalCategory,
  getExpandEvalCatagoryBySchoolYearId,
  getExpandEvalCatagoryByDate,
  createExpandRecord,
  applyExpandRecord,
  checkExpandRecord,
  getExpandEvalRecordById,
  getExpandCheckStateDict,
  getDataSourceDict,
  queryExpandEvalRecordForStaff,
  queryExpandEvalRecordForStu,
  queryExpandEvalRecordForCheck,
  adStuExpandEval,
  importExpandEvalRecord
};
