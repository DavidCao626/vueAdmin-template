import config from './config.js'
import base from './base.js'
import projectList from './projectList.js'
import todosList from './todosList.js'
import dispense from './dispense.js'
import consoled from './console.js'
import projectApply from './projectApply.js'
import style from './style.js'
import participant from "./styles/classParticipant.js"
import _lodash from 'lodash'
export default _lodash.assign(
  {},
  todosList,
  projectList,
  base,
  config,
  dispense,
  consoled,
  projectApply,
  style,
  participant
);
