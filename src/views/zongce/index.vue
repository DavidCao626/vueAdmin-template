<template>
  <div>
    <page>
      <div slot="title">
        计划模版
      </div>

      <div slot="panel">
        <div>
          <el-form :model="formInline" class="demo-form-inline">
            <el-form-item label="名称："v-state-show="2">
              <el-input v-model="formInline.name" placeholder="模版名称" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用:" v-state-show="1">
              <el-radio-group v-model="formInline.isok" size="mini" >
                <el-radio-button label="Y">是</el-radio-button>
                <el-radio-button label="N">否</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="添加配置节点:" v-state-show="2">
              <el-button icon="el-icon-plus" size="mini" plain @click="addRootNode()">添加</el-button>
            </el-form-item>
          </el-form>

        </div>

        <!-- <el-scollbar>  -->
        <div style="overflow:scroll">
          <div class="wrapper">

            <zc-tree-node v-for="(child,index) in node[props.children]" :props="props" :ShowStateBit="ShowStateBit" :getNodeType="0" :node="child" :key="index" :class="node[props.children].length==1?'sole':''">
            </zc-tree-node>
          </div>
        </div>

        <!-- </el-scollbar>  -->

      </div>

    </page>

    <div class="approval-panel  footer-toolbar clearfix">
      <div class="footer-toolbar__tools">
        <el-button plain>取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>

      <div class="footer-toolbar__messages">
        <el-popover placement="top" width="200" trigger="hover" title="表单验证结果">

          <div style="color:red;"> e-1-1项目下的所有子节点占比不能超过1
          </div>
          <i class="el-icon-warning" slot="reference"> 3</i>
        </el-popover>

      </div>
    </div>
  </div>
</template>
<script>
import ZcTreeNode from "./tree";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
export default {
  props: {
    props: {
      default() {
        return {
          children: "childItems", //定义要绑定node对象的哪个字段名：：子节点项
          lable: "name", //定义要绑定node对象的哪个字段名：：名称
          proportion: "ratio", //定义要绑定node对象的哪个字段名：：占比
          direction: "orientation", //定义要绑定node对象的哪个字段名：：方向
          score:"score",//分值
          code: "code"
        };
      }
    }
  },
  data() {
    return {
      /* 
      *  ShowStateBit权限控制位， v-state-show中的值（所属权限）会与该值 进行按位与运算 如果结果等于0则隐藏；
      *  例：1(0x1)为学院权限 3(0x10)为学校权限；
      *  rootShowStateBit路由加载回来进行赋值 ；
      *  算法详解：https://www.cnblogs.com/shipengfei/p/5996270.html
     */
      ShowStateBit:1,
      formInline: {
        name: "",
        isok: "Y"
      },
      visible2: false,
      node: {
        name: "root123",
        ratio: 0,
        orientation: 1,
        childItems: []
      }
    };
  },
  components: {
    ZcTreeNode
  },
  methods: {
    ...mapActions({
      addAppraiseCategory: store.namespace + "/addAppraiseCategory"
    }),
    onSubmit() {
      console.log(["onSubmt", this.node]);
      debugger;
      var requestData = {
        name: this.formInline.name,
        available: this.formInline.isok,
        template: this.node
      };
      this.addAppraiseCategory(requestData).then(response => {
        console.log(response);
      });
    },
    addRootNode() {
      console.log([this.props, ""]);
      this.node[this.props.children].push({
        [this.props.lable]: "新节点",
        [this.props.proportion]: 0,
        [this.props.direction]: 1,
        [this.props.children]: [],
        [this.props.code]: null
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//------- {{ Variables }} -------//

$white: #7b7b7b;
$bg: #fff;

$horizontal-gutter: 40px;
$border-radius: 10px;

$entry-min-height: 60px;

$label-width: 150px;
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

.wrapper {
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
