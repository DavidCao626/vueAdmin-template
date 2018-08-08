<template>
    <div class="block">

        <el-dialog title="新增下级" :visible.sync="dialogVisible" width="30%">
            下级节点名称：
            <el-input size="medium" placeholder="输入下级节点名称" v-model="addlabel" style="width: 360px;"></el-input>
            <span slot="footer" class="dialog-footer">

                <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="addNode(nodeObj,addlabel)" size="medium">确 定</el-button>
            </span>
        </el-dialog>
        <el-row>
            <el-col :span="6">
                <div class="block-left">
                    <div class="block-header">
                        <i class="el-icon-menu"></i> 组织管理</div>
                    <div class="block-line"></div>
                    <div class="block-nav">
                        <el-tree :data="data" node-key="id" :default-expanded-keys="[1]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="block-right">

                    <div class="block-header">
                        <h3>{{ nodeObj.label }}</h3>
                    </div>
                    <div>
                        <el-button type="text" size="mini" @click="dialogVisible = true">新增下级</el-button>&nbsp;&nbsp;|
                        <el-button size="mini" type="text" @click="onNodeDel(nodeObj)">删除</el-button>
                    </div>

                    <div style="width:80%;margin-top:20px">
                        <el-form label-position="left" ref="form" :model="form" label-width="75px" size="mini">
                            <el-form-item label="活动名称:">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="活动区域:">
                                <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动时间:">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="即时配送:">
                                <el-switch v-model="form.delivery"></el-switch>
                            </el-form-item>
                            <el-form-item label="活动性质:">
                                <el-checkbox-group v-model="form.type">
                                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="特殊资源:">
                                <el-radio-group v-model="form.resource">
                                    <el-radio label="线上品牌商赞助"></el-radio>
                                    <el-radio label="线下场地免费"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="活动形式:">
                                <el-input type="textarea" v-model="form.desc"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">保存设置</el-button>

                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      addlabel: "",
      dialogVisible: false,
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
      nodeObj: { id: 1, label: "我的学校", children: [] },
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
      defaultProps: {
        children: "children",
        label: "label"
      },
      
    };
  },
  methods: {
    handleNodeClick(nodeDataObj, nodeObj) {
      this.nodeObj = nodeDataObj;
    },
    onNodeDel(nodeData) {
      if (nodeData.children && nodeData.children.length > 0) {
        this.$message.error("包含子节点的节点不能删除");
      } else {
        this.$confirm("此操作将永久删除该节点, 是否继续?", "删除节点", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            nodeData = null;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    addNode(nodeObj, label) {
      // 真实情况触发ajax插入
      nodeObj.children.push({ label: label, children: [] });
      this.addlabel = "";
      this.dialogVisible = false;
    }
  }
};
</script>

<style>
</style>
