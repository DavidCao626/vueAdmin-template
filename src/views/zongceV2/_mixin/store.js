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
    })
  }
};
