<template>
  <div>
    <div id="my-editor">
    <quill-editor ref="myTextEditor" :content="content" :options="editorOption" @change="onEditorChange($event)">
    </quill-editor>
    </div>
    <div style="width:500px">
{{content}}

    </div>
    <br/>
    <hr/>
    <div v-html="content"></div>
  </div>
</template>
	
	
<script>
import { quillEditor } from "vue-quill-editor";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption:{
        theme:"snow"
      }
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
    }
  }
};
</script>
<style>
#my-editor{
  width: 30%;
  margin: 40px;
}

</style>