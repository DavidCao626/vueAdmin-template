<template>
    <div>
        <div class="weui-desktop-page__title" style="font-size:18px">项目基本信息</div>
        <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">

            <el-form-item label="项目名称:">
                <p>{{form.projectName}}</p>
            </el-form-item>
            <el-form-item label="业务类型:">
                <form-disabled-select :value="serviceType" :optionData="serviceTypeList"></form-disabled-select>
            </el-form-item>
            <el-form-item label="项目开始时间:">
                <p>{{form.planStartTime}}</p>
            </el-form-item>
            <el-form-item label="项目结束时间:">

                <el-row :gutter="0">
                    <el-col :span="3">
                        <p>{{form.planCompleteTime}}</p>
                    </el-col>
                    <el-col :span="3">
                        <p>剩余
                            <strong style="color:red">{{form.endDateCount}}</strong> 天结束</p>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="mini" plain>延期</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="项目内容:">
                <p>{{form.projectDesc}}</p>
            </el-form-item>

            <el-form-item label="项目附件:">
                <p v-for="(file,index) in form.files" :key="index">{{file.userFileName}}</p>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import formData from "../../addProcess/components/Data";
import formDisabledSelect from "../../addProcess/components/disabledSelect";
import {
  queryWorkItem,
  getProjectById,
  queryServiceTypeList
} from "~/api/project";
export default {
  components: {
    formData,
    formDisabledSelect
  },
  data() {
    return {
        serviceType :"",
      projectId: this.$route.query.projectId,
      scopeId: this.$route.query.scopeId,
      serviceTypeList: [],
      form: {
      }
    };
  },
  methods: {
    loadServiceTypeData() {
      new Promise((resolve, reject) => {
        queryServiceTypeList().then(response => {
          this.serviceTypeList = response.resBody;
          console.log(["loadServiceTypeData", this.serviceTypeList]);
        });
      });
    },
    loadProjectInfo() {
      var requestData = {
        projectId: this.projectId
      };
      new Promise((resolve, reject) => {
        getProjectById(requestData).then(response => {
          console.log(["第三个页面项目基本信息", response.resBody]);
          this.form = response.resBody;
          this.serviceType = response.projectServiceType;
          this.form.endDateCount = this.getDays(
            response.resBody.planStartTime,
            response.resBody.planCompleteTime
          );
        });
      });
    },
    getDays(date1, date2) {
      var date1Str = date1.split("-"); //将日期字符串分隔为数组,数组元素分别为年.月.日
      //根据年 . 月 . 日的值创建Date对象
      var date1Obj = new Date(date1Str[0], date1Str[1] - 1, date1Str[2]);
      var date2Str = date2.split("-");
      var date2Obj = new Date(date2Str[0], date2Str[1] - 1, date2Str[2]);
      var t1 = date1Obj.getTime();
      var t2 = date2Obj.getTime();
      var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
      var minusDays = Math.floor((t2 - t1) / dateTime); //计算出两个日期的天数差
      var days = Math.abs(minusDays); //取绝对值
      return days;
    }
  },
  mounted() {
    this.loadServiceTypeData();
    this.loadProjectInfo();
  }
};
</script>