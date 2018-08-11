<template>
  <div>
    <el-dialog :title="dialogtype!='edit'?'新增分值项':'修改分值项'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" label-position="top" label-width="100px">
        <el-form-item label="分值项名称：">
          <el-input size="medium" placeholder="输入分值项名称" v-model="label"></el-input>
        </el-form-item>
        <el-form-item label="分值数：">
          <el-input size="medium" type="Number" max="100" min="0" maxlength="3" placeholder="输入不能超过100分" v-model="score"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="add(label,score)" size="medium" v-if="dialogtype!='edit'">添 加</el-button>
        <el-button type="primary" @click="edit(label,score)" size="medium" v-else>修 改</el-button>
      </span>
    </el-dialog>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="(km,index) in data" :name="index" :key="index">
        <template slot="title">
          {{ index+=1 }} 、{{ km[props.label] }} &nbsp;&nbsp;
          <el-popover placement="top" width="260" v-model="km[props.visible]" trigger="hover">
            <div style="margin-top:10px">
              <el-form label-position="left" label-width="50px" size="mini">
                <el-form-item label="名称:">
                  <el-input v-model="km[props.label]"></el-input>
                </el-form-item>

              </el-form>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="km[props.visible] = false">取消</el-button>
                <el-button type="primary" size="mini" @click="km[props.visible] = false">保存</el-button>
              </div>
            </div>
            <span slot="reference" v-state-show="1">
              <i class="el-icon-edit-outline" style="color:#409EFF">
              </i> &nbsp;&nbsp;
            </span>

          </el-popover>

          <el-button size="mini" type="text" class="el-icon-circle-close" @click.stop="onNodeDel(km)" v-state-show="1"></el-button>
        </template>
        <div style="margin-left: 40px;">

          <ul class="fenzhi">
            <li v-for="(fz,index) in km[fenzhiProps.children]" :key="index">

              <span @click="editShow(fz)">分值项：{{ fz[fenzhiProps.label] }} &nbsp;分数：{{ fz[fenzhiProps.score] }}&nbsp;&nbsp;
                <i class="el-icon-edit-outline" style="color:#409EFF" v-state-show="1">
                </i>
              </span>

              &nbsp;&nbsp;
              <i class="el-icon-circle-close" style="color:#409EFF" @click="del(km,fz)" v-state-show="1">&nbsp;</i>
            </li>
          </ul>
          <el-button size="mini" type="text" class="el-icon-plus" @click="addShow(km)" v-state-show="1">新增分值项</el-button>
        </div>

      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      default() {
        return [];
      }
    },
    props: {
      type: Object,
      default() {
        return {
          label: "label",
          visible: "visible2"
        };
      }
    },
    fenzhiProps: {
      type: Object,
      default() {
        return {
          label: "label",
          score: "score",
          children: "fenzhiList"
        };
      }
    },
    ShowStateBit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      label: "",
      score: "",
      dialogVisible: false,
      cfz: {}, //当前操作的分值项目
      ckm: {}, //当前操作的的科目项目
      dialogtype: "add",
      activeNames: ["0"],
      fenzhiList: []
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    add(label, score) {
      if (!this.ckm.hasOwnProperty(this.fenzhiProps[children])) {
        this.$set(this.ckm, this.fenzhiProps[children], []);
      }

      this.ckm[this.fenzhiProps[children]].push({
        [this.fenzhiProps.label]: label,
        [this.fenzhiProps.score]: score
      });
      this.emptyTemVariableAndCloseWindow();
      this.$message({
        message: "恭喜你，添加成功",
        type: "success"
      });
    },
    addShow(km) {
      this.emptyTemVariableAndCloseWindow();
      this.dialogtype = "add";
      this.dialogVisible = true;
      this.ckm = km;
    },
    del(km, node) {
      km[this.fenzhiProps[children]].splice(km[this.fenzhiProps[children]].indexOf(node), 1);
      this.$message({
        message: "恭喜你，删除成功",
        type: "success"
      });
    },
    edit(label, score) {
      this.cfz[this.fenzhiProps.label] = label;
      this.cfz[this.fenzhiProps.score] = score;
      //Ajax提交到后台
      this.$message({
        message: "恭喜你，修改成功",
        type: "success"
      });
      this.emptyTemVariableAndCloseWindow();
    },
    editShow(fz) {
      this.dialogtype = "edit";
      this.dialogVisible = true;
      this.cfz = fz;
      this.label = fz[this.fenzhiProps.label];
      this.score = fz[this.fenzhiProps.score];
    },
    onNodeDel(km) {
      this.$emit("onNodeDel", km);
    },
    //清空当前环境临时交换变量 并关闭窗口
    emptyTemVariableAndCloseWindow() {
      this.label = "";
      this.score = 0;
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.fenzhi li {
  list-style: none;
  line-height: 40px;
}
.fenzhi li:before {
  content: "|—       ";
}
</style>
