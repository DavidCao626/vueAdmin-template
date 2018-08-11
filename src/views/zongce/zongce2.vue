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
          <el-col :span="18">
            <template v-if="nodeObj[props['type']]==1">
              <div class="block-right" v-if="JSON.stringify(nodeObj) != '{}'">

                <div class="block-header">
                  <h3>{{ nodeObj[props['label']] }}</h3>
                </div>

                <div style="margin-top:20px">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="活动名称">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="活动时间">
                      <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                      </el-col>
                    </el-form-item>
                    <h2>{{ nodeObj[props['type']] }}</h2>
                  </el-form>
                </div>
              </div>
            </template>

            <template v-if="nodeObj[props['type']]==2">
              <div class="block-right" v-if="JSON.stringify(nodeObj) != '{}'">

                <div class="block-header">
                  <h3>{{ nodeObj[props['label']] }}</h3>
                </div>

                <div style="margin-top:20px">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="活动名称">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                      <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                      <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                      </el-col>
                    </el-form-item>
                    <h2>{{ nodeObj[props['type']] }}</h2>
                  </el-form>

                </div>

              </div>
            </template>

            <template v-if="nodeObj[props['type']]==3">
              <div class="block-right" v-if="JSON.stringify(nodeObj) != '{}'">

                <div class="block-header">
                  <h3>{{ nodeObj[props['label']] }}</h3>
                </div>

                <div style="margin-top:20px">
                  <zongceCollapse :data="this.kemuList" :ShowStateBit="ShowStateBit" @onNodeDel="onNodeDel" :props:='{ label: " label ",score: "score ", visible: "visible2 "}'></zongceCollapse>

                </div>
                <div>
                  <el-button v-state-show="1" type="text" size="mini" @click="dialogVisible = true">+ 新增科目项</el-button>&nbsp;&nbsp;
                  <!-- <el-button type="primary" @click="ShowStateBit=0">{{ ShowStateBit }}</el-button> -->
                </div>

              </div>
              <div class="block-right" v-else>
                <div class="block-right__noBody">请选择左侧叶节点-分值科目项</div>

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
          children: "children"
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
      data: [
      ],
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
      getSchemeTree: store.namespace + "/getSchemeTree"
    }),
    getData() {
      var requestData = {
        schemeId: this.schemeId
      };
      this.getSchemeTree(requestData).then(response => {
        this.data=[]
        console.log(["tree", response]);
        var res = response.resBody;
        this.data.push(res.template) ;

      }); 
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.props["label"]].indexOf(value) !== -1;
    },
    handleNodeClick(nodeDataObj, nodeObj) {
      this.nodeObj = nodeDataObj;
    },
    onNodeDel(nodeData) {
      if (nodeData.fenzhiList && nodeData.fenzhiList.length > 0) {
        this.$message.error("包含子节点的节点不能删除");
      } else {
        this.$confirm("此操作将永久删除该节点, 是否继续?", "删除节点", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.kemuList.splice(this.kemuList.indexOf(nodeData), 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "已取消删除"
            // });
          });
      }
    },
    addNode(nodeObj, label) {
      this.kemuList.push({ [this.props["label"]]: this.addlabel });

      this.dialogVisible = false;
      this.addlabel = "";
      this.$message({
        message: "恭喜你，添加成功",
        type: "success"
      });
      // 真实情况触发ajax插入
      //nodeObj.children.push({ label: label, children: [] });
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
