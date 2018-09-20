export const GET_DataSourceDict = state => {
  return state.DataSourceDict;
};
export const GET_DataSourceDictByValue = state => value => {
  if (state.DataSourceDict && state.DataSourceDict.length > 0) {
    return state.DataSourceDict.find(e => e.value === value);
  }
};

export const GET_ExpandCheckStateDict = state => {
  return state.ExpandCheckStateDict;
};
export const GET_ExpandCheckStateDictByValue = state => value => {
  if (state.ExpandCheckStateDict && state.ExpandCheckStateDict.length > 0) {
    return state.ExpandCheckStateDict.find(e => e.value === value);
  }
};
