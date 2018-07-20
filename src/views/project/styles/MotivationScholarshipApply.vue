<template>
  <div>
    <page style="width: 1000px;margin: 0 auto;" :Breadcrumb="false">
      <!-- <div slot="title">学生业务申请</div> -->
      <div slot="panel">
        <h2>{{formTitle}}</h2>
        <hr/>
        <proInfo :itemId="itemId"></proInfo>
        <!-- <div>项目名称：{{resData.projectData.projectName}}</div>
        <div>项目类别：{{resData.projectData.projectServiceTypeName}}</div>
        <div>环节名称：{{resData.scopeData.scopeName}}</div>
        <div>过期时间：{{endTime}}</div> -->

        <!-- <h4 v-if="formDesc">
                    填写要求：
                    <div>{{formDesc}}</div>
                </h4> -->
        <h4 v-if="formFiles.length>0">
          下载附件：
          <div>
            <a v-for="(i,index) in formFiles" :key="index" :href="i.url">{{i.name}} &nbsp;&nbsp; </a>
          </div>
        </h4>
      </div>
    </page>
    <page style="width: 1000px;margin: 0 auto;">
      <div slot="panel">
        <h3 style="font-weight:400">一、填写申请信息</h3><hr/>
        <el-form ref="form" :model="form" label-width="120px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="学生姓名">
                <el-input v-model="form.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="学号">
                <el-input v-model="form.number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="所在班级">
                <el-input v-model="form.class" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="业务类别">
                <el-input v-model="form.type" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="申请子业务类别">
                <el-select v-model="form.typeValue" placeholder="请选择">
                  <el-option v-for="item in form.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="21">
              <el-form-item label="申请理由">
                <el-input type="textarea" :rows="3" v-model="form.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="相关附件">
                <el-upload class="upload-demo" :action="uploadAttrUrl" :on-preview="handlePreview" :on-success="handleSuccess" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="form.fileList">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>

      </div>
    </page>
    <page style="width: 1000px;margin: 0 auto;">
      <div slot="panel">
        <h3 style="font-weight:400">二、相关信息</h3><hr/>
        <el-form ref="form" :model="form" label-width="120px" size="small">
          <el-row>
            <el-col :span="10">
              <el-form-item label="成绩排名">
                <el-input v-model="form.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="成绩排名人数">
                <el-input v-model=" form.username " disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10 ">
              <el-form-item label="必修课数量 ">
                <el-input v-model="form.username " disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10 " :offset="1 ">
              <el-form-item label="必修课及格数 ">
                <el-input v-model="form.username " disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row> <el-row>
            <el-col :span="10 ">
              <el-form-item label="综合考评名次 ">
                <el-input v-model="form.username " disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10 " :offset="1 ">
              <el-form-item label="综合考评总人数">
                <el-input v-model="form.username" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </page>
    <page style="width: 1000px;margin: 0 auto;">
      <div slot="panel">
        <div style="text-align:center">
          <!-- <h4 v-if="formDays>=0" style="text-align:center">截止最后提交日期 还有
                        <strong style="color:red;">{{formDays}}</strong> 天</h4> -->
          <!-- <h4 v-else style="text-align:center;color:red;">申请表单已到最后截止日期，不能提交。如有问题请联系相关老师。</h4> -->
          <br>
          <el-button v-if="formDays>=0" type="primary" @click="onSubmit">提交申请</el-button>
          <el-button @click="cancle">返回取消</el-button>
        </div>
      </div>
    </page>
  </div>
</template>

