<template>

  <div class="entry">

    <div class="label">

      <el-popover placement="top" width="260" v-model="visible2">
        <div style="margin-top:10px">
          <el-form label-position="left" label-width="100px" :model="formLabelAlign" size="mini">
            <el-form-item label="名称:" v-state-show="2">
              <el-input v-model="node[props.lable]"></el-input>
            </el-form-item>
            <el-form-item label="占比(%):" v-state-show="1">
              <!-- <el-input maxlength="5" v-model="node[props.proportion]"></el-input> -->
                <el-slider v-model="node[props.proportion]"></el-slider>
            </el-form-item>
            <el-form-item label="方向:" v-state-show="2">
              <el-radio-group v-model="node[props.direction]" size="mini">
                <el-radio-button label="1">正</el-radio-button>
                <el-radio-button label="0">负</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="包含科目项:">
              <el-radio-group v-model="node[props.include]" size="mini">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="reference">
          {{ nodeLable(node[props.lable]) }}({{ node[props.proportion] }})
          <span style="font-size:10px" v-if="node[props.direction]=='1'">正</span>
          <span style="color:red;font-size:10px" v-else>负</span>
          &nbsp;
          <i class="el-icon-edit-outline"  style="color:#7b7b7b"></i>
        </span>

      </el-popover>

      <i class="el-icon-delete" @click="del(node)" style="color:#7b7b7b" v-if="serviceType == 0"></i>
      <i class="el-icon-circle-plus-outline" style="color:#7b7b7b;" @click="add(node)" v-if="serviceType == 0 ||node[props.leaf]"></i>
    </div>
    <template v-if="node[props.children].length>0 || (node[props.hcChildren]&&node[props.hcChildren].length>0)">

      <template v-if="serviceType == 0">
        <div class="branch">
          <component v-bind:is="which_to_show" :serviceType="serviceType" v-for="(child,index)  in node[props.children]" :ShowStateBit="ShowStateBit" :node="child" :getNodeType="0" :key="index" :props="props" :class="node[props.children].length==1?'sole':''"></component>
        </div>
      </template>

      <template v-else>
        <div class="branch" v-if="node[props.leaf]">
          <component v-bind:is="which_to_show" v-for="(child,index)  in node[props.hcChildren]" :ShowStateBit="ShowStateBit" :node="child" :getNodeType="1" :key="index" :props="props" :class="node[props.hcChildren].length==1?'sole':''"></component>
        </div>
        <div class="branch" v-else>

          <component v-bind:is="which_to_show" :serviceType="serviceType" v-for="(child,index)  in node[props.children]" :ShowStateBit="ShowStateBit" :node="child" :getNodeType="0" :key="index" :props="props" :class="node[props.children].length==1?'sole':''"></component>
        </div>
      </template>

    </template>
  </div>
</template>

<script>
import treeType1 from "./tree_type_1";

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
    },
    serviceType: {
      type: Number
      //default: 1
    },
    getNodeType: {
      //获取要新建下级节点的类型 0: tree.vue;   1: tree_type_1.vue; 。
      type: Number,
      default: 1
    },

    ShowStateBit: {
      type: Number,
      default: 3
    }
  },
  components: {
    "tree-type-1": treeType1
  },
  data() {
    return {
      visible2: false,

      formLabelAlign: {
        name: "",
        region: "",
        type: 1
      }
    };
  },
  computed: {
    which_to_show() {
      //  this.getNodeType = this.serviceType;
      if (!this.node[this.props.leaf] || this.node[this.props.leaf] == false) {
        return "ZcTreeNode";
      } else {
        if (this.serviceType == 0) {
          return "ZcTreeNode";
        }
        if (this.serviceType == 1) {
          return "tree-type-1";
        }
      }
    }
  },
  methods: {
    nodeLable(lable) {
      if (lable.length > 6) {
        return lable.substring(0, 6) + "...";
      } else {
        return lable;
      }
    },
    add(node) {
      let addNewNode;
      //如果操作者是学校，，那么push新增节点学校（类型0 模版tree.vue）节点所需数据
      if (this.serviceType == 0) {
        addNewNode = {
          [this.props.lable]: "新节点",
          [this.props.direction]: 1,
          [this.props.children]: [],
          [this.props.proportion]: 1,
          [this.props.code]: null,
          [this.props.include]: true
        };
        node[this.props.children].push(addNewNode);
      }

      //如果操作者是学院，那么push学院新增节点的（类型1 模版tree_type_1.vue）数据
      if (this.serviceType == 1) {
        addNewNode = {
          [this.props.hcName]: "学院新节点", //节点名称
          [this.props.hcScoreValue]: 80, //分值 《========================================================注意这里测试新增的分值字段，可能会造成后台异常！！！！！
          [this.props.hcCode]: null,
          [this.props.hcLeaf]: true
        };
        node[this.props.hcChildren].push(addNewNode);
      }
    },
    del(node) {
      if (node[this.props.children] && node[this.props.children].length > 0) {
        this.$message.error("包含子节点的节点不能删除");
      } else {
        this.node["isDel"] = true;
        let parentChildrens;
        if (this.$parent.node) {
          parentChildrens = this.$parent.node[this.props.children];
        } else {
          parentChildrens = this.$parent.$parent.node[this.props.children];
        }
        parentChildrens.forEach(e => {
          if (e.isDel) {
            parentChildrens.splice(parentChildrens.indexOf(e), 1);
          }
        });
      }
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

$label-width: 200px; //label字段长度
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

