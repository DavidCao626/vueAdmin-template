<template>
  <div>
    <h1>录入科目行为</h1>

    <page>
      <div slot="panel">
        <el-form :model="topForm" label-width="80px" size="mini">
          <el-form-item label="分值科目">
            <el-row>
              <el-col :span="9">
                <elx-select v-model=" topForm.standardSubjectCode" placeholder="" @change="subChange">
                  <el-option v-for="item in standardSubjectList" :key="item.code" :value="item.code" :obj="item" :label="item.name"></el-option>
                </elx-select>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </page>

    <div :key="index" v-for="(item,index) in forData">
      <page>
        <div slot="panel">
          <div style=" width:15px; height:15px; border:1px solid #000; border-radius:25px;">
            <span style="height:15px; line-height:15px; display:block; text-align:center">{{index+1}}</span>
          </div>
          <el-form :model="item.formData" label-width="80px" size="mini">
            <el-form-item label="学生信息">
              <el-row>
                <el-col :span="9">
                  <span v-if="item.formData.targetEvaluator.targetName != ''">
                    {{item.formData.targetEvaluator.targetOrgName}}------{{item.formData.targetEvaluator.targetName}}
                  </span>
                  <el-button @click="switchStudnet(item)">选择</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="事件标题">
              <el-row>
                <el-col :span="9">
                  <el-input v-model="item.formData.title" placeholder="请输入"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="5">
                <el-form-item label="科目项">
                  <elx-select v-model=" item.formData.itemId" placeholder="" @change="itemChange">
                    <el-option v-for="(it,index) in itemList" :key="index" :value="it.item.id" :obj="it" :item="item" :label="it.item.name"></el-option>
                  </elx-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="分值项">
                  <elx-select v-model=" item.formData.scoreId" placeholder="" @change="scoreChange">
                    <el-option v-for="(it,index) in item.scoreList" :key="index" :value="it.id" :obj="it" :item="item" :label="it.name"></el-option>
                  </elx-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="事件日期">
              <el-row>
                <el-col :span="7">
                  <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="item.formData.ocDate" placeholder="选择日期">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="数量/次">
              <el-row>
                <el-col :span="7">
                  <el-input-number v-model="item.formData.quantity" :min="1" label="请选择"></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <el-button size="small" type="danger" @click="removeItem(item)">移除</el-button>
        </div>
      </page>
    </div>
    <el-button type="primary" @click="addItem">添加学生</el-button>
    <el-button type="primary" @click="submitAll">确定</el-button>
    <el-button type="danger" @click="goBack">返回</el-button>
    <!-- 选择学生的dialog -->
    <el-dialog title="点击选择学生" :visible.sync="switchStudentDV" top="0vh" width="70%">
      <elx-table-layout>
        <template slot="headerLeft">
          <el-form :inline="true" :model="studentSearchForm" size="mini" class="demo-form-inline">
            <el-form-item label="组织机构">
              <el-cascader v-model="studentSearchForm.orgCode" placeholder="输入进行搜索" :options="orgList" filterable change-on-select :props="orgProps"></el-cascader>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="studentSearchForm.sysNo" placeholder="学号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="studentSearchForm.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchButton">查询</el-button>
            </el-form-item>
          </el-form>
        </template>
        <div style="overflow-y:scroll;height:60vh;padding:0 15px">

          <el-table :data="studentData" @row-click="studentClick" style="width: 100%" border size="mini">
            <el-table-column prop="userObjectNo" label="学号">
            </el-table-column>
            <el-table-column prop="userObjectName" label="姓名">
            </el-table-column>
            <el-table-column prop="orgName" label="组织">
            </el-table-column>
          </el-table>

        </div>
        <template slot="footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.totalRecord">
          </el-pagination>
        </template>
      </elx-table-layout>
      <div slot="footer" class="dialog-footer">
        <el-button @click="switchStudentDV = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "./_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
      orgProps: {
         label: "orgName",
        value: "orgCode",
        children: "children"
      },
      orgList: [],
      tempItem: null,
      switchStudentDV: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      },
      studentSearchForm: {
        orgCode: [],
        sysNo: "",
        name: ""
      },
      studentData: [],
      topForm: {
        standardSubjectCode: "", //分值科目
        standardSubjectName: ""
      },
      standardSubjectCode: "", //标准科目
      standardSubjectList: [],
      projectId: null, //项目id路由带过来
      subjectCode: null, //分值科目，
      itemList: [],
      forData: [
        {
          scoreList: [],
          formData: {
            targetEvaluator: {
              targetId: null,
              targetName: "",
              targetOrgCode: "",
              targetOrgName: ""
            },
            title: "",
            itemId: null,
            itemName: "",
            scoreId: null,
            scoreName: "",
            quantity: 1,
            scoreValue: null,
            ocDate: ""
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions({
      getItemListAndScoreList:
        store.namespace + "/getItemListAndScoreBySubjectCodeAndProjectId",
      getSubjectBySSCodeAndProjectId:
        store.namespace + "/getSubjectBySSCodeAndProjectId",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryStudentBaseInfo: store.namespace + "/queryStudentBaseInfo",
      importRegBehavior: store.namespace + "/importRegBehavior"
    }),
    submitAll() {
      var behaviors = [];
      this.forData.forEach(it => {
        behaviors.push(it.formData);
      });

      var requestData = {
        projectId: this.projectId,
        subjectCode: this.topForm.standardSubjectCode,
        subjectName: this.topForm.standardSubjectName,
        behaviors: behaviors
      };

      this.importRegBehavior(requestData).then(response => {
        this.$message.success("保存成功");
        this.$router.go(-1);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    studentClick(row, event, column) {
      var index = this.forData.indexOf(this.tempItem);
      this.forData[index].formData.targetEvaluator = {
        targetId: row.userObjectNo,
        targetName: row.userObjectName,
        targetOrgCode: row.orgCode,
        targetOrgName: row.orgName
      };
      this.switchStudentDV = false;
    },
    switchStudnet(item) {
      this.tempItem == null;
      this.switchStudentDV = true;
      this.tempItem = item;
    },
    searchButton() {
      this.pageInfo.currentPage = 1;
      this.getStudentData();
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getStudentData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getStudentData();
    },
    getOrgList() {
      this.getCurrentOrgListAndOwner({}).then(response => {
        console.log(["orgList", response]);
        this.orgList = response.resBody;
      });
    },
    getStudentData() {
      var requestData = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        sysNo: this.studentSearchForm.sysNo,
        name: this.studentSearchForm.name
      };
      if (this.studentSearchForm.orgCode.length > 0) {
        requestData.orgCode = this.studentSearchForm.orgCode[
          this.studentSearchForm.orgCode.length - 1
        ];
      }

      this.queryStudentBaseInfo(requestData).then(response => {
        this.studentData = response.resBody.baseData;
        this.pageInfo = response.resBody.pageInfo;
      });
    },
    subChange(val, vueCom, obj) {
      //分值科目改变
      this.topForm.standardSubjectName = obj.obj.name;
      this.subjectCode = val;
      this.getItemList();
      //清空所有科目项分值项的值
      this.forData.forEach(it => {
        it.formData.itemId = null;
        it.formData.itemName = "";
        it.formData.scoreId = null;
        it.formData.scoreName = "";
        it.formData.scoreValue = null;
      });
    },
    getstandardSubjectList() {
      this.getSubjectBySSCodeAndProjectId({
        projectId: this.projectId,
        standardSubjectCode: this.standardSubjectCode
      }).then(response => {
        this.standardSubjectList = response.resBody;
      });
    },
    scoreChange(val, vueCom, obj) {
      console.log([val, vueCom, obj]);
      obj.item.formData.scoreName = obj.obj.name;
      obj.item.formData.scoreValue = obj.obj.value;
    },
    itemChange(val, vueCom, obj) {
      console.log([val, vueCom, obj]);
      obj.item.formData.scoreId = null;
      obj.item.formData.scoreName = "";
      obj.item.formData.scoreValue = null;
      obj.item.formData.itemName = obj.obj.item.name;
      obj.item.scoreList = obj.obj.scoreList;
    },
    getItemList() {
      this.itemList = [];
      this.getItemListAndScoreList({
        projectId: this.projectId,
        subjectCode: this.subjectCode
      }).then(response => {
        var res = response.resBody;
        res.forEach(it => {
          this.itemList.push(it);
        });
      });
    },
    removeItem(ite) {
      var index = this.forData.indexOf(ite);
      this.forData.splice(index, 1);
    },
    addItem() {
      this.forData.push({
        scoreList: [],
        formData: {
          targetEvaluator: {
            targetId: null,
            targetName: "",
            targetOrgCode: "",
            targetOrgName: ""
          },
          title: "",
          itemId: null,
          itemName: "",
          scoreId: null,
          scoreName: "",
          quantity: 1,
          scoreValue: null,
          ocDate: ""
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.projectId || !to.query.standardSubjectCode) {
        vm.$message.error("参数不正确");
        return;
      }
      vm.projectId = to.query.projectId;
      vm.standardSubjectCode = to.query.standardSubjectCode;
      //vm.getItemList();
      vm.getstandardSubjectList();
      vm.getStudentData();
      vm.getOrgList();
    });
  }
};
</script>

<style>
</style>
