
<template>
  <el-form :model="formAdd" class="demo-form-inline" label-width="100px">

    <el-form-item label="事件标题:">
      <el-input v-model="formAdd.title"></el-input>
    </el-form-item>
    <el-form-item label="发生时间:">
      <el-date-picker v-model="formAdd.happenTime" align="right" type="date" placeholder="选择事件发生日期" :picker-options="pickerOptions1">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="测评类别:" v-if="formAdd.happenTime">
      <Catag :date="Date.parse(formAdd.happenTime)" @handleChange='onHandleChange__add'></Catag>
    </el-form-item>
    <!-- <el-form-item label="分数:">
                            <el-input v-model="formAdd.score" type="textarea"></el-input>
                        </el-form-item> -->
    <el-form-item label="附件:">
      <el-upload class="upload-demo" :action="uploadStuPunishurl" multiple :limit="1" :onSuccess="onUploadSuccess">
        <el-button size="small" type="primary" plain>
          <i class="el-icon-upload"></i> 点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSave">提交申请</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Catag from "./expandEvalCatagory.vue";
const uploadStuPunishUrl =
  process.env.BASE_API + "/public/uploadStuExpandEval.do";

import expandEval from "../../_mixin/expandEval.js";
export default {
  mixins: [expandEval],
  components: { Catag },
  data() {
    return {
      uploadStuPunishurl: uploadStuPunishUrl,
      formAdd: {
        stuNo: "",
        stuName: "",
        title: "",
        schoolYearName: "",
        schoolYearId: "",
        happenTime: {},
        desc: "",
        score: 0,
        expend: {
          expendCategoryCode: "",
          expendCategoryName: "",
          expendGradeName: "",
          expandItemCode: "",
          expandItemName: ""
        },
        fileId: "",
        orgCode: []
      }
    };
  },
  methods: {
    onSave() {
      this.applyExpandRecord({
        title: this.formAdd.title,
        happenTime: Date.parse(this.formAdd.happenTime),
        expendCategoryCode: this.formAdd.expend.expendCategoryCode || "",
        expendCategoryName: this.formAdd.expend.expendCategoryName || "",
        expendGradeName: this.formAdd.expend.expendGradeName || "",
        expandItemCode: this.formAdd.expend.expandItemCode || "",
        expandItemName: this.formAdd.expend.expandItemName || "",
        //  desc: this.formAdd.desc,
        attrId: this.formAdd.fileId
      }).then(r => {
        this.$message.success("申请信息已提交，等待相关老师审核中");
        this.$emit('ok')
      });
    },
    onUploadSuccess(response, file, fileList) {
      this.formAdd.fileId = response.body.resBody.fileId;
    },
    pickerOptions1: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ]
    },

    onHandleChange__add(o) {
      if (!o) return;
      o.forEach((element, index) => {
        if (index == 0) {
          this.formAdd.expend.expendCategoryCode = element.value;
          this.formAdd.expend.expendCategoryName = element.label;
        }
        if (index == 1) {
          this.formAdd.expend.expendGradeName = element.value;
        }
        if (index == 2) {
          this.formAdd.expend.expandItemCode = element.value;
          this.formAdd.expend.expandItemName = element.label;
        }
      });
    }
  }
};
</script>

<style>
</style>
