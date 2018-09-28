/* Automatically generated by './build/make/*.js' */
import { mapGetters, mapActions } from "vuex";
import store from "../_store/index.js";
export default {
  data: function() {
    return {};
  },

  methods: {
    ...mapActions({
      queryEvalListForStu: store.namespace + "/queryEvalListForStu",
      queryPunishList2: store.namespace + "/queryPunishList2",

      querySchoolYearDict: store.namespace + "/querySchoolYearDict",
      getPunishStateDict: store.namespace + "/getPunishStateDict",
      getCurrentOrgListAndOwner: store.namespace + "/getCurrentOrgListAndOwner",

      updateScheme: store.namespace + "/updateScheme",

      insertScheme: store.namespace + "/insertScheme",

      copyScheme: store.namespace + "/copyScheme",

      processSchemeName: store.namespace + "/processSchemeName",

      deleteSchemeById: store.namespace + "/deleteSchemeById",

      startScheme: store.namespace + "/startScheme",

      getBaseQualtityItemBeanBySchemeId:
        store.namespace + "/getBaseQualtityItemBeanBySchemeId",

      saveBaseQualtityItemBean: store.namespace + "/saveBaseQualtityItemBean",

      queryBaseQualtityCategory: store.namespace + "/queryBaseQualtityCategory",

      queryEvalList: store.namespace + "/queryEvalList"
    })
  }
};
