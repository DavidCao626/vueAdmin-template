import { queryAnmeldenTypeList, submitProjectApplySurface } from '~/api/task'

const task = {
  state: {
    taskStyleData: {
      fromData: {
        family: {
          unitCode: "201808",
          data: {
            familyPopulation: 0,
            familyAddress: "",
            familyCapitaincome: "",
            naturalHazard: "",
            isSingleParent: "N",
            anmeldenType: "",
            familyDebt: ""
          }
        },
        projectApply: {
          unitCode: "201807",
          data: {
            applyProject: "",
            serviceType: "",
            childServiceType: "",
            evaluationType: "",
            applyReason: ""
          }
        }
      }
    }
  },

  mutations: {
    SET_TASKSTYLEDATA: (state, taskStyleData) => {
      state.taskStyleData.push(taskStyleData);
    },
    SET_TASKSTYLEDATA_FROMDATA: (state, fromData) => {
      state.taskStyleData.fromData.push(fromData);
    },
    updatetaskStyleDataFamily: (state, fromData) => {
      state.taskStyleData.fromData.family = fromData;
    },
    updatetaskStyleDataprojectApply: (state, fromData) => {
      state.taskStyleData.fromData.projectApply = fromData;
    }
  },

  actions: {
    updatetaskStyleDataFamily: ({ commit }, qss) => {
      commit("updatetaskStyleDataFamily", qss);
    },
    updatetaskStyleDataprojectApply: ({ commit }, qss) => {
      commit("updatetaskStyleDataprojectApply", qss);
    },
    addStyleData({ commit }, taskStyleName) {
      const s = {};
      s[taskStyleName] = {};
      commit("SET_TASKSTYLEDATA_FROMDATA", { taskStyleName: [] });
    },

    getAnmeldenTypeList({ commit }, taskStyleName) {
      return new Promise((resolve, reject) => {
        queryAnmeldenTypeList()
          .then(response => {
            const s = {};
            s[taskStyleName] = { AnmeldenTypeList: response };
            debugger;
            commit("SET_TASKSTYLEDATA_FROMDATA", s);
            debugger;
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    addData({ commit }, data) {
      return new Promise((resolve, reject) => {
        submitProjectApplySurface(data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default task
