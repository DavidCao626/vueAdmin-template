<style  scoped>
.block {
  /* max-width: 1000px;
  margin: 50px auto; */
  background-color: #fff;
  border: 1px solid #d2d2d2;
}
.block-left {
  padding: 10px;
  border-right: 1px solid #d2d2d2;
  background: #f4f7fa;
  height: 810px;
}
.block-right {
  padding: 15px;
  padding-left: 30px;
  height: 810px;
}
.block-right__noBody {
  text-align: center;
  font-size: 24px;
  font-weight: 200;
  margin-top: 35%;
}
.block-header {
  font-size: 16px;
  font-weight: 500;
  height: 22px;
}
.block-header h3 {
  height: 0px;

  line-height: 14px;
  font-size: 20px !important;
}
.block-nav {
}
.block-line {
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #d2d2d2;
}
.block-line__hide {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-tree {
  background: no-repeat;
}
.approval-panel {
  margin-bottom: 15px;
}
</style>

<template>
  <page :Breadcrumb="false">
    <div slot="title">
      <el-button icon="el-icon-arrow-left" @click="go(-1)" plain>返回</el-button>
    </div>
    <div slot="panel" style="">
      <div class="block">

        <el-dialog title="新增科目项" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" label-position="top" label-width="100px">
            <el-form-item label="科目项名称：">
              <el-input size="medium" placeholder="输入科目项名称" v-model="addlabel"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
            <el-button type="primary" @click="addNode(nodeObj,addlabel)" size="medium">确 定</el-button>
          </span>
        </el-dialog>

        <el-row>
          <el-col :span="6">
            <div class="block-left">
              <div class="block-header">
                <i class="el-icon-menu"></i> 分值科目列表</div>
              <div class="block-line"></div>
              <div class="block-nav">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>

                <el-tree ref="tree2" :indent="26" :highlight-current="true" :props="treeProps" :data="data" :filter-node-method="filterNode" node-key="id" :default-expanded-keys="[1]" default-expand-all @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="18" style="background-color:#f4f7fa">
            <div class="block-right ">

              <div class="block-header" style="margin-top: 10px;">
                <h3>{{ nodeObj.name }}
                  <el-button style="" type="text" v-show="nodeObj && nodeObj.name=='学生处分'" icon="el-icon-plus" @click="add()" size="mini">增加条目</el-button>
                </h3>
              </div>
              <div class="block-line"></div>
              <template v-if="formData.evalItems.length>0">
                <el-tree style="margin-top: 20px;" :highlight-current="true" :data="formData.evalItems" :props="{children:'list'}" default-expand-all :expand-on-click-node="false">
                  <span slot-scope="{ node, data }" class="item">
                    <template v-if="getNodeType(data)==1">

                      <span>
                        {{ data.node.name }}：
                        <el-input-number size="mini" v-model="data.node.ratio">
                        </el-input-number>&nbsp;&nbsp;分
                        <!-- <el-row>
                        <el-col :span="6">
                         {{ data.node.name }}
                        </el-col>
                        <el-col :span="12">
                          <el-slider v-model="data.node.ratio" size="mini" show-input>
                          </el-slider>
                        </el-col>
                      </el-row> -->

                      </span>
                      <span style="float: right;">

                        <el-button type="text" size="mini" @click="() => addOfEvalItems(data)">
                          <i class="el-icon-plus"></i>
                        </el-button>
                      </span>

                    </template>
                    <template v-if="getNodeType(data)==3">
                      <span>
                        {{ data.name }}
                      </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <el-input-number size="mini" v-model="data.score"></el-input-number>
                      </span>&nbsp;&nbsp;分
                      <span style="float: right;">
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </span>
                    </template>

                  </span>
                </el-tree>
                <el-button size="small" style="margin-left: 25px;" type="primary" @click="onSaveEvalItems">保存所有配置</el-button>
              </template>
              <template v-if="formData.CapacityItems.length>0">
                <el-tree style="margin-top: 20px;" :highlight-current="true" :data="formData.CapacityItems" :props="{children:'list'}" default-expand-all :expand-on-click-node="false">
                  <span slot-scope="{ node, data }" class="item">
                    <template v-if="getNodeType(data)==1">
                      <span>
                        {{ data.node.name }}
                      </span>：
                      <span>
                        <el-input-number size="mini" v-model="data.node.ratio"></el-input-number>&nbsp;&nbsp;分
                      </span>
                      <span style="float: right;">

                        <el-button type="text" size="mini" @click="() => append(data)">
                          <i class="el-icon-plus"></i>
                        </el-button>
                      </span>

                    </template>
                    <template v-if="getNodeType(data)==2">
                      <span>
                        {{ data.name }}
                      </span>
                      <span style="float: right;">
                        <el-button type="text" size="mini" @click="() => append(data)">
                          <i class="el-icon-plus"></i>
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </span>
                    </template>
                    <template v-if="getNodeType(data)==3">
                      <span>
                        {{ data.name }}
                      </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <el-input-number size="mini" v-model="data.score"></el-input-number>
                      </span>&nbsp;&nbsp;分
                      <span style="float: right;">
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </span>
                    </template>
                  </span>
                </el-tree>
                <el-button size="small" style="margin-left: 25px;" type="primary" @click="onSaveCapacityItems">保存所有配置</el-button>
              </template>
              <template v-if="formData.InnovateItems.length>0">
                <el-tree style="margin-top: 20px;" :highlight-current="true" :data="formData.InnovateItems" :props="{children:'list'}" default-expand-all :expand-on-click-node="false">
                  <span slot-scope="{ node, data }" class="item">
                    <template v-if="getNodeType(data)==1">
                      <span>
                        {{ data.node.name }}
                      </span>：
                      <span>
                        <el-input-number size="mini" v-model="data.node.ratio"></el-input-number>&nbsp;&nbsp;分
                      </span>
                      <span style="float: right;">

                        <el-button type="text" size="mini" @click="() => append(data)">
                          <i class="el-icon-plus"></i>
                        </el-button>
                      </span>

                    </template>
                    <template v-if="getNodeType(data)==2">
                      <span>
                        {{ data.name }}
                      </span>
                      <span style="float: right;">
                        <el-button type="text" size="mini" @click="() => append(data)">
                          <i class="el-icon-plus"></i>
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </span>
                    </template>
                    <template v-if="getNodeType(data)==3">
                      <span>
                        {{ data.name }}
                      </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span>
                        <el-input-number size="mini" v-model="data.score"></el-input-number>
                      </span>&nbsp;&nbsp;分
                      <span style="float: right;">
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </span>
                    </template>
                  </span>
                </el-tree>
                <el-button size="small" style="margin-left: 25px;" type="primary" @click="onSaveInnovateItems">保存所有配置</el-button>
              </template>
              <template v-if="formData.PunishItems.length>0">
                <el-tree style="margin-top: 20px;" :highlight-current="true" :data="formData.PunishItems" :props="{children:'list'}" default-expand-all :expand-on-click-node="false">
                  <span slot-scope="{ node, data }" class="item">

                    <span>
                      {{ data.name }}
                    </span>：
                    <span>
                      <el-input-number size="mini" v-model="data.score"></el-input-number>&nbsp;&nbsp;分
                    </span>
                    <span style="float: right;">

                      <el-button type="text" size="mini" @click="() => removeChufen(node, data)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                    </span>
                  </span>
                </el-tree>
                <br/>
                <el-button size="small" style="margin-left: 25px;" @click="onSavePunishItems" type="primary">保存所有配置</el-button>
              </template>
            </div>

          </el-col>
        </el-row>

      </div>
    </div>
  </page>

</template>

<script>
// import zongceCollapse from "./zongce2_collapse.vue";
import scheme from "../_mixin/scheme.js";
import moment from "moment";
export default {
  mixins: [scheme],
  props: {
    props: {
      type: Object,
      default() {
        return {
          id: "id",
          label: "label",
          type: "type",
          children: "children",
          enable: "enable",
          ratio: "ratio"
        };
      }
    }
  },
  components: {
    // zongceCollapse
  },
  data() {
    return {
      ShowStateBit: 1, //权限位
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      schemeId: 0,
      addlabel: "",
      dialogVisible: false,
      nodeObj: { label: "我的学校", id: 1, type: 1 }, //当前点击节点
      filterText: "",
      data: [],
      kemuList: [],
      treeProps: {
        children: "behaviors",
        label: "name"
      },
      formData: {
        evalItems: [],
        CapacityItems: [],
        InnovateItems: [],
        PunishItems: []
      },
      id: 45
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    go(s) {
      this.$router.go(s);
    },
    addOfEvalItems(data) {
      this.$prompt("请输入条目名称", "新增下级", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        debugger;
        data.list.push({
          esCode: null,
          code: null,
          name: value,
          score: 0
        });
      });
    },
    onSavePunishItems() {
      this.savePunishItems(
        {
          punishId: this.id,
          itemBean: {
            itemBeans: this.formData.PunishItems
          }
        }.then(r => {
          this.$message.success("保存成功");
        })
      );
    },
    onSaveEvalItems() {
      debugger;
      this.saveEvalItems({
        schemeId: this.id,
        eveluateBean: {
          list: this.formData.evalItems
        }
      }).then(r => {
        this.$message.success("保存成功");
      });
    },
    onSaveCapacityItems() {
      this.saveCapacityItems({
        schemeId: this.id,
        expandEvalBean: {
          list: this.formData.CapacityItems
        }
      }).then(r => {
        this.$message.success("保存成功");
      });
    },
    onSaveInnovateItems() {
      this.saveInnovateItems({
        schemeId: this.id,
        expandEvalBean: {
          list: this.formData.InnovateItems
        }
      }).then(r => {
        this.$message.success("保存成功");
      });
    },
    removeChufen(node, data) {
      //var parent = node.parent.data;

      this.formData.PunishItems.splice(
        this.formData.PunishItems.indexOf(data),
        1
      );
    },
    add() {
      this.$prompt("请输入条目名称", "新增下级", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        this.formData.PunishItems.push({
          name: value,
          code: null,
          relevanceAppraise: true,
          state: "EF",
          score: 0
        });
      });
    },
    remove(node, data) {
      let parent = node.parent.data;
      parent.list.splice(parent.list.indexOf(data), 1);
    },
    append(data) {
      if (this.getNodeType(data) == 2) {
        this.$prompt("请输入条目名称", "新增下级", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value }) => {
          data.list.push({
            code: 0,
            name: value,
            score: 0
          });
        });
      } else {
        this.$prompt("请输入项目名称", "新增下级", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({ value }) => {
          data.list.push({
            name: value,
            list: []
          });
        });
      }
    },
    getNodeType(nodeData) {
      if (nodeData.hasOwnProperty("node")) {
        return 1;
      } else if (nodeData.hasOwnProperty("score")) {
        return 3;
      } else {
        return 2;
      }
    },
    addKmBT() {
      this.checkState().then(res => {
        if (!res) {
          return;
        }
        this.dialogVisible = true;
      });
    },
    checkState() {
      return new Promise(resolve => {
        this.getSchemeEnableUpdateState({ schemeId: this.schemeId }).then(
          response => {
            var res = response.resBody;
            if (res.state == false) {
              //当前状态不可更新
              //需要另存为
              this.$message.error("此方案已经被使用，请另存为后修改");
              //  return false;
              resolve(false);
            } else {
              resolve(true);
            }
          }
        );
      });
    },
    getData() {
      this.getItemsTree().then(response => {
        this.data = [];
        var res = response.resBody.statics;
        let root = [];
        root.push({
          behaviors: res,
          name: "综合测评条目管理"
        });
        this.data = root;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.treeProps["label"]].indexOf(value) !== -1;
    },
    handleNodeClick(data, nodeObj) {
      this.formData = {
        nodeData: {},
        evalItems: [],
        CapacityItems: [],
        InnovateItems: [],
        PunishItems: []
      };
      this.nodeObj = data;
      switch (data["code"]) {
        case ("ES01", "ES02"):
          //扩展素质评价
          return;
        case "ED0201":
          //学生考评
          this.getEvalItems({ schemeId: this.id }).then(r => {
            this.formData.evalItems = r.resBody.list;
          });
          break;
        case "ED0202":
          //学生处分
          this.getPunishItems({ schemeId: this.id }).then(r => {
            if (r.resBody == null) {
              return;
            }
            this.formData.PunishItems = r.resBody.itemBeans;
          });
          break;
        case "ED0101":
          //能力评价
          this.getCapacityItems({ schemeId: this.id }).then(r => {
            this.formData.CapacityItems = r.resBody.list;
          });
          break;
        case "ED0102":
          //创新评价
          this.getInnovateItems({ schemeId: this.id }).then(r => {
            this.formData.InnovateItems = r.resBody.list;
          });
          break;
        default:
          return;
      }
    },
    onNodeDel(nodeData) {
      this.checkState().then(res => {
        if (!res) {
          return;
        }
        if (nodeData.scoreList && nodeData.scoreList.length > 0) {
          this.$message.error("包含子节点的节点不能删除");
        } else {
          this.$confirm("此操作将永久删除该节点, 是否继续?", "删除节点", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //删除
              this.deleteItem({ itemId: nodeData.item.id }).then(response => {
                this.kemuList.splice(this.kemuList.indexOf(nodeData), 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              });
            })
            .catch(() => {
              // this.$message({
              //   type: "info",
              //   message: "已取消删除"
              // });
            });
        }
      });
    },
    addNode(nodeObj, label) {
      this.checkState().then(res => {
        if (!res) {
          return;
        }

        console.log(["增加之前的kemulist", this.kemuList]);
        var requestData = {
          name: label,
          subjectCode: nodeObj.id,
          schemeId: this.schemeId
        };
        this.addItem(requestData).then(response => {
          var temp = {
            item: response.resBody,
            scoreList: []
          };
          this.kemuList.push(temp);
          this.dialogVisible = false;
          this.addlabel = "";
          this.$message({
            message: "恭喜你，添加成功",
            type: "success"
          });
          console.log(["增加之后的kemulist", this.kemuList]);
        });

        //   this.kemuList.push({ [this.props["label"]]: this.addlabel });

        // 真实情况触发ajax插入
        //nodeObj.children.push({ label: label, children: [] });
      });
    }
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      if (!to.query.schemeId) {
        // vm.$message.error("参数不正确");
        // vm.$router.go(-1);
        // returnl;
      }
      vm.id = to.query.id;
      vm.schemeId = to.query.schemeId;
      vm.getData();
    });
  }
};
</script>

<style>
</style>
