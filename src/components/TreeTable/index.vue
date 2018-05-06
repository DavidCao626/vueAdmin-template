<template>
  <el-table :data="data" :row-style="showRow" v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.$index}}
      </template>
    </el-table-column>
    <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
        <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index,scope)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{scope.row[column.value]}}
      </template>
    </el-table-column>

    <slot></slot>
  </el-table>
</template>

<script>
import dataBuilder from './ItemFacctory'
import { queryChildTaskNodeBySystemSerialNo } from '~/api/task'
export default {
  name: 'treeTable',
  props: {
    itemDate: {},
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showRow: function(row) {
      let s = null
      if (row.row._level !== 1) {
        s = 'background-color: rgba(255, 186, 29, 0.05);'
      }
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true
      row.row._show = show
      return show
        ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' + s
        : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex, scope) {
      var item1 = {
        No: 'P15256087592557662',
        bgintime: '2018-05-01',
        children: [],
        creater: 'student',
        endtime: '2018-05-22',
        id: undefined,
        nodeTitle: '545645',
        parentNodeNo: null,
        timeLine: 'timeLine',
        type: 'P',
        _expanded: false,
        _level: 1,
        _marginLeft: 0,
        _show: true,
        _width: 1
      }
      //
      var p1 = new Promise((resolve, reject) => {
        this.$emit('getItemDate', scope.row)

        queryChildTaskNodeBySystemSerialNo(scope.row.No).then(response => {
          var l = []
          console.log(response.resBody.dataCount)
          if (response.resBody.data) {
            response.resBody.data.forEach(element => {
              var item = {
                id: element.id,
                nodeTitle: element.nodeTitle,
                type: element.nodeType,
                parentNodeNo: element.parentNodeNo,
                No: element.systemSerialNo,
                creater: element.creater,
                timeLine: element.id,
                bgintime: element.planStartTime,
                endtime: element.planCompleteTime
              }
              if (element.isLeafNode === 'N') {
                item.children = []
              }
              item = dataBuilder.call(item, scope.row, null)
              l.push(item)
            })
            resolve(l)
          } else {
            reject(response)
          }
        })
      })
      p1.then(function(result) {
        this.data.splice(trIndex + 1, 0, result)
        console.log(this.data)
      })
      p1.catch(function(reason) {
        console.log('失败：' + reason)
      })

      const record = this.data[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return index === 0 && record.children
    }
  }
}
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
</style>
