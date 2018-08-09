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
                <el-tree :data="data" node-key="id" :default-expanded-keys="[1]" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="block-right" v-if="JSON.stringify(nodeObj) != '{}'">

              <div class="block-header">
                <h3>{{ nodeObj.label }}</h3>
              </div>

              <div style="margin-top:20px">
                <zongceCollapse :data="this.kemuList" @onNodeDel=onNodeDel></zongceCollapse>

              </div>
              <div>
                <el-button type="text" size="mini" @click="dialogVisible = true">+ 新增科目项</el-button>&nbsp;&nbsp;
              </div>

            </div>
            <div class="block-right" v-else>
              <div class="block-right__noBody">请选择左侧叶节点-分值科目项</div>

            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </page>

</template>

<script>
import zongceCollapse from "./zongce2_collapse.vue";
export default {
  components: {
    zongceCollapse
  },
  data() {
    return {
      addlabel: "",
      dialogVisible: false,
      nodeObj: {},
      data: [
        {
          id: 1,
          label: "我的学校",
          children: [
            {
              id: 2,
              label: "校党委",
              children: [
                {
                  label: "二级 1-1",
                  children: [
                    {
                      label: "三级 1-1-1"
                    }
                  ]
                }
              ]
            },
            {
              id: 3,
              label: "校团委",
              children: [
                {
                  label: "二级 2-1",
                  children: [
                    {
                      label: "三级 2-1-1"
                    }
                  ]
                },
                {
                  label: "二级 2-2",
                  children: [
                    {
                      label: "三级 2-2-1"
                    }
                  ]
                }
              ]
            },
            {
              id: 4,
              label: "学工处",
              children: [
                {
                  label: "二级 1-1",
                  children: [
                    {
                      label: "三级 1-1-1"
                    }
                  ]
                }
              ]
            },
            {
              id: 5,
              label: "旗下学院",
              children: [
                {
                  label: "数学学院",
                  children: [
                    {
                      label: "三级 3-1-1"
                    }
                  ]
                },
                {
                  label: "蒙古学院",
                  children: [
                    {
                      label: "三级 3-2-1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      kemuList: []
    };
  },
  methods: {
    handleNodeClick(nodeDataObj, nodeObj) {
      if (!nodeDataObj.children || nodeDataObj.children.length == 0) {
        this.nodeObj = nodeDataObj; //只有点击叶节点才能触发右面数据加载
      } else {
        this.nodeObj = {};
      }
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
      this.kemuList.push({ label: this.addlabel });

      this.dialogVisible = false;
      this.addlabel = "";
      this.$message({
        message: "恭喜你，添加成功",
        type: "success"
      });
      // 真实情况触发ajax插入
      //nodeObj.children.push({ label: label, children: [] });
    }
  }
};
</script>

<style>
</style>
