<template>
  
  <div class="entry">
    <div class="label">
      {{ node.lable }}{{ formLabelAlign.region }} &nbsp;&nbsp;
      <i class="el-icon-remove" @click="del(node)" style="color:#bbb"></i>
      <el-popover placement="top" width="260" v-model="visible2">
        <div style="margin-top:10px">
          <el-form label-position="left" label-width="50px" :model="formLabelAlign" size="mini">
            <el-form-item label="名称:">
              <el-input v-model="node[props.lable]"></el-input>
            </el-form-item>
            <el-form-item label="占比:">
              <el-input v-model="node[props.proportion]"></el-input>
            </el-form-item>
            <el-form-item label="方向:">
              <el-radio-group v-model="node[props.direction]" size="mini">
                <el-radio-button label="正"></el-radio-button>
                <el-radio-button label="负"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <el-button slot="reference" type="text" size="mini" class="el-icon-info" style="color:#bbb"></el-button>
      </el-popover>

      <i class="el-icon-circle-plus" style="color:#bbb;" @click="add(node)"></i>
    </div>
    <template v-if="node.children.length>0 ">
      <div :class="['branch']">

        <zc-tree-node v-for="(child,index)  in node.children" :node="child" :key="index" :class="node.children.length==1?'sole':''">
        </zc-tree-node>

      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "ZcTreeNode",

  componentName: "ZcTreeNode",
  props: {
    props: {
      type: Object,
      default() {
        return {};
      }
    },
    node: {
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      visible2: false,
      formLabelAlign: {
        name: "",
        region: "",
        type: "正"
      }
    };
  },
  methods: {
    add(node) {
      node.children.push({
        lable: "+++",
        children: []
      });
    },
    del(node) {
      if (node.children && node.children.length > 0) {
        this.$message.error("包含子节点的节点不能删除");
      } else {
        this.node["isDel"] = true;
        let parentChildrens = this.$parent.node.children;
        parentChildrens.forEach(e => {
          if (e.isDel) {
            parentChildrens.splice(parentChildrens.indexOf(e), 1);
          }
        });
      }
      //console.log(this.$root);
    }
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
//------- {{ Variables }} -------//

$white: #7b7b7b;
$bg: #fff;

$horizontal-gutter: 40px;
$border-radius: 10px;

$entry-min-height: 60px;

$label-width: 180px;
$label-height: 30px;
$label-border-radius: 5px;

//------- {{ Styles }} -------//

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  min-width: 1200px;
  margin: 0;
  padding: 50px;
  color: $white;
  font: 16px Verdana, sans-serif;
  background: $bg;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#wrapper {
  position: relative;
}

.branch {
  position: relative;
  margin-left: $horizontal-gutter + $label-width;
  &:before {
    content: "";
    width: $horizontal-gutter / 2;
    border-top: 2px solid $white;
    position: absolute;
    left: -$horizontal-gutter;
    top: 50%;
    margin-top: 1px;
  }
}

.entry {
  position: relative;
  min-height: $entry-min-height;
  &:before {
    content: "";
    height: 100%;
    border-left: 2px solid $white;
    position: absolute;
    left: -($horizontal-gutter / 2);
  }
  &:after {
    content: "";
    width: $horizontal-gutter / 2;
    border-top: 2px solid $white;
    position: absolute;
    left: -($horizontal-gutter / 2);
    top: 50%;
    margin-top: 1px;
  }
  &:first-child {
    &:before {
      width: $border-radius;
      height: 50%;
      top: 50%;
      margin-top: 2px;
      border-radius: $border-radius 0 0 0;
    }
    &:after {
      height: $border-radius;
      border-radius: $border-radius 0 0 0;
    }
  }
  &:last-child {
    &:before {
      width: $border-radius;
      height: 50%;
      border-radius: 0 0 0 $border-radius;
    }
    &:after {
      height: $border-radius;
      border-top: none;
      border-bottom: 2px solid $white;
      border-radius: 0 0 0 $border-radius;
      margin-top: -$border-radius + 1px;
    }
  }
  &.sole {
    &:before {
      display: none;
    }
    &:after {
      width: $horizontal-gutter / 2;
      height: 0;
      margin-top: 1px;
      border-radius: 0;
    }
  }
}

.label {
  display: block;
  min-width: $label-width;
  padding: 5px 10px;
  line-height: $label-height - 5px * 2;
  text-align: center;
  border: 1px solid $white;
  border-radius: $label-border-radius;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -($label-height / 2);
}
</style>

