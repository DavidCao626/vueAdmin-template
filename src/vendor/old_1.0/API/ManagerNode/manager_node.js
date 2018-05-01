import bashPath from '../bashPath.js'
var requestPath = {
      	/* ----------------------管理节点配置------------------*/
      	getManagerNodeObject: bashPath + '/managerNodeConfig/getManagerNodeUserObject.do',
      	getUserObject: bashPath + '/duty/getTargetUserTypep.do',
      	getUserManagerNodeName: bashPath + '/managerNodeConfig/getUserManagerNodeName.do',
      	addUserManagerNodeUserObject: bashPath + '/managerNodeConfig/insertManagerNodeUserObject.do',
      	getUserManagerNodeById: bashPath + '/managerNodeConfig/queryManagerNodeById.do',
      	updateManagerNodeUserObject: bashPath + '/managerNodeConfig/updateManagerNodeUserObject.do',
      	deleteManagerNodeUserObject: bashPath + '/managerNodeConfig/deleteManagerNodeUserObject.do'
}
export default requestPath
