export const GET_DataSourceDict = state => {
  return state.DataSourceDict;
};
export const GET_DataSourceDictByValue = state => value => {
  if (state.DataSourceDict) {
    return state.DataSourceDict.find(e => e.value === value);
  }
};

export const GET_ExpandCheckStateDict = state => {
  return state.ExpandCheckStateDict;
};
export const GET_ExpandCheckStateDictByValue = state => value => {
  if (state.ExpandCheckStateDict) {
    return state.ExpandCheckStateDict.find(e => e.value === value);
  }
};
