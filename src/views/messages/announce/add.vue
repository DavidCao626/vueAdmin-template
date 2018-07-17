<template>
  <page>
    <div slot="title">
      新建公告
    </div>
    <div slot="panel">
      <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">
        <el-form-item label="公告标题:">
          <el-input v-model="form.title" autosize focus>
            <i slot="suffix" class="el-icon-edit el-input__icon"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="公告附件:">

          <attachmentUplad :fileList2="attrArr" :url="uploadAttrUrl" style="width: 30%;" @onSuccess="formUploadOnSuccess"></attachmentUplad>

        </el-form-item>

        <el-form-item label="公告内容:">
          <tinymce :height="300" v-model="form.desc" id='tinymce'></tinymce>
        </el-form-item>
      </el-form>
      <br/>
      <el-row type="flex" class="row-bg" justify="center" style="padding: 20px;border-top: #f6f8f9 solid 2px;">
        <el-col :span="4">
          <el-button @click="onSave">保存</el-button>
          <el-button type="primary" @click="ok">发布</el-button>
        </el-col>
      </el-row>
      <br/>
      <br/>
    </div>
  </page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import tinymce from "~/components/Tinymce";
import attachmentUplad from "~/components/Upload/elx-upload";
import api from "../_api/publicNotice.js";
import store from "../_store/index.js";
export default {
  data() {
    return {
      attrArr: [],
      form: {
        id: 0,
        title: "", //公告标题
        desc: "", //公告内容
        attrDetailBean: [] //公告附件
      },
      uploadAttrUrl: api.uploadAttrUrl //上传地址
    };
  },
  components: {
    attachmentUplad,
    tinymce
  },
  methods: {
    ...mapActions({
      insertNotice: store.namespace + "/insertNotice",
      getPublicNoticeById: store.namespace + "/getPublicNoticeById"
    }),
    getData() {
      this.getPublicNoticeById({ id: this.form.id }).then(response => {
        console.log(["getPublicNoticeById", response]);
        var res = response.resBody;
        this.form.id = res.baseData.id;
        this.form.title = res.baseData.title;
        this.form.desc = res.baseData.content;
        this.attrArr = res.baseData.attrDetailBean;
        var tempArr = [];
        var inx = 0;
        res.baseData.files.forEach(item => {
          tempArr[inx] = item.id;
          inx++;
        });
        this.form.attrDetailBean = tempArr;
      });
    },
    onSave() {
      console.log(["this", this.form]);
      var requestData = this.form;
      requestData.state = "D";
      this.insertNotice(requestData).then(response => {
        console.log(response);
        this.$message.success("保存成功");
        this.$router.go(-1);
      });
    },
    formUploadOnSuccess(files) {
      console.log(["文件成功上传后的列表", files]);
      var tempArr = [];
      for (var i = 0; i < files.length; i++) {
        tempArr[i] = files[i].response.body.resBody.fileId;
      }
      this.form.attrDetailBean = tempArr;
    },
    ok() {
      this.$confirm("此操作将向全站点发布公告且不能删除, 是否继续?", "提示", {
        confirmButtonText: "确定发布",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(response => {
          var requestData = this.form;
          requestData.state = "S";
          this.insertNotice(requestData).then(response => {
            console.log(response);
            this.$message({
              type: "success",
              message: "发布成功!"
            });
            this.$router.go(-1);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.id && to.query.id != 0) {
        vm.form.id = to.query.id;
        vm.getData();
      }
    });
  }
};
</script>
<style>
</style>
