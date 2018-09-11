import api from "../../_api/SchoolYear.js";

const getSchoolYearName = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.getSchoolYearName(params).then(response => {
      resolve(response);
    });
  });
const insertSchoolYear = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.insertSchoolYear(params).then(response => {
      resolve(response);
    });
  });

const querySchoolYear = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.querySchoolYear(params).then(response => {
      resolve(response);
    });
  });
const updateSchoolYear = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.updateSchoolYear(params).then(response => {
      resolve(response);
    });
  });

const insertBatchSchoolYear = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.insertBatchSchoolYear(params).then(response => {
      resolve(response);
    });
  });

const deleteSchoolYear = ({ commit, state }, params) =>
  new Promise(resolve => {
    api.deleteSchoolYear(params).then(response => {
      resolve(response);
    });
  });
export default {
  deleteSchoolYear,
  insertBatchSchoolYear,
  insertSchoolYear,
  updateSchoolYear,
  querySchoolYear,
  getSchoolYearName,
  insertSchoolYear
};
