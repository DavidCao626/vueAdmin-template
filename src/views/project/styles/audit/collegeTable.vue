<template>
  <page>
    <div slot="title">
      学院审核
    </div>
    <div slot="header">
      <projectinfo :item-id="itemId"></projectinfo>
    </div>
    <div slot="panel">
      <elx-table-layout>
        <template slot="headerLeft">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="申请人学号:">
              <el-input v-model="formInline.user" placeholder="申请人"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" icon="el-icon-search">查 询</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="headerRight">
          <el-button size="mini" @click="zancun">暂存</el-button>
          <el-button size="mini" @click="commitData">提交</el-button>
        </template>
        <el-table :data="data" style="width: 100%;" size="mini">
          <el-table-column type="expand">
            <template slot-scope="props">

              <el-form label-position="" inline class="demo-table-expand" size="mini">

                <el-form-item label="姓名:">
                  <span>{{ props.row.name }}</span>
                </el-form-item>

                <el-form-item label="学号:">
                  <span>{{ props.row.cid }}</span>
                </el-form-item>
                <br />
                <el-form-item label="家庭情况:">
                  <span>{{ props.row.jtQk }}</span>
                </el-form-item>
                <el-form-item label="家庭人口">
                  <span>{{ props.row.jtNumber }}</span>
                </el-form-item>

                <el-form-item label="是否低保户:">
                  <span>{{ props.row.jtisDb }}</span>
                </el-form-item>
                <el-form-item label="是否建档立卡:">
                  <span>{{ props.row.jtisjdlk }}</span>
                </el-form-item>

                <el-form-item label="家庭收入:">
                  <span>{{ props.row.jtsr }}</span>
                </el-form-item>
                <br />

                <el-form-item label="学院评议:">
                  <span>{{ props.row.xypy }}</span>
                </el-form-item>

                <br />

                <el-form-item label="班级推荐:">
                  <span>{{ props.row.bjtj }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="申请人">
            <el-table-column label="姓名" width="100" prop="name">
            </el-table-column>
            <el-table-column label="学号" width="100" prop="cid">
            </el-table-column>

          </el-table-column>

          <el-table-column label="家庭情况" prop="jtdesc">
          </el-table-column>
          </el-table-column>
          <el-table-column label="申请等级" width="80" prop="shenqin">
          </el-table-column>
          <el-table-column label="学院评议" prop="xypy">
          </el-table-column>
          <el-table-column label="班级推荐" prop="bjtj" width="80">
          </el-table-column>
          <el-table-column label="学院推荐" width="150" fixed="right">
            <template slot-scope="scope">
              <el-select v-model="scope.row.xueyuanpingshen" placeholder="请选择" @change="saveData(scope,$event)">
                <el-option v-for="(item,index) in serviceTypeList" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

        </el-table>
        <template slot="footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100,200, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
          </el-pagination>
        </template>
      </elx-table-layout>
    </div>
    <div class="approval-panel" style="text-align: center;">
      <el-button size="mini" @click="zancun">暂存</el-button>
      <el-button size="mini" @click="commitData">提交</el-button>
    </div>
  </page>
</template>

<script>
import projectinfo from "../../_components/itemProjectSimpleInfo";
import dynamicTable from "~/components/DynamicTable";
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../../_store/index.js";
export default {
  components: {
    projectinfo
  },
  methods: {
    filterTag(value, row) {
      //本页过滤状态
      return row.isDot === value;
    },
    ...mapActions({
      getClassDataAndPageDataByItemId:
        store.namespace + "/getCollegeDataAndPageDataByItemId",
      updateClassRecommend: store.namespace + "/updateCollegeRecommend",
      submitClassData: store.namespace + "/submitCollegeData",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    zancun() {
      this.$router.go(-1);
    },

    commitData() {
      this.submitClassData({ itemId: this.itemId }).then(response => {
        this.completeUserPendingByItemId({ itemId: this.itemId }).then(res => {
          this.$message.success("提交成功");
          var scopeId = response.resBody.scopeId;
          this.$router.push({
            path: "/project/control",
            query: {
              scopeId: scopeId
            }
          });
        });
      });
    },
    onSubmit() {
      //查询
      this.currentPage = 1;

      this.getData();
    },
    saveData(scope, val) {
      //保存数据
      var requestData = {
        itemId: this.itemId,
        dataNo: scope.row.dataNo,
        recommend: val
      };
      this.updateClassRecommend(requestData).then(response => {
        this.getData();
      });
    },
    getData() {
      var requestData = {
        itemId: this.itemId,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        stuNo: this.formInline.user
      };
      this.getClassDataAndPageDataByItemId(requestData).then(response => {
        console.log(["getData", response]);
        //处理子业务类别。赋给this.serviceTypeList
        var tSer = (this.serviceTypeList = []);
        var serTyleList = response.resBody.serviceTypeList;
        serTyleList.forEach(item => {
          var ser = {};
          ser.label = item.classifyName;
          ser.value = item.classifyCode;
          tSer.push(ser);
        });
        //处理分页信息
        this.totalRecord = response.resBody.pageInfo.totalRecord;
        //处理表格数据
        this.data = [];
        var baseData = response.resBody.baseData;
        baseData.forEach(item => {
          var tempLis = {
            dataNo: item.dataNo,
            id: 0,
            isDot: item.isDispose == "Y" ? true : false,
            name: item.studentName,
            cid: item.stuNo,
            jtNumber: item.homePersonCount,
            jtQk: "单亲",
            jtdesc: "描述",
            jtisDb: "是",
            jtisjdlk: "是",
            jtsr: item.perCapitaIncome,
            jtzc: item.perCapitalExpenditure,
            sqType: item.serviceTypeName,
            shenqin: item.childServiceTypeName,
            banjipingshen: item.classRecommend,
            xueyuanpingshen: item.collegeRecommend,
            bjtj: "",
            xypy: ""
          };
          var _this = this;
          if (item.classRecommend != null && item.classRecommend != undefined) {
            _this.serviceTypeList.forEach(el => {
              if (el.value == item.classRecommend) {
                tempLis.bjtj = el.label;
              }
            });
          } else {
            tempLis.bjtj = "无";
          }
          if (item.isSingleParent == "Y") {
            tempLis.jtQk = "单亲";
          } else if (item.isOrghan == "Y") {
            tempLis.jtQk = "孤儿";
          } else {
            tempLis.jtQK = "双亲";
          }

          tempLis.jtdesc = tempLis.jtQk + ",";

          if (item.isBasicAllowance == "Y") {
            tempLis.jtisDb = "是";
            tempLis.jtdesc += "低保,";
          } else {
            tempLis.jtisDb = "否";
          }
          if (item.isCreateFile == "Y") {
            tempLis.jtisjdlk = "是";
            tempLis.jtdesc += "已建档,";
          } else {
            tempLis.jtisjdlk = "否";
          }
          tempLis.jtdesc += "家庭收入:" + tempLis.jtsr + "元,";
          //处理班互评或者组评
          //   item.groupComment = {
          //     "201804": 4,
          //     "201805": 5,
          //     "201806": 6,
          //     "201807": 7
          //   };
          //   item.eachOtherComment = {
          //     "201804": 4,
          //     "201805": 5,
          //     "201806": 6,
          //     "201807": 7
          //   };

          if (item.collegeCommend != null && item.collegeCommend != undefined) {
            var obj1 = item.collegeCommend;
            Object.keys(obj1).forEach(function(key) {
              var tempName = "";
              _this.serviceTypeList.forEach(ele => {
                if (ele.value == key) {
                  tempName = ele.label;
                }
              });
              tempLis.xypy += tempName + ":" + obj1[key] + "人,";
            });
            tempLis.xypy = tempLis.xypy.substring(0, tempLis.xypy.length - 1);
          } else {
            tempLis.xypy = "暂无";
          }
          this.data.push(tempLis);
        });
      });
    }
  },
  data() {
    return {
      serviceTypeList: [{ label: "label", value: "value" }],
      itemId: 0,
      currentPage: 1,
      pageSize: 10,
      totalRecord: 0,
      formInline: {
        user: "",
        region: ""
      },
      data: [{}]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(["to", to]);
      if (to.query.itemId != null && to.query.itemId != undefined) {
        vm.itemId = to.query.itemId;
      } else {
        if (to.params.itemId != null && to.params.itemId != undefined) {
          vm.itemId = to.params.itemId;
        } else {
          vm.$message.error("参数错误");
          return;
        }
      }
      vm.getData();
    });
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
.demo-form-inline .el-form-item {
  margin-bottom: 0px;
}
.approval-panel {
  padding: 15px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
}
table {
  width: 100%;
  font-size: 13px;
  text-align: left;
  /* border: 1px solid #ebeef5; */
}
th {
  background-color: #ebeef5;
  font-weight: 500;
  font-size: 13px;
}
td,
th {
  padding: 10px;
  color: #303133;
}
td {
  padding: 10px;
  height: 30px;
  background-color: #ffffff;
  border-bottom: #ebeef5 1px solid;
}
.showLine {
  background-color: #ebeef5;
}
</style>
