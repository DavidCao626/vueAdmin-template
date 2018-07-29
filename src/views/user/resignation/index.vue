<template>
    <div>

        <elx-table-layout>

            <template slot="headerRight">
                <el-button-group>
                    <el-tooltip class="item" effect="dark" content="分配职务" placement="bottom">
                        <el-button plain size="mini" @click="addReg">
                            分配
                        </el-button>
                    </el-tooltip>
                    </el-button-group>
            </template>

            <el-table :data="data" style="width: 100%" border size="mini" :default-sort="{prop: 'date', prop: 'name',prop: 'address'}" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="38">
                </el-table-column>

                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="orgName" label="任职组织">
                </el-table-column>
                <el-table-column prop="definitionName" label="职务名称">
                </el-table-column>
                <el-table-column prop="beginDate" label="任职时间">
                </el-table-column>
                <el-table-column prop="isBandh" :formatter="stateFormatter" label="状态">
                </el-table-column>
                <el-table-column label="操作" width="88" header-align="left" align="center">
                    <template slot-scope="scope">
                        <el-dropdown>
                            <el-button size="mini" @click="">
                                <i class="el-icon-arrow-down"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="edit(scope.row)">编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="del(scope.row)">移除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
                <!-- <el-table-column type="expand" label="#" width="42">
                    <template slot-scope="props" style="background-color:#f7f8f9">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="证件类型:">
                                <span v-html="idTypeFormatter(props.row.identity_type)"></span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="证件号码:">
                                <span>{{ props.row.identity_no }}</span>
                            </el-form-item>
                            <br/>
                            <el-form-item label="家庭住址:">
                                <span>{{ props.row.postal_address }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column> -->
            </el-table>

        </elx-table-layout>


<el-dialog
  title="编辑"
  :visible.sync="editDV"
  width="30%"
  >
  <el-radio-group size="small" v-model="editData.isBandh">
      <el-radio-button v-for="item in stateList" :key="item.dict_key" :label="item.dict_key">{{item.dict_desc}}</el-radio-button>
    </el-radio-group>

  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="editDV = false">取 消</el-button>
    <el-button size="small" type="primary" @click="updateResign">确 定</el-button>
  </span>
</el-dialog>



    </div>
</template>

  <script>
import Vue from "vue";
import Element from "element-ui-x";
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
import moment from "moment";
Vue.use(Element);
export default {
  data() {
    return {
        editData:{
            isBandh:""//Y||N
        },
        editDV:false,
        type:"",//student||staff||other
        stuNo:"",
      multipleSelection: [], //选中的值
      isMultipleSelection: false, //是否选中
      dialogVisible: false,
      deleteOpen: false,
      importOpen: false,
      exportOpen: false,
      data: [],
      stateObj:{},
      stateList:[],
      action: "https://jsonplaceholder.typicode.com/posts/"
    };
  },
  watch: {
    multipleSelection() {
      return this.multipleSelection.length > 0
        ? (this.isMultipleSelection = true)
        : (this.isMultipleSelection = false);
    }
  },
  methods: {
      updateResign(){
          this.editDV=false
      },
    addReg() {
      console.log(["分配职务"]);
    },
    ...mapActions({
      queryResignationByStuNo: store.namespace + "/queryResignationByStuNo",
      getDictByDictNames: store.namespace + "/getDictByDictNames",
      deleteUserResigDutyById:store.namespace + "/deleteUserResigDutyById"
    }),
    del(row) {
      console.log(["row", row]);
      this.deleteUserResigDutyById({id:row.id}).then(response=>{
          this.$message.success("移除成功!")
          if(this.type=="student"){
              this.getStuData();
          }
      })
    },
    edit(row) {
        this.editDV=true
        this.editData.isBandh=row.isBandh
      console.log(["row", row]);
    },
    stateFormatter(row,column,cellValue,index){
        console.log(["dict",cellValue,this.stateObj[cellValue],this.stateObj])
        return this.stateObj[cellValue];
    },
    getDict() {
      var requestData = {
        dicts: ["is_bandh"]
      };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["is_bandh", response]);
        var res = response.resBody;
        this.stateList = res.is_bandh
        res.is_bandh.forEach(el => {
          this.stateObj[el.dict_key] = el.dict_desc;
        });
      });
    },
    getStuData() {
      var requestData = {
        stuNo: this.stuNo
      };
      this.queryResignationByStuNo(requestData).then(response => {
        console.log(["查询数据", response]);
        this.data = response.resBody.resignation;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      console.log("submit!");
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onMultipleSelectionDel() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$emit("onSelectionDel", this.multipleSelection);
      });
    },
    onExportExcel() {
      this.$emit("onExportExcel");
    },
    onUploadSuccess() {
      this.$emit("onUploadSuccess");
    },
    onNew() {
      this.$emit("onNew");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!to.query.stuNo || !to.query.type) {
        vm.$message.error("参数不正确!");
        vm.$router.go(-1);
      }else{
          vm.stuNo = to.query.stuNo
      }
        if(to.query.type == "student"){
            //学生任职
            vm.type="student"
            vm.getStuData();
        }else if(to.query.type == "staff"){
            //教师任职
            vm.type="staff"
              vm.getStaffData();
        }
      vm.getDict();
    });
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
.demo-form-inline {
  display: inline !important;
}
</style>