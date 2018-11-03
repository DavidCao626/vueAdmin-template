import validateUtils from 'validate.js'
import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  Loading
} from 'element-ui'

var commonUtils = {
  /**
	 * 获取页面是可见高度
	 */
  getClientHeight: function() {
    return document.documentElement.clientHeight || document.body.clientHeight
  },
  extend: function(origin, add) {
    if (!add || !validateUtils.isObject(add)) return origin
    var keys = Object.keys(add)
    var i = keys.length
    while (i--) {
      origin[keys[i]] = add[keys[i]]
    }
    return origin
  },
  supply: function(origin, add) {
    if (!add || !validateUtils.isObject(add)) return origin
    var keys = Object.keys(add)
    var i = keys.length
    while (i--) {
      if (!origin.hasOwnProperty(keys[i])) {
        origin[keys[i]] = add[keys[i]]
      }
    }
    return origin
  },
  /** 取交集**/
  mixed: function(origin, add) {
    if (!add || !validateUtils.isObject(add)) return origin
    var keys = Object.keys(add)
    var i = keys.length
    while (i--) {
      if (origin.hasOwnProperty(keys[i])) {
        origin[keys[i]] = add[keys[i]]
      }
    }
    return origin
  },
  reBuildArray: function(list, data) {
    list.splice(0, list.length)
    for (var i = 0, len = data.length; i < len; i++) {
      list.push(data[i])
    }
  },
  validSingle: function(message, vtype, value) {
    return function(rule, value, callback) {
      // console.log([validateUtils, value, vtype]);
      var config = {}
      config[vtype] = true
      var result = validateUtils.single(value, config)
      if (result) {
        if (message) {
          return callback(message)
        } else {
          return callback(result)
        }
      }
    }
  },
  vaildUtils: validateUtils,
  post: function(url, data, success, exMethod, finallyMethod) {
    // var loadCover = Loading.service({
    //   'fullscreen': true
    // })
    axios.post(url, data, {
        headers: {
          "Specify-Request-Type":
            "application/x-www-form-urlencoded;charset=utf-8"
        }
      })
      .then(function(response) {
       // loadCover.close();
        if (response.data.respStatus > 0) {
          // Message({"message":"请求成功","type":"success"});
          if (success) {
            success.call(this, response.data.body);
          }
        } else {
          Message({ message: response.data.body.message, type: "error" });
          if (exMethod) {
            exMethod.call(this, "service", response.data.body);
          }
        }
        if (finallyMethod) {
          finallyMethod();
        }
      })
      .catch(function(ex) {
        console.error(ex);
   //     loadCover.close(); // console.log([ex]);
        Message({ message: ex.message, type: "error" });
        if (exMethod) {
          exMethod.call(this, "system", ex);
        }
        if (finallyMethod) {
          finallyMethod();
        }
      });
  },
  syncPost: function(url, data, success, exMethod) {
    ajax_hook.hookAjax({ 'open': function(arg, xhr) {
      console.log(arg)
      arg[2] = false
    } })
    this.post(url, data, success, exMethod, function() {
      ajax_hook.unHookAjax()
    })
  },
  syncRequetBody: function(url, data, success, exMethod) {
    ajax_hook.hookAjax({ 'open': function(arg, xhr) {
      arg[2] = false
    } })
    this.requestBody(url, data, success, exMethod, function() {
      ajax_hook.unHookAjax()
    })
  },
  requestBody: function(url, data, success, exMethod, finallyMethod) {
    // var loadCover = Loading.service({
    //   'fullscreen': true
    // })
    data['content_type'] = 'application/json'
    axios.post(url, data).then(function(response) {
    //  loadCover.close()
      if (response.data.respStatus > 0) {
        // Message({"message":"请求成功","type":"success"});
        if (success) {
          success.call(this, response.data.body)
        }
      } else {
        Message({
          'message': response.data.body.message,
          'type': 'error'
        })
        if (exMethod) {
          exMethod.call(this, 'service', response.data.body)
        }
      }
      if (finallyMethod) {
        finallyMethod()
      }
    }).catch(function(ex) {
      console.error(ex)
     // loadCover.close() // console.log([ex]);
      Message({
        'message': ex.message,
        'type': 'error'
      })
      if (exMethod) {
        exMethod.call(this, 'system', ex)
      }
      if (finallyMethod) {
        finallyMethod()
      }
    })
  },
  msgInfo: function(msg) {
    Message({
      'message': msg,
      'type': 'warning'
    })
  },
  assembleComponent: function(dataStore, dictKey, instance, format) {
    if (!dataStore[dictKey] || !instance) {
      return
    }
    instance.pushAllByFormat(dataStore[dictKey], format)
  }
}
/**
 * 工具方法类，定义一些常用的工具集
 */
export default commonUtils
