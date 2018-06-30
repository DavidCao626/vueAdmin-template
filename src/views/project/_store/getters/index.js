import * as config from './config.js'
import * as base from './base.js'
import * as dispense from './dispense.js'
import _lodash from 'lodash'
import * as projectList from './projectList.js'
import * as todosList from './todosList.js'
import * as consoled from './console.js'
import * as styles from "./styles.js";
export default _lodash.assign(
  {},
  todosList,
  projectList,
  base,
  config,
  dispense,
  consoled,
  styles
);
