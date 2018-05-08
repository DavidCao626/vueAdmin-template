<template>
  <page>
    <div slot="title">测试外观</div>

    <template v-for="(st,key) in style">
      <el-card class="box-card main" :key="key">
        <keep-alive>
          <component :is="st"></component>
        </keep-alive>

      </el-card>
    </template>
    <el-card class="box-card main">
      <el-button type="success" @click="submit">保存提交</el-button>
    </el-card>
    {{taskStyleData}}
  </page>
</template>
<script>
import family from './family'
import projectApply from './projectApply'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['taskStyleData'])
  },

  components: {
    projectApply,
    family
  },
  data() {
    return {
      style: ['projectApply', 'family']
    }
  },
  methods: {
    submit() {
      alert(this.$route.query.id)
      var fromData = this.taskStyleData.fromData

      this.$store
        .dispatch('addData', {
          facadeSequenece: this.$route.query.id,
          unitBeans: [
            { unitCode: fromData.family.unitCode, mapBean: fromData.family.data },
            { unitCode: fromData.projectApply.unitCode, mapBean: fromData.projectApply.data }
          ]
        })
        .then(function(resp) {
          alert(resp)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 600px;
  margin: 10px auto;
}
</style>

