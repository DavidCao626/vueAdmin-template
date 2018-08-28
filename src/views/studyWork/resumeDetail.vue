<template>
    <div>
        <page>
            <div slot="title">简历信息</div>
            <div slot="panel">
                <el-form :model="formData" label-width="100px">
                    <el-form-item label="简历名称">
                        <el-row>
                            <el-col :span="7">
                                <el-input v-model="formData['name']" placeholder="简历名称"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="简历内容">
                        <el-row>
                            <el-col :span="11">
                                <el-input v-model="formData['content']" type="textarea" rows="10" placeholder="请填写简历内容"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="课程表">
                        <el-row>
                            <el-col :span="11">
                                <el-input v-model="formData['timetable']" type="textarea" rows="10" placeholder="课程表(样式调整))"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="其他内容">
                        <el-row>
                            <el-col :span="11">
                                <el-input v-model="formData['remark']" type="textarea" rows="10" placeholder="其他"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </page>
        <page>
            <div slot="panel">
                <el-row>
                    <el-col :span="7" justify="center">
                    </el-col>
                    <el-col :span="17">
                        <el-button type="primary" @click="onSubmit">确定</el-button>
                    </el-col>
                </el-row>
            </div>
        </page>
    </div>
</template>

<script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
export default {
  data() {
    return {
      serviceType: "A", //页面操作类型默认A增加U更新
      projectList: [],
      formData: {
        id: 0,
        name: "",
        content: "",
        timetable: "",
        remark: ""
      }
    };
  },
  methods: {
    ...mapActions({
      insertResume: store.namespace + "/insertResume",
      updateResume: store.namespace + "/updateResume",
      getResumeById: store.namespace + "/getResumeById"
    }),
    getResume() {
      this.getResumeById({ id: this.formData.id }).then(response => {
        var res = response.resBody;
        this.formData.name = res.name;
        this.formData.timetable = res.timetable;
        this.formData.remark = res.remark;
        this.formData.content = res.content;
      });
    },
    onSubmit() {
      if (this.serviceType == "A") {
        //增加
        this.insertResume(this.formData).then(response => {
          this.$message.success("成功!");
          this.$router.go(-1);
        });
      } else {
        //更新
        this.updateResume(this.formData).then(response => {
          this.$message.success("成功!");
          this.$router.go(-1);
        });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.id) {
        vm.serviceType = "U";
        vm.formData.id = to.query.id;
        vm.getResume();
      }
    });
  }
};
</script>

<style>
</style>
