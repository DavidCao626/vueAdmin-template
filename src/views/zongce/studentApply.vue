<template>
    <div>
        <page>
            <div slot="title">学生申请</div>
            <div slot="panel">
                <el-form :model="formData" label-width="100px">
                    <el-form-item label="测评项目">
                        <elx-select v-model="formData.projectId" placeholder="" @change="projectChange">
                            <el-option v-for="item in projectList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </elx-select>
                    </el-form-item>
                    <el-form-item label="分值科目">
                        <el-cascader @change="kemuchange" expand-trigger="hover" v-model="formData.fzkemuCode" placeholder="输入进行搜索" :options="fzkmList" filterable :props="orgProps"></el-cascader>
                    </el-form-item>

                    <el-form-item label="科目项">
                        <elx-select v-model="formData.applyItemId" placeholder="" @change="itemChange">
                            <el-option v-for="(item,index) in subjectList" :key="index" :value="item.item.id" :label="item.item.name"></el-option>
                        </elx-select>
                    </el-form-item>
                    <el-form-item label="分值项">
                        <elx-select v-model="formData.applyScoreId" placeholder="" @change="fenzhiChange">
                            <el-option v-for="item in scoreItemList" :key="item.id" :value="item.id" :label="item.name" :config="item"></el-option>
                        </elx-select>
                    </el-form-item>
                    <el-form-item label="时间日期">
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formData.eventDate" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="数量/次">
                        <el-input-number v-model="formData.quantity" :min="1" label="数量"></el-input-number>
                    </el-form-item>
                    <el-form-item label="申请理由">
                        <el-row>
                            <el-col :span="8">
                                <el-input v-model="formData.applyReason" rows="3" type="textarea" placeholder="请输入申请原因"></el-input>
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
                        <el-button type="primary" @click="onSubmit">提交</el-button>
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
      orgProps: {
        label: "label",
        value: "code",
        children: "children"
      },
      formData: {
        projectId: null,
        fzkemuCode: [],
        fzkemuName: "",
        applyItemId: null,
        applyItemName: "",
        applyScoreId: null,
        applyScoreName: "",
        applyScoreValue: null,
        quantity: 1,
        eventDate: new Date(),
        applyReason: ""
      },
      fzkmList: [],
      projectList: [],
      subjectList: [],
      scoreItemList: []
    };
  },
  methods: {
    testttt() {},
    ...mapActions({
      getStudentApplyProject: store.namespace + "/getStudentApplyProject",
      getSubjectByProjectIdAndSession:
        store.namespace + "/getSubjectByProjectIdAndSession",
      getItemList:
        store.namespace + "/getItemListAndScoreBySubjectCodeAndProjectId"
    }),
    fenzhiChange(val, item) {
      console.log([val, item]);
      this.formData.applyScoreName = item.currentLabel;
      // this.formData.applyScoreValue = item.
    },
    itemChange(val, item) {
      this.formData.applyItemName = item.currentLabel;
      this.formData.scoreItemList = [];
      this.formData.applyScoreId = null;
      this.formData.applyScoreName = "";
      this.formData.applyScoreValue = null;
      console.log([val, item]);
      item = this.subjectList.find(item => {
        return (item.item.id == val);
      });
      this.scoreItemList = item.scoreList;
    },
    kemuchange(val) {
      this.scoreItemList = [];
      this.formData.applyScoreId = null;
      this.formData.applyScoreName = "";
      this.formData.applyScoreValue = null;
      console.log(["级联改变", val]);
      this.getItemList({
        projectId: this.formData.projectId,
        subjectCode: val[val.length - 1]
      }).then(response => {
        console.log([response]);
        this.formData.applyItemId = null;
        this.formData.applyItemName = "";
        this.subjectList = [];
        response.resBody.forEach(it => {
          this.subjectList.push(it);
        });
      });
    },
    projectChange(val) {
      this.formData.fzkemuCode = [];
      this.formData.fzkemuName = "";
      this.fzkmList = [];
      this.subjectList = [];
      this.scoreItemList = [];
      this.formData.applyItemName = "";
      this.formData.applyItemId = null;
      this.formData.applyScoreId = null;
      this.formData.applyScoreName = "";
      this.formData.applyScoreValue = null;
      this.getSubjectList(val);
    },
    getSubjectList(val) {
      this.getSubjectByProjectIdAndSession({ projectId: val }).then(
        response => {
          console.log(["标准科目分值科目", response]);
          this.delFreeChildren(response.resBody.template.children);
          this.fzkmList = response.resBody.template.children;
        }
      );
    },
    delFreeChildren(children) {
      children.forEach(it => {
        if (it.children.length == 0) {
          delete it.children;
        } else {
          this.delFreeChildren(it.children);
        }
      });
    },
    getProjectList() {
      this.getStudentApplyProject().then(response => {
        this.projectList = response.resBody;
      });
    },
    onSubmit() {
      var requestData = {};
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProjectList();
    });
  }
};
</script>

<style>
</style>
