import schoolYear from "./schoolYear.js";
import scheme from "./scheme.js";
import stuScore from "./stuScore.js";
import stuPunish from "./stuPunish.js";
import baseQuality from "./baseQuality.js";
import expandEval from "./expandEval.js";
import appraisalConfig from "./appraisalConfig.js";

import _lodash from "lodash";
export default _lodash.assign(
  {},
  scheme,
  schoolYear,
  stuScore,
  stuPunish,
  baseQuality,
  expandEval,
  appraisalConfig
);
