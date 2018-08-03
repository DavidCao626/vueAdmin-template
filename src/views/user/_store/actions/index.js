import studentInfo from './studentInfo.js'
import duty from './duty.js'
import staffInfo from './staffInfo.js'
import user from './user.js'
import base from './base.js'
import _lodash from 'lodash'
export default _lodash.assign(
  {},
  duty,
  staffInfo,
  studentInfo,
  base,
  user
);
