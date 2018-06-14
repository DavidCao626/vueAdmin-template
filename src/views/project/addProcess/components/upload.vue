<template>

    <el-upload class="upload-demo" :action="url" drag :on-preview="handlePreview" :accept="accept" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" :on-success="onSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">{{acceptContent}}</div>
    </el-upload>

</template>
<script>
export default {
  props: {
    url: {
      // 必选，上传地址
      type: String,
      default: ''
    },
    accept: {
      // 可选 接受上传的文件类型（thumbnail-mode 模式下此参数无效），默认图片类型
      type: String,
      default:
        'image/*,application/msword,	audio/*,video/*,application/pdf,application/vnd.ms-powerpoint,aplication/zip,application/vnd.ms-excel'
    },
    acceptContent: {
      // 可选，限制类型的提示文字
      type: String,
      default: '支持音视图多媒体、Word、PPT、xls、Zip文件'
    }
  },
  data() {
    return {
      fileList2: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    onSuccess(response, file, fileList) {
      console.log(["上传文件",fileList])
      this.$emit('onSuccess', fileList) // 上传成功把成功的地址列表返回去
    }
  }
}
</script> 