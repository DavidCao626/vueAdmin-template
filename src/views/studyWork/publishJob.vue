<template>
  <div>
    <page>
      <div slot="title">岗位信息</div>
      <div slot="panel">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="项目">
            <elx-select v-model="formData.projectId" placeholder="" @change="projectChange" :disabled="serviceType == 'U'">
              <el-option v-for="item in projectList" :key="item.id" :obj="item" :value="item.id" :label="item.name"></el-option>
            </elx-select>
          </el-form-item>
          <el-form-item label="岗位名称">
            <el-row>
              <el-col :span="7">
                <el-input v-model="formData.name" placeholder="岗位名称"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="招聘名额">
            <el-input-number v-model="formData.numbers" :min="1" label="名额"></el-input-number>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-row>
              <el-col :span="7">
                <el-input v-model="formData.publisherMobile" placeholder="联系电话"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="工作时间要求">
            <el-row>
              <el-col :span="7">
                <el-input v-model="formData.workTime" placeholder="工作时间要求"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="月工作量">
            <el-row>
              <el-col :span="7">
                <el-input v-model="formData.monthWorkload" placeholder="月工作量"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="岗位需求">
            <el-row>
              <el-col :span="11">
                <el-input v-model="formData.jobDemand" type="textarea" rows="3" placeholder="请填写岗位需求"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="岗位内容">
            <el-row>
              <el-col :span="11">
                <el-input v-model="formData.jobDesc" type="textarea" rows="3" placeholder="请填写岗位相关信息及招聘条件"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="备注">
            <el-row>
              <el-col :span="11">
                <el-input v-model="formData.remark" type="textarea" rows="3" placeholder="备注"></el-input>
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
        projectId: null,
        projectCode: "",
        name: "",
        jobDesc: "",
        numbers: 1,
        publisherMobile: "",
        jobDemand: "",
        workTime: "",
        monthWorkload: "",
        remark: ""
      }
    };
  },
  methods: {
    ...mapActions({
      insertJob: store.namespace + "/insertJob",
      queryAllowPublishJobProject:
        store.namespace + "/queryAllowPublishJobProject",
      updateJob: store.namespace + "/updateJob",
      getJobById: store.namespace + "/getJobById"
    }),
    projectChange(val, vueCom, obj) {
      this.formData.projectCode = obj.obj.code;
    },
    getJob() {
      this.getJobById({ id: this.formData.id }).then(response => {
        var res = response.resBody;
        this.formData.projectId = res.projectId;
        this.formData.projectCode = res.projectCode;
        this.formData.name = res.name;
        this.formData.jobDesc = res.jobDesc;
        this.formData.numbers = res.numbers;
        this.formData.publisherMobile = res.publisherMobile;
        this.formData.jobDemand = res.jobDemand;
        this.formData.workTime = res.workTime;
        this.formData.monthWorkload = res.monthWorkload;
        this.formData.remark = res.remark;
      });
    },
    getProjectList() {
      this.queryAllowPublishJobProject({}).then(response => {
        this.projectList = response.resBody;
      });
    },
    onSubmit() {
      if (this.serviceType == "A") {
        //增加
        this.insertJob(this.formData).then(response => {
          this.$message.success("成功!");
          this.$router.go(-1);
        });
      } else {
        //更新
        this.updateJob(this.formData).then(response => {
          this.$message.success("成功!");
          this.$router.go(-1);
        });
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProjectList();
      if (to.query.id) {
        vm.serviceType = "U";
        vm.formData.id = to.query.id;
        vm.getJob();
      }
    });
  }
};
</script>

<style>
</style>
