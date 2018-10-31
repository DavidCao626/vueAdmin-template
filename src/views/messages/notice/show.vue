<template>
    <page :Breadcrumb="false">

        <div slot="title">公示信息</div>
        <div slot="panel">
            <div class="body-title">
                <h2>{{noticeInfo.baseData.title}}</h2>
                <p>发表时间：{{noticeInfo.baseData.publicTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布者：{{noticeInfo.baseData.publicOrgName}}</p>
            </div>
            <div class="post-body" v-html="noticeInfo.baseData.content">
            </div>
             <br/><br/>
        </div>
        
    </page>
</template>

<script>
//
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  data() {
       console.log('data')
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
  mounted() {
       console.log('mounted')
  },
  computed: {},
  created(){
      console.log('created')
  },
  beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter')
    next(vm => {
         console.log('beforeRouteEnterNext')
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

<style socped>
</style>
