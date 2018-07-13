<template>
    <page>
        <div slot="title">
            新建公示
        </div>
        <div slot="panel">
            <el-form ref="form" label-position="left" :model="form" label-width="110px" style="margin: 20px;">
                <el-form-item label="公示标题:">
                    <el-input v-model="form.title" autosize focus>
                        <i slot="suffix" class="el-icon-edit el-input__icon"></i>
                    </el-input>
                </el-form-item>

                <el-form-item label="公示附件:">
                    <attachmentUplad :fileList2="form.attrDetailBean" :url="uploadAttrUrl" style="width: 30%;" @onSuccess="formUploadOnSuccess"></attachmentUplad>
                </el-form-item>

                <el-form-item label="公示内容:">
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
import tinymce from "~/components/Tinymce";
import attachmentUplad from "~/components/Upload/elx-upload";
export default {
  data() {
    return {
      form: {
        title: "", //公示标题
        desc: "", //公示内容
        attrDetailBean: [] //公示附件
      },
      uploadAttrUrl: "http://.." //上传地址
    };
  },
  components: {
    attachmentUplad,
    tinymce
  },
  methods: {
    onSave(e) {
      console.log(this.form);
      var t = this.form;
      var requestData = {
        //参数
      };
      this.insertOrUpdateProject(requestData).then(response => {
        console.log(["!!!", response]);
        this.form.id = response.resBody.id;
        this.$message.success("保存成功!");
      });
    },
    formUploadOnSuccess(files) {
      console.log(["文件成功上传后的列表", files]);
      var tempArr = [];
      for (var i = 0; i < files.length; i++) {
        tempArr[i] = files[i].response.body.resBody.fileId;
      }
      this.form.projectAttattrDetailBeanachmentId = tempArr;
    },
    ok() {
      this.$confirm("此操作将向全站点发布公示且不能删除, 是否继续?", "提示", {
        confirmButtonText: "确定发布",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发布成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {}
};
</script>
<style>
</style>
