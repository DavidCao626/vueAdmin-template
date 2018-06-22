import config from './config.js'
import base from './base.js'
import dispense from './dispense.js'
import _lodash from 'lodash'
export default _lodash.assign({}, base, config, dispense)
