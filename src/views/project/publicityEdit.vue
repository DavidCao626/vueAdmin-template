<template>
  <page :Breadcrumb="false">
    <div slot="title">编辑公示</div>
    <div slot="panel">
      <el-card>
        <proInfo :item-id="itemId"></proInfo>
        <br />
        <div>
          <el-select v-model="tempContent" placeholder="选择公示模版" @change="selectChange">
            <el-option v-for="(item,index) in templateList" :key="index" :label="'模板'+(index+1)" :value="item.content">
            </el-option>
          </el-select>
        </div>
        <br />
        <tinymce :height="300" v-model="content" id='tinymce' ref="tinymcs"></tinymce>
        </br>
        <div id="sub">
          <el-button type="success" @click="onSubmit">提交</el-button>
        </div>
      </el-card>
    </div>
  </page>
</template>

<script>
import proInfo from "./_components/projectSimpleInfo";
import tinymce from "~/components/Tinymce";
import { mapGetters, mapMutations, mapActions } from "vuex";
import commons from "~/utils/common.js";
import store from "./_store/index.js";
export default {
  data() {
    return {
      tempContent: "",
      content: "",
      itemId: 0,
      templateList: []
    };
  },
  components: {
    tinymce,
    proInfo
  },
  computed: {},
  methods: {
    ...mapActions({
      savePublicityEdit: store.namespace + "/savePublicityEdit",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId",
      queryNoticeTemplateByItemId:
        store.namespace + "/queryNoticeTemplateByItemId"
    }),
    selectChange(val) {
      this.content = val;
      this.$refs["tinymcs"].setContent(val);
      console.log(["val", this, val]);
    },
    tempBtn() {
      console.log(["content", this.content]);
    },
    getNoticeTemplate() {
      this.queryNoticeTemplateByItemId({ itemId: this.itemId }).then(
        response => {
          this.templateList = response.resBody;
        }
      );
    },
    onSubmit() {
      console.log(["this", this]);
      this.savePublicityEdit({
        itemId: this.itemId,
        content: this.content
      }).then(response => {
        this.completeUserPendingByItemId({ itemId: this.itemId }).then(
          response => {
            console.log(["this", this]);
            this.$router.push({
              path: "/project/control",
              query: {
                scopeId: response.resBody.scopeId
              }
            });
          }
        );
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.itemId != null && to.query.itemId != undefined) {
        vm.itemId = to.query.itemId;
        vm.getNoticeTemplate();
      } else {
        if (to.params.itemId != null && to.params.itemId != undefined) {
          vm.itemId = to.params.itemId;
          vm.getNoticeTemplate();
        } else {
          vm.$message.error("参数错误");
          return;
        }
      }
    });
  }
};
</script>
<style >
#sub {
  text-align: right;
  margin-right: 6%;
}
</style>
