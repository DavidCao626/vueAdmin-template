<template>
    <div>
        <div>项目名称:{{data.projectData.projectName}}</div>
        <div>环节名称:{{data.scopeData.scopeName}}</div>
        <div>节点名称:{{data.itemData.stepName}}</div>
    </div>
</template>
<script>
import state from "../_store/index.js";
import { mapActions, mapMutations, mapGetters } from "vuex";
import commons from "~/utils/common.js";
import moment from "moment";
export default {
  name: "projectInfoForm",
  props: ["itemId"],
  watch: {
    itemId(newValue, oldValue) {
      this.getData(newValue);
    }
  },
  components: {},
  computed: {
    endTime() {
      if (this.data.itemData.realStartTime) {
          var that = this;
        return moment(that.data.itemData.realStartTime, "YYYY-MM-DD HH:mm:ss")
          .add(that.data.itemData.planTimeLong, "hours")
          .format("YYYY-MM-DD HH:mm");
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      data: {
          scopeData:{
              scopeName:"",
              realStartTime:"",
              planTimeLong:""
          },
          itemData:{
              realStartTime:"",
              planTimeLong:"",
              stepName:""
          },
          projectData:{
              projectName:""
          }
      }
    };
  },
  methods: {
    ...mapActions({
      getProjectAllDataByItemId: state.namespace + "/getProjectAllDataByItemId"
    }),
    getData(itemId) {
      this.getProjectAllDataByItemId({ itemId: itemId }).then(response => {
        console.log(["getProjectAllDataByItemId", response]);
        this.data = response.resBody;
      });
    }
  },
  mounted() {
    if (this.itemId!=undefined&& this.itemId!=null&&this.itemId != 0) {
      this.getData(this.itemId);
    }
  }
};
</script>
<style>
</style>
