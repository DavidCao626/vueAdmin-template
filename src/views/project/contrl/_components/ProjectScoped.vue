<template>
  <div class="box">
    <div>
      <svg-icon icon-class="school" width="131px" height="131px" />
    </div>
    <div>
      <p class="scopedName">{{ scopeInfo.orgName }}</p>
    </div>
    <div>
      <p>环节开始时间：{{scopeInfo.planStartTime}}</p>
      <p>环节结束时间：{{scopeInfo.planEndTime}}</p>
    </div>
  
  </div>
</template>
<script>
import commons from "~/utils/common.js";
import store from "../../_store/index.js";
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      scopeInfo: store.namespace + "/getInteratedScopeInfo"
    })
  },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
     data() {
      return {
        filterText: '',
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
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
  height: 300px;
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
