<template>
    <page :Breadcrumb="false">

        <div slot="title">公示信息</div>
        <div slot="panel">
            <div class="body-title">
                <h2>{{noticeInfo.baseData.title}}</h2>
                <p>发表时间：{{noticeInfo.baseData.publicTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布者：{{noticeInfo.baseData.publicOrgName}}</p>
            </div>
            <div class="body" v-html="noticeInfo.baseData.content">
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

<style>
.body-title {
  text-align: center;
  color: #222;
}

.body p{
    line-height:32px;
    font-size:16px;
}
.body {
    font-family:宋体
}

.data_table{
    width:90%;
    margin-top:15px;
    margin-bottom:15px;
    font-size:14px;
    margin-left:auto;
    margin-right:auto;
    /*table-layout: fixed;*/
}

.data_label{
    text-align:right;
    padding-right:5px;
    border-bottom: 1px solid #f2f3f5;
    padding-top:5px;
    line-height:36px;
    color:#333333;

}
.data_value{
    text-align:left;
    padding-left:5px;
    border-bottom: 1px solid #f2f3f5;
    padding-top: 5px;
    line-height:48px;
}

</style>
