import api from "../../_api/results.js";
const getCurrentOrgListAndOwner = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getCurrentOrgListAndOwner(params).then(response => {
      console.log(["getCurrentOrgListAndOwner", response]);
      resolve(response);
    });
  });
const querySchoolYearDict = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.querySchoolYearDict(params).then(response => {
      console.log(["getCurrentOrgListAndOwner", response]);
      resolve(response);
    });
  });
export default {
  getCurrentOrgListAndOwner,
  querySchoolYearDict
};
