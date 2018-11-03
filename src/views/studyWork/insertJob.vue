<template>
    <div>
        <page>
            <div slot="title">岗位发布</div>

            <div slot="panel">
<el-card v-for="(formData,index) in dataSource" :key="index" style="    margin-bottom: 10px;">
                <div slot="header" class="clearfix">
    <span>岗位{{index+1}}</span>

  </div>
                <el-form :model="formData" label-width="140px">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="岗位名称：">
                                <el-row>
                                    <el-col>
                                        <el-input v-model="formData.name" placeholder="岗位名称"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="招聘名额：">
                                <el-input-number v-model="formData.numbers" :min="1" label="名额"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="工作时间要求：">
                                <el-row>
                                    <el-col>
                                        <el-input v-model="formData.workTime" placeholder="工作时间要求"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="月工作量：">
                                <el-row>
                                    <el-col>
                                        <el-input v-model="formData.monthWorkload" placeholder="月工作量"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="岗位需求：">
                        <el-row>
                            <el-col :span="11">
                                <el-input v-model="formData.jobDemand" type="textarea" rows="3" placeholder="请填写岗位需求"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="岗位内容：">
                        <el-row>
                            <el-col :span="11">
                                <el-input v-model="formData.jobDesc" type="textarea" rows="3" placeholder="请填写岗位相关信息及招聘条件"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="岗位类型：">
                        <el-row>
                            <el-col :span="11">
                                <el-radio-group v-model="formData.jobType">
                                    <el-radio v-for="item in jobTypeList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
<el-form-item label="">
                        <el-row>
                            <el-col :span="11">
                                        <el-button @click="deleteForm(formData)"  icon="el-icon-delete" >移除岗位</el-button>
                              <el-button @click="addForm(formData)"  icon="el-icon-plus" >增加一个岗位</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
        </el-card>

            </div>
        </page>

        
        <page>
            <div slot="panel">
                <el-row>
                    <el-col :span="8">
                        <el-button  type="primary" @click="onSubmit">提交并发布岗位</el-button>
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
      headerForm: {
        projectId: null,
        projectCode: ""
      },
      projectList: [],
      jobTypeList: [
        { label: "校级岗位", value: "XJ" },
        { label: "学院内部", value: "NB" }
      ],

      dataSource: [
        {
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
          remark: "",
          jobType: "XJ"
        }
      ]
    };
  },
  methods: {
    addForm() {
      this.dataSource.push({
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
        remark: "",
        jobType: "XJ"
      });
    },
    deleteForm(obj) {
      var index = this.dataSource.indexOf(obj);
      this.dataSource.splice(index, 1);
    },
    ...mapActions({
      insertJob: store.namespace + "/insertJob",
      queryAllowPublishJobProject:
        store.namespace + "/queryAllowPublishJobProject",
      updateJob: store.namespace + "/updateJob",
      getJobById: store.namespace + "/getJobById",
      getJobTypeDict: store.namespace + "/getJobTypeDict"
    }),
    getJobTypeList() {
      this.getJobTypeDict({}).then(response => {
        this.jobTypeList = response.resBody;
      });
    },
    onSubmit() {
      //增加
      if (this.dataSource.length == 0) {
        this.$message.error("请至少建立一个岗位");
        return;
      }
      var that = this;
      this.dataSource.forEach(item => {
        item.projectId = that.headerForm.projectId;
        item.projectCode = that.headerForm.projectCode;
        that.insertJob(item).then(response => {
            this.$message.success("成功!");
            this.$router.go(-1);


        });
      });
    },
    projectChange(val, vueCom, obj) {
      this.headerForm.projectCode = obj.obj.code;
    },
    getProjectList() {
      this.queryAllowPublishJobProject({}).then(response => {
          if(response.resBody.length == 0){
              this.$message.error("当前不存在可发布岗位的项目")
          }
        this.projectList = response.resBody;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProjectList();
      vm.getJobTypeList();
    });
  }
};
</script>

<style>
</style>
