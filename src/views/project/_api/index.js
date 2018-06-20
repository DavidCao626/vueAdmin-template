const getProjectInfoDataById = projectId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: "2018贫困建档",
          id: projectId, // 项目编号
          tyleId: "002", // 业务类别id
          date1: "2018-06-01",
          enddate: "2018-09-01",
          delivery: true,
          files: [],
          desc: ""
        }
      ]);
    }, 5000);
  });
const addProjectInfoData = InfoData =>
    
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: "2018贫困建档",
          id: projectId, // 项目编号
          tyleId: "002", // 业务类别id
          date1: "20180601",
          enddate: "20180901",
          delivery: true,
          files: [],
              desc: "",
          serverId:123
          
        }
      ]);
    }, 500);
  });

export default {
  getProjectInfoDataById,
  addProjectInfoData
};
