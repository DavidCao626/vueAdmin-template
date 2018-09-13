import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";

export default {
  data: function() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        totalRecord: 0
      }
    };
  },
  methods: {
    ...mapActions({
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",
      queryStuScoreForStaff: store.namespace + "/queryStuScoreForStaff",
      querySchoolYearDict: store.namespace + "/querySchoolYearDict",
      importStuScoreForClass: store.namespace + "/importStuScoreForClass",
      queryScoreRankForStaff: store.namespace + "/queryScoreRankForStaff",
      uploadStuScore: store.namespace + "/uploadStuScore",
      processRank: store.namespace + "/processRank",
      queryScoreRankForStu: store.namespace + "/queryScoreRankForStu",

      //--------
      queryPunishList: store.namespace + "/queryPunishList",
      getPunishStateDict: store.namespace + "/getPunishStateDict",
      getPunishItemStateDict: store.namespace + "/getPunishItemStateDict",
      updatePunish: store.namespace + "/updatePunish",
      insertPunish: store.namespace + "/insertPunish",
      copyPunish: store.namespace + "/copyPunish",
      processPunishName: store.namespace + "/processPunishName",
      deletePunishById: store.namespace + "/deletePunishById",
      startPunish: store.namespace + "/startPunish",
      getPunishItemBeanByPunishId:store.namespace + "/getPunishItemBeanByPunishId",
      savePunishItemBean: store.namespace + "/savePunishItemBean",
      queryPunishItemByShoolYearId:store.namespace + "/queryPunishItemByShoolYearId",
      queryPunishRecordForStaff: store.namespace + "/queryPunishRecordForStaff",
      queryPunishRecordForStu: store.namespace + "/queryPunishRecordForStu",
      insertPunishRecord: store.namespace + "/insertPunishRecord",
      deletePunishRecord: store.namespace + "/deletePunishRecord",
      getPunshiRecordById: store.namespace + "/getPunshiRecordById",
      uploadStuPunish: store.namespace + "/uploadStuPunish",
      importPunishRecord: store.namespace + "/importPunishRecord"
    })
  }
};
