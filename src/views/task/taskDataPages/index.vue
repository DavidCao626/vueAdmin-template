<template>
  <page :Breadcrumb="false">
    <div slot="title">节点信息</div>

    <div slot="panel">
      <ProjectProgress>
        <div style="max-width:800px">
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">节点名称：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.node_title}}</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">审批人是什么</div>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">开始时间：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.plan_start_time}}</div>
            </el-col>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">结束时间：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{nodeInfo.plan_complete_time}}</div>
            </el-col>
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">节点描述：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.node_desc}}</div>
            </el-col>
            <!-- <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">刘能</div>
            </el-col> -->
          </el-row>
          <br/>
          <el-row>
            <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">创建时间</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{nodeInfo.create_time}}</div>
            </el-col>
            <!-- <el-col :span="2" :offset="1">
              <div class="grid-content bg-purple">审批人：</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">刘能</div>
            </el-col> -->
          </el-row>
        </div>
      </ProjectProgress>
    </div>
    <div>
      <div class="components-container">
        <el-dialog v-el-drag-dialog title="审批数据" :visible.sync="dialogTableVisible">
          <div>
            <!-- <el-tag v-for="tag in multipleSelection" :key="tag.key" size="medium" closable style="margin: 0 10px 10px 10px" @close="handleClose(tag)">
              {{tag.name}}
            </el-tag> -->
          </div>
          <el-form label-width="100px" label-position="top">
            <el-form-item label="* 审批意见">
              <el-input type="textarea" v-model="approveRecordData.opinion"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="* 是否同意">
              <el-radio-group v-model="approveRecordData.applyStatus">
                <el-radio label="Y">同意</el-radio>
                <el-radio label="N">不同意</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button type="info" plain @click="hideVisible"> 关闭</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="top" type="border-card">
        <el-tab-pane label="待审核数据" name="second">
          <!-- 表格列内容伸缩 -->
          <div class="filter-container" style="float:right;">
            <el-checkbox-group v-model="checkboxVal">
              <el-checkbox label="user_object_name">用户类别</el-checkbox>
              <el-checkbox label="apply_status">申请状态</el-checkbox>
              <el-checkbox label="org_name">申请人机构</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 按钮区域 -->
          <div style="margin-bottom:10px;">
            <!-- <el-button  type="default" class="el-icon-circle-chec" plain @click="toggleSelection([tableData3[1], tableData3[2]])">
              全选
            </el-button> -->
            <el-button type="info" class="el-icon-edit-outline" plain @click="showVisible">
              审核
            </el-button>
          </div>
          <div class="clearfix"></div>

          <!-- 数据表 -->
          <el-table ref="multipleTable" :data="tableDataTodo" tooltip-effect="dark" style="width: 100%" :key='key' fit highlight-current-row @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="用户对象编号" width="120" prop="apply_user_classify_no">
            </el-table-column>
            <el-table-column label="申请项目编号" width="120" prop="apply_project">
            </el-table-column>
            <el-table-column label="业务类别" width="120" prop="classify_name">
            </el-table-column>
            <el-table-column label="申请人机构" width="120" prop="org_name">
            </el-table-column>
            <el-table-column label="申请理由" prop="apply_reason">
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.dataCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核数据" name="third">

          <!-- 数据表 -->
          <el-table ref="multipleTable" :data="tableDataDone" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column label="用户对象编号" width="120" prop="apply_user_classify_no">
            </el-table-column>
            <el-table-column label="申请项目编号" width="120" prop="apply_project">
            </el-table-column>
            <el-table-column label="申请理由" width="120" prop="apply_reason">
            </el-table-column>
            <el-table-column label="申请状态" width="120" prop="apply_status">
            </el-table-column>
            <el-table-column label="业务类别" width="120" prop="classify_name">
            </el-table-column>
            <el-table-column label="申请人机构" width="120" prop="org_name">
            </el-table-column>
            <el-table-column label="操作人" width="120" prop="operator">
            </el-table-column>
            <el-table-column label="操作时间" width="120" prop="operation_time">
            </el-table-column>
            <el-table-column label="操作类型" width="120" prop="operation_method">
            </el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <el-button size="medium" type="text" class="el-icon-refresh" @click="showVisible"> 重审</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pagination2.currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagination2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination2.dataCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </page>
</template>
<script>
import { getNodeInfo, queryTodo, queryDone,approveRecord} from "~/api/taskData";
import { ProjectProgress } from "~/views/task/components/Progress";
import elDragDialog from "~/directive/el-dragDialog"; // base on element-ui
const defaultFormThead = ["date", "name"];

export default {
  directives: { elDragDialog },
  components: { ProjectProgress },
  data() {
    return {
 nodeNo: "P15256613348894831", //----这是传过来的节点编号

      approveRecordData:{
opinion:"",
applyStatus:"",
nodeNo:this.nodeNo,
blocks:[]
      },
      pagination: { dataCount: 0, currentPage: 1, pageSize: 10 }, //未审核分页
      pagination2: { dataCount: 0, currentPage: 1, pageSize: 10 }, //已审核分页
     
      nodeInfo: {},
      dialogTableVisible: false,
      data: [],
      activeName: "second",
      tableDataTodo: [],
      tableDataDone: [],
      multipleSelection: [],
      key: 1, // table key
      formTheadOptions: ["date", "name", "address"],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    };
  },
  methods: {
    //下面是未审核的分页事件
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.queryTodoData();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.queryTodoData();
    },
    //下面是已审核的分页事件
    handleSizeChange2(val) {
      this.pagination2.pageSize = val;
      this.queryDoneData();
    },
    handleCurrentChange2(val) {
      this.pagination2.currentPage = val;
      this.queryDoneData();
    },
    handleClose(tag) {
      this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

    console.log(val);

    },
    onSubmit(){
        
        // for(var i =0;i<this.multipleSelection.length,i++ ){
        //   var d = {recordId:this.multipleSelection[i].id,applyDataNo:this.multipleSelection[i].data_no,userHashCode:this.multipleSelection[i].apply_user_hash_code}
        //     this.approveRecordData.blocks.push(d);
        // }

        var submitData = {
          
        }


    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showVisible() {
      this.dialogTableVisible = true;
    },
    hideVisible() {
      this.dialogTableVisible = false;
    },
    queryTodoData() {
      var that = this;
      var queryTodeConfig = this.pagination;
      queryTodeConfig.nodeNo = this.nodeNo;
      queryTodo(queryTodeConfig).then(response => {
        that.tableDataTodo = response.resBody.resultList;
        that.pagination.dataCount = response.resBody.page.totalRecord;
      });
    },
    queryDoneData() {
      var that = this;
      var queryDoneConfig = this.pagination2;
      queryDoneConfig.nodeNo = this.nodeNo;
      queryDone(queryDoneConfig).then(response => {
        that.tableDataDone = response.resBody.resultList;
        that.pagination2.dataCount = response.resBody.page.totalRecord;
      });
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      );
      this.key = this.key + 1; // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    }
  },
  mounted() {
    var that = this;
    //获取节点信息
    var getNodeInfoConfig = {
      nodeNo: this.nodeNo
    };
    getNodeInfo(getNodeInfoConfig).then(response => {
      this.nodeInfo = response.resBody;
    });
    this.queryTodoData();
    this.queryDoneData();
    //--------------------------
  }
};
</script>
<style lang="scss" scoped>

</style>
