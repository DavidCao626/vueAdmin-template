<template>
    <page :Breadcrumb="0">
        <div slot="title">公告信息</div>
        <div slot="panel">
            <div class="body-title">
                <h2>{{noticeInfo.baseData.title}}</h2>
                <p>发表时间：{{noticeInfo.baseData.publicTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布者：{{noticeInfo.baseData.createdUserId}}</p>
            </div>
            <div class="body">
               {{noticeInfo.baseData.content}}
            </div>
            
        </div>
    </page>
</template>

<script>
//
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  data() {
    return {
        noticeInfo:{
            baseData:{},
            files:[]
        }
    };
  },
  methods: {
    ...mapActions({
      getPublicNoticeById: store.namespace + "/getPublicNoticeById"
    })
  },
  mounted() {},
  computed: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.publicNoticeId != undefined) {
        let publicNoticeId = to.query.publicNoticeId;
        if (publicNoticeId != "" && publicNoticeId != null) {
          vm.getPublicNoticeById({ id: publicNoticeId }).then(response=>{
              vm.noticeInfo = response.resBody;
          });
        }
      } else if (to.params.publicNoticeId != undefined) {
        let publicNoticeId = to.params.publicNoticeId;
        if (publicNoticeId != "" && publicNoticeId != null) {
         vm.getPublicNoticeById({ id: publicNoticeId }).then(response=>{
              vm.noticeInfo = response.resBody;
          });
        }
      }else{
          alert("非法进入页面")
          vm.$router.go(-1)
      }
    });
  }
};
</script>

<style>
.body-title {
  text-align: center;
  color: #222;
}
</style>
