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
  <el-form ref="todos" class="demo-dynamic" label-position="top">
    <div class="todo" v-for="(i,index) in todos" :key="index">
      <div class="todo-header">{{ i.isNew?'新增':'' }}条目:{{ i.name }}
        <small>{{ i.isNew?'(未保存)':'' }}</small>
        <span class="todo-header__right" v-if="!i.isNew">
          是否生效：
          <el-switch v-model="i.state" active-color="#13ce66" inactive-color="#ccc">
          </el-switch>
        </span>
        <span class="todo-header__right"></span>
      </div>
      <hr class="todo-hr" v-show="!i.state"></hr>
      <div class="todo-box" v-show="i.state">
        <transition name="el-fade-in">
          <el-row :gutter="20">
            <!-- <el-col :span="3">
          <el-form-item prop="state" label="是否生效:">
            <el-switch v-model="todos.state" active-color="#13ce66" inactive-color="#ccc">
            </el-switch>
          </el-form-item>
        </el-col> -->

            <el-col :span="10">
              <el-form-item prop="name" label="条目名称：">
                <el-input v-model="i.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="relevanceAppraise" label="是否关联测评：">
                <el-switch v-model="i.relevanceAppraise"></el-switch>
              </el-form-item>
            </el-col>

            <el-col :span="5" v-show="i.relevanceAppraise">
              <transition name="el-fade-in">
                <el-form-item prop="score" label="测评分值：">
                  <el-input-number size="mini" v-model="i.score" :max="100" :min="0"></el-input-number>
                </el-form-item>
              </transition>
            </el-col>
            <el-col :span="4" v-if="i.isNew || !todoIsRuning">
              <transition name="el-fade-in">
                <el-form-item prop="score" label=" ">
                  <el-button @click.prevent="removeTodo(i)" type="danger" plain>
                    <i class="el-icon-delete"></i> 删除该条目</el-button>
                </el-form-item>
              </transition>
            </el-col>
          </el-row>

        </transition>
      </div>
    </div>
    <!-- <el-form-item v-for="(domain, index) in todos.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'">
      <el-input v-model="domain.value"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
    </el-form-item> -->
    <el-form-item>
      <el-button @click="addTodo" plain type="primary" style="width: 98%;height:60px">
        <i class="el-icon-plus"></i> 新增条目</el-button>
    </el-form-item>
  </el-form>
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
    return {};
  },
  methods: {
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
    removeTodo(item) {
      var index = this.todos.indexOf(item);
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    },
    addTodo() {
      this.todos.push({
        name: "",
        relevanceAppraise: false,
        state: true,
        score: "",
        isNew: true
      });
    }
  }
};
</script>