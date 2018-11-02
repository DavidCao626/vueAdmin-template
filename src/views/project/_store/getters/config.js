import _lodash from "lodash";
import moment from "moment";

export const projectInfoData = state => {
  console.log(["info", state]);
  return state.baseproject.FormData;
};

export const projectInfoData1 = state => {};

export const getConfig = state => {
  console.log(["getconfig"]);
  return state.config.config_list;
};
/**
export const getScopeConfigInfoScope = state => {
  return state.scopeConfigInfo.scope
}

export const getScopeConfigInfoWorkItems = state => {
  return state.scopeConfigInfo.items
}

export const getScopeConfigInfo = state => {
  return state.scopeConfigInfo
}
*/
export const getScopeConfigInfoScope = state => {
  var scope = state.scopeDateViewInfo.scope;
  scope.planStartTime = moment(scope.planStartTime)
    .minute(0)
    .format("YYYY-MM-DD HH:mm");
  scope.planEndTime = moment(scope.planEndTime)
    .minute(0)
    .format("YYYY-MM-DD HH:mm");
  return scope;
};

export const getScopeConfigInfoWorkItems = state => {
  console.log("begin do momentView");
  var items = state.scopeDateViewInfo.items;
  var result = [];
  _lodash.mapValues(items, function(value, key, bean) {
    var momentDuration = moment.duration(value.item.planTimeLong, "hours");
    value.viewPlanDay = momentDuration.days();
    value.viewPlanHour = momentDuration.hours();
    value.viewPlanMonth = momentDuration.months();
    value.viewPlanAsDay = parseInt(momentDuration.asDays());
    var disStr = "";
    if (value.viewPlanMonth > 0) {
      disStr = disStr + value.viewPlanMonth + "月";
    }
    if (value.viewPlanDay > 0) {
      disStr = disStr + value.viewPlanDay + "天";
    }
    if (value.viewPlanHour > 0) {
      disStr = disStr + value.viewPlanHour + "小时";
    }
    if (disStr == "") {
      disStr = "未配置";
    } else { 
      disStr = "计划" + disStr;
    }
    value.disPlanDate = disStr;
    result.push(value);
  });
  console.log("end do momentView");
  return result;
};

export const getScopeConfigInfo = state => {
  return state.scopeDateViewInfo;
};

const _getHourDay = timeLong => {
  return _lodash.round(_lodash.divide(timeLong, 24), 1);
};

const _durationHour = timeLong => {
  var duration = moment.duration(timeLong, "hours");
  var monthVal = duration.months();
  var dayVal = duration.days();
  var hourVal = duration.hours();
  var disStr = "";
  if (monthVal > 0) {
    disStr = disStr + monthVal + "月";
  }
  if (dayVal > 0) {
    disStr = disStr + dayVal + "天";
  }
  if (hourVal > 0) {
    disStr = disStr + hourVal + "小时";
  }
  return disStr;
};

export const getScopeConfigCountDay = state => {
  var view = state.scopeDateViewInfo;
  return {
    scopePlanTimeLong: _durationHour(view.scopePlanTimeLong),
    scopeUsableTimeLong: _durationHour(view.scopeUsableTimeLong),
    scopeAllocationedTimeLong: _durationHour(view.scopeAllocationedTimeLong)
  };
};
