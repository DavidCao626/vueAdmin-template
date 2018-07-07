<template>
    <page>
        <div slot="title">
            班级审核
        </div>
        <slot name="header">
            <div class="approval-panel" style="">
                <div style="float: right;    margin-top: 4px;">
                    <el-button-group>
                        <!-- <el-button plain size="mini">
                            <i class="el-icon-sort-down"></i>
                        </el-button>
                        //排序
                        <el-button plain size="mini">

                            <i class="el-icon-sort-up"></i>
                        </el-button> -->
                    </el-button-group>
                </div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                    <!-- <el-form-item label="业务类别">
                        <el-select v-model="formInline.region" placeholder="筛选类别">
                            <el-option label="全部" value="shanghai"></el-option>
                            <el-option label="贫困建档" value="beijing"></el-option>
                            <el-option label="助学金" value="beijing2"></el-option>
                            <el-option label="奖学金" value="beijing3"></el-option>
                            <el-option label="学生资助" value="beijing4"></el-option>
                            <el-option label="其他" value="beijing5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="相关项目">
                        <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入相关项目名称" @select="handleSelect"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="上报机构">
                        <el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入相关项目名称" @select="handleSelect"></el-autocomplete>
                    </el-form-item> -->
                    <el-form-item label="申请人学号">
                        <el-input v-model="formInline.user" placeholder="申请人"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </slot>
        <div>
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
                            <br/>
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
                            <el-form-item label="家庭支出:">
                                <span>{{ props.row.jtzc }}</span>
                            </el-form-item>
                            <br/>

                            <el-form-item label="互评情况:">
                                <span>{{ props.row.huping }}</span>
                            </el-form-item>

                            <br/>

                            <el-form-item label="组评情况:">
                                <span>{{ props.row.zuping }}</span>
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
                <el-table-column label="班级互评" prop="huping">
                </el-table-column>
                <el-table-column label="班级组评" prop="zuping">
                </el-table-column>

            </el-table>
        </div>

        <div class="approval-panel">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100,200, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
            </el-pagination>
        </div>

    </page>
</template>

<script>
import dynamicTable from "~/components/DynamicTable";
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../../_store/index.js";
export default {
  methods: {
    filterTag(value, row) {
      //本页过滤状态
      return row.isDot === value;
    },
    ...mapActions({
      getClassDataAndPageDataByItemId:
        store.namespace + "/getClassDataAndPageDataByItemId",
      updateClassRecommend: store.namespace + "/updateClassRecommend",
      submitClassData: store.namespace + "/submitClassData"
    }),
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    commitData() {
      this.submitClassData({ itemId: this.itemId }).then(response => {
        this.$message.success("提交成功");
        var scopeId = response.resBody.scopeId;
        this.$router.push({
          path: "/project/control",
          query: {
            scopeId: scopeId
          }
        });
      });
    },
    onSubmit() {
      //查询
      this.currentPage = 1;
    
      this.getData();
    },
    saveData() {
      //保存数据
      var requestData = {
        itemId: this.itemId,
        updateData: []
      };
      this.data.forEach(item => {
        var temp = {
          dataNo: item.dataNo,
          recommend: item.banjipingshen
        };
        requestData.updateData.push(temp);
      });
      this.updateClassRecommend(requestData).then(response => {
        this.getData();
      });
    },
    getData() {
      var requestData = {
        scopeId: this.scopeId,
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
            huping: "",
            zuping: ""
          };
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
          tempLis.jtdesc += "家庭支出:" + tempLis.jtzc + "元";
          //处理班互评或者组评
            // item.groupComment = {
            //   "201804": 4,
            //   "201805": 5,
            //   "201806": 6,
            //   "201807": 7
            // };
            // item.eachOtherComment = {
            //   "201804": 4,
            //   "201805": 5,
            //   "201806": 6,
            //   "201807": 7
            // };

          var _this = this;

          if (item.groupComment != null && item.groupComment != undefined) {
            var obj1 = item.groupComment;
            Object.keys(obj1).forEach(function(key) {
              var tempName = "";
              _this.serviceTypeList.forEach(ele => {
                if (ele.value == key) {
                  tempName = ele.label;
                }
              });
              tempLis.zuping += tempName + ":" + obj1[key] + "人,";
            });
            tempLis.zuping = tempLis.zuping.substring(
              0,
              tempLis.zuping.length - 1
            );
          }else{
                tempLis.zuping = "暂无"
          }

          if (
            item.eachOtherComment != null &&
            item.eachOtherComment != undefined
          ) {
            var obj2 = item.eachOtherComment;
            Object.keys(obj2).forEach(function(key) {
              var tempName = "";
              _this.serviceTypeList.forEach(ele => {
                if (ele.value == key) {
                  tempName = ele.label;
                }
              });
              tempLis.huping += tempName + ":" + obj2[key] + "人,";
            });
            tempLis.huping = tempLis.huping.substring(
              0,
              tempLis.huping.length - 1
            );
          }else{
               tempLis.huping = "暂无"
          }

          this.data.push(tempLis);
        });
      });
    }
  },
  data() {
    return {
      serviceTypeList: [{ label: "label", value: "value" }],
      scopeId: 0,
      currentPage: 1,
      pageSize: 10,
      totalRecord: 0,
      formInline: {
        user: "",
        region: ""
      },
      data: [
        {
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(["to", to]);
      if (to.query.scopeId != null && to.query.scopeId != undefined) {
        vm.scopeId = to.query.scopeId;
      } else {
        if (to.params.scopeId != null && to.params.scopeId != undefined) {
          vm.scopeId = to.params.scopeId;
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

<style>
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
