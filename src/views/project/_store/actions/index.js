import config from "./config.js";
import base from "./base.js";
import projectList from "./projectList.js";
import todosList from "./todosList.js";
import dispense from "./dispense.js";
import consoled from "./console.js";
import projectApply from "./projectApply.js";
import style from "./style.js";
import participant from "./styles/classParticipant.js";

import results from "./results.js";
import _lodash from "lodash";
export default _lodash.assign(
  {},
  results,
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