<script>
import proInfo from "../_components/projectSimpleInfo";
import store from "../_store/index.js";
import { mapActions, mapMutations, mapGetters, Store } from "vuex";
import moment from "moment";
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getReasonList();
      if (to.query.itemId != undefined) {
        let itemId = to.query.itemId;
        if (itemId != "" && itemId != null) {
          vm.itemId = itemId;
          vm.getApplyData({ itemId: itemId }).then(response => {
            var resp = response.resBody;
            vm.resData = resp;
            vm.projectSystemCode = resp.projectData.projectSystemCode;
            vm.formTitle = resp.projectData.projectName + "申请表";
            //附件
            vm.formFiles = [];
            if (resp.projectData.files) {
              resp.projectData.files.forEach(item => {
                let temp = {
                  name: "",
                  url: ""
                };
                temp.name = item.userFileName;
                temp.url = item.userPath;
                vm.formFiles.push(temp);
              });
            }
            if (
              resp.itemData.planCompleteTime != null &&
              resp.itemData.planCompleteTime != ""
            ) {
              vm.formDays = vm.DateDiff(
                resp.itemData.planCompleteTime,
                moment(new Date()).format("YYYY-MM-DD")
              );
            }
            vm.form.username = resp.studentData.userName;
            vm.form.number = resp.studentData.userNo;
            vm.form.class = resp.studentData.userOrgsName;
            vm.form.type = resp.projectData.projectServiceTypeName;
            vm.form.options = [];
            resp.childServiceType.forEach(item => {
              let temp = {
                value: item.classifyCode,
                label: item.classifyName
              };
              vm.form.options.push(temp);
            });
          });
        }
      } else if (to.params.itemId != undefined) {
        let itemId = to.query.itemId;
        if (itemId != "" && itemId != null) {
          vm.itemId = itemId;
          vm.getApplyData({ itemId: itemId }).then(response => {
            var resp = response.resBody;
            vm.projectSystemCode = resp.projectData.projectSystemCode;
            vm.formTitle = resp.projectData.projectName + "申请表";
            //附件
            vm.formFiles = [];
            if (resp.projectData.files) {
              resp.projectData.files.forEach(item => {
                let temp = {
                  name: "",
                  url: ""
                };
                temp.name = item.userFileName;
                temp.url = item.userPath;
                vm.formFiles.push(temp);
              });
            }
            if (
              resp.itemData.planCompleteTime != null &&
              resp.itemData.planCompleteTime != ""
            ) {
              vm.formDays = vm.DateDiff(
                resp.itemData.planCompleteTime,
                moment(new Date()).format("YYYY-MM-DD")
              );
            }
            vm.form.username = resp.studentData.userName;
            vm.form.number = resp.studentData.userNo;
            vm.form.class = resp.studentData.userOrgsName;
            vm.form.type = resp.projectData.projectServiceTypeName;
            vm.form.options = [];
            resp.childServiceType.forEach(item => {
              let temp = {
                value: item.classifyCode,
                label: item.classifyName
              };
              vm.form.options.push(temp);
            });
          });
        }
      }
    });
  },
  components: {
    proInfo
  },
  computed: {
    ...mapGetters({
      uploadAttrUrl: store.namespace + "/getUploadAttrUrl"
    }),
    endTime() {
      if (this.resData.scopeData.realStartTime) {
        return moment(
          this.resData.scopeData.realStartTime,
          "YYYY-MM-DD HH:mm:ss"
        )
          .add(this.resData.scopeData.planTimeLong, "hours")
          .format("YYYY-MM-DD HH:mm");
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      reasonList: [],
      resData: {
        projectData: {
          projectName: "",
          projectServiceTypeName: ""
        },
        scopeData: {
          realStartTime: "",
          planTimeLong: 0
        }
      },
      itemId: "",
      projectSystemCode: "",
      formTitle: "",
      formDesc: "", //项目公告
      formFiles: [
        //项目附件表
        {
          name: "",
          url: ""
        },
        {
          name: "",
          url: ""
        }
      ],
      formDays: 0, //填表可用天数
      form: {
        username: "",
        number: "",
        class: "", //个人信息不能更改 控件已经disabled
        type: "", //业务类别
        options: [],
        typeValue: "", //子业务类别选中值
        mainReason: "",
        desc: "", //申请理由
        delivery: false,
        fileList: [] //申请附件
      },
      attArr: []
    };
  },
  methods: {
    ...mapActions({
      getApplyData: store.namespace + "/getApplyData",
      insertScholarshipApply: store.namespace + "/insertMotivationScholarshipApply",
      getDictByDictNames: store.namespace + "/getDictByDictNames"
    }),
    cancle() {
      this.$router.go(-1);
    },
    getReasonList() {
      console.log(["getReasonList"]);
      var requestData = { dicts: ["poverty_apply_reason"] };
      this.getDictByDictNames(requestData).then(response => {
        console.log(["getDictByDictNames1", response]);
        this.reasonList = response.resBody.poverty_apply_reason;
        console.log(["getDictByDictNames2", this.reasonList]);
      });
    },
    DateDiff(sDate1, sDate2) {
      //sDate1和sDate2是2006-12-18格式
      var aDate, oDate1, oDate2, iDays;
      aDate = sDate1.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为12-18-2006格式
      aDate = sDate2.split("-");
      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      return iDays;
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      console.log(["上传成功", file, fileList]);
      var tempArr = [];
      for (var i = 0; i < fileList.length; i++) {
        tempArr[i] = fileList[i].response.body.resBody.fileId;
      }
      this.attArr = tempArr;
    },
    handleRemove(response, fileList) {
      console.log(["移除成功", fileList]);
      var tempArr = [];
      for (var i = 0; i < fileList.length; i++) {
        tempArr[i] = fileList[i].response.body.resBody.fileId;
      }
      this.attArr = tempArr;
    },
    onSubmit() {
      console.log("submit!");
      var requestData = {
        itemId: this.itemId,
        childServiceTypeCode: this.form.typeValue,
        projectSystemCode: this.projectSystemCode,
        applyReason: this.form.desc, //申请原因
        attachment: this.attArr // 附件
      };
      console.log(["requestData", requestData]);
      this.insertScholarshipApply(requestData).then(response => {
        this.$message.success("提交成功");
        this.$router.go(-1);
      });
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
h2,
h4 {
  text-align: center;
  font-weight: 400;
}
h4 {
  color: #999;

  text-align: left;
}
</style>
