// 验证器包装  执行 npm install validdator 安装第三方库

import valid from 'validator'

var validdator = {
  isDefined: function(val) {
	 if (typeof val === 'undefined') {
      return this.message + '不能为空'
    } else {
      return true
    }
  },
  isEmpty: function(val, itemsResolver, validator) {
  	var msg = true
  	if ((msg = validator.isDefined.call(this, val, itemsResolver, validator)) !== true) {
  		return msg
  	}
    if (!valid.isEmpty(val)) {
      return true
    } else {
      return this.message + '不能为空'
    }
  },
  IsEmail: function(val) {
    if (valid.IsEmail(val)) {
      return true
    } else {
      return this.message + '格式不正确'
    }
  },
  isMobilePhone: function(val) {
    // isMobilePhone（str，locale [，options]）options是一个可选对象，可以提供以下按键：strictMode，如果设置为true，手机号码必须提供国家代码，因此必须以此开头+。
    if (valid.isMobilePhone(val, 'zh-CN')) {
      return true
    } else {
      return this.message + '不是一个合法的中国大陆手机号码'
    }
  },
  isEquals: function() {
    // 相等
    const conf = { str: '', comparison: '' }
    if (valid.equals(this.conf.str, this.conf.comparison)) {
      return true
    } else {
      return this.message + '不相等'
    }
  },
  isLength: function(val) {
    // 检查字符串的长度是否在一个范围内。
    const conf = { min: 0, max: 2 }
    if (valid.isLength(conf)) {
      return true
    } else {
      if (this.conf.min === 0 || this.conf.min === '0') {
        return this.message + '最大长度不能超过' + this.conf.max
      } else {
        return (
          '最小长度不能超过' +
          this.conf.min +
          '，最大长度不能超过' +
          this.conf.max
        )
      }
    }
  },
  isByteLength: function(val) {
    // 检查字符串的长度（UTF-8字节）是否在一个范围内。
    const conf = { min: 0, max: undefined }
    if (valid.isByteLength(conf)) {
      return true
    } else {
      return (
        '最小长度不能超过' +
        this.conf.min +
        '，最大长度不能超过' +
        this.conf.max
      )
    }
  },
  isAlpha: function(val) {
    // 检查字符串是否只包含字母（a-zA-Z）
    if (valid.isAlpha(val)) {
      return true
    } else {
      return this.conf.seed + '不包含包含字母（a-zA-Z）'
    }
  },
  isAlphanumeric: function(val) {
    // 检查字符串是否只包含字母和数字。
    if (valid.isAlphanumeric(val)) {
      return true
    } else {
      return this.message + '不包含字母和数字'
    }
  },
  isNumeric: function(val) {
    // 检查字符串是否只包含数字。
    if (valid.isNumeric(val)) {
      return true
    } else {
      return this.message + '不是完整的数字格式'
    }
  },
  isUppercase: function(val) {
    // 检查字符串是否大写。
    if (valid.isUppercase(val)) {
      return true
    } else {
      return this.message + '不是一个大写的字符串'
    }
  },
  isLowercase: function(val) {
    // 检查字符串是否小写。
    if (valid.isLowercase(val)) {
      return true
    } else {
      return this.message + '不是一个小写的字符串'
    }
  },
  isHexColor: function(val) {
    // 检查字符串是否是十六进制颜色
    if (valid.isHexColor(val)) {
      return true
    } else {
      return this.message + '不是个合法颜色'
    }
  },
  isURL: function(val) {
    // 检查字符串是否是URL。
    if (valid.isURL(val)) {
      return true
    } else {
      return this.message + '不是个合法URL'
    }
  },
  isDataURI: function(val) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    if (valid.isEmpty(val)) {
      return true
    } else {
      return this.message + '不是一个正确数据的URL'
    }
  },
  isIP: function(val) {
    // 检查字符串是否是IP（版本4或6）。isIP（str [，版本]）
    if (valid.isIP(val)) {
      return true
    } else {
      return this.message + '不是一个合法的ip地址'
    }
  },
  isMACAddress: function(val) {
    // 检查字符串是否是MAC地址。

    if (valid.isMACAddress(val)) {
      return true
    } else {
      return this.message + '不是一个合法的MAC地址'
    }
  },

  isISO8601: function(val) {
    // 检查字符串是否是有效的ISO 8601日期。
    if (valid.isISO8601(val)) {
      return true
    } else {
      return this.message + '不是一个合法的ISO 8601日期'
    }
  },
  isBefore: function() {
    // 检查字符串是否是指定日期之前的日期。  valid.isAfter(['2011-08-04', new Date(2011, 8, 10).toString()]),
    const conf = { str: '2011-08-04', date: new Date(2011, 8, 10).toString() }
    if (valid.isBefore(conf)) {
      return true
    } else {
      return this.conf.date + '不是' + this.conf.str + '之前的日期'
    }
  },
  isAfter: function() {
    // 检查字符串是否是指定日期之后的日期（默认为现在）。  valid.isAfter(['2011-08-04', new Date(2011, 8, 10).toString()]),
    const conf = { str: '2011-08-04', date: new Date(2011, 8, 10).toString() }
    if (valid.isAfter(conf)) {
      return true
    } else {
      return this.conf.date + '不是' + this.conf.str + '之后的日期'
    }
  },
  isLatLong: function(val) {
    // 检查字符串是格式lat,long还是有效的纬度 - 经度坐标lat, long。
    if (valid.isLatLong(val)) {
      return true
    } else {
      return this.message + '不是一个有效的纬度 - 经度坐标'
    }
  },
  isJSON: function(val) {
    // 检查字符串是否有效JSON（注意：使用JSON.parse）。
    if (valid.isJSON(val)) {
      return true
    } else {
      return this.message + '不是一个合法的JSON'
    }
  },
  isMD5: function(val) {
    // 检查字符串是否是MD5哈希。
    if (valid.isMD5(val)) {
      return true
    } else {
      return this.message + '不是一个合法的MD5值'
    }
  },
  isHash: function(val) {
    // 检查字符串是否为类型算法的散列。算法是其中之一['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']
    const conf = { str: '', algorithm: 'md5' }
    if (valid.isHash(conf)) {
      return true
    } else {
      return this.conf.str + '不是 一个' + this.conf.algorithm + '类型算法'
    }
  },
  isIn: function() {
    // 检查字符串是否在允许值的数组中。
    const conf = { str: '', values: [] }
    if (valid.isIn(this.conf.str, this.conf.values)) {
      return true
    } else {
      return this.conf.str + '值 不在' + this.conf.values + '数组当中'
    }
  },
  contains: function() {
    // 是否含有 str：目标值，seed：要检查的值
    const conf = { str: '', seed: '' }
    if (valid.contains(this.conf.str, this.conf.seed)) {
      return true
    } else {
      return this.conf.seed + '值 不在' + this.conf.str + '当中'
    }
  },
  matches: function(val) {
    // 检查字符串是否匹配模式。matches('foo', /foo/i) or matches('foo', 'foo', 'i').
    // TODO://未做测试
    const conf = { str: '', pattern: [] }
    if (valid.matches(this.conf.str, this.conf.seed)) {
      return true
    } else {
      return this.conf.seed + '值 不在' + this.conf.str + '当中'
    }
  } }

// 对象验证方式
// TODO://
/*
  IsEmailforObject: {
    type: function (val) {
      if (valid.IsEmail(val)) {
        return true
      } else {
        return this.message + '格式不正确'
      }
    }
  },
  isEmptyforObject: {
    type: function (val) {
      if (valid.isEmpty(val)) {
        return true
      } else {
        return this.message + '不能为空'
      }
    }
  }
}
*/
export default validdator
