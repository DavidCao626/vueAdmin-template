import * as config from './config.js'
import * as base from './base.js'
import * as dispense from './dispense.js'
import _lodash from 'lodash'
export default _lodash.assign({}, base, config, dispense)
