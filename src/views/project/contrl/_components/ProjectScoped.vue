<template>
    <div class="box">
        <div>
            <svg-icon icon-class="school" width="131px" height="131px" />
        </div>
        <div>
            <p class="scopedName">{{scopeInfo.orgName}}</p>
        </div>
        <div>
            <p>环节开始时间：{{scopeInfo.planStartTime}}</p>
            <p>环节结束时间：{{scopeInfo.planEndTime}}</p>
        </div>
    </div>
</template>
<script>
import commons from '~/utils/common.js'
import store from '../../_store/index.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      scopeInfo: store.namespace + '/getInteratedScopeInfo'
    })
  },
  methods: {
  }
};
</script>

<style scoped>
.box {
  padding: 30px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 280px;
  width: 250px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #666;
}
.scopedName {
  font-size: 16px;
  margin: 8px;
  color: #444;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 500;
}
</style>
