<template>

  <el-upload class="upload-demo" :action="url"  :on-preview="handlePreview" :accept="accept" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" :on-success="onSuccess">
   <el-button size="small" type="primary" plain>点击上传</el-button>
  </el-upload>

</template>
<script>
export default {
  props: {
    url: {
      // 必选，上传地址
      type: String,
      default: ""
    },
    accept: {
      // 可选 接受上传的文件类型（thumbnail-mode 模式下此参数无效），默认图片类型
      type: String,
      default:
        "image/*,application/msword,	audio/*,video/*,application/pdf,application/vnd.ms-powerpoint,aplication/zip,application/vnd.ms-excel"
    },
    acceptContent: {
      // 可选，限制类型的提示文字
      type: String,
      default: "支持音视图多媒体、Word、PPT、xls、Zip文件"
    },
    fileList2:{
      type:Array,
      default:function(){
        return [
        {
         response:{
           body:{resBody:{fileId:13213}
           }
         },
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          response:{body:{resBody:{fileId:13213}}},
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit("onSuccess", fileList); // 上传成功把成功的地址列表返回去
    },
    handlePreview(file) {
      console.log(file);
    },
    onSuccess(response, file, fileList) {
      
      this.$emit("onSuccess", fileList); // 上传成功把成功的地址列表返回去
    }
  }
};
</script>