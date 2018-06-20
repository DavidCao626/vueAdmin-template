import api from "../_api";

const getProjectInfoData = ({ commit, state }, projectId) =>
  new Promise(resolve => {
   // if (state.projectInfoData.id) return;
    api.getProjectInfoDataById(projectId).then(response => {
      commit("setProjectInfoData", response[0]);
      resolve(response[0]);
    });
  });

const addProjectInfoData = ({ commit, state }, InfoData) =>
  new Promise(resolve => {
    api.addProjectInfoData(InfoData).then(response => {
      commit("setProjectInfoData", response[0]);
      resolve(response[0]);
    });
  });

export default {
  getProjectInfoData,
  addProjectInfoData
};
