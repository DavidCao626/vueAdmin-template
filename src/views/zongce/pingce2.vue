<style lang="scss" scoped>
.state_empty_hd {
  margin-top: 40px;
  .desc {
    padding: 0 60px;
  }
}
.content {
  &__flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__box {
    border: 1px solid var(--color-grey-light-3);
    padding: 20px;
    margin: 20px;
    text-align: center;
    line-height: 1.6;
    border-radius: 5px;
    min-height: 150px;
    .img__box {
      height: 150px;
      margin-bottom: 15px;
    }
    img {
      height: 150px;
    }
  }
  &__box:hover {
    border: 1px solid var(--color-primary);
  }
}
</style>


<template>
  <page :Breadcrumb="false">
    <span slot="title">考评行为管理</span>
    <div slot="panel">

      <div class="content">
        <br/>
        <el-form label-width="80px" :model="formData">
          <el-form-item label="测评项目">
            <elx-select v-model="formData.projectId" placeholder="请选择" @change="projectChange">
              <el-option v-for="item in projectList" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="标准科目">
            <elx-select v-model="formData.subjectCode" placeholder="请选择" @change="subjectChange">
              <el-option v-for="item in subjectList" :key="item.code" :value="item.code" :obj="item" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </page>
</template>

<script>
import api from "./_api/appraise.js";
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
export default {
  components: {},
  computed: {},
  methods: {},

  data() {
    return {
      formData: {
        projectId: null,
        subjectCode: "",
        isInclude: null
      },
      projectList: [],
      subjectList: []
    };
  },
  methods: {
    subjectChange(val, vueCom, obj) {
      this.isInclude = obj.obj.include;
    },
    projectChange(val) {
      this.formData.subjectCode = "";
      this.getSubjectList();
    },
    getProjectList() {
      this.getStudentApplyProject().then(response => {
        this.projectList = response.resBody;
      });
    },
    getSubjectList() {
      this.queryAllEnableStandardSubject({
        projectId: this.formData.projectId
      }).then(response => {
        this.subjectList = response.resBody;
      });
    },
    ...mapActions({
      queryAllEnableStandardSubject:
        store.namespace + "/queryIncludUnEnableStandardSubject",
      getStudentApplyProject: store.namespace + "/getStudentApplyProject"
    }),
    onSubmit() {
      if(this.formData.projectId == null ||this.formData.subjectCode == ""){
        this.$message.error("请完成所有选项!")
        return;
      }
      //路由逻辑
      if (this.isInclude == true) {
        this.$router.push({
          path: "/zongce/behaviorsManager",
          query: {
            projectId: this.formData.projectId,
            standardSubjectCode: this.formData.subjectCode
          }
        });
      } else if (this.isInclude == false) {
        this.$router.push({
          path: "/zongce/artfBehviorsManager",
          query: {
            projectId: this.formData.projectId,
            standardSubjectCode: this.formData.subjectCode
          }
        });
      } else {
        this.$message.error("跳转发生异常")
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProjectList();
    });
  }
};
</script>

