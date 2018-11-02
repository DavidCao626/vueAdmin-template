<template>
  <page>
    <div slot="title">
      学院环节数据
    </div>
    <slot name="header">
      <div class="approval-panel" style="">
        <div style="float: right;    margin-top: 4px;">
          <el-button-group>
          </el-button-group>
        </div>
        <projectinfo :item-id="itemId"></projectinfo>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
          <el-form-item label="申请人学号">
            <el-input v-model="formInline.user" placeholder="申请人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </slot>
     <div class="approval-panel"  style="padding: 10px;">
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
              <el-form-item label="证件类型:">
                <span>{{ props.row.zjlx }}</span>
              </el-form-item>
              <el-form-item label="证件号码">
                <span>{{ props.row.zjhm }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="成绩排名人数:">
                <span>{{ props.row.cjpmrs }}</span>
              </el-form-item>
              <el-form-item label="成绩名次:">
                <span>{{ props.row.cjpmmc }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="必修课及格门数:">
                <span>{{ props.row.bxkjgms }}</span>
              </el-form-item>
              <el-form-item label="必修课门数:">
                <span>{{ props.row.bxkms }}</span>
              </el-form-item>
              <br/>

              <el-form-item label="综合考评名次:">
                <span>{{ props.row.zhkpmc }}</span>
              </el-form-item>

              <el-form-item label="综合考评人数:">
                <span>{{ props.row.zhkprs }}</span>
              </el-form-item>
              <br/>
              <el-form-item label="学院评议:">
                <span>{{ props.row.xypy }}</span>
              </el-form-item>
              <br/>
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
        <el-table-column label="申请等级" width="80" prop="sqdj">
        </el-table-column>
        <el-table-column label="证件类型" prop="zjlx">
        </el-table-column>
        </el-table-column>
        <el-table-column label="证件号码" width="80" prop="zjhm">
        </el-table-column>
        <el-table-column label="成绩排名人数" prop="cjpmrs">
        </el-table-column>
        <el-table-column label="成绩名次" prop="cjpmmc">
        </el-table-column>
        <el-table-column label="必修课及格门数" prop="bxkjgms">
        </el-table-column>
        <el-table-column label="必修课门数" prop="bxkms">
        </el-table-column>
        <el-table-column label="综合考评名次" prop="zhkpmc">
        </el-table-column>
        <el-table-column label="综合考评人数" prop="zhkprs">
        </el-table-column>
        <el-table-column label="学院评议" prop="xypy">
        </el-table-column>
        <el-table-column label="班级推荐" prop="bjtj" width="80">
        </el-table-column>
        <el-table-column label="学院推荐" :formatter="banjiFormatter" width="80" prop="xueyuanpingshen">
        </el-table-column>

        <!-- <el-table-column label="状态" fixed="right" prop="isDot" width="100" :filters="[{ text: '已处理', value: true }, { text: '未处理', value: false }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDot === true ? 'info' : 'danger'" disable-transitions>
              {{scope.row.isDot=== true ? '已处理' : '未处理'}}
            </el-tag>
          </template>
        </el-table-column> -->
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
import projectinfo from "../../_components/itemProjectSimpleInfo";
import store from "../../_store/index.js";
export default {
  components: {
    projectinfo
  },
  methods: {
    banjiFormatter(row, column, cellValue, index) {
      if (row.isDot == true) {
        var result="";
        this.serviceTypeList.forEach(item => {
          if (item.value == row.xueyuanpingshen) {
            result=item.label;
            return false;
          }
        });
        return result;
      } else{
        return " ";
      }
    },
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
      console.log([scope, val]);
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
            sqType: item.serviceTypeName,
            sqdj: item.childServiceTypeName,
            banjipingshen: item.classRecommend,
             xueyuanpingshen: item.collegeRecommend,
            zjlx: item.idType,
            zjhm: item.idNum,
            cjpmrs: item.rankNum,
            cjpmmc: item.scoreRank,
            bxkjgms: item.requiredCoursePass,
            bxkms: item.requiredCourseNum,
            zhkpmc: item.appraisalRank,
             bjtj: "",
              xypy: "",
            zhkprs: item.appraisalNum
          };
            var _this = this;
          if (item.classRecommend != null && item.classRecommend != undefined) {
            _this.serviceTypeList.forEach(el => {
              if(el.value == item.classRecommend){
                tempLis.bjtj = el.label
              }
            });
          } else {
            tempLis.bjtj = "无";
          }
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
