import * as config from './config.js'
import * as base from './base.js'
import * as projectList from './projectList.js'
import * as todosList from './todosList.js'
import _lodash from "lodash";
export default _lodash.assign({}, todosList, projectList, base, config);
