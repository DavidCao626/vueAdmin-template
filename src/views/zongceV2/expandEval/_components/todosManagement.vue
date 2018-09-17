<style lang="scss" scoped>
.todo-header {
  margin-bottom: 5px;
  &__right {
    float: right;
    margin-right: 20px;
  }
}
.todo-box {
  clear: none;
  border: 1px solid #e0e0e0;
  padding: 10px;
  width: 98%;
  margin-bottom: 10px;
}
.todo-hr {
  border-top: 1px solid #e0e0e0;
  width: 98%;
  margin-bottom: 10px;
}
</style>

<template>
  <div>
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      <el-tab-pane :label="item.node.name+'(总分' +getItemScore(item)+')'" :name="item.node.name" v-for="(item,index) in todos" :key="index">
        <el-alert :title="item.node.name+'各条目分数相加总和必须为100分。当前为'+getItemScore(item)+'分'" type="error" v-show="item.list.length>0 && getItemScore(item)!=100" :closable="false" style="margin-bottom: 10px;">
        </el-alert>
        <el-alert :title="item.node.name+'分数配置正确'" type="success" v-show="item.list.length>0 && getItemScore(item)==100" style="margin-bottom: 10px;">
        </el-alert>

        <el-form ref="todos" class="demo-dynamic" label-position="top">
          <div class="todo" v-for="(i,index) in item.list" :key="index">

            <div class="todo-header">{{ i.isNew?'新增':'' }}条目:{{ i.name }}
              <small>{{ i.isNew?'(未保存)':'' }}</small>

              <span class="todo-header__right"></span>
            </div>
            <div class="todo-box">
              <transition name="el-fade-in">
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-form-item prop="name" label="条目名称：">
                      <el-input v-model="i.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <transition name="el-fade-in">
                      <el-form-item prop="score" label="条目分值：">
                        <el-input-number size="mini" v-model="i.score" :max="100" :min="0"></el-input-number>
                      </el-form-item>
                    </transition>
                  </el-col>
                  <el-col :span="4" v-if="i.isNew || !todoIsRuning">
                    <transition name="el-fade-in">
                      <el-form-item prop="score" label=" ">
                        <el-button @click.prevent="removeTodo(item,i)" type="danger" plain>
                          <i class="el-icon-delete"></i> 删除该条目</el-button>
                      </el-form-item>
                    </transition>
                  </el-col>
                </el-row>

              </transition>
            </div>
          </div>
          <el-form-item>
            <el-button @click="addTodo(item)" plain type="primary">
              <i class="el-icon-plus"></i> 新增条目</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    todoIsRuning: false
  },
  data() {
    return {
      activeName2: "学生自评"
    };
  },
  methods: {
    getItemScore(item) {
      let count = 0;
      item.list.forEach(element => {
        count += element.score;
      });
      return count;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeTodo(item, i) {
      var index = item.list.indexOf(i);
      if (index !== -1) {
        item.list.splice(index, 1);
      }
    },
    addTodo(item) {
      item.list.push({
        name: "",
        score: "",
        isNew: true //新增条目
      });
    }
  }
};
</script>