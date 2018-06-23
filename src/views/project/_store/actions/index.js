import config from './config.js'
import base from './base.js'
import projectList from './projectList.js'
import todosList from './todosList.js'
import _lodash from "lodash";
export default _lodash.assign({}, todosList, projectList, base, config);
