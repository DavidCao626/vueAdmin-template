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
}
.block-right__noBody {
  text-align: center;
  font-size: 24px;
  font-weight: 200;
  margin-top: 35%;
}
.block-body {
  padding: 15px;
  height: 800px;
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
    <div slot="title">机构测试</div>
    <div slot="panel" style="">
      <div class="block">
        <!-- <el-dialog title="新增科目项" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" label-position="top" label-width="100px">
            <el-form-item label="科目项名称：">
              <el-input size="medium" placeholder="输入科目项名称" v-model="addlabel"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
            <el-button type="primary" @click="addNode(nodeObj,addlabel)" size="medium">确 定</el-button>
          </span>
        </el-dialog> -->
        <el-row>
          <el-col :span="6">
            <div class="block-left">
              <div class="block-header">
                <i class="el-icon-menu"></i> 机构列表</div>
              <div class="block-line"></div>
              <div class="block-nav">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <el-tree ref="tree2" :props="treeProps" :data="data" :filter-node-method="filterNode" node-key="id" :default-expanded-keys="[1]" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="18" style="background-color:#f4f7fa">
            <div class="block-right">
              <div class="block-header">
                <h3>{{ org.orgName }}&nbsp;&nbsp;
                  <small>({{ org.orgTitle }})</small>
                </h3>
              </div>
              <div>
                <el-button type="text">修改机构信息</el-button>&nbsp;&nbsp;&nbsp;|
                <el-button type="text">新增子节点</el-button>&nbsp;&nbsp;&nbsp;|
                <el-button type="text">删除</el-button>
              </div>
              <div>
                <el-card shadow="hover">
                  鼠标悬浮时显示
                </el-card>
              </div>
            </div>
            <!-- <div class="block-line" style="    margin-top: 0px">
            </div> -->
            <div class="block-body">

            </div>
          </el-col>

          <template v-if="org.orgName =='10'">

          </template>

          <template v-if="org.orgName !='10'">

          </template>

        </el-row>
      </div>
    </div>
  </page>

</template>

<script>
import menus from "../_mixin/menus.js";
export default {
  mixins: [menus],
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
      treeProps: {
        label: function(data, node) {
          return data.org.orgName;
        }
      },
      data: [],
      org: {}
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    // ...mapActions({
    //   getSchemeTree: store.namespace + "/getSchemeTree",
    //   getItemListAndScore: store.namespace + "/getItemListAndScore",
    //   addItem: store.namespace + "/addItem",
    //   deleteItem: store.namespace + "/deleteItem",
    //   getSchemeEnableUpdateState:
    //     store.namespace + "/getSchemeEnableUpdateState"
    // }),
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
      this.getOrgTreeView().then(response => {
        this.data = [];
        console.log(["tree", response]);
        var res = response.resBody;
        this.data = [res];
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.org.orgName.indexOf(value) !== -1;
    },
    handleNodeClick(data, node) {
      //点击的是分值科目，要查询数据
      var requestData = {
        orgCode: data.org.orgCode,
        orgType: data.org.orgType
      };
      this.getOrg(requestData).then(response => {
        console.log(["itemAndScore", response]);
        var res = response.resBody;
        this.org = res;
      });
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
      vm.getData();
    });
  }
};
</script>

<style>
</style>
