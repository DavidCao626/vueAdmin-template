export const getStylesConfig = state => {
  return state.styles.config;
};
export const classData = state => { 
  return state.styles.config.listStyle.data
}
export const serviceTypeList = state => { 
  return state.styles.config.serviceTypeList
}