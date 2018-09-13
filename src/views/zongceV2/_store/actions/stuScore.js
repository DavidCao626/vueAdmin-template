import api from "../../_api/stuScore.js";

const queryStuScoreForStaff = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryStuScoreForStaff(params).then(response => {
      resolve(response);
    });
  });
const queryStuScoreForStu = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryStuScoreForStu(params).then(response => {
      resolve(response);
    });
  });
const queryScoreRankForStaff = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryScoreRankForStaff(params).then(response => {
      resolve(response);
    });
  });
const queryScoreRankForStu = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.queryScoreRankForStu(params).then(response => {
      resolve(response);
    });
  });
const importStuScoreForClass = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.importStuScoreForClass(params).then(response => {
      resolve(response);
    });
  });
const processRank = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.processRank(params).then(response => {
      resolve(response);
    });
  });
const querySchoolYearDict = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.querySchoolYearDict(params).then(response => {
      resolve(response);
    });
  });
const getCurrentOrgListAndOwner = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getCurrentOrgListAndOwner(params).then(response => {
      console.log(["getCurrentOrgListAndOwner", response]);
      resolve(response);
    });
  });
  
export default {
  queryStuScoreForStaff,
  queryStuScoreForStu,
  queryScoreRankForStaff,
  queryScoreRankForStu,
  importStuScoreForClass,
  processRank,
  querySchoolYearDict,
  getCurrentOrgListAndOwner
};
