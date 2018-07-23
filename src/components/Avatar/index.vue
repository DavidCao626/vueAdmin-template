<template>
  <div id="avatar">
    <img :src="imgDataUrl" @click="toggleShow" style="width:100%">
    <my-upload field="img" @crop-success="cropSuccess" :noRotate="false" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="300" :url="url" :params="params" :headers="headers" img-format="png"></my-upload>

  </div>
</template>

<script>
import Vue from "vue";
import myUpload from "vue-image-crop-upload";
import png from "~/assets/img/avatar.png";
export default {
  props: {
    show: {
      type:Boolean,
      default:false
    },
    params: {
      token: "123456798",
      name: "avatar"
    },
    headers: {
      smail: "*_~"
    },
    imgDataUrl: {
      type: String,
      default: png
    },
    url: {
      type: String,
      default: "/"
    }
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
      this.$emit('cropSuccess', this.imgDataUrl)
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      this.imgDataUrl = png;
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  }
};
</script>

<style>
</style>
