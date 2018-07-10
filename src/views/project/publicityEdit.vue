<template>
  <div>
    <tinymce :height="300" v-model="content" id='tinymce'></tinymce>
    </br>
    <div id="sub">
      <el-button type="success" @click="onSubmit">提交</el-button>
    </div>

  </div>
</template>

<script>
import tinymce from "~/components/Tinymce";
import { mapGetters, mapMutations, mapActions } from "vuex";
import commons from "~/utils/common.js";
import store from "./_store/index.js";
export default {
  data() {
    return {
      content: "",
      itemId: 0
    };
  },
  components: {
    tinymce
  },
  computed: {},
  methods: {
    ...mapActions({
      savePublicityEdit: store.namespace + "/savePublicityEdit",
      completeUserPendingByItemId:
        store.namespace + "/completeUserPendingByItemId"
    }),

    tempBtn() {
      console.log(["content", this.content]);
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
      } else {
        if (to.params.itemId != null && to.params.itemId != undefined) {
          vm.itemId = to.params.itemId;
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
