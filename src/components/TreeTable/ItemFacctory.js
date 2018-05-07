import Vue from 'vue'
var databuilder = function() {
  var marLTemp = []
  return function (record, parent, item) {
    //debugger
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', false)
    }
    let _level = 1
    if (parent) {
      _level = parent._level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
      // 如果父元素有偏移量，需要计算在this的偏移量中
      // 偏移量还与前面同级元素有关，需要加上前面所有元素的长度和
      if (!marLTemp[_level]) {
        marLTemp[_level] = 0
      }
      Vue.set(record, '_marginLeft', marLTemp[_level] + parent._marginLeft)
      Vue.set(record, '_width', record[item] / parent[item] * parent._width)
      // 在本次计算过偏移量后加上自己长度，以供下一个元素使用
      marLTemp[_level] += record._width
    } else {
      // 如果为根
      // 初始化偏移量存储map
      marLTemp[record.id] = []
      // map中是一个数组，存储的是每级的长度和
      // 初始情况下为0
      marLTemp[record.id][_level] = 0
      Vue.set(record, '_marginLeft', 0)
      Vue.set(record, '_width', 1)
    }
    return record
  }
}

var result = databuilder()

export default result
