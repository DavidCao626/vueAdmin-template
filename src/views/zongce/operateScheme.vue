<template>
  <div>
    <page>
      <div slot="title">
        计划模版
      </div>

      <div slot="panel">
        <div>
          <el-form :model="formInline" class="demo-form-inline">
            <el-form-item label="名称：" v-state-show="1">
              <el-input v-model="formInline.name" placeholder="模版名称" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用:" v-state-show="1">
              <el-radio-group v-model="formInline.isok" size="mini">
                <el-radio-button label="Y">是</el-radio-button>
                <el-radio-button label="N">否</el-radio-button>
              </el-radio-group>
            </el-form-item>

          </el-form>
        </div>

        <!-- <el-scollbar>  -->
        <div style="overflow:scroll">
          <div class="wrapper">
            <zc-tree-node v-for="(child,index) in node[props.children]" :props="props" :serviceType="serviceType" :ShowStateBit="ShowStateBit" :node="child" :key="index" :class="node[props.children].length==1?'sole':''">
            </zc-tree-node>
          </div>
        </div>

        <!-- </el-scollbar>  -->

      </div>

    </page>


      <!-- <div class="footer-toolbar__messages">
        <el-popover placement="top" width="200" trigger="hover" title="表单验证结果">

          <div style="color:red;"> e-1-1项目下的所有子节点占比不能超过1
          </div>
          <i class="el-icon-warning" slot="reference"> 3</i>
        </el-popover>

      </div> -->
    </div>

    <div class="approval-panel  footer-toolbar clearfix" v-if="serviceType==1">
      <div class="footer-toolbar__tools">
        <!-- <el-button plain>取消</el-button> -->
        <el-button type="primary" @click="collegeBT">保存</el-button>
        <el-button type="primary" v-if="opType =='U'" @click="saveAsSchemeA">另存为</el-button>
        <el-button type="primary" @click="goDetail">维护分值项</el-button>
      </div>

      <!-- <div class="footer-toolbar__messages">
        <el-popover placement="top" width="200" trigger="hover" title="表单验证结果">

          <div style="color:red;"> e-1-1项目下的所有子节点占比不能超过1
          </div>
          <i class="el-icon-warning" slot="reference"> 3</i>
        </el-popover>

      </div> -->
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
          code: "code",
          include: "include", //是否包含科目项,
          leaf: "leaf",
          hcChildren: "hcItems", //存学院的树
          hcName: "name",
          hcCode: "code",
          hcLeaf: "leaf",
          hcScoreValue: "scoreValue"
        };
      }
    }
  },
  data() {
    return {
      /* 
      *  ShowStateBit权限控制位， v-state-show中的值（所属权限1不可用 2可用）会与该值 进行按位与运算 如果结果等于0则隐藏；
      *  例：1(0x1)为学院权限 3(0x10)为学校权限；
      *  ShowStateBit路由加载回来进行赋值 ；
      *  算法详解：https://www.cnblogs.com/shipengfei/p/5996270.html
     */
      ShowStateBit: 3,
      opType: "A", //增加
      serviceType: 0,
      schemeId: null, //方案 id
      id: null, //类别id
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
      addAppraiseCategory: store.namespace + "/addAppraiseCategory",
      getAppraiseCategory: store.namespace + "/getAppraiseCategory",
      updateAppraiseCategory: store.namespace + "/updateAppraiseCategory",
      addScheme: store.namespace + "/addScheme",
      getStandardScheme: store.namespace + "/getStandardScheme",
      updateScheme: store.namespace + "/updateScheme",
      saveAsScheme: store.namespace + "/saveAsScheme"
    }),
    saveAsSchemeA() {
      var name = JSON.parse(JSON.stringify(this.formInline.name));
      var available = JSON.parse(JSON.stringify(this.formInline.isok));
      var template = JSON.parse(JSON.stringify(this.node));
      var schemeId = JSON.parse(JSON.stringify(this.schemeId));
      var requestData = {
        schemeId: schemeId,
        name: name,
        available: available,
        template: template
      };
      requestData.template.items = this.node.childItems.slice();
      delete requestData.template.name;
      delete requestData.template.ratio;
      delete requestData.template.orientation;
      delete requestData.template.childItems;

      this.saveAsScheme(requestData).then(response => {
        this.$message.success("更新成功");
        this.$router.go(-1);
      });
    },
    goDetail(){
        if (this.opType == "A") {
        //增加
        console.log(["onSubmt", this.node]);
        var name = JSON.parse(JSON.stringify(this.formInline.name));
        var available = JSON.parse(JSON.stringify(this.formInline.isok));
        var template = JSON.parse(JSON.stringify(this.node));
        var id = JSON.parse(JSON.stringify(this.id));
        var requestData = {
          categoryId: id,
          name: name,
          available: available,
          template: template
        };
        requestData.template.items = this.node.childItems.slice();
        delete requestData.template.name;
        delete requestData.template.ratio;
        delete requestData.template.orientation;
        delete requestData.template.childItems;

        this.addScheme(requestData).then(response => {
          console.log(response);
           this.schemeId = response.resBody.id;
          this.$message.success("保存成功");
          this.$router.push({
            path:"/zongce/zongce2",
            query:{
              schemeId:this.schemeId
            }
          })
        });
      } else {
        //更新
        console.log(["onSubmt", this.node]);
        var name = JSON.parse(JSON.stringify(this.formInline.name));
        var available = JSON.parse(JSON.stringify(this.formInline.isok));
        var template = JSON.parse(JSON.stringify(this.node));
        var schemeId = JSON.parse(JSON.stringify(this.schemeId));
        var requestData = {
          schemeId: schemeId,
          name: name,
          available: available,
          template: template
        };
        requestData.template.items = this.node.childItems.slice();
        delete requestData.template.name;
        delete requestData.template.ratio;
        delete requestData.template.orientation;
        delete requestData.template.childItems;
        this.updateScheme(requestData).then(response => {
          this.schemeId = response.resBody.id;
          this.$message.success("更新成功");
           this.$router.push({
            path:"/zongce/zongce2",
            query:{
              schemeId:this.schemeId
            }
          })
        });
      }
    },
    collegeBT() {
      if (this.opType == "A") {
        //增加
        console.log(["onSubmt", this.node]);
        var name = JSON.parse(JSON.stringify(this.formInline.name));
        var available = JSON.parse(JSON.stringify(this.formInline.isok));
        var template = JSON.parse(JSON.stringify(this.node));
        var id = JSON.parse(JSON.stringify(this.id));
        var requestData = {
          categoryId: id,
          name: name,
          available: available,
          template: template
        };
        requestData.template.items = this.node.childItems.slice();
        delete requestData.template.name;
        delete requestData.template.ratio;
        delete requestData.template.orientation;
        delete requestData.template.childItems;

        this.addScheme(requestData).then(response => {
          console.log(response);
           this.schemeId = response.resBody.id;
          this.$message.success("保存成功");
          this.$router.go(-1);
        });
      } else {
        //更新
        console.log(["onSubmt", this.node]);
        var name = JSON.parse(JSON.stringify(this.formInline.name));
        var available = JSON.parse(JSON.stringify(this.formInline.isok));
        var template = JSON.parse(JSON.stringify(this.node));
        var schemeId = JSON.parse(JSON.stringify(this.schemeId));
        var requestData = {
          schemeId: schemeId,
          name: name,
          available: available,
          template: template
        };
        requestData.template.items = this.node.childItems.slice();
        delete requestData.template.name;
        delete requestData.template.ratio;
        delete requestData.template.orientation;
        delete requestData.template.childItems;

        this.updateScheme(requestData).then(response => {
          this.schemeId = response.resBody.id;
          this.$message.success("更新成功");
          this.$router.go(-1);
        });
      }
    } 
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.serviceType =1;
        if (to.query.id == null) {
          vm.$message.error("参数不正确");
          vm.$router.go(-1);
        }
        vm.id = to.query.id;

        vm.ShowStateBit = 1;
        //学院
        vm.opType = "A";
        if (to.query.schemeId) {
          vm.opType = "U"; //更新，根据schemeId查
          vm.schemeId = to.query.schemeId;

          //----执行查找
          vm
            .getStandardScheme({ categoryId: vm.id, schemeId: vm.schemeId })
            .then(response => {
              console.log(["getStandardScheme", response]);
              vm.opType = "U"; //更新
              vm.id = to.query.id;
              var res = response.resBody;
              vm.node = res.template;
              vm.node.name = "这是不显示的节点";
              vm.node.ratio = 0;
              vm.node.orientation = 1;
              vm.node.childItems = res.template.items;
              vm.formInline = {
                name: res.name,
                isok: res.available
              };
            });
        } else {
          //增加
          vm.getAppraiseCategory({ id: to.query.id }).then(response => {
            console.log(["getAppraiseCategory", response]);
            vm.id = to.query.id;
            var res = response.resBody;
            vm.node = res.template;
            vm.node.name = "这是不显示的节点";
            vm.node.ratio = 0;
            vm.node.orientation = 1;
            vm.node.childItems = res.template.items;
            vm.formInline = {
              name: "请输入方案名称",
              isok: res.available
            };
          });
        }
    });
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
