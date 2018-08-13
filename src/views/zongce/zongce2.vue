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
  height: 800px;
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
</style>

<template>
  <page>
    <div slot="title">科目与分值模版</div>
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

                <el-tree ref="tree2" :data="data" :filter-node-method="filterNode" node-key="id" :default-expanded-keys="[1]" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="18" style="background-color:#f4f7fa">
            <template v-if="nodeObj[props['type']]=='rootType'">
              <div class="block-right" v-if="JSON.stringify(nodeObj) != '{}'">

                <div class="block-header">
                  <h3>{{ nodeObj[props['label']] }}</h3>
                </div>

              </div>
            </template>

            <template v-if="nodeObj[props['type']]=='standardType'">

              <div class="approval-panel">
                <h3>基本信息</h3>
                <el-form size="mini" inline-message :model="nodeObj" disabled label-width="80px">
                  <!-- <span>占比: {{nodeObj[props['ratio']]*100+'%'}}</span> -->
                  <el-form-item label="名称">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj[props['label']]"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="占比">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj[props['ratio']]"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  <el-form-item label="代码">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj.code"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="含科目项">
                    <el-radio-group v-model="nodeObj.include">
                      <el-radio-button :label="true">是</el-radio-button>
                      <el-radio-button :label="false">否</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="方向">
                    <el-radio-group v-model="nodeObj.orientation">
                      <el-radio-button :label="1">正</el-radio-button>
                      <el-radio-button :label="0">负</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>

            </template>

            <template v-if="nodeObj[props['type']]=='hcType' &&nodeObj[props['enable']]=='N'">
              <div class="approval-panel">
                <h3>基本信息</h3>
                <el-form inline-message size="mini" :model="nodeObj" disabled label-width="80px">
                  <el-form-item label="名称">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj[props['label']]"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="代码">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj.code"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="最大分值">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj.scoreValue"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
              <div class="approval-panel" style="margin-bottom: 0px;">
                <h4>此分值科目不包含科目项,无法创建科目项及分值科目!</h4>
              </div>
            </template>

            <template v-if="nodeObj[props['type']]=='hcType' &&nodeObj[props['enable']]=='Y' ">
              <!-- <div class="block-right" v-if="JSON.stringify(nodeObj) != '{}'"> -->

              <div class="approval-panel">
                <h3>基本信息</h3>
                <el-form inline-message size="mini" :model="nodeObj" disabled label-width="80px">
                  <el-form-item label="名称">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj[props['label']]"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="代码">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj.code"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="最大分值">
                    <el-row>
                      <el-col :span="5">
                        <el-input v-model="nodeObj.scoreValue"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-form>
              </div>
              <div class="approval-panel" style="margin-bottom: 0px;">
                <h3>分值科目维护</h3>
                <div style="margin-top:20px">
                  <zongceCollapse :data="this.kemuList" :ShowStateBit="ShowStateBit" @onNodeDel="onNodeDel" :schemeId="schemeId"></zongceCollapse>
                </div>
                <div>
                  <el-button v-state-show="1" type="text" size="mini" @click="addKmBT">+ 新增科目项</el-button>&nbsp;&nbsp;
                  <!-- <el-button type="primary" @click="ShowStateBit=0">{{ ShowStateBit }}</el-button> -->
                </div>
              </div>

            </template>

          </el-col>
        </el-row>
      </div>
    </div>
  </page>

</template>

<script>
import zongceCollapse from "./zongce2_collapse.vue";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
export default {
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
    zongceCollapse
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
      kemuList: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    ...mapActions({
      getSchemeTree: store.namespace + "/getSchemeTree",
      getItemListAndScore: store.namespace + "/getItemListAndScore",
      addItem: store.namespace + "/addItem",
      deleteItem: store.namespace + "/deleteItem",
      getSchemeEnableUpdateState:
        store.namespace + "/getSchemeEnableUpdateState"
    }),
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
      var requestData = {
        schemeId: this.schemeId
      };
      this.getSchemeTree(requestData).then(response => {
        this.data = [];
        console.log(["tree", response]);
        var res = response.resBody;
        this.data.push(res.template);
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.props["label"]].indexOf(value) !== -1;
    },
    handleNodeClick(nodeDataObj, nodeObj) {
      this.nodeObj = nodeDataObj;
      this.kemuList = [];
      if (
        this.nodeObj[this.props["type"]] == "hcType" &&
        this.nodeObj[this.props["enable"]] == "Y"
      ) {
        //点击的是分值科目，要查询数据
        var requestData = {
          subjectCode: this.nodeObj.id,
          schemeId: this.schemeId
        };
        // var requestData = {
        //   subjectCode: 1,
        //   schemeId: 1
        // };

        this.getItemListAndScore(requestData).then(response => {
          console.log(["itemAndScore", response]);
          var res = response.resBody;
          this.kemuList = res;
        });
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
        vm.$message.error("参数不正确");
        vm.$router.go(-1);
        returnl;
      }
      vm.schemeId = to.query.schemeId;
      vm.getData();
    });
  }
};
</script>

<style>
</style>
